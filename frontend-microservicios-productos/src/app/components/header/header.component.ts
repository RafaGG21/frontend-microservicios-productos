import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IProducto } from 'src/app/interfaces/IProducto';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  autenticado : boolean = this.authService.estaAutenticado()
  nombre : string = '';
  termino: string = '';
  producto! : IProducto
  productos : IProducto[] =[]
  id!: number
  constructor(private productosService : ProductosService,
              private authService: AutentificacionService,
              private router: Router,
              public translate: TranslateService) {

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

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    if(!event.option.value){

      return;
    }
    const producto: IProducto = event.option.value

    this.id = producto.id
    this.termino = producto.nombre

  }
  buscando(){
    this.productosService.getSugerencias(this.termino)
    .subscribe(productos => this.productos = productos);
  }

  getPorNombre(){
    this.productosService.getPorNombre(this.termino)
    .subscribe(producto => this.producto = producto);
    this.router.navigate(['/ver-producto/nombre/', this.termino]);
  }

  usarSpanish(){
    this.translate.use("es")
  }

  usarIngles(){
    this.translate.use('en')
  }


}
