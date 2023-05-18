import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { EmailService } from 'src/app/services/email.service';
import { Component, OnInit } from '@angular/core';

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
    this.emailService.enviarEmailRestablecerPassword(email).subscribe((response: any) => {
      console.log(response)
    })
  }
}
