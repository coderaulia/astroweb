export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string | URL;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function formatTitle(pageTitle?: string, siteTitle = 'Astro Static'): string {
  if (!pageTitle) return siteTitle;
  return `${pageTitle} | ${siteTitle}`;
}
