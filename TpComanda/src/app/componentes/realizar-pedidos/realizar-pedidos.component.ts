import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-realizar-pedidos',
  templateUrl: './realizar-pedidos.component.html',
  styleUrls: ['./realizar-pedidos.component.scss']
})
export class RealizarPedidosComponent implements OnInit {

  tipo : number = 6;
  usuario : string;
  public productosPedido : any = [];
  public productosPendientes : any = [];
  public productosPreparacion : any = [];
  public productosListos : any = [];
  public tiempo : any;
  public arrTiempo : any = [];
  public msgs : any = [];

  constructor(public PedidosService : PedidosService, public verificarService : VerificarService) { }

  CambiarEstado(estado : any, pedidoProductoCodigo : any, tiempo?: any) {
    this.PedidosService.modificarEstadoProducto(pedidoProductoCodigo, estado, tiempo, this.usuario).then(data => {
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'', detail:'Estado de producto actualizado'});


      this.PedidosService.TraerTodosPedidosPreparador(this.usuario, this.tipo).subscribe(data => {
        this.productosPedido = data;
        this.productosPendientes = [];
        this.productosPreparacion = [];
        this.productosListos = [];

        for (let i = 0; i < this.productosPedido.length; i++) {
          switch (this.productosPedido[i].Estado) {
            case 1:
              this.productosPendientes.push(this.productosPedido[i]);
              break;
            case 2:
              this.productosPreparacion.push(this.productosPedido[i]);
              break;
          }
        }

        this.PedidosService.TraerTodosPedidosListos().subscribe(data => {
          this.productosListos = data;
        });
      });
    });
  }

  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token : any = tokenjs; 
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.tipo = datos.respuesta.tipo;
        this.usuario = datos.respuesta.usuario;
        this.PedidosService.TraerTodosPedidosPreparador(this.usuario, this.tipo).subscribe(data => {
          this.productosPedido = data;
          for (let i = 0; i < this.productosPedido.length; i++) {
            
            switch (this.productosPedido[i].Estado) {
              case 1:
                this.productosPendientes.push(this.productosPedido[i]);
                break;
              case 2:
                this.productosPreparacion.push(this.productosPedido[i]);
                break;
            }
          }

          this.PedidosService.TraerTodosPedidosListos().subscribe(data => {
            this.productosListos = data;
          });
        })
    });
  }
}
