import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ServiceCarousel } from './ServiceCarousel';
import { homeContent } from '../data/home';
const meta = {
  title: 'Content/Service carousel',
  component: ServiceCarousel,
  args: { items: homeContent.services },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ServiceCarousel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Start: Story = {};
export const Middle: Story = {
  args: { initialIndex: 1 },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};
export const End: Story = { args: { initialIndex: 3 } };
