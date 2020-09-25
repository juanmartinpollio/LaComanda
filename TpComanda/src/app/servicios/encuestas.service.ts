import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(public http : HttpService) { }

  CrearEncuesta(encuesta : Encuesta)
  {
    return this.http.CrearUnaEncuesta(encuesta);
  }

  TraerEncuestasPendientes(usuario)
  {
    return this.http.traerEncuestasPendientes(usuario);
  }

  TraerEncuestasMejores(fechaDesde,fechaHasta)
  {
    return this.http.traerMejoresEncuestas(fechaDesde,fechaHasta);
  }

  TraerEncuestasPeores(fechaDesde,fechaHasta)
  {
    return this.http.traerPeoresEncuestas(fechaDesde,fechaHasta);    
  }

  TraerEncuestasHechas(usuario)
  {
    return this.http.traerEncuestasRealizadas(usuario);
  }
}
