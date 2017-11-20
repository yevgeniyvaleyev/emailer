import { MyDateFormatPipe } from './date-format.pipe';

describe('MyDateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new MyDateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format date', () => {
    const pipe = new MyDateFormatPipe();
    const dateString = '12/11/2010';
    const dateValue = new Date(dateString).valueOf();

    expect(pipe.transform(dateValue)).toBeTruthy(dateString);
  });
});
