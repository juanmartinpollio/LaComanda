import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Mesa } from 'src/app/clases/mesa';
import { MesaService } from 'src/app/servicios/mesa.service';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { MesaEstadoPipe } from "src/app/pipes/mesa-estado.pipe";
import { PedidoproductoestadoPipe } from "src/app/pipes/pedidoproductoestado.pipe";

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  public listaMesas : any; // : Array<Mesa> = [];
  public listaMesasDisp : any; //: Array<Mesa> = [];
  public listaMesasOcup : any; //: Array<Mesa> = [];
  public listaMesasCerr : any; //: Array<Mesa> = [];
  public listaUsuarios : any; //: Array<Usuario> = [];
  public listaClientes : any; //: Array<Usuario> = [];
  public clientesEnMesa : any; //: Array<string> = [];
  public clientesACargar : any = []; //: Array<string> = [];
  public listaEstadosEnMesa : any = [];
  public cargaPedido : boolean = true;
  public cierraMesa : boolean = true;
  public abreMesa : boolean = true;
  public reabrirMesa : boolean = true;
  public mesaSeleccionada : string;
  public bandAbreMesa : boolean = false;
  public isLogged : boolean = false;
  public Display : boolean = false;
  public cols: any[];
  public colsCli: any[];
  public cuentaCodigo : any;
  public enMesa : boolean = false;
  public msgs : any = [];
  public listaProductos : any;
  public imagenPDF : any;
  public auxEstadoSeleccionado : any;
  public auxPedidosSeleccionado : any = [];
  public auxUsuariosSeleccionado : any = [];
  public muestraMesa : boolean = true;

  constructor(public miServicioMesas : MesaService, 
              public miServicioCuenta : CuentaService, 
              private router : Router, 
              private route : ActivatedRoute,
              public miServicioUsuario : UsuarioService,
              public http : HttpClient) {
    this.previewFile('/assets/imagenes/pordefecto.jpg');
    this.buscarUsuarios();
    this.buscarClientesEnMesas();
    this.buscarTodasLasMesas();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  previewFile(url) {
    this.http.get(url, { responseType: 'blob' })
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        this.imagenPDF = base64data;
      }

      reader.readAsDataURL(res); 
    });
  }

  reiniciarBotones()
  {
    this.cargaPedido = true;
    this.cierraMesa = true;
    this.abreMesa = true;
    this.reabrirMesa = true;
  }

  buscarUsuarios()
  {
    this.miServicioUsuario.BuscarTodosUsuarios().subscribe(data => {
      
      let auxListaUsuarios : any = [];
      
      for (let i = 0; i < data.length; i++) 
      {
        auxListaUsuarios.push(new Usuario(data[i].usuario,data[i].contrasenia,data[i].tipo,data[i].estado,data[i].usuarioImagen));
      }

      this.listaUsuarios = auxListaUsuarios;
    });
  }

  buscarClientesEnMesas()
  {
    this.miServicioMesas.clientesEnMesas().subscribe( data => {
      let auxClientesEnMesa : any = [];
      
      for (let i = 0; i < data.length; i++) 
      {
        auxClientesEnMesa.push(data[i]);
      }

      this.clientesEnMesa = auxClientesEnMesa;
    });
  }

  buscarTodasLasMesas()
  {
    this.miServicioMesas.BuscarTodasMesas().subscribe(data => {
      let auxListaMesasOcup : any = [];
      let auxListaMesasDisp : any = [];
      let auxListaMesasCerr : any = [];

      for (let i = 0; i < data.length; i++) 
      {
        if (data[i].MesaEstado == 1) //DISPONIBLE
        {
          auxListaMesasDisp.push(new Mesa(data[i].MesaCodigo,data[i].MesaNombre,data[i].MesaCuentaCodigo,data[i].MesaEstado));
        } 
        else 
        {
          if (data[i].MesaEstado == 6) //CERRADA
          {
            auxListaMesasCerr.push(new Mesa(data[i].MesaCodigo,data[i].MesaNombre,data[i].MesaCuentaCodigo,data[i].MesaEstado));
          }
          else //OCUPADA
          {
            auxListaMesasOcup.push(new Mesa(data[i].MesaCodigo,data[i].MesaNombre,data[i].MesaCuentaCodigo,data[i].MesaEstado));
          }
        }
      }

      this.listaMesasDisp = auxListaMesasDisp;
      this.listaMesasOcup = auxListaMesasOcup;
      this.listaMesasCerr = auxListaMesasCerr;
    });
  }

  CargarClientes()
  {
    let auxListaClientes : any = [];

    for (let i = 0; i < this.listaUsuarios.length; i++) 
    {
      this.enMesa = false;
      
      if (this.listaUsuarios[i].tipo != '1') //SI NO ESTÁ PERO NO ES UN CLIENTE
      {
        this.enMesa = true;
      }

      if (this.enMesa == false)
      {
        auxListaClientes.push(this.listaUsuarios[i]);
      }
    }

    this.listaClientes = auxListaClientes;
  }

  seleccionaMesa(codigoMesa)
  {
    this.mesaSeleccionada = codigoMesa;
    this.muestraMesa = false;

    //MESAS DISPONIBLES
    for (let i = 0; i < this.listaMesasDisp.length; i++) 
    {
      if (this.listaMesasDisp[i].mesa_codigo == codigoMesa)
      {
        this.auxEstadoSeleccionado = this.listaMesasDisp[i].estado;
        this.abreMesa = false;
        this.cierraMesa = true;
        this.cargaPedido = true;
        this.reabrirMesa = true;
      }      
    }

    //MESAS OCUPADAS
    for (let i = 0; i < this.listaMesasOcup.length; i++) 
    {
      if (this.listaMesasOcup[i].mesa_codigo == codigoMesa)
      {
        this.auxEstadoSeleccionado = this.listaMesasOcup[i].estado;
        this.cuentaCodigo = this.listaMesasOcup[i].cuentacodigo;
        this.abreMesa = true;
        this.reabrirMesa = true;

        if (this.listaMesasOcup[i].estado == 5)
        {
          this.cierraMesa = true;
          this.cargaPedido = true;
        }
        else
        {
          this.cierraMesa = false;
          this.cargaPedido = false;
        }
      }      
    }

    //MESAS CERRADAS
    for (let i = 0; i < this.listaMesasCerr.length; i++) 
    {
      if (this.listaMesasCerr[i].mesa_codigo == codigoMesa)
      {
        this.auxEstadoSeleccionado = this.listaMesasCerr[i].estado;
        this.abreMesa = true;
        this.cierraMesa = true;
        this.cargaPedido = true;
        this.reabrirMesa = false;
      }      
    }

    this.miServicioMesas.ClientesDeMesa(this.mesaSeleccionada).subscribe(data => {
      this.auxUsuariosSeleccionado = data;
    });

    this.miServicioMesas.PedidosDeMesa(this.mesaSeleccionada).subscribe(data => {
      this.auxPedidosSeleccionado = data;

      for (let i = 0; i < this.auxPedidosSeleccionado.length; i++) 
      {
        if (this.auxPedidosSeleccionado[i].PreparadorCodigo == '' || this.auxPedidosSeleccionado[i].PreparadorCodigo == null)
        {
          this.auxPedidosSeleccionado[i].PreparadorCodigo = '(Ninguno)';
        }
      }
    });

    this.miServicioMesas.EstadosEnMesa(this.mesaSeleccionada).subscribe(data => {
      this.listaEstadosEnMesa = data;

      for (let i = 0; i < this.listaEstadosEnMesa.length; i++) {
        if (this.listaEstadosEnMesa[i]["Estado"] == 1)
        {
          this.cierraMesa = true;
          break;
        }        
      }
    });

    this.CargarClientes();
  }

  crearCuenta()
  {
    this.bandAbreMesa = true;
    this.CargarClientes();
  }

  reiniciarMesa()
  {
    this.miServicioMesas.LiberarMesa(this.mesaSeleccionada).then(data => {
      this.buscarUsuarios();
      this.buscarClientesEnMesas();
      this.buscarTodasLasMesas();
      this.reiniciarBotones();
      this.muestraMesa = true;
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'', detail:'Cuenta reabierta correctamente'});   
    })
  }

  confirmarCuenta()
  {
    this.Display  = true;
    this.isLogged = true;
    this.clientesACargar = [];

    var usuariosEnPopup : any = (<HTMLInputElement[]><any>document.getElementsByName("clientes"));

    for (let i = 0; i < usuariosEnPopup.length; i++) 
    {
      if (usuariosEnPopup[i].type == "checkbox")
      {
        if (usuariosEnPopup[i].checked)
        {
          this.clientesACargar.push(usuariosEnPopup[i].value);
        }
      }      
    }
    
    this.miServicioCuenta.CrearCuenta(this.mesaSeleccionada).then( data => {
          this.miServicioMesas.AsignarClientes(this.mesaSeleccionada,this.clientesACargar).then( data => {
            if (data == true)
            {
              this.bandAbreMesa = false;
              this.buscarUsuarios();
              this.buscarClientesEnMesas();
              this.buscarTodasLasMesas();
              this.reiniciarBotones();
              this.muestraMesa = true;
              this.msgs = [];
              this.msgs.push({severity:'success', summary:'', detail:'Cuenta abierta correctamente'});
              this.Display  = false;
              this.isLogged = false;          
            }
            else
            {
              this.msgs = [];
              this.msgs.push({severity:'error', summary:'Error', detail:'Error al abrir cuenta, por favor intente nuevamente'});
            }
          });  
    });  
  }

  cargarPedido()
  {
    this.router.navigate(['/AltaPedido/'+this.mesaSeleccionada]);
  }

  cerrarMesa()
  {
    this.miServicioCuenta.TraerDetallesCuenta(this.cuentaCodigo).then(data => {
      this.listaProductos = data['respuesta'];
      this.generatePdf();
    })
    this.miServicioCuenta.CerrarCuenta(this.mesaSeleccionada,this.cuentaCodigo).then( data => {
      this.buscarUsuarios();
      this.buscarClientesEnMesas();
      this.buscarTodasLasMesas();
      this.reiniciarBotones();
      this.muestraMesa = true;
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'', detail:'Cuenta cerrada correctamente'});
    });
  }

  async generatePdf(){
    var body = [];
    body.push(['Producto','Importe']);
    let total = 0;
    for (let i = 0; i < this.listaProductos.length; i++) {
      var fila = [];
      fila.push(this.listaProductos[i].ProductoNombre.toString());
      fila.push(this.listaProductos[i].importetotal.toString());
      total += this.listaProductos[i].importetotal;
      body.push(fila);
    }
    var fila = [];
    fila.push('Total');
    fila.push(total);
    body.push(fila);
    var dd = {
      content: [{
        image: this.imagenPDF, width : 50,
        height : 50
      }   ,{
        table: {
          headerRows: 1,
          body: body
        }
      }]
    }
    pdfMake.createPdf(dd).download();
  }

   getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
    };
    reader.onerror = function (error) {
    };
 }

  ngOnInit() {
    this.colsCli = [
      { field: 'usuario', header: 'Cliente' }
    ];
  }

}
