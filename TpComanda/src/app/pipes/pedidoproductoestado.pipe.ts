import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidoproductoestado'
})
export class PedidoproductoestadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    switch (value) 
    {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En preparación';
      case 3:
        return 'Listo para servir';
      case 4:
        return 'Entregado';
      case 5:
        return 'Cancelado';
      default:
        break;
    }
  
  }

}
