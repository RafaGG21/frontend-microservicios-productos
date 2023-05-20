import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-productos',
  templateUrl: './todos-productos.component.html',
  styleUrls: ['./todos-productos.component.css']
})
export class TodosProductosComponent implements OnInit {
  genero!: string
  productos!: any;
  page = 1; // Página actual
  constructor( private productosService : ProductosService,
                private route: ActivatedRoute) {

  }

  ngOnInit() :void {
      this.route.params.subscribe(params => {
        this.genero = params['genero'];

      this.productosService.getProductosPorGenero(this.genero).subscribe(
      productos => this.productos = productos)
    })
  }

}
