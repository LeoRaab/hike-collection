import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMeter'
})
export class FormatMeterPipe implements PipeTransform {

  transform(meter: number): string {
    let formattedMeter = meter.toString() + ' m';

    if (meter > 999) {
      formattedMeter = formattedMeter.slice(0, 1) + '.' + formattedMeter.slice(1);
    }

    return formattedMeter;
  }

}
