import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TodosProductosComponent } from './pages/todos-productos/todos-productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './pages/login/login.component';
import { PanelUsuarioComponent } from './pages/panel-usuario/panel-usuario.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CambiarPasswordComponent } from './pages/cambiar-password/cambiar-password.component';

import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegistroComponent,
    TodosProductosComponent,
    ProductoComponent,
    LoginComponent,
    PanelUsuarioComponent,
    ResetPasswordComponent,
    CambiarPasswordComponent,
    HeaderComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
