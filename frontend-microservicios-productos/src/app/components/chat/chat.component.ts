import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChat } from 'src/app/interfaces/IChat';
import { IMensajes } from 'src/app/interfaces/IMensajes';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  chat! : IChat
  mensajes: IMensajes[] = [];
  nuevoMensaje: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChatPorCompradorYVendedor(this.data.comprador, this.data.vendedor).subscribe( chat => {
      if(chat == null || chat.id == null){
        console.log("chat nulo")
        this.chatService.crearChat(this.data.comprador, this.data.vendedor).subscribe( chat => {
          this.chat = chat
        })
      } else {
        console.log("chat recuperado")
        this.chat = chat
        this.chatService.getMensajesChat(this.chat.id).subscribe( mensajes => {
          this.mensajes =mensajes
        })
      }
    })
  }

  enviarMensaje(){
    this.chatService.crearMensaje(this.nuevoMensaje , this.chat.id ,this.data.comprador).subscribe( mensaje => {
      this.mensajes.push(mensaje)
    })
  }
}
