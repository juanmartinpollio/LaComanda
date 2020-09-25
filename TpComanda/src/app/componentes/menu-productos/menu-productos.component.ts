import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from 'src/app/clases/producto';
import { ProdcutosService } from 'src/app/servicios/prodcutos.service';
import { ProductoHabilitadoPipe } from "../../pipes/producto-habilitado.pipe";
import { ProductoTipoPipe } from "../../pipes/producto-tipo.pipe";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx'; 
import { HttpClient } from '@angular/common/http';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-menu-productos',
  templateUrl: './menu-productos.component.html',
  styleUrls: ['./menu-productos.component.scss']
})
export class MenuProductosComponent implements OnInit {

  public listaProductos : any;
  public bandSiempreOculta : any = true;
  public image = new Image();
  public fileName: string;
  public imagenPreview : any;
  public resume : any;
  public imagenPDF : any;
  tipo : number = 6;
  usuario : string;

  filePreview: string

  constructor(public miServicioProductos : ProdcutosService,public router : Router, public http : HttpClient, public verificarService : VerificarService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.previewFile('/assets/imagenes/pordefecto.jpg');
    this.miServicioProductos.BuscarTodosProductos().then(data => {
      let auxListaProductos : any = [];
      
      for (let i = 0; i < data.length; i++) 
      {
        auxListaProductos.push(new Producto(data[i].ProductoCodigo,data[i].ProductoNombre,data[i].ProductoTipo,data[i].ProductoHabilitado,data[i].ProductoImporte,'assets/imagenes/' + data[i].ProductoImagen))
      }

      this.listaProductos = auxListaProductos;
    });
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

  async generatePdf(){
        var body = [];
    
        body.push(['Cod. Producto','Nombre','Tipo Producto','Disponibilidad','Importe'])
        for (var i in this.listaProductos) {
          var auxListaProductos = this.listaProductos[i];
          var fila = [];
          fila.push(auxListaProductos.codigo.toString());
          fila.push(auxListaProductos.nombre.toString());
          fila.push(auxListaProductos.tipo.toString());
          fila.push(auxListaProductos.habilitado.toString());
          fila.push(auxListaProductos.importe.toString());
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
    
       getBase64(event) {
        let me = this;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
        };
        reader.onerror = function (error) {
        };
     }

  exportExcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('pepe2'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, 'MenuProductos.xlsx');
			
    }

  getCars() {
    let productos : any = [];
    for(let producto of this.listaProductos) {
        var auxListaProductos = this.listaProductos[producto];
        producto = auxListaProductos.codigo.toString();
        producto = auxListaProductos.nombre.toString();
        producto = auxListaProductos.tipo.toString();
        producto = auxListaProductos.importe.toString();
        productos.push(producto);
    }
    return productos;
  }
  
  
  ngOnInit() 
  {
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
              this.miServicioProductos.BuscarTodosProductos().then(data => {
                let auxListaProductos : any = [];
                
                for (let i = 0; i < data.length; i++) 
                {
                  auxListaProductos.push(new Producto(data[i].ProductoCodigo,data[i].ProductoNombre,data[i].ProductoTipo,data[i].ProductoHabilitado,data[i].ProductoImporte,'assets/imagenes/' + data[i].ProductoImagen))
                }
          
                this.listaProductos = auxListaProductos;
              });
            }
        });
      }
  }
}