import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { Cuenta } from 'src/app/clases/cuenta';
import { VerificarService } from '../../servicios/verificar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-administrar-cuentas',
  templateUrl: './administrar-cuentas.component.html',
  styleUrls: ['./administrar-cuentas.component.scss']
})
export class AdministrarCuentasComponent implements OnInit {

  public listaCuentas : Cuenta;
  public msgs : any = [];
  tipo : number = 6;
  usuario : string;

  constructor(public miServicioCuentas : CuentaService, public router : Router, public verificarService : VerificarService) { }

  Pagado(CuentaCodigo, CuentaMesaCodigo)
  {
    this.miServicioCuentas.CuentaPaga(CuentaCodigo, CuentaMesaCodigo).then(data => {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'', detail:'Cuenta correctamente pagada'}); 
        this.miServicioCuentas.TraerCuentasPagables().then(datos => {
          this.listaCuentas = datos;
        });
    });
  }

  ngOnInit() {
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
            this.miServicioCuentas.TraerCuentasPagables().then(datos => {
              console.log(datos);
              this.listaCuentas = datos;
            })
          }     
      });
    }
  }

}
