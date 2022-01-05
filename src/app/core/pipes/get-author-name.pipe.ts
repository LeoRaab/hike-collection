import { Pipe, PipeTransform } from '@angular/core';
import {AuthorService} from '../services/author.service';

@Pipe({
  name: 'getAuthorName'
})
export class GetAuthorNamePipe implements PipeTransform {

  constructor(private authorService: AuthorService) {
  }

  transform(authorId: string): string {
    let authorName = '';

    console.log(authorId);

    this.authorService.getAuthorById(authorId)
      .subscribe(author => authorName = author.name);

    return authorName;
  }

}
