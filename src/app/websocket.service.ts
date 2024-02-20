// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {env} from "../env/env";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket!: WebSocket;
  private messageSubject: Subject<string> = new Subject();
  public host: string = env.apiUrlHostedFargus
  public wasHostChanged = false

  public connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = (event) => {
        console.log('WebSocket Open');
    }

    this.socket.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket Closed', event);
      this.retryConnection(url);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
  }

  public sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  private retryConnection(url: string) {
    timer(2000)
        .subscribe(() => {
          console.log('Retrying WebSocket connection...');
          const socketURL = this.host === env.apiUrlHostedFargus ? `wss://${this.host.replace('https://', '')}ws/video-info` :
              `ws://${this.host.replace('http://', '')}ws/video-info`;

          this.connect(this.wasHostChanged ? socketURL : url);
        });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
