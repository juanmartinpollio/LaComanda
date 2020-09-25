import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoHabilitado'
})
export class ProductoHabilitadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == true)
    {
      return 'Disponible';
    }
    else
    {
      return 'No disponible';
    }
  }

}
