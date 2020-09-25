import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Mesa } from '../clases/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public miHttp: HttpService) { }
  
  clientesEnMesas() : any {
    return this.miHttp.ClientesEnMesas("EnMesa");
  }

  ClientesDeMesa(codigo_mesa) : any {
    return this.miHttp.ClientesDeMesa(codigo_mesa);
  }

  PedidosDeMesa(codigo_mesa) : any {
    return this.miHttp.TraerPedidosDeMesa(codigo_mesa);
  }

  LiberarMesa(codigo_mesa) : any
  {
    return this.miHttp.liberarMesa("Desocupar",codigo_mesa);
  }

  BuscarTodasMesas(): any {
    return this.miHttp.buscarTodasMesas("traerTodasMesas");
  }

  BuscarMesaTopUsada(fechaDesde, fechaHasta): any {
    return this.miHttp.traerMesaTopUsada("TraerTopUsada", fechaDesde, fechaHasta);
  }

  BuscarMesaTopFacturo(fechaDesde, fechaHasta): any {
    return this.miHttp.traerMesaTopFacturo("TraerTopFacturo", fechaDesde, fechaHasta);
  }

  BuscarMesaTopFacturaMayor(fechaDesde, fechaHasta): any {
    return this.miHttp.traerMesaTopFacturaMayor("TraerTopFacturaMayor",fechaDesde, fechaHasta);
  }

  BuscarMesaTopFacturaMenor(fechaDesde, fechaHasta): any {
    return this.miHttp.traerMesaTopFacturaMenor("TraerTopFacturaMenor",fechaDesde, fechaHasta);
  }

  BuscarMesaTopFacturacion(fechaDesde, fechaHasta): any {
    return this.miHttp.traerMesaFacturacion("TraerFacturacion",fechaDesde, fechaHasta);
  }

  OcuparMesa(mesaCodigo, mozo, pedido, estado) : any {
    let result : any = this.miHttp.ocuparMesa("Ocupar", mesaCodigo, mozo, pedido, estado)
      .then(datos => {
        console.log(datos);
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }

  AsignarClientes(mesacodigo, usuario : any) : any {
    let result : any = this.miHttp.asignarClientes("Asignar", mesacodigo, usuario)
      .then(datos => {
        return true;
      })
      .catch(error => {
        return false;
      });
    return result;
  }

  EstadosEnMesa(codigo_mesa) : any {
    return this.miHttp.TraerEstadosDeLaMesa(codigo_mesa);
  }
}