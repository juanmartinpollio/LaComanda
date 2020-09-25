<?php
class Usuario
{
	public $usuario;
  	public $tipo;
	public $contrasenia;
	public $pass;
	public $User;
	public $estado;
	public $imagen;
    
	public static function TraerTodoLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios
		WHERE 1");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);		
	}
	
	public static function TraerHistorialLogin($fechaDesde,$fechaHasta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `login_usuarios` WHERE login_usuarios.fecha >= :fechaDesde and login_usuarios.fecha <= :fechaHasta");
		$consulta->bindParam(':fechaDesde',$fechaDesde);
		$consulta->bindParam(':fechaHasta',$fechaHasta);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);		
	}
	
	public static function TraerOperacionesPorSector($fechaDesde,$fechaHasta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido_producto.PreparadorCodigo, producto.ProductoTipo, pedido.PedidoFecha FROM producto 
		RIGHT JOIN pedido_producto ON producto.ProductoCodigo = pedido_producto.ProductoCodigo 
		RIGHT JOIN pedido ON pedido.PedidoCodigo = pedido_producto.PedidoCodigo WHERE pedido_producto.Estado <> 5 and pedido_producto.PreparadorCodigo IS NOT NULL and pedido.PedidoFecha >= :fechaDesde and pedido.PedidoFecha <= :fechaHasta");
		$consulta->bindParam(':fechaDesde',$fechaDesde);
		$consulta->bindParam(':fechaHasta',$fechaHasta);
		$consulta->execute();					
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
	}
	
	public static function TraerOperacionesPorEstado($fechaDesde,$fechaHasta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido_producto.PreparadorCodigo, producto.ProductoTipo, pedido_producto.Estado, pedido.PedidoFecha FROM producto 
		RIGHT JOIN pedido_producto ON producto.ProductoCodigo = pedido_producto.ProductoCodigo 
		RIGHT JOIN pedido ON pedido.PedidoCodigo = pedido_producto.PedidoCodigo WHERE pedido_producto.Estado <> 5 and pedido_producto.PreparadorCodigo IS NOT NULL and pedido.PedidoFecha >= :fechaDesde and pedido.PedidoFecha <= :fechaHasta");
		$consulta->bindParam(':fechaDesde',$fechaDesde);
		$consulta->bindParam(':fechaHasta',$fechaHasta);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public static function TraerUnUsuario($contrasenia,$usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios
        Where contrasenia = :contrasenia AND usuario = :usuario");
        $consulta->bindParam(':contrasenia',$contrasenia);
        $consulta->bindParam(':usuario',$usuario);
        $consulta->execute();

        $variable = $consulta->fetchAll(PDO::FETCH_ASSOC);

        if(!empty($variable))
        {
            if(strlen($variable[0]["usuario"]) > 0)
            {
                $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO login_usuarios(usuario)
                VALUES(:usuario)");
                $consulta->bindParam(':usuario',$usuario);
                $consulta->execute();
            }
        }

        return $variable;	
	}

	public static function TraerTodosLosUsuarios()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta = $objetoAccesoDato->RetornarConsulta("select * from usuarios");
			$consulta->bindParam(':contrasenia',$contrasenia);
			$consulta->bindParam(':usuario',$usuario);
			$consulta->bindParam(':tipo',$tipo);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_ASSOC);		
	}
    
    public function InsertarUsuarioParametros()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios(usuario,contrasenia,tipo,usuarioImagen)
		values(:usuario,:contrasenia,:tipo,:imagen)");
		$consulta->bindValue(':usuario',$this->usuario);
		$consulta->bindValue(':tipo', $this->tipo);
		$consulta->bindValue(':contrasenia',$this->contrasenia);
		$consulta->bindValue(':imagen',$this->imagen);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	
	public function ModificarUsuario()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		if(isset($this->imagen)){
			$consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `usuarios` 
			SET estado = :estado, tipo = :tipo, usuarioImagen = :imagen
			WHERE usuario = :usuario");
			$consulta->bindValue(':usuario',$this->usuario);
			$consulta->bindValue(':tipo', $this->tipo);
			$consulta->bindValue(':estado', $this->estado);
			$consulta->bindValue(':imagen', $this->imagen);
		}
		else{
			$consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `usuarios` 
			SET estado = :estado, tipo = :tipo
			WHERE usuario = :usuario");
			$consulta->bindValue(':usuario',$this->usuario);
			$consulta->bindValue(':tipo', $this->tipo);
			$consulta->bindValue(':estado', $this->estado);
		}
		
		return $consulta->execute();			
	}

	public static function EliminarUsuario($usuario,$estado)
	{
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET estado = :estado WHERE usuario = :usuario");
		$consulta->bindValue(':usuario',$usuario);
		$consulta->bindValue(':estado', $estado);
		return $consulta->execute();
	}

	public function CambiarContrasenia()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		if(isset($this->imagen)){
			if(isset($this->contrasenia)){
				$consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `usuarios` 
				SET contrasenia = :contrasenia, usuarioImagen = :imagen
				WHERE usuario = :usuario");
				$consulta->bindValue(':usuario',$this->usuario);
				$consulta->bindValue(':contrasenia', $this->contrasenia);
				$consulta->bindValue(':imagen', $this->imagen);
			}
			else{
				$consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `usuarios` 
				SET usuarioImagen = :imagen
				WHERE usuario = :usuario");
				$consulta->bindValue(':usuario',$this->usuario);
				$consulta->bindValue(':imagen', $this->imagen);
			}
		}
		else{
			$consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `usuarios` 
			SET contrasenia = :contrasenia
			WHERE usuario = :usuario");
			$consulta->bindValue(':usuario',$this->usuario);
			$consulta->bindValue(':contrasenia', $this->contrasenia);
		}
		
		return $consulta->execute();
	}

	public static function TraerImagenUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT usuarioImagen FROM usuarios WHERE usuario = :usuario");
		$consulta->bindParam(':usuario',$usuario);
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>