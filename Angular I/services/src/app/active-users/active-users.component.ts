import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrl: './active-users.component.css'
})
export class ActiveUsersComponent {
  constructor(public userManagamentService: UserManagementService) {}
  onSetToInactive(id: number) {
    this.userManagamentService.setToInactive(id);
  }

   /* Provided Codebase
  @Input() users: string[];
  @Output() userSetToInactive = new EventEmitter<number>();

  onSetToInactive(id: number) {
    this.userSetToInactive.emit(id);
  }
  */
}
