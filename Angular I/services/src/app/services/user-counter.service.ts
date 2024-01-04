import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCounterService {

  constructor() { }

  activationCount: number = 0;
  deactivationCount: number = 0;

  addActivation(): number {
    this.activationCount++;
    return this.activationCount;
  }

  addDeactivation(): number {
    this.deactivationCount++;
    return this.deactivationCount;
  }
}
