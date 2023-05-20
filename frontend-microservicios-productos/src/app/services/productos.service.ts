import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/IProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl :String = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get(`${this.baseUrl}/listar`)
  };

  getProducto(id:number) {
    return this.http.get<IProducto>(`${this.baseUrl}/ver/${id})`)
  };

  getProductosPorGenero(genero:string) {
    return this.http.get(`${this.baseUrl}/por-genero/${genero}`)
  };
  getSugerencias(termino: string): Observable<IProducto[]>{

    return this.http.get<IProducto[]>(`${this.baseUrl}/buscar?termino=${termino}`);
  }

  getPorNombre(nombre:String): Observable<IProducto>{
    return this.http.get<IProducto>(`${this.baseUrl}/ver/nombre/${nombre}`)

  }

  getPorId(id:number): Observable<IProducto>{
    return this.http.get<IProducto>(`${this.baseUrl}/productos/${id}`)

  }

}
