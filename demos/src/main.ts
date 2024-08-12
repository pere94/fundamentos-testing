import { Person } from './models/Person.ts';
import { sum } from './services/suma/suma.ts'

const result = sum(1, 6)
console.log("🚀 ~ result:", result)


const person = new Person('John Doe', 67, 1.67);
const imc = person.calcIMC();
console.log("🚀 ~ imc:", imc)
