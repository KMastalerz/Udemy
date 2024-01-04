import { EventEmitter, Injectable } from '@angular/core';
import { LoggingNewService } from './logging-new.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private loggingSrvc: LoggingNewService){};

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>()

  addAccount(name: string, status: string) {
    this.accounts.push( {name: name, status: status});
    this.loggingSrvc.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingSrvc.logStatusChange(status);
  }
}
