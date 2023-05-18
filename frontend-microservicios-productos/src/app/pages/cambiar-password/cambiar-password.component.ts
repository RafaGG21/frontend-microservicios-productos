import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRespuestaToken } from 'src/app/interfaces/IRespuestaToken';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPasswordForm!: FormGroup;
  token!: any;

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
      //console.log(this.token);
      this.authService.confirmacionTokenPassword(this.token).subscribe( usuario => {
        this.usuario = usuario;
        //console.log(this.usuario);
        //console.log(this.usuario.email.length > 0);
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

  }
}
