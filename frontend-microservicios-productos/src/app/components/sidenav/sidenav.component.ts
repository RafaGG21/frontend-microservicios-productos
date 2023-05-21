import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AutentificacionService) { }

  email: any
  id!:number;
  usuario!: IUsuario;
  selectedImage?: File | null;
  isExpanded: boolean = false;

  ngOnInit(): void {
    this.email = sessionStorage.getItem('usuario') ;
    this.authService.getUsuarioPorEmail(this.email).subscribe(usuario => {
      this.usuario = usuario
      this.id = usuario.id
    })
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedImage) {
      // Aquí puedes realizar la lógica para cargar la imagen
      // Puedes usar una librería como ngx-image-compress para comprimir la imagen antes de cargarla
      console.log('Imagen seleccionada:', this.selectedImage);
    }
  }
  editarUsuario(){
    Swal.fire({
      title: 'Editar usuario',
      html: `
        <input type="text" id="name" placeholder="Nombre" class="swal2-input">
        <input type="file" (change)="onFileSelected($event)" accept="image/*" style="margin-top:15px;" id="imageUser">

      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      preConfirm: () => {

        // Aquí puedes obtener los valores ingresados por el usuario y realizar acciones de guardado
        const nameInput = Swal.getPopup()?.querySelector('#name') as HTMLInputElement;
        const imageInput = Swal.getPopup()?.querySelector('#imageUser') as HTMLInputElement;
        //const fileInput = document.getElementById('fileInput') as HTMLInputElement
        if (nameInput && imageInput && nameInput.value && imageInput.value) {
          const name = nameInput.value;
          const imageUser = imageInput.value;

          if (imageInput.files ){

            const file = imageInput.files[0];
            const reader = new FileReader();
            reader.onload = () => {

            const base64String = reader.result as string;
            this.authService.editarUsuario(this.id, name, base64String).subscribe( usuario => {
              this.usuario = usuario;

            })
          }
          reader.readAsDataURL(file);

        }
        }else {
          console.log("error al leer ")
        }

      }

    });
  }

}
