import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoTipo'
})
export class ProductoTipoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    switch (value) 
    {
      case 3:
        return 'Bebida/Trago';
      case 4:
        return 'Cerveza';
      case 5:
        return 'Plato';
      case 7:
        return 'Postre';
      default:
        break;
    }
  
  }
}
