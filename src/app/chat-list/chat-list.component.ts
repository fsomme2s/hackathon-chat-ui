import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../_common/service/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  private roomNames: string[] = ['Dummy-Chatroom 1', 'Dummy-Chatroom 2'];

  @ViewChild('roomNameInput')
  private roomNameInput: ElementRef;

  @ViewChild('userNameInput')
  private userName: ElementRef;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // TODO: INSERT IMPLEMENTATION HERE (Make the SocketService work)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  openRoom(roomName?: string) {
    if (! roomName) {
      roomName = this.roomNameInput.nativeElement.value;
    }
    this.router.navigate(['/chats', roomName, this.userName.nativeElement.value]);
  }
}
