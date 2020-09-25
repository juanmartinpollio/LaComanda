import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  unUsuario : Usuario;
  passwordConf : string = '';
  listaUsuarios : any;
  public imagenPreview : any;
  productoCodigo : number;
  private sub: any;
  uploadedFiles: any[] = [];
  //fileData: File = null;
  imagen : any;
  public files: NgxFileDropEntry[] = [];
  public msgs : any = [];

  constructor(public miServicioUsuarios : UsuarioService, public router : Router, private route: ActivatedRoute) {
    this.unUsuario = new Usuario('','',0,1,0);
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

  crearUsuario()
  {
    this.unUsuario.usuario = (<HTMLInputElement>document.getElementById('usuarioNombre')).value;
    this.unUsuario.tipo = 1;
    this.unUsuario.contrasenia = (<HTMLInputElement>document.getElementById('usuarioPassword')).value;
    this.passwordConf = (<HTMLInputElement>document.getElementById('usuarioPasswordConf')).value;

    this.miServicioUsuarios.BuscarTodosUsuarios().subscribe(data => {
            
      let auxListaUsuarios : any = [];
      
      for (let i = 0; i < data.length; i++) 
      {
        auxListaUsuarios.push(new Usuario(data[i].usuario,data[i].contrasenia,data[i].tipo,data[i].estado, data[i].imagen));
      }

      this.listaUsuarios = auxListaUsuarios;

      for (let i = 0; i < this.listaUsuarios.length; i++) 
      {
        if (this.listaUsuarios[i].usuario == this.unUsuario.usuario)
        {
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'', detail:'El usuario ingresado ya existe'});
        }  
      }

      if (this.unUsuario.contrasenia == this.passwordConf)
      {

        this.miServicioUsuarios.AgregarUsuario(this.unUsuario, this.imagen)
        .then(datos => {
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'', detail:'Cliente creado correctamente'}); 
          this.router.navigate(['']);
        })
        .catch(
          error => { console.log(error) }
        );
      }
      else
      {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'', detail:'Las contraseñas no coinciden'}); 
      }
    });
  }

  ngOnInit() {
  }

}
