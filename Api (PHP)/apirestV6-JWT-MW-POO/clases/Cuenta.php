<?php

class Cuenta
{
    public $CuentaCodigo;
    public $CuentaImporte;
    public $CuentaEstado;
    public $CuentaMesaCodigo;
    
    public function CrearCuenta()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT 
        INTO `cuenta`(`CuentaImporte`, `CuentaEstado`, `CuentaMesaCodigo`,`CuentaFecha`) 
        VALUES (0,1,:mesacodigo,CURRENT_DATE())");
        $consulta->bindValue(':mesacodigo', $this->CuentaMesaCodigo);
        $consulta->execute();		
        
        $codigoCuenta = $objetoAccesoDato->RetornarUltimoIdInsertado();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `mesa` 
        SET MesaCuentaCodigo = $codigoCuenta, MesaEstado = 2
        WHERE MesaCodigo = :mesacodigo");
        $consulta->bindValue(':mesacodigo', $this->CuentaMesaCodigo);
        return $consulta->execute();
    }

    public function CerrarCuenta()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT SUM(producto.ProductoImporte) AS importetotal
        FROM producto JOIN pedido_producto ON(producto.ProductoCodigo = pedido_producto.ProductoCodigo) 
        WHERE pedido_producto.Estado <> 5 AND pedido_producto.PedidoCodigo IN(
        SELECT pedido.PedidoCodigo FROM pedido WHERE pedido.PedidoCodigo IN (SELECT cuenta_pedido.PedidoCodigo FROM cuenta_pedido WHERE cuenta_pedido.CuentaCodigo = :cuentacodigo))");
        $consulta->bindValue(':cuentacodigo', $this->CuentaCodigo);
        $consulta->execute();
        $importeTotal = $consulta->fetchAll(PDO::FETCH_ASSOC);

        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE cuenta 
        SET CuentaEstado = 2, CuentaImporte = :importe WHERE CuentaMesaCodigo = :mesacodigo AND CuentaCodigo = :cuentacodigo");
        $consulta->bindValue(':mesacodigo', $this->CuentaMesaCodigo);
        $consulta->bindValue(':cuentacodigo', $this->CuentaCodigo);
        $consulta->bindValue(':importe', $importeTotal[0]['importetotal']);
        $consulta->execute();		

        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `mesa` 
        SET MesaEstado = 5 WHERE MesaCodigo = :mesacodigo");
        $consulta->bindValue(':mesacodigo', $this->CuentaMesaCodigo);
        return $consulta->execute();
    }

    public function TraerDetalleCuenta()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT producto.ProductoNombre, producto.ProductoImporte AS importetotal
        FROM producto JOIN pedido_producto ON(producto.ProductoCodigo = pedido_producto.ProductoCodigo) 
        WHERE pedido_producto.Estado <> 5 AND pedido_producto.PedidoCodigo IN(
        SELECT pedido.PedidoCodigo FROM pedido WHERE pedido.PedidoCodigo IN (SELECT cuenta_pedido.PedidoCodigo FROM cuenta_pedido WHERE cuenta_pedido.CuentaCodigo = :cuentacodigo))");
        $consulta->bindValue(':cuentacodigo', $this->CuentaCodigo);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function PagarCuenta()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE cuenta 
        SET CuentaEstado = 3 WHERE CuentaCodigo = :cuentacodigo");
        $consulta->bindValue(':cuentacodigo', $this->CuentaCodigo);
        $consulta->execute();

        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE mesa
        SET MesaEstado = 6 WHERE MesaCodigo = :mesacodigo");
        $consulta->bindValue(':mesacodigo', $this->CuentaMesaCodigo);
        return $consulta->execute();
    }

    public function TraerCuentasPagar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT cuenta.*, mesa.MesaNombre FROM cuenta RIGHT JOIN mesa ON mesa.MesaCodigo = cuenta.CuentaMesaCodigo WHERE CuentaEstado = 2");
        $consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>