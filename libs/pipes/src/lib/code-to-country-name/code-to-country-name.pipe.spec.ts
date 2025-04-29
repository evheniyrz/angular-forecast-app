import { CodeToCountryNamePipe } from './code-to-country-name.pipe';

describe('CodeToCountryNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CodeToCountryNamePipe();
    expect(pipe).toBeTruthy();
  });
});
