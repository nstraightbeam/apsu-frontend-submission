import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
const preview: Preview = {
  parameters: {
    layout: 'padded',
    viewport: {
      options: {
        mobile1: { name: 'Mobile 375', styles: { width: '375px', height: '900px' } },
        desktop: { name: 'Desktop 1440', styles: { width: '1440px', height: '1000px' } },
      },
    },
    a11y: { test: 'error' },
    backgrounds: { options: { cream: { name: 'Cream', value: '#faf9f6' } } },
  },
  tags: ['autodocs'],
};
export default preview;
