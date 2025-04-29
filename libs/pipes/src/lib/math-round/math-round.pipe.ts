import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathRound',
})
export class MathRoundPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): number {
    value = Number(value);

    try {
      if (!isNaN(value)) {
        return Math.round(value);
      } else {
        throw new Error('Invalid input. NaN cannot be rounded.');
      }
    } catch (error) {
      console.error('[ERROR]', { error });
      return value;
    }
  }
}
