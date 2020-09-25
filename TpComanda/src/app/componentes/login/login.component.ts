import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  unUsuario : Usuario;
  logeando = true;
  mensaje = '';
  tipoUsuario : any = 0;
  inicioSesion : any = false;
  msgs : any = [];
  soyRobot : boolean;
  isLogged : boolean = false;
  Display : boolean = false;

  constructor(
    private router : Router, 
    private route : ActivatedRoute,
    public miServicioUsuario : UsuarioService,
    public miServicioVerificacion : VerificarService) {
    
    localStorage.clear();
    this.unUsuario = new Usuario(null,null,0,0,'');
  }

  seleccionaPerfil(perfilSeleccionado)
  {
    switch (perfilSeleccionado)
    {
      case '1': //cliente
        this.unUsuario.usuario = 'clienteTest'
        this.unUsuario.contrasenia = '123456'
        break;
      case '2': //mozo
        this.unUsuario.usuario = 'mozoTest'
        this.unUsuario.contrasenia = '123456'
        break;
      case '3': //bartender
        this.unUsuario.usuario = 'bartenderTest'
        this.unUsuario.contrasenia = '123456'
        break;
      case '4': //cervecero
        this.unUsuario.usuario = 'cerveceroTest'
        this.unUsuario.contrasenia = '123456'
        break; 
      case '5': //cocinero
        this.unUsuario.usuario = 'cocineroTest'
        this.unUsuario.contrasenia = '123456'
        break;
      case '6': //socio
        this.unUsuario.usuario = 'socioTest'
        this.unUsuario.contrasenia = '123456'
        break;
      case '7': //repostero
        this.unUsuario.usuario = 'reposteroTest'
        this.unUsuario.contrasenia = '123456'
        break;
      default:
        break;
    }
  }

  iniciarSesion()
  {
    this.Display  = true;
    this.isLogged = true;

    this.miServicioUsuario.BuscarUsuario(this.unUsuario)
      .then((datos) => {
        
        if (this.soyRobot == true)
        {
          if (datos != null) 
          {
            this.inicioSesion = true;
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'', detail:'Iniciando sesión, por favor espere...'});
            this.crearToken(datos);
          }
          else 
          { 
            this.Display = false;
            this.isLogged = false;
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:'El usuario o la contraseña son incorrectos'});
          }
        }
        else
        {
          this.Display = false;
          this.isLogged = false;
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:'Por favor, valida que no eres un robot'});
        }
      });
  }

  crearToken(datos: any) {
    this.miServicioVerificacion.crearToken(datos).then((datos) => {
      if (datos == true)
      {
        this.router.navigate(['/MenuPrincipal']);
      }
      else
      {
        this.inicioSesion = true;
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'No se pudo iniciar sesión, por favor, intente más tarde'});
      }
    })
  }

  ngOnInit() {
  }

}
