import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from './model/message.model';
import {SocketService} from '../_common/service/socket.service';
import {ActivatedRoute} from '@angular/router';
import {SystemMessage} from './model/system-message.model';

/**
 * > Show Messages in the Chat:
 *    Use the field 'this.messages'. Every message you push into the array will be displayed within the chat-panel:
 *    this.messages.push(new Message(...));
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatBody')
  private chatBody: ElementRef;

  @ViewChild('chatMsg')
  private chatMsg: ElementRef;

  private messages: Message[] = [];

  userName = 'User number' + Math.floor(Math.random() * 100);
  roomName = 'Our first Chatroom';

  constructor() { }

  ngOnInit() {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // TODO: INSERT IMPLEMENTATION HERE: Create Websocket Connection!

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  /**
   * The user wants to send a message:
   */
  sendMessage(msg: string) {
    if (msg) {

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // TODO: INSERT IMPLEMENTATION HERE (Send the message)

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Show our own message to ourselves:
      this.messages.push(new Message(null, msg, new Date(), true));
      this.clearMessageInput(); // Clear the input for the next message.
    }
  }

  //
  // View / Styling, (just ignore this):
  //

  /**
   * @param {Message} msg
   * @returns {boolean} true if the "meta infos" (sender's name & timestamp) should be displayed for the given message
   */
  hasMeta(msg: Message) {
    // SystemMessages have no meta infos displayed:
    return !(msg instanceof SystemMessage);
  }

  ngAfterViewChecked(): void {
    // Scroll to bottom of chat:
    this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
  }

  private clearMessageInput() {
    this.chatMsg.nativeElement.value = null;
  }
}
