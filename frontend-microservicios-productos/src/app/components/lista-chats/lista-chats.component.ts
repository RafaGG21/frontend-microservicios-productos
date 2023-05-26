import { Component, OnInit } from '@angular/core';
import { IChat } from 'src/app/interfaces/IChat';
import { ChatService } from 'src/app/services/chat.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatCompradorComponent } from '../chat-comprador/chat-comprador.component';

@Component({
  selector: 'app-lista-chats',
  templateUrl: './lista-chats.component.html',
  styleUrls: ['./lista-chats.component.css']
})
export class ListaChatsComponent implements OnInit {
  vendedor! : any;
  listaChats: any

  constructor(private chatService: ChatService,
              private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.vendedor = sessionStorage.getItem("nombre")
    this.chatService.getChatsVendedor(this.vendedor).subscribe( listaChats => {
      this.listaChats = listaChats
      console.log(listaChats)
    })

  }

  openDialog(chat: IChat) {
    const dialogRef = this.dialog.open(ChatCompradorComponent, {
      width: '800px',
      data: {  chat: chat}
    });
  }
}
