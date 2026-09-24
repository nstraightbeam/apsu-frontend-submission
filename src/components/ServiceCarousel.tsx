'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Service } from '../data/contracts';
export function ServiceCarousel({
  items,
  initialIndex = 0,
}: {
  items: readonly Service[];
  initialIndex?: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false, index: 0 });
  function measure() {
    const el = track.current;
    if (!el) return;
    const width = (el.firstElementChild as HTMLElement)?.offsetWidth + 24;
    setPosition({
      start: el.scrollLeft < 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      index: width ? Math.round(el.scrollLeft / width) : 0,
    });
  }
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const card = el.children[initialIndex] as HTMLElement | undefined;
    if (card) el.scrollLeft = card.offsetLeft - el.offsetLeft;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [initialIndex]);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const width = (el.firstElementChild as HTMLElement).offsetWidth + 24;
    el.scrollBy({
      left: direction * width,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <section
      className="services section"
      aria-roledescription="carousel"
      aria-label="Care services"
    >
      <div className="section-heading">
        <h2>
          Completely online
          <br />
          on your schedule
        </h2>
        <div className="flex gap-3">
          <button
            className="icon-button"
            aria-label="Previous service"
            disabled={position.start}
            onClick={() => move(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            className="icon-button"
            aria-label="Next service"
            disabled={position.end}
            onClick={() => move(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        className="service-track"
        ref={track}
        tabIndex={0}
        aria-label="Service cards; use arrow keys to scroll"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            move(1);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            move(-1);
          }
        }}
        onScroll={measure}
      >
        {items.map((item, i) => (
          <article
            key={item.id}
            className={`service-card ${item.dark ? 'dark' : ''}`}
            aria-label={`${i + 1} of ${items.length}: ${item.title}`}
          >
            <Image
              width={1200}
              height={1200}
              sizes="(max-width: 640px) 100vw, 650px"
              src={item.image.src}
              alt={item.image.alt}
              loading="lazy"
            />
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        First visible service {position.index + 1} of {items.length}
      </span>
    </section>
  );
}
