<?php

require_once 'MenuProductos.php';

class MenuProductosApi extends Producto
{
    public function TraerTodos($request, $response, $args) 
    {
        $todosLosProductos = Producto::TraerTodosLosProductos();
        $newresponse = $response->withJson($todosLosProductos, 200);  
        return $newresponse;
    }

    public function CargarUno($request, $response, $args) {
       
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $nombre = $ArrayDeParametros["nombre"];
        $tipo = $ArrayDeParametros['tipo'];
        $habilitado = $ArrayDeParametros['habilitado'];
        $importe = $ArrayDeParametros['importe'];
        
        $archivos = $request->getUploadedFiles();
 
         if(!empty($archivos)){
        $destino="../tpComanda/src/assets/imagenes/";
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['imagen']->getClientFilename();
        $extension= explode(".", $nombreAnterior);
        $extension=array_reverse($extension);
        $imagen = $nombre.'.'.$extension[0];
        $archivos['imagen']->moveTo($destino.$imagen);
         }
         else{
             $imagen = 'pordefecto.jpg';
         }
 
        $miProducto = new Producto();
        $miProducto->productoNombre = $nombre;      
        $miProducto->productoTipo = $tipo;
        $miProducto->productoHabilitado = $habilitado;
        $miProducto->productoImporte = $importe;
        $miProducto->productoImagen = $imagen;
 
        $ultimoProducto = $miProducto->CrearProducto();
 
        $objDelaRespuesta->respuesta = $ultimoProducto;
        return $response->withJson($objDelaRespuesta, 200);
   }

    public function EliminarUno($request, $response, $args)
    {

        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $codigo = $ArrayDeParametros["codigo"];

        $respuesta = Producto::EliminarProducto($codigo);
        
        $newresponse = $response->withJson($respuesta, 200);

        return $newresponse;
    }

    public function TraerUno($request, $response, $args) 
    {
       $objDelaRespuesta = new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $productoCodigo = $ArrayDeParametros["codigo"];;
       $Producto = Producto::TraerUnProducto($productoCodigo);

       $newresponse = $response->withJson($Producto, 200);

       return $newresponse;
    }

    public function ModificarUno($request, $response, $args) 
    {
        $objDelaRespuesta = new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $codigo = $ArrayDeParametros["codigo"];
        $nombre = $ArrayDeParametros["nombre"];
        $tipo = $ArrayDeParametros['tipo'];
        $habilitado = $ArrayDeParametros['habilitado'];
        $importe = $ArrayDeParametros['importe'];

        $miProducto = new Producto();
        $miProducto->productoNombre = $nombre;      
        $miProducto->productoTipo = $tipo;
        $miProducto->productoHabilitado = $habilitado;
        $miProducto->productoImporte = $importe;
        $miProducto->productoCodigo = $codigo;

        $archivos = $request->getUploadedFiles();

        if(!empty($archivos)){
            $destino="../tpComanda/src/assets/imagenes/";
            $archivos = $request->getUploadedFiles();
            $nombreAnterior=$archivos['imagen']->getClientFilename();
            $extension= explode(".", $nombreAnterior);
            $extension=array_reverse($extension);
            $imagen = $nombre.'.'.$extension[0];
            $archivos['imagen']->moveTo($destino.$imagen);
            $miProducto->productoImagen = $imagen;
        }
       
        $respuesta = $miProducto->ModificarProducto();

        $newresponse = $response->withJson($respuesta, 200);

        return $newresponse;
    }    
}
?>