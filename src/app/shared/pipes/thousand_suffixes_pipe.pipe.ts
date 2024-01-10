import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuffixes'
})
export class ThousandSuffixesPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    const suffixes = ['K', 'M', 'B'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 10000) {
      return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const exp = Math.floor(Math.log(input) / Math.log(10000));
    const index = exp - 1;

    return (input / Math.pow(10000, exp)).toFixed(args) + suffixes[index];
  }
}
