<?php
require_once 'Mesa.php';
class MesaApi extends Mesa 
{
    public function TraerTodas($request, $response, $args) {
        $todasLasMesas = Mesa::TraerTodaLasMesas();
        $newresponse = $response->withJson($todasLasMesas, 200);  
        return $newresponse;
    } 

    public function TraerUna($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $mesaCodigo = $ArrayDeParametros["mesa_codigo"];
       $mesa = Mesa::TraerUnaMesa($mesaCodigo);
       $newresponse = $response->withJson($mesa, 200);
       return $newresponse;
    }

    public function Ocupar($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $mesaCodigo = $ArrayDeParametros["mesa_codigo"];
        $mozo = $ArrayDeParametros["mozo"];
        $pedido = $ArrayDeParametros["pedido"];
        $estado = $ArrayDeParametros["estado"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE mesa SET mozo = :mozo, pedido = :pedido, estado = :estado WHERE mesa_codigo = :codigo");
        $consulta->bindParam(':codigo',$mesaCodigo);
        $consulta->bindParam(':mozo',$mozo);
        $consulta->bindParam(':pedido',$pedido);
        $consulta->bindParam(':estado',$estado);
        $consulta->execute();

        $newresponse = $response->withJson('mesa ocupada', 200);
        return $newresponse;
    }

    public function Asignar($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $mesacodigo = $ArrayDeParametros["mesacodigo"];
        $usuario = $ArrayDeParametros["usuario"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO mesa_usuario(MesaCodigo, UsuarioCodigo) VALUES(:mesacodigo, :usuario)");
        $consulta->bindParam(':mesacodigo',$mesacodigo);
        $consulta->bindParam(':usuario',$usuario);
        $consulta->execute();

        $newresponse = $response->withJson('Usuarios cargados', 200);
        return $newresponse;
    }

    public function EnMesa($request, $response, $args)
    {
        $clientes = Mesa::clienteEnMesa();
        $newresponse = $response->withJson($clientes, 200);  
        return $newresponse;
    }

    public function ClientesDeMesa($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $mesacodigo = $ArrayDeParametros["mesacodigo"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT UsuarioCodigo FROM `mesa_usuario` WHERE MesaCodigo = :codigo");
		$consulta->bindValue(':codigo',$mesacodigo);
        $consulta->execute();		
        
        $clientes = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($clientes, 200);  
        return $newresponse;
    }

    public function TraerPedidosDeMesa($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $mesacodigo = $ArrayDeParametros["mesacodigo"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido_producto.PedidoCodigo, pedido_producto.Estado, producto.ProductoNombre, pedido_producto.PreparadorCodigo FROM mesa
        RIGHT JOIN cuenta_pedido
        ON mesa.MesaCuentaCodigo = cuenta_pedido.CuentaCodigo
        RIGHT JOIN pedido_producto
        ON cuenta_pedido.PedidoCodigo = pedido_producto.PedidoCodigo
        RIGHT JOIN producto
        ON pedido_producto.ProductoCodigo = producto.ProductoCodigo
        WHERE mesa.MesaCodigo = :codigo");
		$consulta->bindValue(':codigo',$mesacodigo);
        $consulta->execute();		
        
        $clientes = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($clientes, 200);  
        return $newresponse;
    }

    public function Desocupar($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $mesaCodigo = $ArrayDeParametros["mesa_codigo"];
        $mesa = Mesa::LiberarMesa($mesaCodigo);
        $newresponse = $response->withJson($mesa, 200);
        return $newresponse;
    }

    public function TraerEstadosPedidoDeUnaMesa($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $mesaCodigo = $ArrayDeParametros["mesa_codigo"];

        $todosLosEstados = Mesa::TraerEstadosPedidosMesa($mesaCodigo);
        $newresponse = $response->withJson($todosLosEstados, 200);

        return $newresponse;
    }

    public function TraerMesaTopUsada($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros["fechaHasta"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT COUNT(*) as Cantidad, mesa.MesaNombre, cuenta.CuentaFecha FROM cuenta 
        LEFT JOIN mesa ON mesa.MesaCodigo = cuenta.CuentaMesaCodigo
        WHERE cuenta.CuentaFecha >= :fechaDesde and cuenta.CuentaFecha <= :fechaHasta
        GROUP BY cuenta.CuentaMesaCodigo ORDER BY Cantidad DESC"); 
        $consulta->bindParam(':fechaDesde',$fechaDesde);
        $consulta->bindParam(':fechaHasta',$fechaHasta);
        $consulta->execute();	
        
        $mesas = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($mesas, 200);  
        return $newresponse;
    }

    public function TraerMesaTopFacturo($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
    
        $ArrayDeParametros = $request->getParsedBody();
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros["fechaHasta"];
           
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT SUM(cuenta.CuentaImporte) as Total, mesa.MesaNombre, cuenta.CuentaFecha FROM cuenta 
        LEFT JOIN mesa ON mesa.MesaCodigo = cuenta.CuentaMesaCodigo WHERE cuenta.CuentaEstado = 3 and
        cuenta.CuentaFecha >= :fechaDesde and cuenta.CuentaFecha <= :fechaHasta
        GROUP BY cuenta.CuentaMesaCodigo ORDER BY Total DESC"); 
        $consulta->bindParam(':fechaDesde',$fechaDesde);
        $consulta->bindParam(':fechaHasta',$fechaHasta);
        $consulta->execute();
        
        $mesas = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($mesas, 200);  
        return $newresponse;	
    }

    public function TraerMesaTopFacturaMayor($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros["fechaHasta"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT cuenta.CuentaImporte, mesa.MesaNombre, cuenta.CuentaFecha FROM cuenta 
        LEFT JOIN mesa ON mesa.MesaCodigo = cuenta.CuentaMesaCodigo WHERE cuenta.CuentaEstado = 3 
        and cuenta.CuentaFecha >= :fechaDesde and cuenta.CuentaFecha <= :fechaHasta ORDER BY cuenta.CuentaImporte DESC");
        $consulta->bindParam(':fechaDesde',$fechaDesde);
        $consulta->bindParam(':fechaHasta',$fechaHasta);
        $consulta->execute();	
        
        $mesas = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($mesas, 200);  
        return $newresponse;
    }

    public function TraerMesaTopFacturaMenor($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros["fechaHasta"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT cuenta.CuentaImporte, mesa.MesaNombre, cuenta.CuentaFecha FROM cuenta 
        LEFT JOIN mesa ON mesa.MesaCodigo = cuenta.CuentaMesaCodigo WHERE cuenta.CuentaEstado = 3 
        and cuenta.CuentaFecha >= :fechaDesde and cuenta.CuentaFecha <= :fechaHasta ORDER BY cuenta.CuentaImporte ASC");
        $consulta->bindParam(':fechaDesde',$fechaDesde);
        $consulta->bindParam(':fechaHasta',$fechaHasta);
        $consulta->execute();	
        
        $mesas = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($mesas, 200);  
        return $newresponse;
    }

    public function TraerMesaFacturo($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros["fechaHasta"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT cuenta.CuentaCodigo, mesa.MesaNombre, cuenta.CuentaImporte, cuenta.CuentaFecha FROM mesa LEFT JOIN cuenta ON mesa.MesaCodigo = cuenta.CuentaMesaCodigo 
        WHERE cuenta.CuentaEstado = 3 and cuenta.CuentaFecha >= :fechaDesde and cuenta.CuentaFecha <= :fechaHasta");        
        $consulta->bindParam(':fechaDesde',$fechaDesde);
        $consulta->bindParam(':fechaHasta',$fechaHasta);
        $consulta->execute();	

        $mesas = $consulta->fetchAll(PDO::FETCH_ASSOC);	
        $newresponse = $response->withJson($mesas, 200);  
        return $newresponse;
    }
}
?>