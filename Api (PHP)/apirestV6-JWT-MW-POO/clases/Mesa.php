<?php
class Mesa
{
	public $mesaCodigo;
  	public $mesaNombre;
	public $mesaCuentaCodigo;
	public $mesaEstado;
    
	public static function TraerTodaLasMesas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM mesa");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);		
    }
    
    public static function TraerUnaMesa($mesaCodigo)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM mesa
		Where mesa_codigo = :mesa");
		$consulta->bindParam(':mesa',$mesaCodigo);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");		
	}

    public static function LiberarMesa($mesaCodigo)
    {
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM mesa_usuario WHERE MesaCodigo = :codigo");
		$consulta->bindValue(':codigo',$mesaCodigo);
		$consulta->execute();	
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE mesa SET MesaCuentaCodigo = 0, MesaEstado = 1 WHERE MesaCodigo = :codigo");
		$consulta->bindValue(':codigo',$mesaCodigo);
		$consulta->execute();	
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	
	public static function clienteEnMesa()
    {
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT UsuarioCodigo FROM `mesa_usuario`");
		$consulta->execute();		
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function TraerEstadosPedidosMesa($mesaCodigo)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido_producto.Estado FROM pedido_producto 
		WHERE pedido_producto.PedidoCodigo IN(SELECT pedido.PedidoCodigo FROM pedido WHERE pedido.PedidoMesaCodigo = :mesaCodigo)");
		$consulta->bindValue(':mesaCodigo',$mesaCodigo);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);		
    }
}
?>