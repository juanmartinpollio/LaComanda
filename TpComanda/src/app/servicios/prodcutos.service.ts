import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Producto } from '../clases/producto';
import { IProducto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProdcutosService {

  constructor(public miHttp: HttpService) { }

  BuscarTodosProductos() : any {
    return this.miHttp.buscarTodosProductos("traerTodosProductos");
  }

  AgregarProducto(unProducto : Producto, imagenParaSubir) : any {
    return this.miHttp.agregarProducto(unProducto, imagenParaSubir)
  }

  ModificarProducto(unProducto : Producto, imagenParaSubir) : any {
    let promesa: any = this.miHttp.modificarProducto(unProducto, imagenParaSubir)
        .then(datos => {
          let mensaje : any = datos;
        })
        .catch(error => { console.log(error) });
    return promesa;
  }

  EliminarProducto(codigoProducto : number) : any {
    let promesa : any = this.miHttp.eliminarProducto("eliminarProducto",codigoProducto)
      .then(datos => {
        let mensaje : any = datos;
        console.log(mensaje);
      })
      .catch(error => { console.log(error) });
  
      return promesa;
  }

  traerUnProducto(productoCodigo) : Promise<Array<Producto>> {
    let promesa : Promise<Array<Producto>> = new Promise((resolve, reject) => {
      this.miHttp.traerUnProducto("traerUnProducto",productoCodigo)
        .then(datos => {
          let miArray: Array<Producto> = new Array<Producto>();
          for (let unDato of datos) {
            miArray.push(new Producto(unDato.ProductoCodigo, unDato.ProductoNombre, unDato.ProductoTipo, unDato.ProductoHabilitado, unDato.ProductoImporte, unDato.ProductoImagen));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
}
