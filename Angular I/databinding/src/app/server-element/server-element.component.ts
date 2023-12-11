import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, 
AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() {
    console.log('constructor called!');
  }

  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;

  @ViewChild('heading', {static: true}) header: ElementRef; //, {static: true}
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef; //, {static: true}

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('ngOnInit Text Content (header): ', this.header.nativeElement.textContent);
    console.log('ngOnInit Text Content (paragraph): ', this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!', changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('ngAfterViewInit Text Content (header): ', this.header.nativeElement.textContent);
    console.log('ngAfterViewInit Text Content (paragraph): ', this.paragraph.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
