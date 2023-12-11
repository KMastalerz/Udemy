import {Component} from '@angular/core'

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
      .online {
        padding: 20px;
        border: 1px solid green;  
        background-color: palegreen;
      }
      .offline {
        padding: 20px;
        border: 1px solid red;  
        background-color: mistyrose;
      }
    `]
}) 
export class ServerComponent {
    serverID: Number = 100;
    serverSatatus: string = 'offline';

    constructor() {
      this.serverSatatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus(): string {
      return this.serverSatatus;
    }

    getColor(): string {
      return this.serverSatatus === 'offline' ? 'darkred' : 'green';
    }

    getClass() : string {
      return this.serverSatatus;
    }
}