import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';
const meta = {
  title: 'Navigation/Header',
  component: Header,
  args: { onStart: () => {}, onLogin: () => {} },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const MobileClosed: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375, minHeight: 660 }}>
        <Story />
      </div>
    ),
  ],
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};
export const MobileOpen: Story = { ...MobileClosed, args: { initialOpen: true } };
