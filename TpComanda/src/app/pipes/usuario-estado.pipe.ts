import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioEstado'
})
export class UsuarioEstadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    switch (value) 
    {
      case 1:
        return 'Activo';
      case 2:
        return 'Suspendido';
      case 3:
        return 'Despedido';
      default: 
        break;
    }
  }

}
