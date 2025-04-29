import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degToWindDirection',
})
export class DegToWindDirectionPipe implements PipeTransform {
  private readonly directions: ReadonlyArray<string> = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ];

  transform(degree: number | undefined, ...args: unknown[]): string {
    degree = Number(degree);
    if (degree >= 0 && degree <= 360) {
      const index = Math.round(degree / 45) % 8; // Divide degrees by 45 to find the corresponding index.
      return this.directions[index];
    } else {
      throw new Error(
        'Invalid degree value: The input must be a number between 0 and 360, representing valid compass degrees.'
      );
    }
  }
}
