import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  { path: '', component: ChatListComponent },
  { path: 'chats/:roomName/:userName', component: ChatComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

