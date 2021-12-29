import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMeter'
})
export class FormatMeterPipe implements PipeTransform {

  transform(meter: number, ...args: unknown[]): unknown {
    let meterString = meter.toString() + ' m';

    if (meter > 999) {
      meterString = meterString.slice(0, 1) + '.' + meterString.slice(1);
    }

    return meterString;
  }

}
