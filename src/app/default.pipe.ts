import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: string, fallback: string): string {
    let fab_icon = "";
    if (value) {
      fab_icon = value;
    } else {
      fab_icon = fallback;
    }
    return fab_icon;
  }

}
