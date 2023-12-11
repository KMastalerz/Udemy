import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  //setter name has to be same as selector
  @Input() set appUnless(condition: boolean) {
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    } 
  };

  //what (TemplateRef) and where | ViewContainerRef (where)
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
