import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { RespuestaDTO } from '../interfaces/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  //private headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})

  constructor(private http: HttpClient) { }

  private baseUrl :String = 'http://localhost:8085'

  registro( nombre: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/registrar`;
    const body = { email, nombre ,password };
    return this.http.post<any>( url, body)


  }

  login( email: string, password: string ) {

    const url  = `${ this.baseUrl }/login`;
    const body = { email, password };

    return this.http.post<RespuestaDTO>( url, body )

  }

  estaAutenticado(): boolean {
    return sessionStorage.getItem('usuario') != null
  }
}
