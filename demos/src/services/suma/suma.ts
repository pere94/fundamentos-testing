function sum (a: number, b: number): number | null {
  if (typeof a !== 'number' || typeof b !== 'number') return null

  return a + b
}

export { sum }
