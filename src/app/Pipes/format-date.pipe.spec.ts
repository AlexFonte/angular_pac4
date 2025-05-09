import {FormatDatePipe} from './format-date.pipe';

describe('FormatDatePipe', () => {

  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  //Test 1 , que el pipe se cree correctamente
  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  // Test 2: Donada una data i l’argument 1 retorna el format esperat
  it('should format date as ddmmyyyy when argument is 1', () => {
    const date = new Date(2025, 4, 5);
    const result = pipe.transform(date, 1);
    expect(result).toBe('05052025');
  });

  // Test 3: Donada una data i l’argument 2 retorna el format esperat
  it('should format date as dd / mm / yyyy when argument is 2', () => {
    const date = new Date(2025, 4, 5);
    const result = pipe.transform(date, 2);
    expect(result).toBe('05 / 05 / 2025');
  });

  // Test 4: Donada una data i l’argument 3 retorna el format esperat
  it('should format date as dd/mm/yyyy when argument is 3', () => {
    const date =new Date(2025, 4, 5);
    const result = pipe.transform(date, 3);
    expect(result).toBe('05/05/2025');
  });

  // Test 5: Donada una data i l’argument 4 retorna el format esperat
  it('should format date as yyyy-mm-dd when argument is 4', () => {
    const date = new Date(2025, 4, 5);
    const result = pipe.transform(date, 4);
    expect(result).toBe('2025-05-05');
  });
});
