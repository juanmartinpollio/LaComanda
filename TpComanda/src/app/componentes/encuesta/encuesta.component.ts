import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { VerificarService } from 'src/app/servicios/verificar.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  info = false;
  msg : string;
  val1 = 0;
  val2 = 0;
  val3 = 0;
  val4 = 0;
  val6 = 0;
  val7 = 0;
  val8 = 0;
  val5 = "";
  encuesta : Encuesta;
  CodigoCuenta : any;
  usuario = "";
  encuestas : any = [];
  encuestasDisponibles : boolean = false;
  encuestasNoDisponibles : boolean = false;
  hacerEncuesta : boolean = false;
  msgs : any = [];
  misEncuestas : any = [];

  constructor(public MiServicioEncuesta : EncuestasService, public verificarService : VerificarService) { 
    this.encuesta = new Encuesta;
  }

  generarEncuesta()
  {
    this.hacerEncuesta = true;
  }

  Enviar()
  { 
    if (this.CodigoCuenta == '' || this.CodigoCuenta == null)
    {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Debe seleccionar una cuenta para realizar la encuesta'});
    }
    else
    {
      this.encuesta.val_mesa = this.val1;
      this.encuesta.val_rest = this.val2;
      this.encuesta.val_mozo = this.val3;
      this.encuesta.val_cocin = this.val4;
      this.encuesta.val_coment = this.val5;
      this.encuesta.val_bar = this.val6
      this.encuesta.val_cerve = this.val7;
      this.encuesta.val_precal = this.val8;
      this.encuesta.cod_cuenta = this.CodigoCuenta;
      this.MiServicioEncuesta.CrearEncuesta(this.encuesta).then(data => {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'', detail:'Encuesta realizada correctamente'});  
        setTimeout(() => {
          this.hacerEncuesta = false;
        }, 500);
      });        
    }
  }

  ngOnInit() {
   let tokenjs = localStorage.getItem("Token");
    let token : any = tokenjs; 
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.usuario = datos.respuesta.usuario;
        this.MiServicioEncuesta.TraerEncuestasPendientes(this.usuario).then(datos => {
          this.encuestas = datos;
          if (this.encuestas.length > 0) 
          {
            this.encuestasDisponibles = false;
          }
          else 
          {
            this.encuestasDisponibles = true;
          }
        });

        this.MiServicioEncuesta.TraerEncuestasHechas(this.usuario).then(datos => {
          this.misEncuestas = datos;
        });
      })
    }
}
