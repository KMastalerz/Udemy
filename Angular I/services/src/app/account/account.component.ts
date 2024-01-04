import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingServices } from '../services/logging.services';
import { LoggingNewService } from '../services/logging-new.service';
import { AccountService } from '../services/account.service';
import { AccountNotSingletonService } from '../services/account-not-singleton.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  // providers: [LoggingServices, AccountNotSingletonService]
})
export class AccountComponent {

  constructor(private acctSrvc: AccountService) {}
  // constructor(private loggingSrvc: LoggingNewService,
  //             private acctSrvc: AccountNotSingletonService) {}
  @Input() account: {name: string, status: string};
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();


  onSetTo(status: string) {
    // this.statusChanged.emit({id: this.id, newStatus: status});
    this.acctSrvc.updateStatus(this.id, status);
    // this.loggingSrvc.logStatusChange(status);

    this.acctSrvc.statusUpdated.emit(status);
  }
}
