<?php
require_once 'Usuario.php';
class UsuarioApi extends Usuario 
{
    public function TraerTodos($request, $response, $args) {
        $todosLosUsuarios = Usuario::TraerTodoLosClientes();
        $newresponse = $response->withJson($todosLosUsuarios, 200);  
        return $newresponse;
    }

    public function TraerOpLogin($request, $response, $args) 
    {
        $ArrayDeParametros = $request->getParsedBody();
        
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros['fechaHasta'];

        $todosLosUsuarios = Usuario::TraerHistorialLogin($fechaDesde,$fechaHasta);
        $newresponse = $response->withJson($todosLosUsuarios, 200);  
        return $newresponse;
    }
    
    public function TraerImagenUser($request, $response, $args) 
    {
        $ArrayDeParametros = $request->getParsedBody();
        
        $usuario = $ArrayDeParametros["usuario"];

        $imagen = Usuario::TraerImagenUsuario($usuario);
        $newresponse = $response->withJson($imagen, 200);  
        return $newresponse;
    }

    public function TraerOpPorSector($request, $response, $args) 
    {
        $ArrayDeParametros = $request->getParsedBody();
        
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros['fechaHasta'];

        $todosLosUsuarios = Usuario::TraerOperacionesPorSector($fechaDesde,$fechaHasta);
        $newresponse = $response->withJson($todosLosUsuarios, 200);  
        return $newresponse;
    }

    public function TraerOpPorEstado($request, $response, $args) 
    {
        $ArrayDeParametros = $request->getParsedBody();
        
        $fechaDesde = $ArrayDeParametros["fechaDesde"];
        $fechaHasta = $ArrayDeParametros['fechaHasta'];
        
        $todosLosUsuarios = Usuario::TraerOperacionesPorEstado($fechaDesde,$fechaHasta);
        $newresponse = $response->withJson($todosLosUsuarios, 200);  
        return $newresponse;
    }

    public function CambiarUnaContrasenia($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $usuario = $ArrayDeParametros["usuario"];
        
        $miUsuario = new Usuario();
        $miUsuario->usuario = $usuario;
        if(!empty($ArrayDeParametros['contrasenia'])){
            $contrasenia = $ArrayDeParametros['contrasenia'];
            $miUsuario->contrasenia = md5($contrasenia);
        }
        $archivos = $request->getUploadedFiles();

        if(!empty($archivos))
        {
            $destino = "../tpComanda/src/assets/imagenes/";
            $archivos = $request->getUploadedFiles();
            $nombreAnterior = $archivos['imagen']->getClientFilename();
            $extension = explode(".", $nombreAnterior);
            $extension = array_reverse($extension);
            $imagen = $usuario.'.'.$extension[0];
            $archivos['imagen']->moveTo($destino.$imagen);
            $miUsuario->imagen = $imagen;
        }

        $ultimoLegajo =  $miUsuario->CambiarContrasenia();

        $objDelaRespuesta->respuesta=$ultimoLegajo;
        return $response->withJson($objDelaRespuesta, 200);
    }

    public function CargarUno($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $usuario = $ArrayDeParametros["usuario"];
        $contrasenia = $ArrayDeParametros['contrasenia'];
        $tipo = $ArrayDeParametros['tipo'];

        $archivos = $request->getUploadedFiles();

        if(!empty($archivos))
        {
            $destino = "../tpComanda/src/assets/imagenes/";
            $archivos = $request->getUploadedFiles();
            $nombreAnterior = $archivos['imagen']->getClientFilename();
            $extension = explode(".", $nombreAnterior);
            $extension = array_reverse($extension);
            $imagen = $usuario.'.'.$extension[0];//.'.'.$extension[0];//$patente.'.'.$extension[0];
            $archivos['imagen']->moveTo($destino.$imagen);
        }
        else
        {
            $imagen = 'pordefecto.jpg';
        }
        
        $miUsuario = new Usuario();
        $miUsuario->usuario = $usuario;
        $miUsuario->tipo = $tipo;
        $miUsuario->contrasenia = md5($contrasenia);
        $miUsuario->imagen = $imagen;

        $ultimoLegajo =  $miUsuario->InsertarUsuarioParametros();

        $objDelaRespuesta->respuesta=$ultimoLegajo;
        return $response->withJson($objDelaRespuesta, 200);
   }
   
   public function TraerUno($request, $response, $args) 
    {
       $objDelaRespuesta = new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $usuario = $ArrayDeParametros["usuario"];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $pass = md5($contrasenia);
       $User = Usuario::TraerUnUsuario($pass,$usuario);

       $newresponse = $response->withJson($User, 200);
       return $newresponse;
    }

    public function modificarUnUsuario($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();

       $usuario = $ArrayDeParametros['usuario'];
       $tipo = $ArrayDeParametros['tipo'];
       $estado = $ArrayDeParametros['estado'];

       $miUsuario = new Usuario();
       $miUsuario->usuario = $usuario;
       $miUsuario->tipo = $tipo;
       $miUsuario->estado = $estado;

       $archivos = $request->getUploadedFiles();
       if(!empty($archivos)){
           $destino="../tpComanda/src/assets/imagenes/";
           $nombreAnterior=$archivos['imagen']->getClientFilename();
           $extension= explode(".", $nombreAnterior);
           $extension=array_reverse($extension);
           $imagen = $usuario.'.'.$extension[0];//.'.'.$extension[0];//$patente.'.'.$extension[0];
           $archivos['imagen']->moveTo($destino.$imagen);
           $miUsuario->imagen = $imagen;
       }

       $respuesta = $miUsuario->ModificarUsuario();

       $newresponse = $response->withJson($respuesta, 200);
       return $newresponse;
    }

    public function eliminarUnUsuario($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();

       $usuario = $ArrayDeParametros["usuario"];
       $estado = $ArrayDeParametros['estado'];

       $respuesta = Usuario::EliminarUsuario($usuario,$estado);
       
       $newresponse = $response->withJson($respuesta, 200);
       return $newresponse;
    }

   public function CargarFoto($request, $response, $args)
   {    
        $objDelaRespuesta= new stdclass();
        $destino="./fotos/";
        
        $ArrayDeParametros = $request->getParsedBody();
        $archivos = $request->getUploadedFiles();
        $usuarioAnterior=$archivos['foto']->getClientFilename();
        $extension= explode(".", $usuarioAnterior)  ;
        $extension=array_reverse($extension);

        $archivos['foto']->moveTo($destino.$usuarioAnterior);
        
        //$objDelaRespuesta->respuesta=$destino.$usuarioAnterior;
        $objDelaRespuesta->respuesta = $archivos;
        return $response->withJson($objDelaRespuesta, 200);
   }

   public function CrearToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token= AutentificadorJWT::CrearToken($ArrayDeParametros); 
        $objDelaRespuesta->respuesta = $token;
        return $response->withJson($objDelaRespuesta, 200);
   }

   public function VerificarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        try 
        {
            //$token="";
            AutentificadorJWT::verificarToken($token);
            $objDelaRespuesta->esValido=true;
            $objDelaRespuesta->respuesta = "Token valido";      
        }
        catch (Exception $e) {      
            //guardar en un log
            $objDelaRespuesta->respuesta=$e->getMessage();
            $objDelaRespuesta->esValido=false;     
        }
        return $response->withJson($objDelaRespuesta, 200);
   }

   public function RecuperarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        $data = AutentificadorJWT::ObtenerData($token);
        $objDelaRespuesta->respuesta = $data;
        return $response->withJson($objDelaRespuesta, 200);
   }
}
?>