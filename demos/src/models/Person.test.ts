import { Person } from "./Person";

describe('Person constructor', () => {
  const person = new Person('John Doe', 67, 1.67);

  test('should correctly assign name', () => {
    expect(person.name).toBe('John Doe');
  });

  test('should correctly assign weight', () => {
    expect(person.weight).toBe(67);
  });

  test('should correctly assign height', () => {
    expect(person.height).toBe(1.67);
  });

  test('calcIMC method', () => {
    const imc = person.calcIMC();
    expect(imc).toBe('normal');
  });
});
