'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Candidates', href: '/candidates' },
  { label: 'Positions', href: '/positions' },
  { label: 'Posts', href: '/posts' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#3f4195',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.2)' : 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div
        className="xui-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}
      >
        <div
          className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-between"
          style={{ height: 64 }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/ndc-logo3.jpeg" alt="NDC Logo" height={44} style={{ borderRadius: 4 }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em' }}>
              NDC Campaign
            </span>
          </Link>

          <nav className="xui-d-none xui-d-md-flex xui-flex-ai-center" style={{ gap: '0.25rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 6,
                  fontSize: '0.9rem',
                  fontWeight: pathname === link.href ? 600 : 400,
                  backgroundColor: pathname === link.href ? 'rgba(255,255,255,0.12)' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              style={{
                marginLeft: '0.5rem',
                backgroundColor: '#fff',
                color: '#3f4195',
                padding: '0.4rem 1rem',
                borderRadius: 6,
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
            >
              Member Login
            </Link>
          </nav>

          <button
            className="xui-d-flex xui-d-md-none xui-flex-ai-center xui-flex-jc-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#fff',
            }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '1rem',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  padding: '0.65rem 0.5rem',
                  fontWeight: pathname === link.href ? 600 : 400,
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              style={{
                display: 'block',
                marginTop: '0.75rem',
                backgroundColor: '#fff',
                color: '#3f4195',
                padding: '0.6rem 1rem',
                borderRadius: 6,
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Member Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
