import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { EmailService } from 'src/app/services/email.service';
import { Component, OnInit } from '@angular/core';
import { IRespuesta } from 'src/app/interfaces/IRespuesta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  restablecerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private emailService :EmailService) { }

  ngOnInit() {
    this.restablecerForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  recuperarPassword(){
    const { email} = this.restablecerForm.value;

        Swal.fire({
          title: '¿Tu email es correcto ? Se te va a enviar un correo para restablecer la contraseña',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, restablecer contraseña',
          cancelButtonText: 'No, me he equivocado'
        }).then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {
            this.emailService.enviarEmailRestablecerPassword(email).subscribe( resp =>{
              if(resp.correcto){
                Swal.fire({
                  text:`Se ha enviado un email a  ${email}`,
                  icon: 'success'
                })
              } else {
                Swal.fire({
                  text:`Error al enviar el email a  ${email}`,
                  icon: 'error'
                })
              }
            })

          }
        
       else {

      }
    })
  }
}
