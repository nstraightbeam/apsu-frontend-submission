import type { HomeContent, ImageAsset } from './contracts';
const image = (name: string, alt: string, width = 800, height = 900): ImageAsset => ({
  src: `/images/${name}.png`,
  alt,
  width,
  height,
});
export const homeContent = {
  hero: {
    title: 'Healthcare that',
    emphasis: 'speaks your language.',
    description:
      'Care in the language you think in.\nUS-licensed physicians, AI translates your consultation.',
  },
  languages: [
    'Español',
    'Tiếng Việt',
    '한국어',
    'Tagalog',
    'English',
    '中文',
    'Français',
    'Português',
    'हिन्दी',
    'Русский',
    'العربية',
  ],
  treatments: [
    {
      id: 'weight-loss',
      label: 'Weight management',
      summary: 'Compounded GLP-1 Semaglutide & Tirzepatide',
      title: 'Lose weight in your way.',
      benefits: [
        'Same-day doctor visits and prescriptions',
        'Dosage personalized',
        'Shipped from licensed U.S. pharmacies',
      ],
      tone: 'mint',
      image: image('weight-person', 'Woman wearing an orange athletic top'),
      ctaLabel: 'See plans',
    },
    {
      id: 'birth-control',
      label: 'Birth control',
      summary: 'Prescription birth control, delivered discreetly',
      title: 'Birth control, without the waiting room.',
      description:
        'Choose the method that fits your life. A US-licensed physician prescribes online, and your refills arrive automatically.',
      benefits: [
        'Prescribed online, delivered to your door',
        'Automatic refills, delivered',
        'Plain, discreet packaging',
      ],
      tone: 'pink',
      image: image('birth-person', 'Woman smiling in a green sweater'),
      price: { amountMinor: 2000, currency: 'USD', interval: 'month' },
      ctaLabel: 'Start your birth control consult',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      summary: 'Non-habit-forming formulations for sensitive sleepers',
      title: 'Sleep',
      description:
        'Real rest without the dependency.\nNon-habit-forming, physician-prescribed care for sensitive sleepers.',
      benefits: [
        'Non-controlled, non-habit-forming options',
        'Matched to your sleep pattern by a physician',
        'No controlled sedatives',
        'Cash-pay, no insurance needed',
      ],
      tone: 'aqua',
      image: image('sleep-person', 'Woman sitting cross-legged with her eyes closed'),
      price: { amountMinor: 2000, currency: 'USD', interval: 'month' },
      ctaLabel: 'Start your sleep consult',
    },
  ],
  products: [
    {
      id: 'semaglutide',
      treatmentId: 'weight-loss',
      name: 'Compounded Semaglutide',
      price: { amountMinor: 20000, currency: 'USD', interval: 'month' },
      image: image(
        'vial-tilted',
        'Illustrative medication vial; actual packaging varies',
        420,
        480,
      ),
    },
    {
      id: 'tirzepatide',
      treatmentId: 'weight-loss',
      name: 'Compounded Tirzepatide',
      price: { amountMinor: 20000, currency: 'USD', interval: 'month' },
      image: image(
        'vial-tilted',
        'Illustrative medication vial; actual packaging varies',
        420,
        480,
      ),
    },
  ],
  careLayers: [
    {
      id: 'physicians',
      title: 'Human physicians',
      description:
        'They handle diagnosis, prescriptions, and every moment that calls for clinical judgment.',
      benefits: [
        'Diagnosis and treatment decisions.',
        'Prescriptions.',
        'Complex symptom evaluation.',
      ],
    },
    {
      id: 'assistant',
      title: 'AI care assistant',
      description:
        'It handles language and instant response — so nothing is lost in communication.',
      benefits: ['Real-time translation in every message.', 'Answers around the clock.'],
    },
  ],
  services: [
    {
      id: 'support',
      title: '24/7 provider support',
      image: image('provider-phone', 'Video consultation displayed on a phone'),
      dark: false,
    },
    {
      id: 'management',
      title: 'Easily manage treatment',
      image: image('care-team', 'A physician speaking with a patient'),
      dark: true,
    },
    {
      id: 'medication',
      title: 'Access to FDA-approved medication options',
      image: image('medication', 'Prescription medication pens'),
      dark: false,
    },
    {
      id: 'shipping',
      title: 'Free expedited shipping',
      image: image('shipping', 'A courier delivering a package'),
      dark: true,
    },
  ],
  testimonials: [
    {
      id: 'maria',
      name: 'Maria R.',
      location: 'Houston, TX',
      treatment: 'Weight loss',
      quote:
        'I described my symptoms in my own language and actually felt understood, no translating in my head.',
      rating: 5,
    },
    {
      id: 'david',
      name: 'David L.',
      location: 'Queens, NY',
      treatment: 'Care in my language',
      quote: 'Care that finally made sense.',
      rating: 5,
      image: image('testimonial', 'Portrait supplied in the reference design'),
    },
    {
      id: 'an',
      name: 'An N.',
      location: 'San Jose, CA',
      treatment: 'Sleep',
      quote:
        'Private, simple, and in my language the whole way through. It made getting care feel normal again.',
      rating: 5,
    },
  ],
  faqs: [
    {
      id: 'states',
      question: 'What states do you serve in GLP-1 programs?',
      answer: 'We are currently able to serve GLP-1 programs in all 50 states.',
    },
    {
      id: 'languages',
      question: 'Which languages do you support?',
      answer:
        'Our care experience supports more than 40 languages, including English, Spanish, Vietnamese, Korean, Tagalog, Chinese, French, Portuguese, Hindi, Russian, and Arabic.',
    },
    {
      id: 'insurance',
      question: 'Do I need insurance?',
      answer:
        'No. Apsu is a cash-pay service. Your plan price is shown before you decide to continue.',
    },
    {
      id: 'compounded',
      question: 'What is compounded medication?',
      answer:
        'Compounded medications are prepared by licensed pharmacies for an individual patient. Compounded drugs are not FDA-approved. Your physician determines whether a treatment is appropriate for you.',
    },
  ],
} as const satisfies HomeContent;
/** Replace this boundary with a validated HTTP client when the backend exists. */
export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}
