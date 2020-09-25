import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(public miHttp: HttpService) { }

  buscarPedido(pedidoCodigo) : any {
    return this.miHttp.BuscarPedido(pedidoCodigo);
  }

  CrearPedido(pedido : any) : any {
    let result : any = this.miHttp.crearPedido("AsignarPedido", pedido)
      .then(datos => {
        return datos;
      })
      .catch(error => {
        return false;
      });
    return result;
  }

  CrearPedidoProductos(pedido : any, codigopedido : any) : any {
    let result : any = this.miHttp.crearPedidoProductos("AsignarPedidoProductos", pedido, codigopedido)
      .then(datos => {
        return true;
      })
      .catch(error => {
        return false;
      });
    return result;
  }

  CrearCuentaPedido(cuentacodigo : any, codigopedido : any) : any {
    let result : any = this.miHttp.crearCuentaPedido("AsignarCuentaPedido", cuentacodigo, codigopedido)
      .then(datos => {
        return true;
      })
      .catch(error => {
        return false;
      });
    return result;
  }

  TraerTodosProductosPedidos(codigoCliente : any)
  {
    return this.miHttp.traerTodosPedidos('TraerPedidosProductos',codigoCliente);
  }

  TraerTodosPedidosPreparador(codigoUsuario : any, tipoProducto : any)
  {
    return this.miHttp.traerTodosPedidosPreparador('TraerPedidoPreparador',codigoUsuario,tipoProducto)
  }

  TraerTodosPedidosListos()
  {
    return this.miHttp.traerTodosPedidosListos('TraerListoPedidos');
  }

  TraerMasMesasConPedidos()
  {
    return this.miHttp.traerMesasMasUsadas('PedidoPorMesa');
  }

  TraerSoloPedidosMas(fechaDesde : any, fechaHasta : any)
  {
    return this.miHttp.traerMasPedidos('TraerMasPedido',fechaDesde,fechaHasta);
  }

  TraerSoloPedidosMenos(fechaDesde : any, fechaHasta : any)
  {
    return this.miHttp.traerMenosPedidos('TraerMenosPedido',fechaDesde,fechaHasta);
  }

  TraerSoloPedidosCancelados(fechaDesde : any, fechaHasta : any)
  {
    return this.miHttp.traerPedidosCancelados('TraerCancelados',fechaDesde,fechaHasta);
  }

  modificarEstadoProducto(pedidoProductoCodigo : any, estadoNuevo : any, tiempo?: any, usuario?: any) : any {
    let result : any = this.miHttp.modificarEstadoPedido("CambiarEstadoPedidoProducto", pedidoProductoCodigo, estadoNuevo, tiempo, usuario)
      .then(datos => {
        return true;
      })
      .catch(error => {
        return false;
      });
    return result;
  }
}
