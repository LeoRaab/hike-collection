import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(durationInMinutes: number): string {

    const days = Math.trunc(durationInMinutes / 1440);
    const hours = Math.trunc(durationInMinutes / 60);
    const minutes = durationInMinutes - hours * 60;

    let formattedDuration = hours + 'h ' + minutes + 'min';

    if (days > 0) {
      const cleanedHours = hours - days * 24;
      formattedDuration = days + 'd ' + cleanedHours + 'h ' + minutes + 'min';
    }

    return formattedDuration;
  }
}
