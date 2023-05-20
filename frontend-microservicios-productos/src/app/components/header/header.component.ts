import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  autenticado : boolean = this.authService.estaAutenticado()

  constructor(private authService: AutentificacionService,
              private router: Router) { }


  cerrarSesion(){
    this.autenticado = this.authService.estaAutenticado()

    if(this.autenticado){
      sessionStorage.removeItem("usuario")
      this.router.navigateByUrl('/login')
      this.autenticado = false
    }
  }

  estaAutenticado() : boolean{
    return this.authService.estaAutenticado()
  }


}
