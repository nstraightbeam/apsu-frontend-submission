import { ArrowRight } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'white' | 'outline';
  arrow?: boolean;
}
export function Button({
  variant = 'primary',
  arrow = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
      {arrow && (
        <span className="button-arrow">
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      )}
    </button>
  );
}
