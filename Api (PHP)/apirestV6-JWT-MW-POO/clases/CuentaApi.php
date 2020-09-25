<?php

require_once 'Cuenta.php';

class CuentaApi extends Cuenta
{
    public function CrearUno($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $mesacodigo = $ArrayDeParametros['mesacodigo'];
        
        $miCuenta = new Cuenta();
        $miCuenta->CuentaMesaCodigo = $mesacodigo;
 
        $ultimoCuenta = $miCuenta->CrearCuenta();
 
        $objDelaRespuesta->respuesta = $ultimoCuenta;
        return $response->withJson($objDelaRespuesta, 200);
    }

    public function CerrarUno($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $mesacodigo = $ArrayDeParametros['mesacodigo'];
        $cuentacodigo = $ArrayDeParametros['cuentacodigo'];
        
        $miCuenta = new Cuenta();
        $miCuenta->CuentaMesaCodigo = $mesacodigo;
        $miCuenta->CuentaCodigo = $cuentacodigo;
 
        $ultimoCuenta = $miCuenta->CerrarCuenta();
 
        $objDelaRespuesta->respuesta = $ultimoCuenta;
        return $response->withJson($objDelaRespuesta, 200);
    }

    public function traerUnDetalleCuenta($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $cuentacodigo = $ArrayDeParametros['cuentacodigo'];
        
        $miCuenta = new Cuenta();
        $miCuenta->CuentaCodigo = $cuentacodigo;
 
        $detalles = $miCuenta->TraerDetalleCuenta();
 
        $objDelaRespuesta->respuesta = $detalles;
        return $response->withJson($objDelaRespuesta, 200);
    }

    public function PagarUna($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $cuentacodigo = $ArrayDeParametros['cuentacodigo'];
        $cuentamesa = $ArrayDeParametros['cuentamesa'];
        
        $miCuenta = new Cuenta();
        $miCuenta->CuentaCodigo = $cuentacodigo;
        $miCuenta->CuentaMesaCodigo = $cuentamesa;
 
        $ultimoCuenta = $miCuenta->PagarCuenta();
 
        return $response->withJson($ultimoCuenta, 200);
    }

    public function TraerTodas($request, $response, $args) {
        $CuentasPagables = Cuenta::TraerCuentasPagar();
        $newresponse = $response->withJson($CuentasPagables, 200);  
        return $newresponse;
    }
}
