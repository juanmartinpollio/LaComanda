import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Cuenta } from 'src/app/clases/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(public http : HttpService) { }

  CrearCuenta(mesacodigo : string) : any {
    return this.http.crearCuenta(mesacodigo);
  }

  CerrarCuenta(mesaCodigo, cuentaCodigo)
  {
    let result : any = this.http.cerrarCuenta("CerrarCuenta", mesaCodigo, cuentaCodigo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        return false;
      });
    return result;
  }

  TraerCuentasPagables()
  {
    return this.http.traerCuentasPagables();
  }

  CuentaPaga(cuentaCodigo, cuentaMesaCodigo)
  {
    let result : any = this.http.cuentaPaga("CuentaPaga", cuentaCodigo, cuentaMesaCodigo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        return false;
      });
    return result;
  }

  TraerDetallesCuenta(CuentaCodigo)
  {
    return this.http.traerDetallesCuenta(CuentaCodigo);
  }
}
