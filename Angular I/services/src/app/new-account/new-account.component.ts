import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingServices } from '../services/logging.services';
import { AccountService } from '../services/account.service';
import { AccountNotSingletonService } from '../services/account-not-singleton.service';
import { LoggingNewService } from '../services/logging-new.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css',
  // providers: [LoggingServices, AccountNotSingletonService]
})
export class NewAccountComponent {

  constructor(private acctSrvc: AccountService) {
    this.acctSrvc.statusUpdated.subscribe(
      status=>alert('New Status: ' + status)
    );
  }
  // constructor(private loggingSrvc: LoggingNewService,
  //   private acctSrvc: AccountNotSingletonService) {}

  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    this.acctSrvc.addAccount(accountName, accountStatus);
    // this.loggingSrvc.logStatusChange(accountStatus);
  }
}
