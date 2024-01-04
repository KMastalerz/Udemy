import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrl: './inactive-users.component.css'
})
export class InactiveUsersComponent {
  constructor(public userManagamentService: UserManagementService) {}
  onSetToActive(id: number) {
    this.userManagamentService.setToActive(id);
  }

  /* Provided Codebase
  @Input() users: string[];
  @Output() userSetToActive = new EventEmitter<number>();

  onSetToActive(id: number) {
    this.userSetToActive.emit(id);
  }
  */
}
