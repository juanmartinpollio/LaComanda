import { Component, OnInit } from '@angular/core';
import { MesaService } from "src/app/servicios/mesa.service";
import { DatePipe } from '@angular/common';
import { EncuestasService } from "src/app/servicios/encuestas.service";
import { VerificarService } from '../../servicios/verificar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-informe-mesas',
  templateUrl: './informe-mesas.component.html',
  styleUrls: ['./informe-mesas.component.scss'],
  providers: [DatePipe]
})
export class InformeMesasComponent implements OnInit {

  fechaDesde : any;
  fechaHasta : any;
  tipoInforme : any = 0;
  tipo : number = 6;
  usuario : string;

  MesaMasUsada : any = {
    Cantidad: 0,
    MesaNombre: '',
    CuentaFecha: ''
  };

  MesaMenosUsada : any = {
    Cantidad: 0,
    MesaNombre: '',
    CuentaFecha: ''
  };

  MesaMenosFacturada : any = {
    Total: 0, 
    MesaNombre: '', 
    CuentaFecha: ''
  };

  MesaMasFacturada : any = {
    Total: 0, 
    MesaNombre: '', 
    CuentaFecha: ''
  };

  MesaFacturaMayor : any = {
    CuentaImporte: 0, 
    MesaNombre: '', 
    CuentaFecha: ''
  };

  MesaFacturaMenor : any = {
    CuentaImporte: 0, 
    MesaNombre: '', 
    CuentaFecha: ''
  };

  MesaMasMenosUsadas : any = [];
  MesaMasMenosFacturadas : any = [];
  MesaFacturasMayores : any = [];
  MesaFacturasMenores : any = [];
  MesaFacturacion : any = [];

  AuxEncuestaPeor : any = [];
  EncuestaPeor : any = [];
  AuxEncuestaMejor : any = [];
  EncuestaMejor : any = [];

  informeGeneral : boolean = true;
  informeFacturacion : boolean = true;
  informePeorEncuestas : boolean = true;  
  informeMejorEncuestas : boolean = true;
  bandAbreInforme : boolean = false;
  msgs : any = [];

  constructor(public miMesasService : MesaService, public miEncuestasService : EncuestasService, private datePipe : DatePipe, public router : Router, public verificarService : VerificarService) { }

  generarNuevo()
  {
    this.bandAbreInforme = false;
  }

  buscarInformes()
  {
    this.EncuestaPeor = [];
    this.EncuestaMejor = [];

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
        this.informeGeneral = false;
        this.informeFacturacion = true;
        this.informePeorEncuestas = true;
        this.informeMejorEncuestas = true;

        this.miMesasService.BuscarMesaTopUsada(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.MesaMasMenosUsadas = data;
          this.MesaMasUsada = this.MesaMasMenosUsadas[0];
          this.MesaMenosUsada = this.MesaMasMenosUsadas[this.MesaMasMenosUsadas.length - 1];
        });

        this.miMesasService.BuscarMesaTopFacturo(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.MesaMasMenosFacturadas = data;
          this.MesaMasFacturada = this.MesaMasMenosFacturadas[0];
          this.MesaMenosFacturada = this.MesaMasMenosFacturadas[this.MesaMasMenosFacturadas.length - 1];
        });

        this.miMesasService.BuscarMesaTopFacturaMenor(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.MesaFacturasMenores = data;
          this.MesaFacturaMenor = this.MesaFacturasMenores[0];
        });

        this.miMesasService.BuscarMesaTopFacturaMayor(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.MesaFacturasMayores = data;
          this.MesaFacturaMayor = this.MesaFacturasMayores[0];
        });
      }

      if (this.tipoInforme == 2)
      {
        this.informeGeneral = true;
        this.informeFacturacion = false;
        this.informePeorEncuestas = true;
        this.informeMejorEncuestas = true;

        this.miMesasService.BuscarMesaTopFacturacion(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.MesaFacturacion = data;
        });
      }

      if (this.tipoInforme == 3)
      {
        this.informeGeneral = true;
        this.informeFacturacion = true;
        this.informePeorEncuestas = true;
        this.informeMejorEncuestas = false;

        this.miEncuestasService.TraerEncuestasMejores(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.AuxEncuestaMejor = data;

          for (let i = 0; i < this.EncuestaMejor.length; i++) 
          {
            this.EncuestaMejor.push(this.AuxEncuestaMejor[i]);            
          }          
        });
      }

      if (this.tipoInforme == 4)
      {
        this.informeGeneral = true;
        this.informeFacturacion = true;
        this.informePeorEncuestas = false;
        this.informeMejorEncuestas = true;
      
        this.miEncuestasService.TraerEncuestasPeores(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.AuxEncuestaPeor = data;

          for (let i = 0; i < this.EncuestaPeor.length; i++) 
          {
            this.EncuestaPeor.push(this.AuxEncuestaPeor[i]);            
          }          
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
     XLSX.writeFile(wb, 'InformeMesas.xlsx');
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
