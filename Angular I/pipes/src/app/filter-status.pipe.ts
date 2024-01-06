import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus',
  //pure: false //may leed to performance issues
})
export class FilterStatusPipe implements PipeTransform {

  transform(list: any[], filter: string, column: string, emptyAbort: boolean = false): any[] {
    if(!filter) return list;
    if(list.length === 0) return list;

    return list.filter(rec=> {
      return rec[column].indexOf(filter)>-1;
    });
  }

}
