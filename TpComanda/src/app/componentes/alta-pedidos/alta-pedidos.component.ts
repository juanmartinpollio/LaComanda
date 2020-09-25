import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { MesaService } from '../../servicios/mesa.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VerificarService } from '../../servicios/verificar.service';
import { Usuario } from 'src/app/clases/usuario';
import { Mesa } from 'src/app/clases/mesa';
import { ProdcutosService } from 'src/app/servicios/prodcutos.service';
import { Producto } from 'src/app/clases/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { Pedido } from 'src/app/clases/pedido';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alta-pedidos',
  templateUrl: './alta-pedidos.component.html',
  styleUrls: ['./alta-pedidos.component.scss']
})
export class AltaPedidosComponent implements OnInit {

  private sub : any;
  public codigoMesa : string;
  public listaProductos : any = [];
  public productosPedido : any = [];
  public productosPedidoAux : any = [];
  public productoAux : any;
  public pedidoAux : Pedido;
  public codigoAux : number = 0;
  public listaClientes : any;
  public codigoUsuarioAux : string = "nadie";
  public tipo : number = 6;
  public usuario : string;
  public mesaCuentaCodigo : any;
  public msgs : any = [];
  public isLogged : boolean = false;
  public Display : boolean = false;
  public imagenPreview : any;
  public imagen : any;
  public files: NgxFileDropEntry[] = [];
  public imagenPDF : any;

  constructor(public router : Router, 
                     private route: ActivatedRoute, 
                     public miServicioProductos : ProdcutosService, 
                     public miServicioMesas : MesaService,
                     public PedidosService : PedidosService,
                     public VerificarService : VerificarService,
                     public http : HttpClient) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.previewFile('/assets/imagenes/pordefecto.jpg');
    this.miServicioProductos.BuscarTodosProductos().then(data => {
      let auxListaProductos : any = [];
      
      for (let i = 0; i < data.length; i++) 
      {
        if (data[i].ProductoHabilitado == 1)
        {
          auxListaProductos.push(new Producto(data[i].ProductoCodigo,data[i].ProductoNombre,data[i].ProductoTipo,data[i].ProductoHabilitado,data[i].ProductoImporte,''))
        }
      }

      this.listaProductos = auxListaProductos;
    })

    this.pedidoAux = new Pedido();
  }

  previewFile(url) {
    this.http.get(url, { responseType: 'blob' })
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        this.imagenPDF = base64data;
      }

      reader.readAsDataURL(res); 
    });
  }

  AgregarProducto()
  {
    if (this.codigoAux == 0 || this.codigoUsuarioAux == "nadie")
    {
      if (this.codigoAux == 0)
      {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Debe seleccionar un producto'});
      }
      else
      {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Debe seleccionar un integrante de la mesa'});
      }
    }
    else
    {
      for (let i = 0; i < this.listaProductos.length; i++) 
      {
        if (this.listaProductos[i].codigo == this.codigoAux)
        {
          this.productoAux = this.listaProductos[i];
        }      
      }
  
      this.productoAux.cantidad = 1;
      this.productosPedido.push(this.productoAux);    
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'', detail:'Producto cargado correctamente'});

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
  
  ConfirmarPedido()
  {
    for (let i = 0; i < this.productosPedido.length; i++) 
    {
      for (let j = 0; j < this.productosPedido[i].cantidad; j++) 
      {
        this.productosPedidoAux.push(this.productosPedido[i]);      
      }  
    }

    if (this.productosPedidoAux.length > 0)
    {
      this.isLogged = true;
      this.Display = true;

      let prueba : string = '';
      let token : any = []
      for (let i = 0; i < 5; i++) {
        prueba += this.CaracterRandom();
      }
      this.pedidoAux.PedidoCodigo = prueba;
      this.pedidoAux.PedidoMesaCodigo = this.codigoMesa;
      this.pedidoAux.PedidoMozoCodigo = this.usuario;
      this.pedidoAux.PedidoClienteCodigo = this.codigoUsuarioAux;
      this.PedidosService.CrearPedido(this.pedidoAux).then(datos => {
        this.PedidosService.CrearCuentaPedido(this.mesaCuentaCodigo,prueba);
        this.PedidosService.CrearPedidoProductos(this.productosPedidoAux,prueba).then(data => {
          if (data == true)
          {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'', detail:'Pedido correctamente cargado'});
            this.generatePdf();
            setTimeout(() => {
              this.router.navigate(['/MenuMesas']);
            }, 500);
          }
          else
          {
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:'Error al cargar pedido'});
          }
        });      
      });
    }
    else
    {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Debe cargar al menos un producto al pedido'});
    }
  }

  async generatePdf(){
    var body = [];
    body.push(['Producto','Cantidad']);
    
    for (let i = 0; i < this.productosPedido.length; i++) {
      var fila = [];
      fila.push(this.productosPedido[i].nombre.toString());
      fila.push(this.productosPedido[i].cantidad.toString());
      body.push(fila);
    }
    var dd = {
      content: [{
        image: this.imagenPDF, width : 50,
        height : 50
      }   ,{
        table: {
          headerRows: 1,
          body: body
        }
      }]
    }
    pdfMake.createPdf(dd).download();
  }

  CaracterRandom()
  {
    let caracteres : string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let random : number;
    random = Math.floor(Math.random() * (1 + 62));
    return caracteres[random];
  }

  quitarProducto(item)
  {
    this.productosPedido.splice(item, 1);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
     this.codigoMesa = params['codigoMesa'];
     (<HTMLInputElement>document.getElementById('mesa')).value = "La comanda - Alta de pedidos - Código de mesa: " + this.codigoMesa;
     this.miServicioMesas.ClientesDeMesa(this.codigoMesa).subscribe(data => {
       this.listaClientes = data;
     });
    });

    this.miServicioMesas.BuscarTodasMesas().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].MesaCodigo == this.codigoMesa)
        {
          this.mesaCuentaCodigo = data[i].MesaCuentaCodigo;
          break;
        }
      }
     });

    let tokenjs = localStorage.getItem("Token");
    let token : any = tokenjs; 
    this.VerificarService.recuperToken(token).then(
      (datos) => {
        this.tipo = datos.respuesta.tipo;
        this.usuario = datos.respuesta.usuario;
    });
  }
}