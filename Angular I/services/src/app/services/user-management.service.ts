import { Injectable } from '@angular/core';
import { UserCounterService } from './user-counter.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private userCounterServices: UserCounterService) { 

  }

  inactiveUsers: string[] = ['Max', 'Anna'];
  activeUsers: string[] = ['Chris', 'Manu'];

  //expose values further
  deactivationCount: number = 0;
  activationCount: number = 0;

  setToInactive(id: number) {
    let user = this.activeUsers.splice(id, 1)[0];
    this.inactiveUsers.push(user)
    this.deactivationCount = this.userCounterServices.addDeactivation();
  }

  setToActive(id: number) {
    let user = this.inactiveUsers.splice(id, 1)[0];
    this.activeUsers.push(user)
    this.activationCount = this.userCounterServices.addActivation();
  }
}
