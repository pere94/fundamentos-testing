import { sum } from './suma'

describe('sum function', () => {
  test('adds two positive numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('adds two negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3)
  })

  test('adds a positive and a negative number', () => {
    expect(sum(1, -2)).toBe(-1)
  })

  test('adds zero to a number', () => {
    expect(sum(0, 5)).toBe(5)
  })

  // Prueba para números grandes
  test('adds two large numbers', () => {
    expect(sum(1e6, 1e6)).toBe(2e6)
  })

  // Prueba para números decimales
  test('adds two decimal numbers', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 5) // Usar `toBeCloseTo` para manejar precisión de flotantes
  })

  // Prueba para entrada null o undefined
  test('handles non-numeric input', () => {
    expect(sum(null as any, 2)).toBeNull()
    expect(sum(undefined as any, 2)).toBeNull()
    expect(sum(2, null as any)).toBeNull()
    expect(sum(2, undefined as any)).toBeNull()
  })

  // Prueba para entrada no numérica
  test('handles non-numeric input', () => {
    expect(sum('a' as any, 2)).toBeNull()
  })
})
