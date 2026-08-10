import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Candidates', href: '/candidates' },
  { label: 'Positions', href: '/positions' },
  { label: 'Posts', href: '/posts' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: '#3f4195', color: '#fff', padding: '3rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="xui-d-flex xui-flex-ai-start xui-flex-jc-space-between"
          style={{ gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          <div style={{ maxWidth: 280 }}>
            <div className="xui-d-flex xui-flex-ai-center" style={{ gap: '0.5rem', marginBottom: '0.75rem' }}>
              <img src="/ndc-logo3.jpeg" alt="NDC Logo" height={40} style={{ borderRadius: 4 }} />
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>NDC Campaign</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              NDC Campaign Official Portal
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>
              Navigation
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 2rem' }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.15s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>
              Member Access
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                backgroundColor: '#fff',
                color: '#3f4195',
                padding: '0.5rem 1.25rem',
                borderRadius: 6,
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Member Login
            </Link>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            &copy; {year} NDC Campaign. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            Official Candidate Portal
          </p>
        </div>
      </div>
    </footer>
  );
}
