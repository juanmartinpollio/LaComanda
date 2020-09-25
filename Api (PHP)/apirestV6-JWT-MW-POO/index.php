<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require '../composer/vendor/autoload.php';
require_once 'clases/AccesoDatos.php';
require_once 'clases/encuestasApi.php';
require_once 'clases/UsuarioApi.php';
require_once 'clases/ServicioApi.php';
require_once 'clases/MesaApi.php';
require_once 'clases/CuentaApi.php';
require_once 'clases/AutentificadorJWT.php';
require_once 'clases/MenuProductosApi.php';
require_once 'clases/MWparaCORS.php';
require_once 'clases/PedidoApi.php';
//require_once 'clases/MWparaAutentificar.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);

//Evitar Problema con CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});
$app->add(function ($request, $response, $next) {
  try
  { 
      $response = $next($request, $response);
      return $response;
  }
  catch(Exception $e)
  {
      $resultado = new stdClass();
      $resultado->exito = false;
      $resultado->error = $e->getMessage();
      $response = $response->withJson($resultado);
      return $response->withHeader('Content-type', 'application/json');
  }
});
$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
          ->withHeader('Access-Control-Allow-Origin', '*') //La pagina donde este alojado.
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//Fin Evitar Problemas Con CORS


//LLAMADA A METODOS DE INSTANCIA DE UNA CLASE

/*$app->get('/crearToken/', function (Request $request, Response $response) {
      $datos = array('usuario' => 'rogelio@agua.com','perfil' => 'Administrador', 'alias' => "PinkBoy");
     //$datos = array('usuario' => 'rogelio@agua.com','perfil' => 'profe', 'alias' => "PinkBoy");
      
      $token= AutentificadorJWT::CrearToken($datos); 
      $newResponse = $response->withJson($token, 200); 
      return $newResponse;
});*/ 

$app->group('/tpComanda', function () {
  //Usuarios
  $this->post('/ruta', \UsuarioApi::class . ':ObtenerRuta')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  
  $this->post('/crearUsuario', \UsuarioApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/traer',\UsuarioApi::class . ':traerUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->get('/traerTodos',\UsuarioApi::class . ':traerTodos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/ModificarUsuario',\UsuarioApi::class . ':modificarUnUsuario')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/EliminarUsuario',\UsuarioApi::class . ':eliminarUnUsuario')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerPorEstado',\UsuarioApi::class . ':TraerOpPorEstado')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerPorSector',\UsuarioApi::class . ':TraerOpPorSector')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerPorLogin',\UsuarioApi::class . ':TraerOpLogin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerImagen', \UsuarioApi::class . ':TraerImagenUser')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/CambiarDatos', \UsuarioApi::class . ':CambiarUnaContrasenia')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  
  $this->post('/servicio',\ServicioApi::class . ':cargarServicio')->add(\MWparaCORS::class . ':HabilitarCORS8080');
  $this->post('/trerservicio',\ServicioApi::class . ':traerServicio')->add(\MWparaCORS::class . ':HabilitarCORS8080');
  
  $this->post('/CrearToken', \UsuarioApi::class . ':CrearToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/VerificarToken', \UsuarioApi::class . ':VerificarToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/RecuperarToken', \UsuarioApi::class . ':RecuperarToken')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

  $this->post('/traerTodosProductos', \MenuProductosApi::class . ':TraerTodos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/crearProducto', \MenuProductosApi::class . ':CargarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/eliminarProducto', \MenuProductosApi::class . ':EliminarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/traerUnProducto', \MenuProductosApi::class . ':TraerUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');    
  $this->post('/modificarProducto', \MenuProductosApi::class . ':ModificarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');   

  $this->post('/crearCuenta', \CuentaApi::class . ':CrearUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/CerrarCuenta', \CuentaApi::class . ':CerrarUno')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/PagarCuenta', \CuentaApi::class . ':PagarUna')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/CuentasPagables', \CuentaApi::class . ':TraerTodas')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/CuentaPaga', \CuentaApi::class . ':PagarUna')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerDetalleCuenta', \CuentaApi::class . ':traerUnDetalleCuenta')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

  $this->post('/traerTodasMesas', \MesaApi::class . ':TraerTodas')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerUna', \MesaApi::class . ':TraerUna')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/Ocupar', \MesaApi::class . ':Ocupar')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/Desocupar', \MesaApi::class . ':Desocupar')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/Asignar', \MesaApi::class . ':Asignar')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/EnMesa', \MesaApi::class . ':EnMesa')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/ClientesDeMesa', \MesaApi::class . ':clientesDeMesa')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/EstadosEnMesa', \MesaApi::class . ':TraerEstadosPedidoDeUnaMesa')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerTopUsada', \MesaApi::class . ':TraerMesaTopUsada')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  
  $this->post('/TraerTopFacturo', \MesaApi::class . ':TraerMesaTopFacturo')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  
  $this->post('/TraerTopFacturaMayor', \MesaApi::class . ':TraerMesaTopFacturaMayor')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  
  $this->post('/TraerTopFacturaMenor', \MesaApi::class . ':TraerMesaTopFacturaMenor')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  
  $this->post('/TraerFacturacion', \MesaApi::class . ':TraerMesaFacturo')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  
  $this->post('/TraerPedidosMesa', \MesaApi::class . ':TraerPedidosDeMesa')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  

  $this->post('/AsignarPedido', \PedidoApi::class . ':CrearPedido')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/AsignarPedidoProductos', \PedidoApi::class . ':CrearPedidoProductos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/AsignarCuentaPedido', \PedidoApi::class . ':CrearUnaCuentaPedido')->add(\MWparaCORS::class . ':HabilitarCORSTodos');  
  $this->post('/TraerPedidosProductos', \PedidoApi::class . ':TraerPedidoProductos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerPedidoPreparador', \PedidoApi::class . ':TraerPedidoPreparador')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/CambiarEstadoPedidoProducto', \PedidoApi::class . ':CambiarEstadoPedido')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/VerificarEstadoPedido', \PedidoApi::class . ':VerificarEstadoPedido')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/PedidoPorMesa', \PedidoApi::class . ':TraerMesasMasUsadas')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerMasPedido',\PedidoApi::class . ':TraerPedidoProductosMas')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerMenosPedido',\PedidoApi::class . ':TraerPedidoProductosMenos')->add(\MWparaCORS::class . ':HabilitarCORSTodos'); 
  $this->post('/TraerCancelados',\PedidoApi::class . ':TraerPedidoProductosCancelado')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  $this->post('/TraerListoPedidos', \PedidoApi::class . ':TraerPedidoListo')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
  
  $this->post('/AltaEncuesta', \encuestaApi::class . ':AltaEncu');
  $this->post('/TraerEncuestasPendientes', \encuestaApi::class . ':TraerEncuestasPendientes');
  $this->post('/TraerTodasEncuestasMejores', \encuestaApi::class . ':TraerEncuestasMejores');
  $this->post('/TraerTodasEncuestasPeores', \encuestaApi::class . ':TraerEncuestasPeores');
  $this->post('/TraerTodasEncuestasRealizadas', \encuestaApi::class . ':TraerEncuestasHechas');
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->run();