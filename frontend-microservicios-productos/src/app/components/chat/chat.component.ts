import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChat } from 'src/app/interfaces/IChat';
import { IMensajes } from 'src/app/interfaces/IMensajes';
import { ChatService } from 'src/app/services/chat.service';

import { Client } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
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
    this.chatService.getChatPorCompradorYVendedor(this.data.comprador, this.data.vendedor).subscribe(
      chat => {
        if (chat == null ) {
          console.log("Chat nulo. Creando nuevo chat...");
          this.chatService.crearChat(this.data.comprador, this.data.vendedor).subscribe(
            newChat => {
              this.chat = newChat;
              this.chatService.getMensajesChat(this.chat.id).subscribe(
                mensajes => {
                  this.mensajes = mensajes;
                }
              );
            },
            error => {
              console.log("Error al crear el chat:", error);
              // Maneja el error aquí, por ejemplo, mostrando un mensaje de error al usuario
            }
          );
        } else {
          console.log("Chat recuperado");
          this.chat = chat;
          this.chatService.getMensajesChat(this.chat.id).subscribe(
            mensajes => {
              this.mensajes = mensajes;
            }
          );
        }
      },
      error => {
        console.log("Error al obtener el chat:", error);
        this.chatService.crearChat(this.data.comprador, this.data.vendedor).subscribe(
          newChat => {
            this.chat = newChat;
            this.chatService.getMensajesChat(this.chat.id).subscribe(
              mensajes => {
                this.mensajes = mensajes;
              }
            );
          },
          error => {
            console.log("Error al crear el chat:", error);
            // Maneja el error aquí, por ejemplo, mostrando un mensaje de error al usuario
          }
        );
      }
    );

  
  
  }

  enviarMensaje(){
    this.client.publish({'destination': 'app/mensaje', body: JSON.stringify(this.nuevoMensaje)})
    this.chatService.crearMensaje(this.nuevoMensaje , this.chat.id ,this.data.comprador).subscribe( mensaje => {
      this.mensajes.push(mensaje)
    })
  }
}
