import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAuthorName'
})
export class GetAuthorNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
