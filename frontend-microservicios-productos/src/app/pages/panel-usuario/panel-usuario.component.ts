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
      console.log(usuario.id)
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
          console.log('Nombre: ', name);
          console.log('Imagen: ', imageUser);

          if (imageInput.files ){
            console.log('Imagen file: ', imageInput!.files[0]);
            const file = imageInput.files[0];

          // Crear una instancia de FileReader
          const reader = new FileReader();

          // Escuchar el evento load, que se dispara cuando la lectura del archivo es exitosa
          reader.onload = () => {
            // Obtener la cadena base64 del archivo leído
            const base64String = reader.result as string;
            console.log('Cadena base64:', base64String);
            // Aquí puedes enviar la cadena base64 al servidor para guardarla en la base de datos
            this.authService.editarUsuario(this.id, name, base64String).subscribe( usuario => {
              this.usuario = usuario;
              console.log("usuario editado", usuario);
            })
          }
          reader.readAsDataURL(file);
          //const imagen = reader.result as string;
          // Leer el contenido del archivo como una URL base64
        }
        }else {
          console.log("error al leer ")
        }

      }

    });
  }


}
