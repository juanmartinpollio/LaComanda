<?php


require_once "encuestas.php";

class encuestaApi extends encuesta{

    public function AltaEncu($request, $response, $args) 
     {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);            
         
         $encuesta = new encuesta();
         $encuesta->cod_cuenta= $ArrayDeParametros['cod_cuenta'];
         $encuesta->val_mesa= $ArrayDeParametros['val_mesa'];
         $encuesta->val_mozo= $ArrayDeParametros['val_mozo'];
         $encuesta->val_rest= $ArrayDeParametros['val_rest'];
         $encuesta->val_cocin= $ArrayDeParametros['val_cocin'];
         $encuesta->val_cerve= $ArrayDeParametros['val_cerve'];
         $encuesta->val_barten= $ArrayDeParametros['val_barten'];
         $encuesta->val_precal= $ArrayDeParametros['val_precal'];
         $encuesta->val_coment= $ArrayDeParametros['val_coment'];
                 
         $objDelaRespuesta->respuesta= $encuesta->altaEncuesta();     
            
         return $response->withJson($objDelaRespuesta, 200);
     } 
    
    public function TraerEncuestasPendientes($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody(); 
        $clienteCodigo = $ArrayDeParametros['clienteCodigo'];
        $CuentasPagables = encuesta::traerTodasEncuestasPendientes($clienteCodigo);
        $newresponse = $response->withJson($CuentasPagables, 200);  
        return $newresponse;
    }

    public function TraerEncuestasHechas($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody(); 
        $clienteCodigo = $ArrayDeParametros['clienteCodigo'];
        $CuentasPagables = encuesta::traerTodasEncuestasRealizadas($clienteCodigo);
        $newresponse = $response->withJson($CuentasPagables, 200);  
        return $newresponse;
    }

    public function TraerEncuestasPeores($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody(); 
        $fechaDesde = $ArrayDeParametros['fechaDesde'];
        $fechaHasta = $ArrayDeParametros['fechaHasta'];
        $encuestasPeores = encuesta::traerTodasEncuestasPeores($fechaDesde,$fechaHasta);
        $newresponse = $response->withJson($encuestasPeores, 200);  
        return $newresponse;
    }

    public function TraerEncuestasMejores($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $fechaDesde = $ArrayDeParametros['fechaDesde'];
        $fechaHasta = $ArrayDeParametros['fechaHasta'];
        $encuestasMejores = encuesta::traerTodasEncuestasMejores($fechaDesde,$fechaHasta);
        $newresponse = $response->withJson($encuestasMejores, 200);  
        return $newresponse;
    }
}

?>