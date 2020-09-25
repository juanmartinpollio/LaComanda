import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesaEstado'
})
export class MesaEstadoPipe implements PipeTransform {

  transform(value: any, args? : any[]): any {
    
    switch (value) 
    {
      case 1:
        return 'Disponible';
      case 2:
        return 'Ocupada';
      case 3:
        return 'Con cliente esperando';
      case 4:
        return 'Con cliente comiendo';
      case 5:
        return 'Con cliente pagando';
      case 6:
        return 'Cerrada';
      default:
        break;
    }
  
    }
  }
