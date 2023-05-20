import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducto } from 'src/app/interfaces/IProducto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  nombre!:String
  producto!:IProducto

  constructor(private productosService : ProductosService,
              private route: ActivatedRoute) { }

  ngOnInit() :void {
    this.route.params.subscribe(params => {
      this.nombre = params['nombre'];

    this.productosService.getPorNombre(this.nombre).subscribe(
    producto => this.producto = producto)
  })
}

}
