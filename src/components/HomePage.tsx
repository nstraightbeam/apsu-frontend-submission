'use client';
import Image from 'next/image';
import { useState } from 'react';
import {
  Globe2,
  Stethoscope,
  Truck,
  Headphones,
  MapPinned,
  MessageCircle,
  Star,
} from 'lucide-react';
import type { HomeContent, TreatmentId } from '../data/contracts';
import { Header } from './Header';
import { Button } from './Button';
import { CheckList } from './CheckList';
import { BmiCalculator } from './BmiCalculator';
import { FaqAccordion } from './FaqAccordion';
import { ServiceCarousel } from './ServiceCarousel';
import { TreatmentCard, TreatmentSection, ProductCard } from './TreatmentCard';
import { ConsultationDialog, type DialogState } from './ConsultationDialog';
export function HomePage({ content }: { content: HomeContent }) {
  const [dialog, setDialog] = useState<DialogState>(null);
  const start = (treatment?: TreatmentId) => setDialog({ kind: 'consultation', treatment });
  const info = (title: string, text: string) => setDialog({ kind: 'information', title, text });
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" className="page-shell">
        <main>
          <div className="hero-shell">
            <Header onStart={() => start()} onLogin={() => setDialog({ kind: 'login' })} />
            <div>
              <section className="hero" id="main" tabIndex={-1}>
                <div className="hero-badges">
                  <span>
                    <Globe2 />
                    40+ languages
                  </span>
                  <span>
                    <Stethoscope />
                    US-licensed physicians
                  </span>
                  <span>
                    <Truck />
                    Free expedited shipping
                  </span>
                </div>
                <h1>
                  {content.hero.title} <em>{content.hero.emphasis}</em>
                </h1>
                <p>{content.hero.description}</p>
                <Button arrow onClick={() => start()}>
                  Start a free consultation
                </Button>
                <div className="languages" aria-label="Some supported languages">
                  <div>
                    {[...content.languages.slice(0, 6), ...content.languages.slice(0, 4)].map(
                      (l, i) => (
                        <span className={l === '中文' ? 'selected' : ''} key={`${l}-${i}`}>
                          {l}
                        </span>
                      ),
                    )}
                  </div>
                  <div>
                    {[...content.languages.slice(6), ...content.languages.slice(6)].map((l, i) => (
                      <span className={l === 'Português' ? 'selected' : ''} key={`${l}-${i}`}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
              <div className="treatment-grid">
                {content.treatments.map((t) => (
                  <TreatmentCard
                    key={t.id}
                    treatment={t}
                    onSelect={() =>
                      document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="trust-strip">
            <div>
              {[
                [MessageCircle, 'Cash-pay, no insurance needed'],
                [Truck, 'Discreet shipping'],
                [MapPinned, '50 states'],
                [Stethoscope, 'US board-certified MDs'],
                [Headphones, '24/7 AI care assistant'],
              ].map(([Icon, label]) => {
                const Symbol = Icon as typeof Globe2;
                return (
                  <span key={String(label)}>
                    <Symbol size={22} />
                    {String(label)}
                  </span>
                );
              })}
            </div>
          </div>
          <section id="about" className="how-it-works section">
            <div className="center-heading">
              <p className="eyebrow">How it works</p>
              <h2>Real physicians, AI-amplified.</h2>
              <p>
                Two layers working together — each
                <br />
                doing what they do best.
              </p>
            </div>
            <div className="care-grid">
              {content.careLayers.map((layer, i) => (
                <article className="care-card panel" key={layer.id}>
                  <span className="care-number">0{i + 1}</span>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                  <CheckList items={layer.benefits} />
                </article>
              ))}
            </div>
            <p className="care-footnote">
              The AI handles the language. Your physician makes the medical decisions.
            </p>
          </section>
          <div className="treatment-stack section">
            {content.treatments.map((t) => (
              <div key={t.id}>
                <TreatmentSection
                  treatment={t}
                  onSelect={() =>
                    t.id === 'weight-loss'
                      ? document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })
                      : start(t.id)
                  }
                />
                {t.id === 'weight-loss' && (
                  <>
                    <div id="plans" className="product-grid">
                      {content.products.map((p) => (
                        <ProductCard key={p.id} product={p} onSelect={() => start(p.treatmentId)} />
                      ))}
                    </div>
                    <BmiCalculator onExplore={() => start('weight-loss')} />
                  </>
                )}
              </div>
            ))}
          </div>
          <ServiceCarousel items={content.services} />
          <section className="testimonials" aria-labelledby="stories-title">
            <div className="center-heading">
              <h2 id="stories-title">
                Our <em>success stories</em>
              </h2>
              <p>Care that finally made sense.</p>
            </div>
            <div className="testimonials-grid">
              {content.testimonials.map((t) => (
                <article
                  className={`testimonial ${t.image ? 'portrait-testimonial' : ''}`}
                  key={t.id}
                >
                  {t.image ? (
                    <Image
                      width={1200}
                      height={1200}
                      sizes="(max-width: 640px) 100vw, 650px"
                      src={t.image.src}
                      alt={t.image.alt}
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <h3>{t.treatment}</h3>
                      <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: t.rating }, (_, i) => (
                          <Star key={i} size={20} fill="currentColor" aria-hidden="true" />
                        ))}
                      </div>
                      <blockquote>{t.quote}</blockquote>
                    </>
                  )}
                  <div className="testimonial-author">
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="faqs" className="faq-section section">
            <div>
              <p className="eyebrow">FAQs</p>
              <h2>
                Frequently
                <br />
                asked questions
              </h2>
              <p>Have more questions? Our care team is here to help in your language.</p>
            </div>
            <FaqAccordion items={content.faqs} />
          </section>
          <section id="contact" className="contact-shell">
            <div className="contact-banner">
              <div>
                <h2>
                  Ready for healthcare in
                  <br />
                  your language?
                </h2>
                <p>
                  No appointment needed <span>·</span> No insurance required
                </p>
              </div>
              <Button arrow onClick={() => start()}>
                Start a free consultation
              </Button>
              <span className="banner-word" aria-hidden="true">
                Apsu
              </span>
            </div>
          </section>
        </main>
        <footer>
          <div className="footer-top">
            <div>
              <a href="#top" className="logo footer-logo">
                Apsu
              </a>
              <p>American medicine, in the language you think in.</p>
            </div>
            <div className="footer-links">
              <div>
                <h3>Products</h3>
                {content.treatments.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>
                    {t.id === 'weight-loss' ? 'Weight loss' : t.label}
                  </a>
                ))}
              </div>
              <div>
                <h3>Company</h3>
                <a href="#about">About Apsu</a>
                <button
                  onClick={() =>
                    info(
                      'The Apsu journal',
                      'Educational articles will appear here when the content service is connected. This submission includes the home page only.',
                    )
                  }
                >
                  Blogs
                </button>
                <a href="#faqs">FAQs</a>
                <a href="#contact">Contact us</a>
              </div>
              <div>
                <h3>Legal</h3>
                {['Terms', 'Privacy policy', 'Medication safety information'].map((title) => (
                  <button
                    key={title}
                    onClick={() =>
                      info(
                        title,
                        title === 'Medication safety information'
                          ? content.faqs[3].answer
                          : 'This demonstration does not collect personal information or provide medical services. Production terms and policies must be supplied before launch.',
                      )
                    }
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="legal-copy">
            The information on this site is for general educational purposes and is not medical
            advice. Apsu is a technology platform; medical care is provided by independent, licensed
            providers, and pharmacy services by licensed pharmacies, who decide whether treatment is
            appropriate. Payment does not guarantee a prescription. Apsu offers compounded GLP-1
            medication, which is prepared by licensed U.S. compounding pharmacies and is not
            approved or evaluated by the FDA. Apsu does not manufacture medication, and product
            appearance may differ from images shown. Results vary and are not guaranteed. If this is
            an emergency, call 911.
          </p>
          <p className="legal-copy">By using our services, you agree to our Terms & Conditions.</p>
          <div className="footer-bottom">
            <span>Care in your language.</span>
            <span>© 2026 Apsu. All rights reserved.</span>
          </div>
          <div className="footer-word" aria-hidden="true">
            Apsu
          </div>
        </footer>
      </div>
      <ConsultationDialog
        state={dialog}
        onClose={() => setDialog(null)}
        languages={content.languages}
      />
    </>
  );
}
