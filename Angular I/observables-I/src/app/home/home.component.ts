import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable} from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }

  private testIntervalSub: Subscription;


  ngOnInit() {
    // this.testIntervalSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(()=> {
        // if(count > 3) 
        // {
        //   observer.error(new Error('Count is greater 3'));
        // }

        if(count > 3) {
          observer.complete();
        }
        observer.next(count)
        count++;
      }, 500);
    });

    this.testIntervalSub = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(count=> {
      console.log(count);
    }, error => {
      console.log(error);
      //alert(error.message)
    }, () => {
      console.log('completed'); //error cancels, but not completes
    });

    // this.testIntervalSub = customIntervalObservable.subscribe(count=> {
    //   console.log(count);
    // }, error => {
    //   console.log(error);
    //   //alert(error.message)
    // }, () => {
    //   console.log('completed'); //error cancels, but not completes
    // });
  }

  ngOnDestroy(): void {
    if(this.testIntervalSub) {
      this.testIntervalSub.unsubscribe();
    }
  }
}
