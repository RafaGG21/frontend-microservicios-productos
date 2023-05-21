import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  autenticado : boolean = this.authService.estaAutenticado()
  numItemsInCart = 0;
  showCartContent = false;
  showUserContent = false;
  email: any
  id!:number;
  usuario!: IUsuario;

  constructor(private authService: AutentificacionService,
              private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('usuario') ;
    this.authService.getUsuarioPorEmail(this.email).subscribe(usuario => {
      this.usuario = usuario
      this.id = usuario.id
    })
  }


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


  toggleCartContent() {
    this.showCartContent = !this.showCartContent;
  }


  toggleUserContent() {
    this.showUserContent = !this.showUserContent;
  }
}
