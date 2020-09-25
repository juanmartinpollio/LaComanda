import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoSector'
})
export class ProductoSectorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    switch (value) 
    {
      case 3:
        return 'Barra de tragos y vinos';
      case 4:
        return 'Barra de choperas';
      case 5:
        return 'Cocina';
      case 7:
        return 'Candy Bar';
      default:
        break;
    }
  
  }

}
