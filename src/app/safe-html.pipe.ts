import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml'
})
export class escapeHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return value.split('&lt;').join('<').split('&gt;').join('>');
  }
}