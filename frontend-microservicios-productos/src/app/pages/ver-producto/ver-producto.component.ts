import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducto } from 'src/app/interfaces/IProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from 'src/app/components/chat/chat.component';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  nombre!:String
  producto!:IProducto

  constructor(private productosService : ProductosService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() :void {
    this.route.params.subscribe(params => {
      this.nombre = params['nombre'];

    this.productosService.getPorNombre(this.nombre).subscribe(
    producto => this.producto = producto)
  })
}

openDialog(producto: IProducto) {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '800px',
      data: { producto: producto, comprador: sessionStorage.getItem("nombre"), vendedor: producto.nombreUsuario }
    });
  }
}
