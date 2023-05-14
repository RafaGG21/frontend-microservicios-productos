import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    nombre:     ['', [ Validators.required ]],
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AutentificacionService,
               private emailService: EmailService) { }

  ngOnInit(): void {
  }

  registro() {
    const { nombre, email, password } = this.registerForm.value;

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
            this.authService.registro( nombre, email, password ).subscribe((response: any) => {
              console.log(response)
              if (response.correcto == true){
                sessionStorage.setItem('usuario',email);
                this.emailService.enviarEmailRegistro(nombre, email).subscribe( respEmail =>{
                    console.log(respEmail)
                })
                Swal.fire({
                  text:'Te has registrado correctamente',
                  icon: 'success'
                })

              } else {
                Swal.fire({
                  text:'Error en el registro',
                  icon: 'error'
                })
              }
            } )

          }
        })
  };


}


