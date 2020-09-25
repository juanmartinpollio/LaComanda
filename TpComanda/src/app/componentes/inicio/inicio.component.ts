import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';
import { Mesa } from 'src/app/clases/mesa';
import { MenuItem } from 'primeng/api/primeng-api';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  items : MenuItem[];
  tipo : number = 6;
  usuario : string;
  display : boolean = false;
  imagen : any = 'pordefecto.jpg';
  MesaEncuesta : Mesa; /// Aca asignas la mesa de la que se va a responder

  constructor(public verificarService : VerificarService, public router : Router, public usuarioService : UsuarioService) 
  {

  }
  
  
  ngOnInit() 
  {
  
    let tokenjs = localStorage.getItem("Token");
    let token : any = tokenjs; 
    
    if(token != null || token != '')
    {
      this.verificarService.recuperToken(token).then(
        (datos) => {
          this.tipo = datos.respuesta.tipo;
          this.usuario = datos.respuesta.usuario;
          this.usuarioService.BuscarImagenUsuario(this.usuario).then(data => {
            
            this.imagen = data[0]['usuarioImagen'];
            if(this.imagen == null)
            {
              this.imagen = 'pordefecto.jpg';
            }
          })
      });
  
      this.items = [
          {label: 'Empleados', icon: 'pi pi-cog', routerLink: ['/InformeEmpleados']},
          {label: 'Pedidos', icon: 'pi pi-cog', routerLink: ['/InformePedidos']},
          {label: 'Mesas', icon: 'pi pi-cog', routerLink: ['/InformeMesas']}
      ];  
    }
  }

  Logout()
  {
    localStorage.removeItem("Token");   
    this.router.navigate(['']);
  }
}