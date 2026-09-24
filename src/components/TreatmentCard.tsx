import Image from 'next/image';
import type { Treatment, Product, Money } from '../data/contracts';
import { Button } from './Button';
import { CheckList } from './CheckList';
export function Price({ price }: { price: Money }) {
  return (
    <span className="price">
      From{' '}
      <strong>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: price.currency,
          maximumFractionDigits: 0,
        }).format(price.amountMinor / 100)}
      </strong>
      /mo
    </span>
  );
}
export function TreatmentCard({
  treatment,
  onSelect,
}: {
  treatment: Treatment;
  onSelect: () => void;
}) {
  return (
    <article className={`treatment-card ${treatment.tone}`}>
      <p className="eyebrow">{treatment.label}</p>
      <h3>{treatment.summary}</h3>
      <Image
        width={1200}
        height={1200}
        sizes="(max-width: 640px) 100vw, 650px"
        src={treatment.id === 'weight-loss' ? '/images/vial.png' : treatment.image.src}
        alt=""
        className={treatment.id === 'weight-loss' ? 'vial' : 'person'}
      />
      <Button variant="white" arrow onClick={onSelect}>
        See plans
      </Button>
    </article>
  );
}
export function TreatmentSection({
  treatment,
  onSelect,
}: {
  treatment: Treatment;
  onSelect: () => void;
}) {
  return (
    <section
      id={treatment.id}
      className={`treatment-section ${treatment.tone} ${treatment.id === 'sleep' ? 'reversed' : ''}`}
    >
      <div className="treatment-copy">
        {treatment.id === 'weight-loss' && <p className="eyebrow">Weight loss</p>}
        <h2>{treatment.title}</h2>
        {treatment.description && <p className="treatment-description">{treatment.description}</p>}
        <CheckList items={treatment.benefits} />
        {treatment.price && (
          <div className="treatment-price">
            <Price price={treatment.price} />
          </div>
        )}
        <Button variant="white" arrow onClick={onSelect}>
          {treatment.ctaLabel}
        </Button>
      </div>
      <div className="treatment-portrait">
        <Image
          width={1200}
          height={1200}
          sizes="(max-width: 640px) 100vw, 650px"
          src={treatment.image.src}
          alt={treatment.image.alt}
          loading="lazy"
        />
        {treatment.id === 'sleep' && (
          <div className="sleep-profile">
            <div>
              <strong>Your care, connected</strong>
              <p>Personalized support</p>
            </div>
            <span>Day & night</span>
          </div>
        )}
      </div>
    </section>
  );
}
export function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <article className="product-card panel">
      <div className="product-image">
        <Image
          width={1200}
          height={1200}
          sizes="(max-width: 640px) 100vw, 650px"
          src={product.image.src}
          alt={product.image.alt}
          loading="lazy"
        />
        {product.id === 'semaglutide' && (
          <span className="product-image-label">Illustrative packaging</span>
        )}
      </div>
      <h3>{product.name}</h3>
      <div className="product-bottom">
        <Price price={product.price} />
        <Button arrow onClick={onSelect}>
          Get started
        </Button>
      </div>
    </article>
  );
}
