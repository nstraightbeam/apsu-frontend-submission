'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
export function Header({
  onStart,
  onLogin,
  initialOpen = false,
}: {
  onStart: () => void;
  onLogin: () => void;
  initialOpen?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);
  const links = [
    ['Weight loss', '#weight-loss'],
    ['Birth control', '#birth-control'],
    ['Sleep', '#sleep'],
    ['Contact us', '#contact'],
  ];
  return (
    <header
      className={`header ${open ? 'menu-open' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <a href="#top" className="logo" aria-label="Apsu home">
        Apsu
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <Button onClick={onStart}>Get started</Button>
        <Button variant="outline" onClick={onLogin}>
          Login
        </Button>
      </div>
      <button
        className="menu-toggle icon-button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <div>
            <Button
              onClick={() => {
                setOpen(false);
                onStart();
              }}
            >
              Get started
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                onLogin();
              }}
            >
              Login
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
