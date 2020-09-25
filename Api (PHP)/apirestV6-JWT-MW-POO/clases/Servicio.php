<?php
class Servicio
{
    public $id;
	public $nombre;
 	public $espacio;
  	public $precio;
    public $idCliente;

    public static function TraerTodosServicios($idCliente)
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("select * from serviciosweb
        WHERE idCliente = '$idCliente'");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Servicio");		
    }

    public function InsertarServicioParametros()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into serviciosweb(id,nombre,espacio,precio,idCliente)
        values(null,'$this->nombre','$this->espacio','$this->precio','$this->idCliente')");
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>