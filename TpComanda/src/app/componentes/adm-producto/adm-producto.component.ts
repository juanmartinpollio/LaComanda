import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { isNumber } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProdcutosService } from 'src/app/servicios/prodcutos.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-adm-producto',
  templateUrl: './adm-producto.component.html',
  styleUrls: ['./adm-producto.component.scss']
})
export class AdmProductoComponent implements OnInit {
  
  productoCodigo : number;
  private sub: any;
  unProducto : Producto;
  uploadedFiles: any[] = [];
  imagen : any;
  public respuestaImagenEnviada;
  public resultadoCarga;
  public imagenPreview : any;
  public files: NgxFileDropEntry[] = [];
  tipo : number = 6;
  msgs : any = [];
  usuario : string;

  constructor(public miServicioProductos : ProdcutosService,public router : Router, private route: ActivatedRoute, private http : HttpClient, public verificarService : VerificarService) {
    this.unProducto = new Producto(0,'','','',0,'');
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

  cargarProducto()
  {
    if (this.unProducto.codigo == 0) //ALTA
    {
        this.unProducto.habilitado = (<HTMLInputElement>document.getElementById('productoHabilitado')).value;
        this.unProducto.importe = (<HTMLInputElement>document.getElementById('productoImporte')).valueAsNumber;
        this.unProducto.nombre = (<HTMLInputElement>document.getElementById('productoNombre')).value;
        this.unProducto.tipo = (<HTMLInputElement>document.getElementById('productoTipo')).value;

        if ((this.unProducto.habilitado == null || this.unProducto.habilitado == 'Seleccione...') ||
            (this.unProducto.nombre == null ||  this.unProducto.nombre == '') || 
            (this.unProducto.tipo == null || this.unProducto.tipo == 'Seleccione...') ||  
            (this.unProducto.importe == 0 || isNumber(this.unProducto.importe) == false))
        {
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'', detail:'Por favor, complete todos los campos'});
        }
        else
        {
          //Cargo
          this.miServicioProductos.AgregarProducto(this.unProducto,this.imagen)
          .then(datos => {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'', detail:'Producto correctamente creado'});
            setTimeout(() => {
              this.router.navigate(['/MenuProductos']);
            }, 500);
          })
          .catch(
            error => { console.log(error) }
          );
        }

    }
    else //MODIFICACIÓN
    {
      this.unProducto.habilitado = (<HTMLInputElement>document.getElementById('productoHabilitado')).value;
      this.unProducto.importe = (<HTMLInputElement>document.getElementById('productoImporte')).valueAsNumber;
      this.unProducto.nombre = (<HTMLInputElement>document.getElementById('productoNombre')).value;
      this.unProducto.tipo = (<HTMLInputElement>document.getElementById('productoTipo')).value;

      if ((this.unProducto.habilitado == null || this.unProducto.habilitado == 'Seleccione...') ||
          (this.unProducto.nombre == null ||  this.unProducto.nombre == '') || 
          (this.unProducto.tipo == null || this.unProducto.tipo == 'Seleccione...') ||  
          (this.unProducto.importe == 0 || isNumber(this.unProducto.importe) == false))
      {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'', detail:'Por favor, complete todos los campos'});
      }
      else
      {
        //Modificó
        this.miServicioProductos.ModificarProducto(this.unProducto,this.imagen)
        .then(datos => {
          setTimeout(() => {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'', detail:'Producto correctamente modificado'});
            this.router.navigate(['/MenuProductos']);
          }, 500);
        })
        .catch(
          error => { console.log(error) }
        );
      }
    }
  }


  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
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
          else
          {
            this.sub = this.route.params.subscribe(params => {
              this.unProducto.codigo = +params['codigoProducto']; // (+) converts string 'id' to a number
               if (this.unProducto.codigo != 0)
               {
                 this.miServicioProductos.traerUnProducto(this.unProducto.codigo).then( datos => {
                   (<HTMLInputElement>document.getElementById('productoHabilitado')).value = datos[0].habilitado;
                   (<HTMLInputElement>document.getElementById('productoImporte')).value = datos[0].importe + "";
                   (<HTMLInputElement>document.getElementById('productoNombre')).value = datos[0].nombre;
                   (<HTMLInputElement>document.getElementById('productoTipo')).value = datos[0].tipo;
                   this.imagenPreview = '/assets/imagenes/' + datos[0].imagen;
                 })
               }
           }); 
          }
      });
    }
  }

}
