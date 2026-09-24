import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConsultationDialog } from './ConsultationDialog';
import { homeContent } from '../data/home';
const meta = {
  title: 'Flows/Consultation dialog',
  component: ConsultationDialog,
  args: { state: { kind: 'consultation' }, onClose: () => {}, languages: homeContent.languages },
} satisfies Meta<typeof ConsultationDialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Closed: Story = { args: { state: null } };
export const WeightManagement: Story = {};
export const BirthControl: Story = {
  args: { state: { kind: 'consultation', treatment: 'birth-control' } },
};
export const Sleep: Story = { args: { state: { kind: 'consultation', treatment: 'sleep' } } };
export const Complete: Story = { args: { initialStep: 'complete' } };
export const Login: Story = { args: { state: { kind: 'login' } } };
export const Information: Story = {
  args: {
    state: {
      kind: 'information',
      title: 'Privacy policy',
      text: 'This demo does not collect personal information.',
    },
  },
};
