'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { calculateBmi, type BmiResult } from '../lib/bmi';
export interface BmiCalculatorProps {
  initialUnits?: 'imperial' | 'metric';
  initialResult?: BmiResult;
  onExplore?: () => void;
}
export function BmiCalculator({
  initialUnits = 'imperial',
  initialResult,
  onExplore,
}: BmiCalculatorProps) {
  const [units, setUnits] = useState(initialUnits);
  const [result, setResult] = useState<BmiResult | undefined>(initialResult);
  const [height, setHeight] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  function switchUnits(value: typeof units) {
    if (value !== units) {
      setUnits(value);
      setHeight('');
      setInches('');
      setWeight('');
      setResult(undefined);
    }
  }
  return (
    <section className="bmi-section" aria-label="BMI calculator">
      <form
        className="bmi-form panel"
        onSubmit={(e) => {
          e.preventDefault();
          setResult(
            calculateBmi(
              units === 'metric'
                ? { units, centimeters: Number(height), kilograms: Number(weight) }
                : { units, feet: Number(height), inches: Number(inches), pounds: Number(weight) },
            ),
          );
        }}
        noValidate
      >
        <div className="eyebrow flex justify-between">
          <span>Check your eligibility</span>
          <span>BMI</span>
        </div>
        <h3>
          Could a GLP-1 program be
          <br className="desktop-break" /> right for you?
        </h3>
        <p>Enter your height and weight below</p>
        <div className="segmented" aria-label="Measurement system">
          {(['imperial', 'metric'] as const).map((u) => (
            <button type="button" key={u} aria-pressed={units === u} onClick={() => switchUnits(u)}>
              {u === 'metric' ? 'cm / kg' : 'ft / lbs'}
            </button>
          ))}
        </div>
        <div className="bmi-fields">
          <div>
            <span className="field-label">Height</span>
            <div className="flex gap-2">
              <label className="number-field">
                <input
                  aria-label={units === 'metric' ? 'Height in centimeters' : 'Height in feet'}
                  inputMode="decimal"
                  type="number"
                  placeholder="0"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setResult(undefined);
                  }}
                />
                <span>{units === 'metric' ? 'cm' : 'ft'}</span>
              </label>
              {units === 'imperial' && (
                <label className="number-field">
                  <input
                    aria-label="Height in inches"
                    inputMode="decimal"
                    type="number"
                    placeholder="0"
                    value={inches}
                    onChange={(e) => {
                      setInches(e.target.value);
                      setResult(undefined);
                    }}
                  />
                  <span>in</span>
                </label>
              )}
            </div>
          </div>
          <div>
            <span className="field-label">Weight</span>
            <label className="number-field">
              <input
                aria-label={units === 'metric' ? 'Weight in kilograms' : 'Weight in pounds'}
                inputMode="decimal"
                type="number"
                placeholder="0"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setResult(undefined);
                }}
              />
              <span>{units === 'metric' ? 'kg' : 'lbs'}</span>
            </label>
          </div>
        </div>
        <p className="bmi-note">
          For adults 20 and older. BMI is a screening measure, not a diagnosis or a treatment
          decision.
        </p>
        {result && !result.ok && (
          <p className="form-error" role="alert">
            {result.error}
          </p>
        )}
        <Button type="submit" className="w-full">
          Calculate BMI
        </Button>
      </form>
      <div className="bmi-result panel" aria-live="polite" aria-atomic="true">
        <div className={`bmi-gauge ${result?.ok ? 'has-result' : ''}`}>
          <strong>{result?.ok ? result.value : '—'}</strong>
          <span>{result?.ok ? result.category : 'Your BMI score'}</span>
        </div>
        <div className="bmi-scale" />
        {result?.ok && (
          <p className="bmi-note">
            Score rounded to one decimal; category uses the unrounded value.
          </p>
        )}
        <div className="bmi-bands">
          <span>Underweight &lt;18.5</span>
          <span>Healthy 18.5–24.9</span>
          <span>Overweight 25–29.9</span>
          <span>Obesity ≥30</span>
        </div>
        <button className="text-link" onClick={onExplore}>
          See your GLP-1 options <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
