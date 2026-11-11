/** Serializable contracts for a future GET /v1/home response. No React or transport concerns. */
export type TreatmentId = 'weight-loss' | 'birth-control' | 'sleep';
export type Tone = 'mint' | 'pink' | 'aqua';
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface Money {
  amountMinor: number;
  currency: 'USD';
  interval: 'month';
}
export interface Treatment {
  id: TreatmentId;
  label: string;
  summary: string;
  title: string;
  description?: string;
  benefits: readonly string[];
  tone: Tone;
  image: ImageAsset;
  price?: Money;
  ctaLabel: string;
}
export interface Product {
  id: string;
  treatmentId: TreatmentId;
  name: string;
  price: Money;
  image: ImageAsset;
}
export interface CareLayer {
  id: string;
  title: string;
  description: string;
  benefits: readonly string[];
}
export interface Service {
  id: string;
  title: string;
  image: ImageAsset;
  dark: boolean;
}
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: ImageAsset;
}
export interface Faq {
  id: string;
  question: string;
  answer: string;
}
export interface HomeContent {
  hero: { title: string; emphasis: string; description: string };
  treatments: readonly Treatment[];
  products: readonly Product[];
  careLayers: readonly CareLayer[];
  services: readonly Service[];
  testimonials: readonly Testimonial[];
  faqs: readonly Faq[];
  languages: readonly string[];
}
/** No personal/medical data is submitted by this frontend demo. */
export interface ConsultationRequest {
  treatmentId: TreatmentId;
  language: string;
}
export type ConsultationResult = { status: 'demo'; reference: string };
