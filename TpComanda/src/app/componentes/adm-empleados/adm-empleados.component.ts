import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { isNumber } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-adm-empleados',
  templateUrl: './adm-empleados.component.html',
  styleUrls: ['./adm-empleados.component.scss']
})
export class AdmEmpleadosComponent implements OnInit {

  usuarioNombre : string;
  private sub : any;
  unUsuario : Usuario;
  imagen : any;
  public respuestaImagenEnviada;
  public resultadoCarga;
  public imagenPreview : any;
  public files: NgxFileDropEntry[] = [];
  tipo : number = 6;
  usuario : string;
  msgs : any = [];

  constructor(public miServicioUsuarios : UsuarioService, public router : Router, private route: ActivatedRoute, public verificarService : VerificarService) {
    this.unUsuario = new Usuario('','',0,0,'');
  }

  modificarUsuario()
  {
    this.unUsuario.usuario = (<HTMLInputElement>document.getElementById('usuarioNombre')).value;
    this.unUsuario.tipo = (<HTMLInputElement>document.getElementById('usuarioTipo')).value;
    this.unUsuario.estado = (<HTMLInputElement>document.getElementById('usuarioEstado')).value;

    //Cargo
    if (this.unUsuario.tipo == 0 || this.unUsuario.estado == 0)
    {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'', detail:'Por favor, complete todos los campos'});
    }
    else
    {
      this.miServicioUsuarios.ModificarUsuario(this.unUsuario, this.imagen)
      .then(datos => {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'', detail:'Empleado correctamente modificado'});
        setTimeout(() => {
          this.router.navigate(['/Empleados']);
        }, 500);
      })
      .catch(
        error => { console.log(error) }
      );
    }
    
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imagenPreview = reader.result;
          }
          this.imagen = file;
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event){
  }
 
  public fileLeave(event){
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
            this.sub = this.route.params.subscribe(params => {
              this.unUsuario.usuario = params['nombreUsuario'];
        
              this.miServicioUsuarios.BuscarTodosUsuarios().subscribe(data => {
                        
                for (let i = 0; i < data.length; i++) 
                {
                  if (this.unUsuario.usuario == data[i].usuario)
                  {
                    (<HTMLInputElement>document.getElementById('usuarioNombre')).value = data[i].usuario;
                    (<HTMLInputElement>document.getElementById('usuarioTipo')).value = data[i].tipo;
                    (<HTMLInputElement>document.getElementById('usuarioEstado')).value = data[i].estado;
                    this.imagenPreview = '/assets/imagenes/' + data[i].usuarioImagen;
                  }
                }
              });
            });
          }     
      });
    }
  }

}
