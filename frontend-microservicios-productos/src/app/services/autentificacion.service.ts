import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { IRespuesta } from '../interfaces/IRespuesta';
import { IRespuestaToken } from '../interfaces/IRespuestaToken';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  //private headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})

  constructor(private http: HttpClient) { }

  private baseUrl :String = 'http://localhost:8085'

  private tokenUrl :String = 'http://localhost:4200'

  registro( nombre: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/registrar`;
    const body = { email, nombre ,password };
    return this.http.post<IRespuesta>( url, body)
  }

  login( email: string, password: string ) {

    const url  = `${ this.baseUrl }/login`;
    const body = { email, password };

    return this.http.post<IRespuesta>( url, body )

  }

  estaAutenticado(): boolean {
    return sessionStorage.getItem('usuario') != null
  }

  confirmacionTokenPassword( token: string) {

    const url  = `${ this.baseUrl }/cambiar-password?token=${token}`;
    return this.http.get<IRespuestaToken>(url)
  }

  editarPassword(id: number, email: string, password: string) {
    const body = { email, password };
    const url  = `${ this.baseUrl }/editar-password/${id}`;
    return this.http.put<IRespuesta>(url, body)
  }

  getUsuarioPorEmail(email: string){
    const url  = `${ this.baseUrl }/email/${email}`;
    return this.http.get<IUsuario>(url)
  }

  editarUsuario(id: number, nombre: string, imagen: string) {
    console.log(imagen)
    const body = { nombre, imagen };
    const url  = `${ this.baseUrl }/editar-usuario/${id}`;
    return this.http.put<IUsuario>(url, body)
  }
}
