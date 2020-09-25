<?php
require_once 'Servicio.php';
class ServicioApi extends Servicio 
{
    public function traerServicio($request, $response, $args) {
        $ArrayDeParametros = $request->getParsedBody();
        $idCliente = $ArrayDeParametros["idCliente"];
        $todosLosServicios=Servicio::TraerTodosServicios($idCliente);
        $newresponse = $response->withJson($todosLosServicios, 200);  
        return $newresponse;
    }
    public function cargarServicio($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $idCliente = $ArrayDeParametros["idCliente"];
       $espacio = $ArrayDeParametros['espacio'];
       $nombre = $ArrayDeParametros['nombre'];
       
       $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
       $consulta =$objetoAccesoDato->RetornarConsulta("select  COUNT(*)as cant from serviciosweb
       WHERE idCliente = '$idCliente'");
       $consulta->execute();			
       $cant = $consulta->fetchAll(PDO::FETCH_CLASS, "Servicio");
       $cant = $cant[0]->cant;
       if($cant == 0)
       {
            $miServicio = new Servicio();
            $miServicio->nombre=$nombre;
            $miServicio->idCliente=$idCliente;
            $miServicio->espacio=$espacio;
            $miServicio->precio = 0;
       }
       else{
            $miServicio = new Servicio();
            $miServicio->nombre=$nombre;
            $miServicio->idCliente=$idCliente;
            $miServicio->espacio=$espacio;
            $miServicio->precio = 300;
       }
       
       $ultimoLegajo =  $miServicio->InsertarServicioParametros();

       $objDelaRespuesta->respuesta=$cant;
       //$objDelaRespuesta->respuesta=$miUsuario;
       return $response->withJson($objDelaRespuesta, 200);
   }
}
?>