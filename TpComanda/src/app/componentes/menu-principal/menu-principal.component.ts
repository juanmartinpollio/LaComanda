import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { PedidoproductoestadoPipe } from "../../pipes/pedidoproductoestado.pipe";

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  tipo : number = 6;
  usuario : string;
  auxProductosPedido : any = [];
  productosPedido : any = [];  
  codigoPedido : any;
  mozoProducto : any;
  nombreProducto : any = "";
  estadoProducto : any;
  tiempoProducto : any;
  msgs : any;
  mostrarPedido : any = true;

  constructor(public PedidosService : PedidosService, public verificarService : VerificarService, 
    private router : Router, 
    private route : ActivatedRoute) { }

  buscarPedido()
  {
    this.nombreProducto = "";
    this.estadoProducto = "";
    this.tiempoProducto = "";
    this.mozoProducto = "";
    this.auxProductosPedido = [];
    
    for (let i = 0; i < this.productosPedido.length; i++) 
    {
      if (this.productosPedido[i].PedidoCodigo == this.codigoPedido)
      {
        this.auxProductosPedido.push(this.productosPedido[i]);
      }
    }

    if (this.auxProductosPedido.length == 0)
    {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'', detail:'Pedido no encontrado'});
      this.mostrarPedido = true;
    }
    else
    {
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'', detail:'Pedido encontrado'});
      this.mostrarPedido = false;
    }
  }

  buscarEstado(estado)
  {
    switch (estado) 
    {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En preparación';
      case 3:
        return 'Listo para servir';
      case 4:
        return 'Entregado';
      default:
        break;
    }
  }

  ngOnInit() 
  {
    let tokenjs = localStorage.getItem("Token");
    let token : any = tokenjs; 
    
    if (token == null || token == '')
    {
      this.router.navigate(['']);
    }
    else
    {
      this.verificarService.recuperToken(token).then(
        (datos) => {
          this.tipo = datos.respuesta.tipo;
          this.usuario = datos.respuesta.usuario;
          
          if (this.tipo == 1) //CLIENTE
          {
            this.PedidosService.TraerTodosProductosPedidos(this.usuario).subscribe(data => {
            this.productosPedido = data;
            })
          }     
      });
    }
  }
}
