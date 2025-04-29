import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adjective',
})
export class AdjectivePipe implements PipeTransform {
  private readonly conversions: ReadonlyMap<string, string> = new Map([
    ['Sun', 'sunny'],
    ['Rain', 'rainy'],
    ['Clouds', 'cloudy'],
    ['Fog', 'fogy'],
    ['Snow', 'snowy'],
  ]);

  transform(value: string | undefined, ...args: unknown[]): string {
    if (value && this.conversions.has(value)) {
      return this.conversions.get(value as string) as string;
    }
    return value as string;
  }
}
