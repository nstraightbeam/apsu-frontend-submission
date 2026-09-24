import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
const meta = {
  title: 'Primitives/Button',
  component: Button,
  args: { children: 'Start a free consultation', arrow: true },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const White: Story = { args: { variant: 'white' } };
export const Outline: Story = { args: { variant: 'outline', arrow: false } };
export const Disabled: Story = { args: { disabled: true } };
export const Hover: Story = { args: { className: 'story-hover' } };
export const Pressed: Story = { args: { className: 'story-pressed' } };
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('button')?.focus();
  },
};
