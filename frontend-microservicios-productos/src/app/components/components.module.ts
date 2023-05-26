import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from 'src/app/pages/registro/registro.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TodosProductosComponent } from 'src/app/pages/todos-productos/todos-productos.component';
import { LoginComponent } from '../pages/login/login.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { PanelUsuarioComponent } from '../pages/panel-usuario/panel-usuario.component';
import { AuthGuard } from '../guards/auth.guard';
import { CambiarPasswordComponent } from '../pages/cambiar-password/cambiar-password.component';

import { HomeComponent } from '../home/home.component';
import { VerProductoComponent } from '../pages/ver-producto/ver-producto.component';

import { SidenavComponent} from '../components/sidenav/sidenav.component';
import { ListaChatsComponent } from './lista-chats/lista-chats.component';



const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: SidenavComponent, canActivate: [AuthGuard] },
  { path: 'TodosProductos', component: TodosProductosComponent },
  { path: 'ver-producto/:id', component: VerProductoComponent },
  { path: 'ver-producto/nombre/:nombre', component: VerProductoComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },
  { path: 'genero/:genero', component: TodosProductosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lista-chats', component: ListaChatsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full', }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ComponentsModule { }
