'use client';
import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Faq } from '../data/contracts';
export function FaqAccordion({
  items,
  initialOpenId = items[0]?.id,
}: {
  items: readonly Faq[];
  initialOpenId?: string | null;
}) {
  const [open, setOpen] = useState(initialOpenId);
  const prefix = useId();
  return (
    <div className="faq-list">
      {items.map((item) => (
        <div key={item.id} className={`faq-item ${open === item.id ? 'is-open' : ''}`}>
          <h3>
            <button
              id={`${prefix}-${item.id}-button`}
              aria-expanded={open === item.id}
              aria-controls={`${prefix}-${item.id}`}
              onClick={() => setOpen(open === item.id ? null : item.id)}
            >
              {item.question}
              <span>
                <ChevronDown size={18} />
              </span>
            </button>
          </h3>
          <div
            id={`${prefix}-${item.id}`}
            role="region"
            aria-labelledby={`${prefix}-${item.id}-button`}
            className="faq-answer"
            inert={open !== item.id}
          >
            <div>
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
