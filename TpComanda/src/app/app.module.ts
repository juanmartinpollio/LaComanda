import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//RUTEO
import { AppRoutingModule } from './app-routing.module';

//COMPONENTES 
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';

//SERVICIOS
import { HttpService } from './servicios/http.service';
import { UsuarioService } from './servicios/usuario.service';
import { VerificarService } from './servicios/verificar.service';

//VISUALES
import { VisualesModule } from './modulos/visuales/visuales.module';
import { AltaEmpleadosComponent } from './componentes/alta-empleados/alta-empleados.component';
import { AltaPedidosComponent } from './componentes/alta-pedidos/alta-pedidos.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { MenuProductosComponent } from './componentes/menu-productos/menu-productos.component';
import { ProductoHabilitadoPipe } from './pipes/producto-habilitado.pipe';
import { ProductoTipoPipe } from './pipes/producto-tipo.pipe';
import { AdmProductoComponent } from './componentes/adm-producto/adm-producto.component';
import { AdmMesasComponent } from './componentes/adm-mesas/adm-mesas.component';
import { MesasComponent } from './componentes/mesas/mesas.component';
import { AdmEmpleadosComponent } from 'src/app/componentes/adm-empleados/adm-empleados.component';
import { UsuarioEstadoPipe } from './pipes/usuario-estado.pipe';
import { UsuarioTipoPipe } from './pipes/usuario-tipo.pipe';
import { AdmClientesComponent } from './componentes/adm-clientes/adm-clientes.component';
import { MisPedidosComponent } from './componentes/mis-pedidos/mis-pedidos.component';
import { PedidoproductoestadoPipe } from './pipes/pedidoproductoestado.pipe';
import { RealizarPedidosComponent } from './componentes/realizar-pedidos/realizar-pedidos.component';
import { AdministrarCuentasComponent } from './componentes/administrar-cuentas/administrar-cuentas.component';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { EstadisticaSocioComponent } from './componentes/estadistica-socio/estadistica-socio.component';
import { InformeEmpleadosComponent } from './componentes/informe-empleados/informe-empleados.component';
import { InformePedidosComponent } from './componentes/informe-pedidos/informe-pedidos.component';
import { InformeMesasComponent } from './componentes/informe-mesas/informe-mesas.component';
import { ProductoSectorPipe } from './pipes/producto-sector.pipe';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { MesaEstadoPipe } from './pipes/mesa-estado.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    AltaEmpleadosComponent,
    AltaPedidosComponent,
    EncuestaComponent,
    EmpleadosComponent,
    MenuProductosComponent,
    ProductoHabilitadoPipe,
    ProductoTipoPipe,
    AdmProductoComponent,
    AdmMesasComponent,
    MesasComponent,
    AdmEmpleadosComponent,
    UsuarioEstadoPipe,
    UsuarioTipoPipe,
    AdmClientesComponent,
    MisPedidosComponent,
    PedidoproductoestadoPipe,
    RealizarPedidosComponent,
    AdministrarCuentasComponent,
    MenuPrincipalComponent,
    EstadisticaSocioComponent,
    InformeEmpleadosComponent,
    InformePedidosComponent,
    InformeMesasComponent,
    ProductoSectorPipe,
    RegistrarComponent,
    MesaEstadoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VisualesModule
  ],
  providers: [HttpService,UsuarioService,VerificarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

