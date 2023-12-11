import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  /*
  selector can be attribute to use in html as attributre [app-servers] =<div app-servers></div>
  selector can be class to use in html as class .app-servers =<div class="app-servers"></div>
  */
  templateUrl: './servers.component.html',
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>
  // <app-server></app-server>`,
  /* template is mandatory, style is not, we can have it here, or in html */
  styleUrl: './servers.component.css'
  // use can pass multiple style sheets, or write your own styles like styles=`h3{color:black}`
})
export class ServersComponent {
  allowNewServer: boolean = false;
  // serverCreationStatus: string = 'No server was created!';
  serverName = 'Test Server';
  serverCreated: boolean = false;
  servers: string[] = [];

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreatedServer(): void {
    // this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverName = '';
  }

  // onUpdateServerName(event: any): void {
  //   console.log(event);
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }
}
