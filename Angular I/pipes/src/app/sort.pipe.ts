import { Pipe, PipeTransform } from '@angular/core';
import { Direction } from './app.component';


@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list: any[], column: string, order?: Direction): any[] {
    if(list.length < 2) return list;
    console.log(list);
    if(order === Direction.Descending)
      return list.sort((a, b) => 
        b[column].localeCompare(a[column]))
    else 
    return list.sort((a, b) => 
        a[column].localeCompare(b[column]))
  
  }
}
