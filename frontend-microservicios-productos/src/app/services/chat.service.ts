import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChat } from '../interfaces/IChat';
import { IMensajes } from '../interfaces/IMensajes';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl :String = 'http://localhost:8084'
  constructor(private http: HttpClient) { }

  getChatPorCompradorYVendedor(comprador:string, vendedor:string) {
    return this.http.get<IChat>(`${this.baseUrl}/ver-chat/${comprador}/${vendedor}`)
  };

  crearChat( comprador: string, vendedor: string) {
    const url  = `${ this.baseUrl }/crear-chat`;
    const body = { comprador, vendedor }
    return this.http.post<IChat>( url, body)
  }

  getMensajesChat(chatId: number){
    return this.http.get<IMensajes[]>(`${this.baseUrl}/mensajesPorChat/${chatId}`)
  }

  crearMensaje(contenido : string, chat_id: number, usuarioAutor: string){
    const url  = `${ this.baseUrl }/crear-mensaje`;
    const body = { contenido, chat_id,usuarioAutor }
    return this.http.post<IMensajes>( url, body)
  }
}
