import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountNotSingletonService } from './services/account-not-singleton.service';
import { UserManagementService } from './services/user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    //i exposed service as public to allow to access the values from service in html code of this component
  constructor(public userManagamentService: UserManagementService) {}
  ngOnInit(): void {
    //not needed
  }


  // constructor(private accSrvc: AccountService) {}
  // constructor(private accSrvc: AccountNotSingletonService) {}
  // ngOnInit(): void {
  //   //this.accounts = this.accSrvc.accounts;
  // }

  //accounts: {name: string, status: string} [] = [];

  /*
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

  onAccountAdded(newAccount: {name: string, status: string}) {
    this.accounts.push(newAccount);
  }

  onStatusChanged(updateInfo: {id: number, newStatus: string}) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
  }
  */
}
