import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { VerificarService } from '../../servicios/verificar.service';
import { UsuarioTipoPipe } from "../../pipes/usuario-tipo.pipe";
import { UsuarioEstadoPipe } from "../../pipes/usuario-estado.pipe";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  public listaUsuarios : any;
  tipo : number = 6;
  usuario : string;

  constructor(public miServicioUsuarios : UsuarioService,public router : Router, public verificarService : VerificarService) {
    
  }

  ngOnInit() {
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
          
          if (this.tipo != 6) //SOCIO
          {
            this.router.navigate(['/MenuPrincipal']);            
          }     
          else
          {
            this.miServicioUsuarios.BuscarTodosUsuarios().subscribe(data => {
              
              let auxListaUsuarios : any = [];
            
              for (let i = 0; i < data.length; i++) 
              {
                if (data[i].tipo == 2 || data[i].tipo == 3 || data[i].tipo == 4 || data[i].tipo == 5 || data[i].tipo == 7)
                {
                  auxListaUsuarios.push(new Usuario(data[i].usuario,data[i].contrasenia,data[i].tipo,data[i].estado,'/assets/imagenes/' + data[i].usuarioImagen));
                }
              }
        
              this.listaUsuarios = auxListaUsuarios;
            });
          }
      });
    }
  }

}
