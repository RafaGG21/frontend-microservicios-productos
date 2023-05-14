import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-todos-productos',
  templateUrl: './todos-productos.component.html',
  styleUrls: ['./todos-productos.component.css']
})
export class TodosProductosComponent implements OnInit {

  productos!: any;
  page = 1; // Página actual
  constructor( private productosService : ProductosService) {

  }

  ngOnInit() :void {

    this.productosService.getProductos().subscribe(
    productos => this.productos = productos)
  }

}
