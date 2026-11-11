export type BmiInput =
  | { units: 'metric'; centimeters: number; kilograms: number }
  | { units: 'imperial'; feet: number; inches: number; pounds: number };
export type BmiResult =
  | {
      ok: true;
      value: number;
      category: 'Underweight' | 'Healthy weight' | 'Overweight' | 'Obesity';
    }
  | { ok: false; error: string };
export function calculateBmi(input: BmiInput): BmiResult {
  const height =
    input.units === 'metric' ? input.centimeters / 100 : (input.feet * 12 + input.inches) * 0.0254;
  const weight = input.units === 'metric' ? input.kilograms : input.pounds * 0.45359237;
  if (
    input.units === 'imperial' &&
    (input.inches < 0 || input.inches >= 12 || !Number.isInteger(input.feet))
  )
    return { ok: false, error: 'Enter whole feet and inches between 0 and 11.9.' };
  if (
    !Number.isFinite(height) ||
    !Number.isFinite(weight) ||
    height < 0.9 ||
    height > 2.5 ||
    weight < 20 ||
    weight > 500
  )
    return {
      ok: false,
      error:
        'Enter a valid adult height (90–250 cm) and weight (20–500 kg), or their imperial equivalents.',
    };
  const raw = weight / (height * height);
  return {
    ok: true,
    value: Math.round(raw * 10) / 10,
    category:
      raw < 18.5
        ? 'Underweight'
        : raw < 25
          ? 'Healthy weight'
          : raw < 30
            ? 'Overweight'
            : 'Obesity',
  };
}
