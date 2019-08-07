import { HelloTest } from '../index';
test('My HelloTest', () => {
  expect(HelloTest('Ioan')).toBe('Hello Ioan');
});
