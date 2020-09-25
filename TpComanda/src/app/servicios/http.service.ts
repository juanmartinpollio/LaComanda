import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUsuario } from 'src/app/interfaces/usuario';
import { Usuario } from 'src/app/clases/usuario';
import { Producto } from 'src/app/clases/producto';
import { IProducto } from 'src/app/interfaces/producto';
import { IMesa } from 'src/app/interfaces/mesa';
import { IPedidoProducto } from "src/app/interfaces/pedidoproducto";
import { IPedidoPreparador } from '../interfaces/pedidopreparador';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URl = "http://gustavorotela.xyz/apirestV6-JWT-MW-POO/tpComanda/";
  constructor(public http: HttpClient) { }

  //FUNCIONES PARA ERROR

  extraerDatos(respuesta) {
    return respuesta || {};
  }

  manejadorError(error: Response | any) {
    //return error;
    console.error(error.message || error);
    return error.message || error;
  }

  //END FUNCIONES PARA ERROR

  //TOKEN

  crearToken(url: string, datos: any) {
    const formData = new FormData()
    formData.append('usuario', datos.usuario);
    formData.append('tipo', datos.tipo);
    formData.append('contrasenia', datos.contrasenia);
    //aca tiene que ir uno que me traiga el tipo de usuario
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  verificarToken(token: any, url: string) {
    const formData = new FormData()
    formData.append('Token', token);

    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  recuperarToken(token: any) {
    const formData = new FormData()
    formData.append('Token', token);

    var url = "RecuperarToken";
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  //END TOKEN

  //USUARIOS

  agregarUsuario(unUsuario : any, imagen) {
    const formData = new FormData()
    formData.append('usuario', unUsuario.usuario);
    formData.append('tipo', unUsuario.tipo);
    formData.append('contrasenia', unUsuario.contrasenia);
    formData.append('imagen', imagen);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "crearUsuario"
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  buscarUsuario(url: string, usuario : any) {
    const formData = new FormData()
    formData.append('contrasenia', usuario.contrasenia);
    formData.append('usuario', usuario.usuario);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  buscarImagenUsuario(usuario : any) {
    const formData = new FormData()
    formData.append('usuario', usuario);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let url = 'TraerImagen';
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  
  cambiarContrasenia(unUsuario : any, imagen) {
    const formData = new FormData()
    formData.append('usuario', unUsuario.usuario);
    formData.append('contrasenia', unUsuario.contrasenia);
    formData.append('imagen', imagen);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "CambiarDatos"
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  modificarUsuario(unUsuario : any, imagen)
  {
    const formData = new FormData()
    formData.append('usuario',unUsuario.usuario);
    formData.append('tipo', unUsuario.tipo);
    formData.append('estado', unUsuario.estado);
    formData.append('imagen', imagen);
    
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "ModificarUsuario";
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  buscarTodosUsuarios(url: string) {
    const formData = new FormData()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<IUsuario[]>(this.URl + url, { headers: header });
  }

  buscarTodosPorSector(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  } 

  buscarTodosPorEstado(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  buscarTodosPorLogin(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }
  
  //END USUARIOS

  //PRODUCTOS

  buscarTodosProductos(url: string) {
    const formData = new FormData()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "traerTodosProductos"
    return this.http.post<IProducto[]>(this.URl + url, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  eliminarProducto(url: string, productoCodigo) {
    const formData = new FormData()
    formData.append('codigo', productoCodigo);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "eliminarProducto"
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  traerUnProducto(url: string, productoCodigo) {
    const formData = new FormData()
    formData.append('codigo', productoCodigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  agregarProducto(unProducto : any, imagenParaSubir) {
    const formData = new FormData()
    formData.append('nombre', unProducto.nombre);
    formData.append('tipo', unProducto.tipo);
    formData.append('habilitado', unProducto.habilitado);
    formData.append('importe', unProducto.importe);
    formData.append('imagen', imagenParaSubir);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "crearProducto"
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  modificarProducto(unProducto : any, imagenParaSubir) {
    const formData = new FormData()
    formData.append('codigo',unProducto.codigo);
    formData.append('nombre', unProducto.nombre);
    formData.append('tipo', unProducto.tipo);
    formData.append('habilitado', unProducto.habilitado);
    formData.append('importe', unProducto.importe);
    formData.append('imagen', imagenParaSubir);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "modificarProducto"
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  //END PRODUCTOS

  //CUENTA
  
  crearCuenta(mesa_codigo : any)
  {
    const formData = new FormData();
    formData.append('mesacodigo', mesa_codigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    var url = "crearCuenta"
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  cerrarCuenta(url ,mesacodigo,cuentacodigo)
  {
    const formData = new FormData()
    formData.append('mesacodigo', mesacodigo);
    formData.append('cuentacodigo', cuentacodigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  traerCuentasPagables()
  {
    let url = 'CuentasPagables'

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post(this.URl + url, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  cuentaPaga(url, cuentaCodigo, cuentaMesaCodigo)
  {
    const formData = new FormData()
    formData.append('cuentacodigo', cuentaCodigo);
    formData.append('cuentamesa', cuentaMesaCodigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  traerDetallesCuenta(CuentaCodigo)
  {
    const formData = new FormData()
    formData.append('cuentacodigo', CuentaCodigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let url = "TraerDetalleCuenta";
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  //END CUENTA

   //MESAS

   buscarMesa(url: string, mesa_codigo: any) {
    const formData = new FormData()
    formData.append('mesa', mesa_codigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  buscarTodasMesas(url: string) {
    const formData = new FormData()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json')
    return this.http.post<IMesa[]>(this.URl + url, { headers: header });
  }

  ClientesEnMesas(url : string) {
    
    const formData = new FormData()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post<string[]>(this.URl + url, formData, { headers: header });
  }

  ocuparMesa(url: string, $mesaCodigo: string, $mozo: string, $pedido: string, $estado: number) {
    const formData = new FormData()
    formData.append('mesa_codigo', $mesaCodigo);
    formData.append('mozo', "nata");
    formData.append('pedido', $pedido);
    formData.append('estado', $estado + "");

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  liberarMesa(url: string, mesaCodigo: string) {
    const formData = new FormData()
    formData.append('mesa_codigo', mesaCodigo);

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  asignarClientes(url: string, codigomesa: string, usuario: any) {
    let texto: any;
    for (let i = 0; i < usuario.length; i++) {
      const formData = new FormData()
      formData.append('mesacodigo', codigomesa);
      formData.append('usuario', usuario[i]);
      let header = new HttpHeaders();
      header.append('Content-Type', 'application/json');
      texto = this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
    }
    return texto;
  }

  ClientesDeMesa(mesacodigo) {
    let url = 'ClientesDeMesa';

    const formData = new FormData()
    formData.append('mesacodigo',mesacodigo);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post<string[]>(this.URl + url, formData, { headers: header });
  }
  
  TraerPedidosDeMesa(mesacodigo) {
    let url = 'TraerPedidosMesa';

    const formData = new FormData()
    formData.append('mesacodigo',mesacodigo);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post<string[]>(this.URl + url, formData, { headers: header });
  }

  TraerEstadosDeLaMesa(mesacodigo) {
    let url = 'EstadosEnMesa';

    const formData = new FormData()
    formData.append('mesa_codigo',mesacodigo);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post<string[]>(this.URl + url, formData, { headers: header });
  }

  traerMesaTopUsada(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  traerMesaTopFacturo(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  traerMesaTopFacturaMayor(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  traerMesaTopFacturaMenor(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  traerMesaFacturacion(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  //END MESAS 

  //PEDIDOS
  
  BuscarPedido(pedidoCodigo) {
    let url = 'buscarpedido';

    const formData = new FormData()
    formData.append('pedidoCodigo',pedidoCodigo);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    return this.http.post<string[]>(this.URl + url, formData, { headers: header });
  }

  traerTodosPedidosPreparador(url : string, codigoUsuario : any, tipoProducto : any)
  {
    const formData = new FormData()
    formData.append('CodigoUsuario', codigoUsuario);
    formData.append('TipoProducto', tipoProducto);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    this.http.post<IPedidoPreparador[]>(this.URl + url, formData, { headers: header })
    return this.http.post<IPedidoPreparador[]>(this.URl + url, formData, { headers: header });
  }

  traerTodosPedidosListos(url : string)
  {
    const formData = new FormData()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    this.http.post<IPedidoPreparador[]>(this.URl + url, formData, { headers: header })
    return this.http.post<IPedidoPreparador[]>(this.URl + url, formData, { headers: header });
  }

  crearPedido(url: string, pedido: any) {
    let texto: any;
    const formData = new FormData()
    formData.append('PedidoCodigo', pedido.PedidoCodigo);
    formData.append('MesaCodigo', pedido.PedidoMesaCodigo);
    formData.append('ClienteCodigo', pedido.PedidoClienteCodigo);
    formData.append('MozoCodigo', pedido.PedidoMozoCodigo);
    console.log(formData.getAll);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    texto = this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
    return texto;
  }

  crearPedidoProductos(url: string, pedido: any, codigopedido : any) {
    let texto: any;
    for (let i = 0; i < pedido.length; i++) {
      const formData = new FormData()
      formData.append('PedidoCodigo', codigopedido);
      formData.append('ProductoCodigo', pedido[i].codigo);
      let header = new HttpHeaders();
      header.append('Content-Type', 'application/json');
      texto = this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
    }
    return texto;
  }

  crearCuentaPedido(url: string, cuentacodigo: any, codigopedido : any) {
    let texto: any;
    const formData = new FormData()
    formData.append('PedidoCodigo', codigopedido);
    formData.append('CuentaCodigo', cuentacodigo);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    texto = this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
    return texto;
  }

  traerTodosPedidos(url : string, codigocliente : any)
  {
    const formData = new FormData()
    formData.append('ClienteCodigo', codigocliente);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<IPedidoProducto[]>(this.URl + url, formData, { headers: header });
  }

  traerMesasMasUsadas(url : string)
  {
    const formData = new FormData()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  modificarEstadoPedido(url: string, pedidoProductoCodigo : any, estadoNuevo : any, tiempo?: any, usuario?: any) {
    const formData = new FormData()
    formData.append('pedidoProductoCodigo', pedidoProductoCodigo);
    formData.append('pedidoProductoEstado', estadoNuevo);
    formData.append('pedidoProductoTiempo', tiempo);
    formData.append('PreparadorCodigo', usuario);
    
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  traerMasPedidos(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  traerMenosPedidos(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }


  traerPedidosCancelados(url: string, fechaDesde : any, fechaHasta : any)
  {
    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }
  
  //ENDPEDIDOS

   //ENCUESTA

   CrearUnaEncuesta(encuesta : Encuesta)
   {
     let url = 'AltaEncuesta';
     const formData = new FormData();
     formData.append('cod_cuenta', encuesta.cod_cuenta);
     formData.append('val_mesa', encuesta.val_mesa);
     formData.append('val_mozo', encuesta.val_mozo);
     formData.append('val_rest', encuesta.val_rest);
     formData.append('val_cocin', encuesta.val_cocin);
     formData.append('val_cerve', encuesta.val_cerve);
     formData.append('val_barten', encuesta.val_bar);
     formData.append('val_precal', encuesta.val_precal);
     formData.append('val_coment', encuesta.val_coment);
     console.log(encuesta);
     let header = new HttpHeaders();
     header.append('Content-Type', 'application/json');
     return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
   }
 
   traerEncuestasPendientes(usuario)
   {
     let url = 'TraerEncuestasPendientes';
 
     const formData = new FormData();
     formData.append('clienteCodigo', usuario);
 
     let header = new HttpHeaders();
     header.append('Content-Type', 'application/json');
 
     return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
   }

   traerEncuestasRealizadas(usuario)
   {
     let url = 'TraerTodasEncuestasRealizadas';
 
     const formData = new FormData();
     formData.append('clienteCodigo', usuario);
 
     let header = new HttpHeaders();
     header.append('Content-Type', 'application/json');
 
     return this.http.post(this.URl + url, formData, { headers: header }).toPromise().then(this.extraerDatos).catch(this.manejadorError);
   }

  traerMejoresEncuestas(fechaDesde,fechaHasta)
  {
    let url = 'TraerTodasEncuestasMejores';

    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

  traerPeoresEncuestas(fechaDesde,fechaHasta)
  {
    let url = 'TraerTodasEncuestasPeores';

    const formData = new FormData();
    formData.append('fechaDesde', fechaDesde);
    formData.append('fechaHasta', fechaHasta);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<any[]>(this.URl + url, formData, { headers: header });
  }

   //ENDENCUESTA
}

