export const SITE_CONFIG = {
  title: 'Astro Static Boilerplate',
  description: 'A production-ready, ultra-fast, zero-JS Astro boilerplate designed for static shared hosting.',
  siteUrl: 'https://example.com',
  author: 'Web Team',
  defaultOgImage: '/og-image.png',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  footerLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap-index.xml' },
  ],
} as const;
