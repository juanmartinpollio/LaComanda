<?php

  require_once "AccesoDatos.php";

  class encuesta{

   public  $cod_cuenta;
   public  $val_mozo;
   public  $val_mesa;
   public  $val_rest;
   public  $val_cocin;
   public  $val_coment;
   public  $val_cerve;
   public  $val_barten;
   public  $val_precal;

  public function altaEncuesta()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `encuesta`(`EncuestaCuentaCodigo`,
        `EncuestaValMesa`, `EncuestaValMozo`, `EncuestaValRest`, `EncuestaValEmp`, `EncuestaValBartender`, `EncuestaValCerve`, `EncuestaValPrecioCalidad`, `EncuestaValComentario`) 
        VALUES (:codigoCuenta,:valMozo,:valMesa,:valRest,:valCocin,:valBar,:valCerve,:valPrecal,:valComent)");
        $consulta->bindValue(':codigoCuenta', $this->cod_cuenta);
        $consulta->bindValue(':valMozo', $this->val_mozo);
        $consulta->bindValue(':valMesa', $this->val_mesa);
        $consulta->bindValue(':valRest', $this->val_rest);
        $consulta->bindValue(':valCocin', $this->val_cocin);
        $consulta->bindValue(':valBar', $this->val_barten);
        $consulta->bindValue(':valCerve', $this->val_cerve);
        $consulta->bindValue(':valPrecal', $this->val_precal);
        $consulta->bindValue(':valComent', $this->val_coment);
        $respuesta = $consulta->execute();
        return $respuesta;         
    }
   
    public function traerTodasEncuestasPendientes($clienteCodigo)
    {
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta = $objetoAccesoDato->RetornarConsulta("SELECT pedido.PedidoCodigo, pedido.PedidoClienteCodigo, cuenta_pedido.CuentaCodigo FROM pedido 
      INNER JOIN cuenta_pedido ON(pedido.PedidoCodigo = cuenta_pedido.PedidoCodigo) 
      WHERE pedido.PedidoClienteCodigo = :clienteCodigo and cuenta_pedido.CuentaCodigo 
      NOT IN(SELECT encuesta.EncuestaCuentaCodigo FROM encuesta)");
      $consulta->bindValue(':clienteCodigo', $clienteCodigo);
      $consulta->execute();			
		  return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function traerTodasEncuestasRealizadas($clienteCodigo)
    {
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM encuesta WHERE encuesta.EncuestaCuentaCodigo IN 
      (SELECT cuenta.CuentaCodigo FROM cuenta WHERE cuenta.CuentaCodigo IN 
      (SELECT cuenta_pedido.CuentaCodigo FROM cuenta_pedido WHERE cuenta_pedido.PedidoCodigo IN 
      (SELECT pedido.PedidoCodigo FROM pedido WHERE pedido.PedidoClienteCodigo = :clienteCodigo)));");
      $consulta->bindValue(':clienteCodigo', $clienteCodigo);
      $consulta->execute();			
		  return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

  public function traerTodasEncuestasMejores($fechaDesde,$fechaHasta)
  {
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("SELECT *, (`EncuestaValMozo` + `EncuestaValMesa` + `EncuestaValRest` + `EncuestaValEmp` + `EncuestaValBartender` + `EncuestaValCerve` + `EncuestaValPrecioCalidad`) / 7 as promedio FROM `encuesta` 
    WHERE EncuestaFecha >= :fechaDesde and EncuestaFecha <= :fechaHasta ORDER BY promedio DESC");
    $consulta->bindValue(':fechaDesde', $fechaDesde);
    $consulta->bindValue(':fechaHasta', $fechaHasta);
    $consulta->execute();			
    return $consulta->fetchAll(PDO::FETCH_ASSOC);
  }

  
  public function traerTodasEncuestasPeores($fechaDesde,$fechaHasta)
  {
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta = $objetoAccesoDato->RetornarConsulta("SELECT *, (`EncuestaValMozo` + `EncuestaValMesa` + `EncuestaValRest` + `EncuestaValEmp` + `EncuestaValBartender` + `EncuestaValCerve` + `EncuestaValPrecioCalidad`) / 7 as promedio FROM `encuesta` 
    WHERE EncuestaFecha >= :fechaDesde and EncuestaFecha <= :fechaHasta ORDER BY promedio ASC");
    $consulta->bindValue(':fechaDesde', $fechaDesde);
    $consulta->bindValue(':fechaHasta', $fechaHasta);
    $consulta->execute();			
    return $consulta->fetchAll(PDO::FETCH_ASSOC);
  }    
}


?>