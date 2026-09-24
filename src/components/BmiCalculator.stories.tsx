import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BmiCalculator } from './BmiCalculator';
const meta = {
  title: 'Forms/BMI calculator',
  component: BmiCalculator,
  args: { onExplore: () => {} },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BmiCalculator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ImperialEmpty: Story = {};
export const MetricEmpty: Story = { args: { initialUnits: 'metric' } };
export const InvalidInput: Story = {
  args: { initialResult: { ok: false, error: 'Enter a valid adult height and weight.' } },
};
export const Underweight: Story = {
  args: { initialResult: { ok: true, value: 17.5, category: 'Underweight' } },
};
export const HealthyWeight: Story = {
  args: { initialResult: { ok: true, value: 22.5, category: 'Healthy weight' } },
};
export const Overweight: Story = {
  args: { initialResult: { ok: true, value: 27.5, category: 'Overweight' } },
};
export const Obesity: Story = {
  args: { initialResult: { ok: true, value: 32.5, category: 'Obesity' } },
};
