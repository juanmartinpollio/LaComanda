import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { isNumber } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-alta-empleados',
  templateUrl: './alta-empleados.component.html',
  styleUrls: ['./alta-empleados.component.scss']
})
export class AltaEmpleadosComponent implements OnInit {

  unUsuario : Usuario;
  passwordConf : string = '';
  listaUsuarios : any;
  respuestaCaptcha : any = '';
  public imagenPreview : any;
  productoCodigo : number;
  private sub: any;
  uploadedFiles: any[] = [];
  imagen : any;
  public files: NgxFileDropEntry[] = [];
  tipo : number = 6;
  usuario : string;
  msgs : any = [];

  constructor(public miServicioUsuarios : UsuarioService, public router : Router, private route: ActivatedRoute, public verificarService : VerificarService) {
    this.unUsuario = new Usuario('','',0,1,'')
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

  showResponse(respuesta)
  {
    this.respuestaCaptcha = respuesta;
  }

  crearUsuario()
  {
    var banderaExiste = false;
    this.unUsuario.usuario = (<HTMLInputElement>document.getElementById('usuarioNombre')).value;
    this.unUsuario.tipo = (<HTMLInputElement>document.getElementById('usuarioTipo')).value;
    this.unUsuario.contrasenia = (<HTMLInputElement>document.getElementById('usuarioPassword')).value;
    this.passwordConf = (<HTMLInputElement>document.getElementById('usuarioPasswordConf')).value;

    if (this.unUsuario.usuario == '' || this.unUsuario.tipo == 0 || this.unUsuario.contrasenia == '' || this.passwordConf == '' || this.respuestaCaptcha == '')
    {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'', detail:'Por favor, complete todos los campos'});
    }
    else
    {
      this.miServicioUsuarios.BuscarTodosUsuarios().subscribe(data => {
        
        let auxListaUsuarios : any = [];
        
        for (let i = 0; i < data.length; i++) 
        {
          auxListaUsuarios.push(new Usuario(data[i].usuario,data[i].contrasenia,data[i].tipo,data[i].estado,data[i].imagen));
        }
  
        this.listaUsuarios = auxListaUsuarios;
  
        for (let i = 0; i < this.listaUsuarios.length; i++) 
        {
          if (this.listaUsuarios[i].usuario == this.unUsuario.usuario)
          {
            banderaExiste = true;
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'', detail:'El usuario ingresado ya existe'});
          }  
        }
  
        if (this.unUsuario.contrasenia == this.passwordConf)
        {  
          this.miServicioUsuarios.AgregarUsuario(this.unUsuario, this.imagen)
          .then(datos => {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'', detail:'Cuenta correctamente creada'});
            setTimeout(() => {
              this.router.navigate(['/Empleados']);
            }, 500);
          })
          .catch(
            error => { console.log(error) }
          );
        }
        else
        {
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'', detail:'Las contraseñas ingresadas deben coincidir'});
        }
      });
    }
    
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
      });
    }
  }

}
