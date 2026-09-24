import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TreatmentCard } from './TreatmentCard';
import { homeContent } from '../data/home';
const meta = {
  title: 'Content/Treatment card',
  component: TreatmentCard,
  args: { treatment: homeContent.treatments[0], onSelect: () => {} },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 424 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TreatmentCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WeightManagement: Story = {};
export const BirthControl: Story = { args: { treatment: homeContent.treatments[1] } };
export const Sleep: Story = { args: { treatment: homeContent.treatments[2] } };
