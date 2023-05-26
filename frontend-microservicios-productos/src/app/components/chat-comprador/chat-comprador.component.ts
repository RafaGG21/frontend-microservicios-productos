import { Component, OnInit, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChat } from 'src/app/interfaces/IChat';
import { IMensajes } from 'src/app/interfaces/IMensajes';
import { ChatService } from 'src/app/services/chat.service';

import { Client } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client'
import { interval } from 'rxjs';
@Component({
  selector: 'app-chat-comprador',
  templateUrl: './chat-comprador.component.html',
  styleUrls: ['./chat-comprador.component.css']
})
export class ChatCompradorComponent implements OnInit {
  private client!: Client;
  chat! : IChat
  mensajes: IMensajes[] = [];
  nuevoMensaje!: string;
  conectado : boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
                      private chatService: ChatService) { }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:8084/chat-websocket")
    }
    this.client.onConnect = (frame) => {
      console.log('Conectado: '+ this.client.connected + ' : ' + frame)
      this.conectado = true

      this.client.subscribe('/chat/mensaje', e => {
        let mensaje = JSON.parse(e.body) as IMensajes
        this.mensajes.push(mensaje)
      })
    }
    this.client.activate();
    this.chatService.getChatsId(this.data.chat.id).subscribe( chat => {
      if (chat != null) {
        console.log("Chat recuperado");
        this.chat = chat;
        this.chatService.getMensajesChat(this.data.chat.id).subscribe(
          mensajes => {
            this.mensajes = mensajes;
          }
        );
      }
    });

    
    interval(1000).subscribe(() => {
      this.chatService.getMensajesChat(this.chat.id).subscribe(
        mensajes => {
          this.mensajes = mensajes;
        }
      )});
  }

  enviarMensaje(){
    this.client.publish({'destination': 'app/mensaje', body: JSON.stringify(this.nuevoMensaje)})
    this.chatService.crearMensaje(this.nuevoMensaje , this.chat.id ,this.data.chat.vendedor).subscribe( mensaje => {
      this.mensajes.push(mensaje)
    })
  }

}
