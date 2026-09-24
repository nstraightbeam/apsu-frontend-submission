import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Apsu — Healthcare that speaks your language',
  description:
    'A front-end demonstration of accessible, multilingual care. Built from the Apsu design assignment.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
