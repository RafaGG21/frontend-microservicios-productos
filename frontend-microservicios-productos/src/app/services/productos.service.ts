import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl :String = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get(`${this.baseUrl}/listar`)
  };

  getProductosPorGenero(genero:string) {
    return this.http.get(`${this.baseUrl}/por-genero/${genero}`)
  };
}
