type MathOperation = 'sum' | 'product' | 'min' | 'max' | 'average';

function mathOperations(operation: MathOperation, ...numbers: number[]): number {
  switch (operation) {

    case 'sum':
      return numbers.reduce((acc, num) => acc + num, 0);
    case 'product':
      return numbers.reduce((acc, num) => acc * num, 1);
    case 'min':
      return numbers.length === 0 ? 0 : Math.min(...numbers);
    case 'max':
      return numbers.length === 0 ? 0 : Math.max(...numbers);
    case 'average':
      if (numbers.length === 0) return 0;
      const total = numbers.reduce((acc, num) => acc + num, 0);
      return total / numbers.length;
    default:
      throw new Error(`Unknown operation: ${operation}`);
      
  }
}

const nums = [4, 8, 15, 16, 23, 42];

console.log('Sum:', mathOperations('sum', ...nums));
console.log('Product:', mathOperations('product', ...nums));
console.log('Min:', mathOperations('min', ...nums));
console.log('Max:', mathOperations('max', ...nums));
console.log('Average:', mathOperations('average', ...nums));
