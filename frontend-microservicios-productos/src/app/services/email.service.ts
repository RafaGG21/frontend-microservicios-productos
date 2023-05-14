import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  private baseUrl :String = 'http://localhost:8087'

  enviarEmailRegistro( nombre: string, email: string) {
    const password = null
    const url  = `${ this.baseUrl }/registrado`;
    const body = { email, nombre, password };

    return this.http.post<any>( url, body )


  }
}
