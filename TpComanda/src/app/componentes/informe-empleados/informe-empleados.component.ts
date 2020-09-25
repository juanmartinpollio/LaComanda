import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DatePipe } from '@angular/common';
import { ProductoSectorPipe } from 'src/app/pipes/producto-sector.pipe';
import { PedidoproductoestadoPipe } from "src/app/pipes/pedidoproductoestado.pipe";
import { VerificarService } from '../../servicios/verificar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-informe-empleados',
  templateUrl: './informe-empleados.component.html',
  styleUrls: ['./informe-empleados.component.scss'],
  providers: [DatePipe]
})
export class InformeEmpleadosComponent implements OnInit {

  fechaDesde : any;
  fechaHasta : any;
  tipoInforme : any = 0;
  tipoSector : any = 0;
  tipoEstado : any = 0;
  auxUsuariosPorEstado : any = [];
  auxUsuariosPorSector : any = [];
  auxUsuariosPorLogin : any = [];
  UsuariosPorLogin : any = [];
  UsuariosPorEstado : any = [];
  UsuariosPorSector : any = [];
  informeLogin : boolean = true;
  informeSector : boolean = true;
  informeEstado : boolean = true;
  bandAbreInforme : boolean = false;
  tipo : number = 6;
  usuario : string;
  msgs : any = [];

  constructor(public miUsuarioService : UsuarioService, private datePipe : DatePipe, public router : Router, public verificarService : VerificarService) { }

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
        this.informeEstado = true;
        this.informeSector = true;
        this.informeLogin = false;

        this.miUsuarioService.BuscarTodosLogin(this.fechaDesde,this.fechaHasta).subscribe(data => {
          this.auxUsuariosPorLogin = data;
          this.UsuariosPorLogin = this.auxUsuariosPorLogin;
        });
      }

      if (this.tipoInforme == 2)
      {
        this.informeEstado = true;
        this.informeSector = false;
        this.informeLogin = true;

        this.miUsuarioService.BuscarTodosSector(this.fechaDesde,this.fechaHasta).subscribe(data => { 
          this.auxUsuariosPorSector = data;
          this.UsuariosPorSector = [];

          for (let i = 0; i < this.auxUsuariosPorSector.length; i++)
          {
            if(this.auxUsuariosPorSector[i].ProductoTipo == this.tipoSector || this.tipoSector == 0)
            {
              this.UsuariosPorSector.push(this.auxUsuariosPorSector[i]);
            }
          }
        });
      }
      
      if (this.tipoInforme == 3)
      {
        this.informeEstado = false;
        this.informeSector = true;
        this.informeLogin = true;

        this.miUsuarioService.BuscarTodosEstado(this.fechaDesde,this.fechaHasta).subscribe(data => { 
          this.auxUsuariosPorEstado = data;
          this.UsuariosPorEstado = [];

          for (let i = 0; i < this.auxUsuariosPorEstado.length; i++)
          {
            if(this.auxUsuariosPorEstado[i].Estado == this.tipoEstado || this.tipoEstado == 0)
            {
              this.UsuariosPorEstado.push(this.auxUsuariosPorEstado[i]);
            }
          }
        });
      }

    }
  }
  
  generarNuevo()
  {
    this.bandAbreInforme = false;
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
     XLSX.writeFile(wb, 'InformeEmpleados.xlsx');
  }


  ngOnInit() 
  {
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
