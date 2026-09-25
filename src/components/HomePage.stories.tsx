import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HomePage } from './HomePage';
import { homeContent } from '../data/home';
const meta = {
  title: 'Pages/Home',
  component: HomePage,
  args: { content: homeContent },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HomePage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } };
