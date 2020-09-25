import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public miHttp: HttpService) { }

  BuscarUsuario(usuario : Usuario): any 
  {
    return this.miHttp.buscarUsuario("traer", usuario)
        .then(datos => {

          if (datos.length > 0) 
          {
            let usuario = new Usuario(datos[0].usuario, datos[0].contrasenia, datos[0].tipo, datos[0].estado, datos[0].usuarioImagen)
            return usuario;
          }
          else 
          {
            return null;
          }
        })
        .catch(error => { console.log(error) });
  }

  BuscarImagenUsuario(usuario : any)
  {
    return this.miHttp.buscarImagenUsuario(usuario);
  }

  CambiarContrasenia(usuario : Usuario, imagen) : any {
    let promesa: any = this.miHttp.cambiarContrasenia(usuario, imagen)
        .then(datos => {
          let mensaje : any = datos;
        })
        .catch(error => { console.log(error) });
    return promesa;
  }

  AgregarUsuario(usuario : Usuario, imagen) : any {
    let promesa: any = this.miHttp.agregarUsuario(usuario, imagen)
        .then(datos => {
          let mensaje : any = datos;
        })
        .catch(error => { console.log(error) });
    return promesa;
  }

  ModificarUsuario(unUsuario : Usuario, imagen) : any {
    let promesa : any = this.miHttp.modificarUsuario(unUsuario, imagen)
        .then(datos => {
          let mensaje : any = datos;
          console.log(datos);
        })
        .catch(error => { console.log(error) });
        
    return promesa;
  }

  BuscarTodosSector(fechaDesde,fechaHasta) : any 
  {
    return this.miHttp.buscarTodosPorSector("TraerPorSector",fechaDesde,fechaHasta);
  }

  BuscarTodosEstado(fechaDesde,fechaHasta) : any 
  {
    return this.miHttp.buscarTodosPorEstado("TraerPorEstado",fechaDesde,fechaHasta);
  }

  BuscarTodosLogin(fechaDesde,fechaHasta) : any 
  {
    return this.miHttp.buscarTodosPorLogin("TraerPorLogin",fechaDesde,fechaHasta);
  }

  BuscarTodosUsuarios() : any 
  {
    return this.miHttp.buscarTodosUsuarios("traerTodos");
  }
}
