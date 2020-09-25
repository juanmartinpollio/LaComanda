import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioTipo'
})
export class UsuarioTipoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    switch (value) 
    {
      case 1:
        return 'Cliente';
      case 2:
        return 'Mozo';
      case 3:
        return 'Bartender';
      case 4:
        return 'Cervecero';
      case 5:
        return 'Cocinero';
      case 6:
        return 'Socio';
      case 7:
        return 'Repostero';
      default:
        break;
    }
  
  }

}
