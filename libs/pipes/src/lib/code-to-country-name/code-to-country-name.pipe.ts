import { Pipe, PipeTransform } from '@angular/core';
import { CountryEnum } from '@lib-pipes';

@Pipe({
  name: 'codeToCountryName',
})
export class CodeToCountryNamePipe implements PipeTransform {
  transform(code: string | undefined, ...args: unknown[]): string {
    try {
      if (code && code in CountryEnum) {
        return CountryEnum[code as keyof typeof CountryEnum];
      } else {
        throw new Error('Unrecognized country code');
      }
    } catch (error) {
      console.error('Error in CodeToCountryNamePipe:', error); // Log the error for debugging
      return 'Unknown Country'; // Return a fallback value to prevent app crashes
    }
  }
}
