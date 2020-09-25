import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { isNumber } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-adm-clientes',
  templateUrl: './adm-clientes.component.html',
  styleUrls: ['./adm-clientes.component.scss']
})
export class AdmClientesComponent implements OnInit {

  usuarioNombre : string;
  private sub : any;
  passwordConf : string = '';
  unUsuario : Usuario;
  imagen : any;
  bandUsauario : boolean = false;
  msgs : any = [];
  public respuestaImagenEnviada;
  public resultadoCarga;
  public imagenPreview : any;
  public files: NgxFileDropEntry[] = [];
  isLogged : boolean = false;
  Display : boolean = false;

  constructor(public miServicioUsuarios : UsuarioService, public router : Router, private route: ActivatedRoute) {
    this.unUsuario = new Usuario('','',0,0,'');
  }

  modificarUsuario()
  {
    this.Display  = true;
    this.isLogged = true;
    this.unUsuario.usuario = (<HTMLInputElement>document.getElementById('usuarioNombre')).value;
    this.unUsuario.contrasenia = (<HTMLInputElement>document.getElementById('usuarioPassword')).value;
    this.passwordConf = (<HTMLInputElement>document.getElementById('usuarioPasswordConf')).value;

    //Cargo
    if (this.unUsuario.contrasenia == '' || this.unUsuario.contrasenia == null || this.passwordConf == '' || this.passwordConf == null)
    {
      this.Display  = false;
      this.isLogged = false;
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Por favor, complete todos los campos'});
    }
    else
    {
      if (this.unUsuario.contrasenia == this.passwordConf)
      {  
        this.miServicioUsuarios.CambiarContrasenia(this.unUsuario, this.imagen)
        .then(datos => {
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'', detail:'Contraseña correctamente modificada'});
          
          setTimeout(() => {
            this.router.navigate(['/MenuPrincipal']);
          }, 500);
        })
        .catch(
          error => { console.log(error) }
        );
      }
      else
      {
        this.Display  = false;
        this.isLogged = false;
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Las contraseñas deben coincidir'});
      }
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
    this.sub = this.route.params.subscribe(params => {
      this.unUsuario.usuario = params['nombreUsuario'];

      this.miServicioUsuarios.BuscarTodosUsuarios().subscribe(data => {
                
        for (let i = 0; i < data.length; i++) 
        {
          if (this.unUsuario.usuario == data[i].usuario)
          {
            (<HTMLInputElement>document.getElementById('usuarioNombre')).value = data[i].usuario;
            this.imagenPreview = '/assets/imagenes/' + data[i].usuarioImagen;
            this.bandUsauario = true;
          }
        }
        if(this.bandUsauario == false)
        {
          this.router.navigate(['/MenuPrincipal']);
        }
      });


    });
  }

}
