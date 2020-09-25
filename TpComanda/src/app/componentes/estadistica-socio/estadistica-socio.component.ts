import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { VerificarService } from '../../servicios/verificar.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-estadistica-socio',
  templateUrl: './estadistica-socio.component.html',
  styleUrls: ['./estadistica-socio.component.scss']
})
export class EstadisticaSocioComponent implements OnInit {

    serieOpciones : any;
  listaMesas : any = [];
  auxListaMesas : any = [];
  tipo : number = 6;
  usuario : string;

  constructor(public miPedidoServicio : PedidosService, public verificarService : VerificarService) { }

  ngOnInit()
  {
    let tokenjs = localStorage.getItem("Token");
    let token : any = tokenjs; 

    if (token != null || token != '')
    {
        this.verificarService.recuperToken(token).then(
            (datos) => {
              this.tipo = datos.respuesta.tipo;
              this.usuario = datos.respuesta.usuario;
          
              if (this.tipo == 6)
              {
                  this.miPedidoServicio.TraerMasMesasConPedidos().subscribe(data => {
                      this.listaMesas = data;
                
                      for (let i = 0; i < this.listaMesas.length; i++) 
                      {
                        this.auxListaMesas.push({
                          name: this.listaMesas[i].MesaNombre,
                          y: this.listaMesas[i].Cantidad
                        });        
                      }
                
                    this.serieOpciones =  {
                        name: 'Mesas',
                        data: this.auxListaMesas
                    }
                
                
                    Highcharts.chart('grafico', {
                      chart: {
                          plotBackgroundColor: null,
                          plotBorderWidth: null,
                          plotShadow: false,
                          type: 'pie'
                      },
                      title: {
                          text: 'Mesas más populares'
                      },
                      tooltip: {
                          pointFormat: '{series.name}: <b>{point.y}</b> pedidos entregados'
                      },
                      plotOptions: {
                          pie: {
                              allowPointSelect: true,
                              cursor: 'pointer',
                              dataLabels: {
                                  enabled: true,
                                  format: '<b>{point.name}</b>: {point.y} pedidos entregados'
                              }
                          }
                      },
                      series: [this.serieOpciones]
                  });
                      
                    });
              }
            });
    }
  }

}
