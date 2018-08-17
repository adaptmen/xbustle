import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from '@assets/socket.io';

@Injectable()
export class SocketService {
  
  private host: string = "http://localhost:4040";
  private socket: any;
  
  constructor() { 
    this.socket = io(this.host);
    this.socket.on("connect", () => this.connect());
    this.socket.on("disconnect", () => this.disconnect());
    this.socket.on("error", (error: string) => {
        console.log(`ERROR: "${error}"`);
    });
  }
  
  connect () {
    this.socket.connect();
  }
  
  disconnect () {
    this.socket.disconnect();
  }
  
  on(event_name) {
    return new Observable<any>(observer => {
        this.socket.off(event_name);
        this.socket.on(event_name, (data) => {
          observer.next(data);
        });
    });
  }
  
  emit(chanel:string, message:any) {
    return new Observable<any>(observer => {
      this.socket.emit(chanel, message, function (data) {
        if (data.success) {
          observer.next(data.msg);
        } else {
          observer.error(data.msg);
        }
        observer.complete();
      });
    });
    }
  
}