<?php
Class Pedido
{
    public $PedidoCodigo;
    public $PedidoMesaCodigo;
    public $PedidoClienteCodigo;
    public $PedidoMozoCodigo;
    public $PedidoEstado;
    public $ProductoCodigo;
    public $PreparadorCodigo;
    public $UsuarioCodigo;
    public $TipoProducto;
    public $MesaCuentaCodigo;
    public $PedidoImagen;

    public static function TraerUnPedido($PedidoCodigo,$PedidoMesaCodigo)
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido
        WHERE PedidoCodigo = :pedidoCodigo AND PedidoMesaCodigo = :mesaCodigo");
        $consulta->bindParam(':pedidoCodigo',$PedidoCodigo);
        $consulta->bindParam(':mesaCodigo',$PedidoMesaCodigo);
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_ASSOC);		
    }
    
    public static function TraerPedidoProductosTodos($ClienteCodigo)
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido.PedidoCodigo, PedidoMesaCodigo, mesa.MesaNombre, PedidoMozoCodigo, producto.ProductoNombre, pedido_producto.Estado, pedido_producto.PedidoProductoTiempo FROM pedido 
        RIGHT JOIN pedido_producto ON pedido.PedidoCodigo = pedido_producto.PedidoCodigo 
        RIGHT JOIN producto ON pedido_producto.ProductoCodigo = producto.ProductoCodigo 
        RIGHT JOIN mesa ON pedido.PedidoMesaCodigo = mesa.MesaCodigo WHERE pedido.PedidoClienteCodigo = :clienteCodigo");
        $consulta->bindParam(':clienteCodigo',$ClienteCodigo);
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_ASSOC);		
    }

    public static function TraerEstadoPedido($pedidoProductoCodigo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT COUNT(*) as cantidad FROM pedido_producto WHERE pedido_producto.Estado IN (1, 2, 3) 
        AND pedido_producto.PedidoCodigo IN (SELECT pedido_producto.PedidoCodigo FROM pedido_producto WHERE pedido_producto.PedidoProductoCodigo = :pedidoProductoCodigo)");
        $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }

    public function CrearUnPedido()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `mesa` SET MesaEstado = 3 WHERE MesaCodigo = :mesaCodigo");    
        $consulta->bindValue(':mesaCodigo',$this->PedidoMesaCodigo);
        $respuesta = $consulta->execute();

        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT 
            INTO pedido(PedidoCodigo,PedidoMesaCodigo,PedidoClienteCodigo,PedidoMozoCodigo,PedidoEstado,PedidoFecha,PedidoImagen)
            VALUES(:pedidoCodigo,:mesaCodigo,:clienteCodigo,:mozoCodigo,1,CURRENT_DATE(),:pedidoImagen)");
        $consulta->bindValue(':pedidoCodigo',$this->PedidoCodigo);       
        $consulta->bindValue(':mesaCodigo',$this->PedidoMesaCodigo);
        $consulta->bindValue(':clienteCodigo',$this->PedidoClienteCodigo);
        $consulta->bindValue(':mozoCodigo', $this->PedidoMozoCodigo);
        $consulta->bindValue(':pedidoImagen', $this->PedidoImagen);
        $respuesta = $consulta->execute();		
        $respuesta = $objetoAccesoDato->RetornarUltimoIdInsertado();

        return $respuesta;
    }

    public function CrearCuentaPedido()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT 
        INTO cuenta_pedido(CuentaCodigo, PedidoCodigo) VALUES(:cuentacodigo,:pedidocodigo)");
        $consulta->bindValue(':cuentacodigo',$this->MesaCuentaCodigo);       
        $consulta->bindValue(':pedidocodigo',$this->PedidoCodigo);
        $respuesta = $consulta->execute();		
        $respuesta = $objetoAccesoDato->RetornarUltimoIdInsertado();

        return $respuesta;
    }

    public function crearPedidosProductos()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT 
            INTO pedido_producto(PedidoCodigo,ProductoCodigo,Estado)
            VALUES(:pedidoCodigo,:productoCodigo,1)");
        $consulta->bindValue(':pedidoCodigo',$this->PedidoCodigo);       
        $consulta->bindValue(':productoCodigo',$this->ProductoCodigo);
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function TraerTodosMasPedidos($fechaDesde, $fechaHasta)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT producto.ProductoCodigo, producto.ProductoNombre, COUNT(*) as Cantidad FROM producto RIGHT JOIN pedido_producto ON producto.ProductoCodigo = pedido_producto.ProductoCodigo RIGHT JOIN pedido ON pedido.PedidoCodigo = pedido_producto.PedidoCodigo 
        WHERE pedido_producto.Estado = 4 and pedido.PedidoFecha >= :fechaDesde and pedido.PedidoFecha <= :fechaHasta GROUP BY producto.ProductoCodigo ORDER BY Cantidad DESC");
        $consulta->bindValue(':fechaDesde',$fechaDesde);       
        $consulta->bindValue(':fechaHasta',$fechaHasta);
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }

    public function TraerTodosMenosPedidos($fechaDesde, $fechaHasta)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT producto.ProductoCodigo, producto.ProductoNombre, COUNT(*) as Cantidad FROM producto RIGHT JOIN pedido_producto ON producto.ProductoCodigo = pedido_producto.ProductoCodigo RIGHT JOIN pedido ON pedido.PedidoCodigo = pedido_producto.PedidoCodigo 
        WHERE pedido_producto.Estado = 4 and pedido.PedidoFecha >= :fechaDesde and pedido.PedidoFecha <= :fechaHasta GROUP BY producto.ProductoCodigo ORDER BY Cantidad ASC");
        $consulta->bindValue(':fechaDesde',$fechaDesde);       
        $consulta->bindValue(':fechaHasta',$fechaHasta);
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }

    public function TraerTodosPedidosCancelados($fechaDesde, $fechaHasta)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido.PedidoCodigo, producto.ProductoNombre, pedido.PedidoFecha FROM producto RIGHT JOIN pedido_producto ON producto.ProductoCodigo = pedido_producto.ProductoCodigo RIGHT JOIN 
        pedido ON pedido.PedidoCodigo = pedido_producto.PedidoCodigo WHERE pedido_producto.Estado = 5 and pedido.PedidoFecha >= :fechaDesde and pedido.PedidoFecha <= :fechaHasta");
        $consulta->bindValue(':fechaDesde',$fechaDesde);       
        $consulta->bindValue(':fechaHasta',$fechaHasta);
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }

    public function TraerTodosPedidosPreparador($UsuarioCodigo, $TipoProducto)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT pp.*, p.ProductoNombre FROM pedido_producto AS pp INNER JOIN producto AS p ON(pp.ProductoCodigo = p.ProductoCodigo) 
        WHERE p.ProductoTipo = :tipoProducto and (pp.PreparadorCodigo = :usuarioCodigo or pp.PreparadorCodigo is null)");
        $consulta->bindValue(':usuarioCodigo',$UsuarioCodigo);       
        $consulta->bindValue(':tipoProducto',$TipoProducto);
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }

    public function TraerTodosPedidosListos()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT pp.*, p.ProductoNombre FROM pedido_producto AS pp INNER JOIN producto AS p ON pp.ProductoCodigo = p.ProductoCodigo WHERE pp.Estado = 3");
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }

    public function ActualizarEstadoPedidoGeneral($pedidoProductoCodigo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE pedido SET PedidoEstado = 4 WHERE pedido.PedidoCodigo 
        IN (SELECT pedido_producto.PedidoCodigo FROM pedido_producto WHERE pedido_producto.PedidoProductoCodigo = :pedidoProductoCodigo)");
        $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);		
        return $consulta->execute();
    }

    public function traerMasUsadas()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT COUNT(*) AS Cantidad, mesa.MesaNombre FROM pedido LEFT JOIN mesa ON pedido.PedidoMesaCodigo = mesa.MesaCodigo WHERE PedidoEstado = 4 GROUP BY PedidoMesaCodigo");		
        $consulta->execute();		
        return $consulta->fetchAll(PDO::FETCH_ASSOC);	
    }
}
?>