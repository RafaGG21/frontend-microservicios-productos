import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AutentificacionService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Lógica de autenticación
    const { email, password } = this.loginForm.value;

        Swal.fire({
          title: '¿Son tus datos de registro correctos?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, quiero registrarme',
          cancelButtonText: 'No, me he equivocado'
        }).then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {
            this.authService.login( email, password ).subscribe((response: any) => {
              if (response.correcto == true){
                sessionStorage.setItem('usuario',email);
                Swal.fire({
                  text:'Te has registrado correctamente',
                  icon: 'success'
                })
                this.router.navigateByUrl('/dashboard')
              } else {
                Swal.fire({
                  text:'Error en el registro',
                  icon: 'error'
                })
              }
            } )

          }
        })
  }
}
