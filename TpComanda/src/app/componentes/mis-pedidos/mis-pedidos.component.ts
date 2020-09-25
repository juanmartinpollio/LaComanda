import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { VerificarService } from '../../servicios/verificar.service';
import { PedidoproductoestadoPipe } from "../../pipes/pedidoproductoestado.pipe";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss']
})
export class MisPedidosComponent implements OnInit {

  tipo : number = 6;
  usuario : string;
  msgs : any = [];
  public productosPedido : any = [];

  constructor(public PedidosService : PedidosService, public router : Router, public verificarService : VerificarService) { 
    
  }

  refrescarLista()
  {
    this.PedidosService.TraerTodosProductosPedidos(this.usuario).subscribe(data => {
      this.productosPedido = data;
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'', detail:'Lista actualizada correctamente'});
    });
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
          
          if (this.tipo != 1) //CLIENTE
          {
            this.router.navigate(['/MenuPrincipal']);            
          }     
      });
    }
  }

}
