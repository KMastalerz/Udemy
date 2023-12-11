import { Component } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css'
})
export class SuccessAlertComponent {
  serverID: Number = 100;
  serverSatatus: string = 'Online';

  getServerStatus(): string {
    return this.serverSatatus;
  }
}
