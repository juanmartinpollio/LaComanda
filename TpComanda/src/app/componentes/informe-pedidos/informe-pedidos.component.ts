import { Component, OnInit } from '@angular/core';
import { PedidosService } from "src/app/servicios/pedidos.service";
import { DatePipe } from '@angular/common';
import { VerificarService } from '../../servicios/verificar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-informe-pedidos',
  templateUrl: './informe-pedidos.component.html',
  styleUrls: ['./informe-pedidos.component.scss'],
  providers: [DatePipe]
})
export class InformePedidosComponent implements OnInit {

  fechaDesde : any;
  fechaHasta : any;
  tipoInforme : any = 0;
  auxPedidosMasVendido : any = [];
  auxPedidosMenosVendido : any = [];
  auxPedidosCancelados : any = [];
  PedidosMasVendidos : any = [];
  PedidosMenosVendidos : any = [];
  PedidosCancelados : any = [];
  informeMas : boolean = true;
  informeMenos : boolean = true;
  informeCancelados : boolean = true;
  bandAbreInforme : boolean = false;
  tipo : number = 6;
  usuario : string;
  msgs : any = [];

  constructor(public miPedidosService : PedidosService, private datePipe : DatePipe, public router : Router, public verificarService : VerificarService) { }

  generarNuevo()
  {
    this.bandAbreInforme = false;
  }

  buscarInformes()
  {
    if (this.tipoInforme == 0 || (this.fechaDesde == '' || this.fechaDesde == null) || (this.fechaHasta == '' || this.fechaHasta == null))
    { 
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'', detail:'Por favor, complete todos los campos'}); 
    }
    else
    {
      this.bandAbreInforme = true;
      this.fechaDesde = this.datePipe.transform(this.fechaDesde, 'yyyy-MM-dd');
      this.fechaHasta = this.datePipe.transform(this.fechaHasta, 'yyyy-MM-dd');

      if (this.tipoInforme == 1)
      {
        this.informeCancelados = true;
        this.informeMenos = true;
        this.informeMas = false;

        this.miPedidosService.TraerSoloPedidosMas(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.auxPedidosMasVendido = data;
           this.PedidosMasVendidos = this.auxPedidosMasVendido;
        });
      }

      if (this.tipoInforme == 2)
      {
        this.informeCancelados = true;
        this.informeMenos = false;
        this.informeMas = true;

        this.miPedidosService.TraerSoloPedidosMenos(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.auxPedidosMenosVendido = data;
          this.PedidosMenosVendidos = this.auxPedidosMenosVendido;
        });
      }

      if (this.tipoInforme == 3)
      {
        this.informeCancelados = false;
        this.informeMenos = true;
        this.informeMas = true;

        this.miPedidosService.TraerSoloPedidosCancelados(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.auxPedidosCancelados = data;
          this.PedidosCancelados = this.auxPedidosCancelados;
        }); 
      }
    }
  }

  exportExcel(opcion): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById(opcion); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, 'InformePedidos.xlsx');
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
      });
    }
  }

}
