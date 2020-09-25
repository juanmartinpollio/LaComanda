import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AltaPedidosComponent } from './componentes/alta-pedidos/alta-pedidos.component';

import { VerificarService } from './servicios/verificar.service';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { MenuProductosComponent } from "./componentes/menu-productos/menu-productos.component";
import { AdmProductoComponent } from 'src/app/componentes/adm-producto/adm-producto.component';
import { AdmMesasComponent } from 'src/app/componentes/adm-mesas/adm-mesas.component';
import { MesasComponent } from 'src/app/componentes/mesas/mesas.component';
import { AdmEmpleadosComponent } from 'src/app/componentes/adm-empleados/adm-empleados.component';
import { AltaEmpleadosComponent } from 'src/app/componentes/alta-empleados/alta-empleados.component';
import { AdmClientesComponent } from './componentes/adm-clientes/adm-clientes.component';
import { MisPedidosComponent } from 'src/app/componentes/mis-pedidos/mis-pedidos.component';
import { RealizarPedidosComponent } from './componentes/realizar-pedidos/realizar-pedidos.component';
import { AdministrarCuentasComponent } from './componentes/administrar-cuentas/administrar-cuentas.component';
import { MenuPrincipalComponent } from 'src/app/componentes/menu-principal/menu-principal.component';
import { InformePedidosComponent } from 'src/app/componentes/informe-pedidos/informe-pedidos.component';
import { InformeMesasComponent } from 'src/app/componentes/informe-mesas/informe-mesas.component';
import { InformeEmpleadosComponent } from 'src/app/componentes/informe-empleados/informe-empleados.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, //LISTO
  { path: 'Login', component: LoginComponent }, //LISTO
  { path: 'MenuPrincipal', component: MenuPrincipalComponent}, //LISTO
  { path: 'AltaPedido/:codigoMesa' , component: AltaPedidosComponent},
  { path: 'Empleados' , component: EmpleadosComponent}, //LISTO
  { path: 'MenuProductos' , component: MenuProductosComponent}, //LISTO
  { path: 'AdministrarProductos/:codigoProducto', component: AdmProductoComponent}, //LISTO
  { path: 'MenuMesas', component: MesasComponent},
  { path: 'AdministrarEmpleados/:nombreUsuario', component: AdmEmpleadosComponent}, //LISTO
  { path: 'AltaEmpleados', component: AltaEmpleadosComponent}, //LISTO
  { path: 'MisPedidos', component: MisPedidosComponent}, //LISTO
  { path: 'AdministrarClientes/:nombreUsuario', component: AdmClientesComponent},  
  { path: 'PedidosARealizar', component: RealizarPedidosComponent},
  { path: 'AdministrarCuentas', component: AdministrarCuentasComponent}, //LISTO
  { path: 'InformePedidos', component: InformePedidosComponent}, //LISTO
  { path: 'InformeMesas', component: InformeMesasComponent}, //LISTO
  { path: 'InformeEmpleados', component: InformeEmpleadosComponent}, //LISTO
  { path: 'MisEncuestas', component: EncuestaComponent}, //LISTO
  { path: 'Registrar', component: RegistrarComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
