import { Injectable } from '@angular/core';
import {BaseEvent} from '../events/base.event';

export type SocketEventSubscriber<EVENT_TYPE extends BaseEvent> = (event: EVENT_TYPE) => void;

@Injectable()
export class SocketService {

  private webSocket: WebSocket;

  /** For Every EventType, there can be multiple subscribers: */
  private subscribers: Map<string, SocketEventSubscriber<any>[]> = new Map();

  constructor() { }

  //
  // Connections:
  //

  connectToRoom(userName: string, roomName: string) {
    this.disconnect();
    this.webSocket = new WebSocket('ws://localhost:8080/websockets/chat');
    this.setupWebsocketHandlers();
  }

  disconnect() {
    if (this.webSocket && this.webSocket.readyState === this.webSocket.OPEN) {
      this.webSocket.close();
    }
  }

  //
  // Pub / Sub on Events:
  //

  private setupWebsocketHandlers() {
    this.webSocket.onopen = () => {
      console.log(`Established Websocket Connection: ${this.webSocket.url}!`);
    };
    this.webSocket.onclose = () => {
      console.log('Websocket Connection closed!');
    };
    this.webSocket.onmessage = (rawEvent: MessageEvent) => { // ES6 MessageEvent - don't confuse with ChatMessageEvent
      let parsedEvent: BaseEvent = JSON.parse(rawEvent.data);
      let subscribers: SocketEventSubscriber<any>[] = this.subscribers.get(parsedEvent.eventType);

      // console.log(rawEvent);
      // console.log(parsedEvent);

      if (subscribers) {
        for (let subscriber of subscribers) {
          subscriber(parsedEvent);
        }
      }
    };
    console.log('Setting up websocket handlers finished.');
  }

  send(event: BaseEvent) {
    this.webSocket.send(JSON.stringify(event));
  }

  subscribe(eventType: string, callback: SocketEventSubscriber<any>) {
    let existingSubscribers: SocketEventSubscriber<any>[] = this.subscribers.get(eventType);
    if (existingSubscribers) {
      existingSubscribers.push(callback);
    } else {
      // First Subscriber for this eventtype:
      this.subscribers.set(eventType, [callback]);
    }
  }
}


