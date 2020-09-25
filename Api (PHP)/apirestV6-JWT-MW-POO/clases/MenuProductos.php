<?php
class Producto
{
	public $productoCodigo;
  	public $productoNombre;
	public $productoTipo;
    public $productoHabilitado;
	public $productoImporte;
    public $productoImagen;
    
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM producto");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);		
    }
    
    public static function TraerUnProducto($productoCodigo)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM producto WHERE ProductoCodigo = :producto");
		$consulta->bindParam(':producto',$productoCodigo);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);		
    }
    
    public function ModificarProducto()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

        if (isset($this->productoImagen)){
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `producto` 
            SET ProductoNombre = :nombre, ProductoTipo = :tipo, 
            ProductoHabilitado = :habilitado, ProductoImporte = :importe, ProductoImagen = :imagen
            WHERE ProductoCodigo = :codigo");
            $consulta->bindValue(':codigo',$this->productoCodigo);
            $consulta->bindValue(':nombre',$this->productoNombre);       
            $consulta->bindValue(':tipo',$this->productoTipo);
            $consulta->bindValue(':habilitado',$this->productoHabilitado);
            $consulta->bindValue(':importe', $this->productoImporte);
            $consulta->bindValue(':imagen', $this->productoImagen);
        }
        else{
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `producto` 
            SET ProductoNombre = :nombre, ProductoTipo = :tipo, 
            ProductoHabilitado = :habilitado, ProductoImporte = :importe
            WHERE ProductoCodigo = :codigo");
            $consulta->bindValue(':codigo',$this->productoCodigo);
            $consulta->bindValue(':nombre',$this->productoNombre);       
            $consulta->bindValue(':tipo',$this->productoTipo);
            $consulta->bindValue(':habilitado',$this->productoHabilitado);
            $consulta->bindValue(':importe', $this->productoImporte);
        }

        return $consulta->execute();
    }

    public function CrearProducto()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT 
            INTO producto(ProductoNombre,ProductoTipo,ProductoHabilitado,ProductoImporte,ProductoImagen)
            VALUES(:nombre,:tipo,:habilitado,:importe,:imagen)");
        $consulta->bindValue(':nombre',$this->productoNombre);       
        $consulta->bindValue(':tipo',$this->productoTipo);
        $consulta->bindValue(':habilitado',$this->productoHabilitado);
        $consulta->bindValue(':importe', $this->productoImporte);
        $consulta->bindValue(':imagen', $this->productoImagen);
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public static function EliminarProducto($productoCodigo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM `producto` WHERE ProductoCodigo = :codigo");
        $consulta->bindValue(':codigo',$productoCodigo);       
        return $consulta->execute();
    }
}
?>