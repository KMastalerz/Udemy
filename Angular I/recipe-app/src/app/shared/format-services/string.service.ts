import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  isNullOrWhiteSpace(string: string): boolean {
    if(string === undefined || string === null) return true;
    if(string.trim() === '') return true;

    return false;
  }
}
