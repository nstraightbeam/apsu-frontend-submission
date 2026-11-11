import { describe, it, expect } from 'vitest';
import { calculateBmi } from '../src/lib/bmi';
describe('adult BMI calculations', () => {
  it('calculates equivalent metric and imperial inputs', () => {
    const metric = calculateBmi({ units: 'metric', centimeters: 177.8, kilograms: 72.5747792 });
    const imperial = calculateBmi({ units: 'imperial', feet: 5, inches: 10, pounds: 160 });
    expect(metric).toEqual(imperial);
    expect(metric).toEqual({ ok: true, value: 23, category: 'Healthy weight' });
  });
  it.each([
    [18.49, 'Underweight'],
    [18.5, 'Healthy weight'],
    [24.99, 'Healthy weight'],
    [25, 'Overweight'],
    [29.99, 'Overweight'],
    [30, 'Obesity'],
  ])('classifies raw BMI %s at the correct boundary', (value, category) => {
    expect(
      calculateBmi({ units: 'metric', centimeters: 200, kilograms: Number(value) * 4 }),
    ).toMatchObject({ ok: true, category });
  });
  it.each([0, -1, Infinity, NaN])('rejects invalid height %s', (height) => {
    expect(calculateBmi({ units: 'metric', centimeters: height, kilograms: 70 }).ok).toBe(false);
  });
  it('rejects invalid weight and inches', () => {
    expect(calculateBmi({ units: 'metric', centimeters: 170, kilograms: 0 }).ok).toBe(false);
    expect(calculateBmi({ units: 'imperial', feet: 5, inches: 12, pounds: 160 }).ok).toBe(false);
  });
});
