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

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: PanelUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'TodosProductos', component: TodosProductosComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },
  { path: '', redirectTo: 'registro', pathMatch: 'full' }
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
