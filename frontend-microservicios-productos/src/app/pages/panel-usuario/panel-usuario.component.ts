import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {

  constructor(private authService: AutentificacionService) { }
  email: any
  id!:number;
  selectedImage?: File | null;
  usuario!: IUsuario;

  ngOnInit(): void {
    this.email = sessionStorage.getItem('usuario') ;
    this.authService.getUsuarioPorEmail(this.email).subscribe(usuario => {
      this.usuario = usuario
      this.id = usuario.id
      sessionStorage.setItem("nombre", usuario.nombre)
    })
  }


}
