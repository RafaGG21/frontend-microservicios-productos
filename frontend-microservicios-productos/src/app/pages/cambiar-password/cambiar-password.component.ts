import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRespuestaToken } from 'src/app/interfaces/IRespuestaToken';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPasswordForm!: FormGroup;
  token!: any;
  id!: number
  usuario!: IRespuestaToken
  constructor(private route: ActivatedRoute, private authService: AutentificacionService,
     private router: Router,private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.cambiarPasswordForm = this.formBuilder.group({
      email: [''],
      password: ['', Validators.required]
    });
    this.token = this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.authService.confirmacionTokenPassword(this.token).subscribe( usuario => {
        this.usuario = usuario;
        this.id = usuario.idUsuario
        if(this.usuario?.email.length > 0){
          this.cambiarPasswordForm.patchValue({
            email: this.usuario.email
          });

        } else {
          this.router.navigate(['/login']);

        }
      })
    })

  }

  validateToken(token: string): boolean {
    return token !== null && token !== undefined && token.length > 0;
  }

  editarPassword(){
    const { email, password } = this.cambiarPasswordForm.value;
        Swal.fire({
          title: '¿Estas seguro de la contraseña que has introducido?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, restablecer contraseña',
          cancelButtonText: 'No, me he equivocado'
        }).then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {
            this.authService.editarPassword(this.id,email, password).subscribe( resp =>{
              if(resp.correcto){
                Swal.fire({
                  text:'Has restaurado tu contraseña correctamente',
                  icon: 'success'
                })
                this.router.navigateByUrl('/login')
              } else {
                Swal.fire({
                  text:'Error en el restablecimiento de tu contraseña',
                  icon: 'error'
                })
              }
            } )

          }
        })
      
    
  }
}
