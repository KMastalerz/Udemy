import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive( {
    selector: '[appBasicHighlight]'
})
export class BacisHighlightDirective implements OnInit{
    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}