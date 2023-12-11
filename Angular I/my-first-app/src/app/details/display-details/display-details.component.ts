import { Component } from '@angular/core';


@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrl: './display-details.component.css'
})
export class DisplayDetailsComponent {
  displayParagraph: boolean = false;
  buttonClicks: Date[] = []; //log[] = [];

  displayDetails() : void {
    this.displayParagraph = !this.displayParagraph;

    /*
    let now = new Date();
    let timeStamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getHours()}:${now.getMinutes()}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  
    let newLog: log = {
      id: this.buttonClicks.length + 1,
      timeStamp: timeStamp
    }

    this.buttonClicks.push(newLog);
    */

    this.buttonClicks.push(new Date());
  }

  showHistory() : boolean {
    return this.buttonClicks.length > 0;
  }
}

export interface log {
  id;
  timeStamp: string;
}