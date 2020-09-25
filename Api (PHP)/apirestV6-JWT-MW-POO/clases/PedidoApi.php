<?php
require_once 'Pedido.php';

Class PedidoApi extends Pedido
{
   public function TraerPedido($request, $response, $args) 
   {
      $objDelaRespuesta = new stdclass();
      
      $ArrayDeParametros = $request->getParsedBody();
      $PedidoCodigo = $ArrayDeParametros['PedidoCodigo'];
      $MesaCodigo = $ArrayDeParametros['MesaCodigo'];
      $Pedido = Pedido::TraerUnPedido($PedidoCodigo,$MesaCodigo);

      $newresponse = $response->withJson($Pedido, 200);
      return $newresponse;
   }

   public function TraerPedidoProductos($request, $response, $args) 
   {
      $objDelaRespuesta = new stdclass();
      
      $ArrayDeParametros = $request->getParsedBody();
      $ClienteCodigo = $ArrayDeParametros['ClienteCodigo'];
      $PedidoProductos = Pedido::TraerPedidoProductosTodos($ClienteCodigo);

      $newresponse = $response->withJson($PedidoProductos, 200);
      return $newresponse;
   }

   public function TraerPedidoProductosMas($request, $response, $args) 
   {
      $objDelaRespuesta = new stdclass();
      
      $ArrayDeParametros = $request->getParsedBody();
      $fechaDesde = $ArrayDeParametros['fechaDesde'];
      $fechaHasta = $ArrayDeParametros['fechaHasta'];
      $PedidoProductos = Pedido::TraerTodosMasPedidos($fechaDesde,$fechaHasta);

      $newresponse = $response->withJson($PedidoProductos, 200);
      return $newresponse;
   }

   public function TraerPedidoProductosMenos($request, $response, $args) 
   {
      $objDelaRespuesta = new stdclass();
      
      $ArrayDeParametros = $request->getParsedBody();
      $fechaDesde = $ArrayDeParametros['fechaDesde'];
      $fechaHasta = $ArrayDeParametros['fechaHasta'];
      $PedidoProductos = Pedido::TraerTodosMenosPedidos($fechaDesde,$fechaHasta);

      $newresponse = $response->withJson($PedidoProductos, 200);
      return $newresponse;
   }

   public function TraerPedidoProductosCancelado($request, $response, $args) 
   {
      $objDelaRespuesta = new stdclass();
      
      $ArrayDeParametros = $request->getParsedBody();
      $fechaDesde = $ArrayDeParametros['fechaDesde'];
      $fechaHasta = $ArrayDeParametros['fechaHasta'];
      $PedidoProductos = Pedido::TraerTodosPedidosCancelados($fechaDesde,$fechaHasta);

      $newresponse = $response->withJson($PedidoProductos, 200);
      return $newresponse;
   }

   Public function CrearPedido($request, $response, $args)
   {
        $objDelaRespuesta = new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $PedidoCodigo = $ArrayDeParametros['PedidoCodigo'];
        $MesaCodigo = $ArrayDeParametros['MesaCodigo'];
        $ClienteCodigo = $ArrayDeParametros['ClienteCodigo'];
        $MozoCodigo = $ArrayDeParametros['MozoCodigo'];

        $archivos = $request->getUploadedFiles();

        if(!empty($archivos)){
        $destino="../tpComanda/src/assets/imagenes/";
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['imagen']->getClientFilename();
        $extension= explode(".", $nombreAnterior);
        $extension=array_reverse($extension);
        $imagen = $PedidoCodigo.'.'.$extension[0];//.'.'.$extension[0];//$patente.'.'.$extension[0];
        $archivos['imagen']->moveTo($destino.$imagen);
        }
        else{
        $imagen = 'pordefecto.jpg';
        }
        
        $miPedido = new Pedido();
        $miPedido->PedidoCodigo = $PedidoCodigo;
        $miPedido->PedidoMesaCodigo = $MesaCodigo;
        $miPedido->PedidoClienteCodigo = $ClienteCodigo;
        $miPedido->PedidoMozoCodigo = $MozoCodigo;
        $miPedido->PedidoEstado = 1;
        $miPedido->PedidoImagen = '/assets/imagenes/'.$imagen;

        $ultimoPedido = $miPedido->CrearUnPedido();

        $objDelaRespuesta->respuesta = $ultimoPedido;
        return $response->withJson($objDelaRespuesta, 200);
   }

   Public function CrearUnaCuentaPedido($request, $response, $args)
   {
      $objDelaRespuesta = new stdclass();
      
      $ArrayDeParametros = $request->getParsedBody();
      $CuentaCodigo = $ArrayDeParametros['CuentaCodigo'];
      $PedidoCodigo = $ArrayDeParametros['PedidoCodigo'];
      
      $miPedido = new Pedido();
      $miPedido->PedidoCodigo = $PedidoCodigo;
      $miPedido->MesaCuentaCodigo = $CuentaCodigo;

      $ultimoPedido = $miPedido->CrearCuentaPedido();

      $objDelaRespuesta->respuesta = $ultimoPedido;
      return $response->withJson($objDelaRespuesta, 200);
   }

   Public function CrearPedidoProductos($request, $response, $args)
   {
      $objDelaRespuesta = new stdclass();

      $ArrayDeParametros = $request->getParsedBody();
      $PedidoCodigo = $ArrayDeParametros['PedidoCodigo'];
      $ProductoCodigo = $ArrayDeParametros['ProductoCodigo'];

      $miPedido = new Pedido();
      $miPedido->PedidoCodigo = $PedidoCodigo;
      $miPedido->ProductoCodigo = $ProductoCodigo;
      $miPedido->PedidoEstado = 1;

      $ultimoPedido = $miPedido->crearPedidosProductos();

      $objDelaRespuesta->respuesta = $ultimoPedido;
      return $response->withJson($objDelaRespuesta, 200);
   }

   Public function TraerPedidoPreparador($request, $response, $args)
   {
      $objDelaRespuesta = new stdclass();

      $ArrayDeParametros = $request->getParsedBody();
      $CodigoUsuario = $ArrayDeParametros['CodigoUsuario'];
      $TipoProducto = $ArrayDeParametros['TipoProducto'];

      $Pedido = Pedido::TraerTodosPedidosPreparador($CodigoUsuario,$TipoProducto);

      $newresponse = $response->withJson($Pedido, 200);
      return $newresponse;
   }

   Public function TraerPedidoListo($request, $response, $args)
   {
      $objDelaRespuesta = new stdclass();

      $ArrayDeParametros = $request->getParsedBody();

      $Pedido = Pedido::TraerTodosPedidosListos();

      $newresponse = $response->withJson($Pedido, 200);
      return $newresponse;
   }

   Public function CambiarEstadoPedido($request, $response, $args)
   {
      $objDelaRespuesta= new stdclass();
      $ArrayDeParametros = $request->getParsedBody();
      $pedidoProductoCodigo = $ArrayDeParametros["pedidoProductoCodigo"];
      $pedidoProductoEstado = $ArrayDeParametros["pedidoProductoEstado"];
      $pedidoProductoTiempo = $ArrayDeParametros["pedidoProductoTiempo"];
      $PreparadorCodigo = $ArrayDeParametros["PreparadorCodigo"];
      
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
      if ($pedidoProductoEstado == 2) {
         $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido_producto SET estado = :pedidoProductoEstado, 	PedidoProductoTiempo = :pedidoProductoTiempo, PreparadorCodigo = :PreparadorCodigo WHERE PedidoProductoCodigo = :pedidoProductoCodigo");
         $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);
         $consulta->bindParam(':pedidoProductoEstado',$pedidoProductoEstado);
         $consulta->bindParam(':pedidoProductoTiempo',$pedidoProductoTiempo);
         $consulta->bindParam(':PreparadorCodigo',$PreparadorCodigo);
         $consulta->execute();
         
         $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET PedidoEstado = 2 WHERE pedido.PedidoCodigo IN (SELECT pedido_producto.PedidoCodigo FROM pedido_producto WHERE pedido_producto.PedidoProductoCodigo = :pedidoProductoCodigo)");
         $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);
         $consulta->execute();
      }
      else {
        if ($pedidoProductoEstado == 4)
        {
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido_producto SET estado = :pedidoProductoEstado WHERE PedidoProductoCodigo = :pedidoProductoCodigo");
            $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);
            $consulta->bindParam(':pedidoProductoEstado',$pedidoProductoEstado);
            $respuesta = $consulta->execute();

            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE mesa SET MesaEstado = 4 WHERE mesa.MesaCodigo 
            IN (SELECT pedido.PedidoMesaCodigo FROM pedido WHERE pedido.PedidoCodigo 
            IN (SELECT pedido_producto.PedidoCodigo FROM pedido_producto WHERE pedido_producto.PedidoProductoCodigo = :pedidoProductoCodigo))");
            $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);
            $respuesta = $consulta->execute();

            $PedidoProductos = Pedido::TraerEstadoPedido($pedidoProductoCodigo);
            
            if ($PedidoProductos[0]["cantidad"] == 0)
            {
                $PedidoProductos = Pedido::ActualizarEstadoPedidoGeneral($pedidoProductoCodigo);
                $newresponse = $response->withJson($PedidoProductos, 200);
                return $newresponse;
            }
            else
            {
                $newresponse = $response->withJson($PedidoProductos, 200);
                return $newresponse;
            }      
        }
        else
        {
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido_producto SET estado = :pedidoProductoEstado WHERE PedidoProductoCodigo = :pedidoProductoCodigo");
            $consulta->bindParam(':pedidoProductoCodigo',$pedidoProductoCodigo);
            $consulta->bindParam(':pedidoProductoEstado',$pedidoProductoEstado);
            $consulta->execute();
        }
      }      

      $newresponse = $response->withJson('Estado cambiado', 200);
      return $newresponse;
   }

   Public function VerificarEstadoPedido($request, $response, $args)
   {
        $objDelaRespuesta = new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $pedidoProductoCodigo = $ArrayDeParametros["pedidoProductoCodigo"];
        $PedidoProductos = Pedido::TraerEstadoPedido($pedidoProductoCodigo);
        
        if ($PedidoProductos[0]["cantidad"] == 0)
        {
            $PedidoProductos = Pedido::ActualizarEstadoPedidoGeneral($pedidoProductoCodigo);
            $newresponse = $response->withJson($PedidoProductos, 200);
            return $newresponse;
        }
        else
        {
            $newresponse = $response->withJson($PedidoProductos, 200);
            return $newresponse;
        }        
    }

    public function TraerMesasMasUsadas($request, $response, $args)
    {
        $objDelaRespuesta = new stdclass();
        $PedidoProductos = Pedido::traerMasUsadas();
        $newresponse = $response->withJson($PedidoProductos, 200);
        return $newresponse;
    }
}
?>