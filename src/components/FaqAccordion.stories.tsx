import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FaqAccordion } from './FaqAccordion';
import { homeContent } from '../data/home';
const meta = {
  title: 'Disclosure/FAQ',
  component: FaqAccordion,
  args: { items: homeContent.faqs },
} satisfies Meta<typeof FaqAccordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const AllClosed: Story = { args: { initialOpenId: null } };
export const LanguagesOpen: Story = { args: { initialOpenId: 'languages' } };
export const InsuranceOpen: Story = { args: { initialOpenId: 'insurance' } };
export const MedicationOpen: Story = { args: { initialOpenId: 'compounded' } };
