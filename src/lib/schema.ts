// Builder JSON-LD (schema.org) — dipakai lewat <script type="application/ld+json">
// di layout.tsx (Organization + WebSite) dan locations.tsx (CafeOrCoffeeShop per cabang).

import { siteConfig, socialLinks, testimonials, type Location } from "./constants";

export function organizationSchema() {
  const ratingCount = testimonials.length;
  const ratingSum = testimonials.reduce((sum, t) => sum + t.rating, 0);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    sameAs: socialLinks.map((s) => s.href),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (ratingSum / ratingCount).toFixed(1),
      reviewCount: ratingCount,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.quote.replace(/<\/?span>/g, ""),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function cafeSchema(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: `${siteConfig.name} ${loc.city}`,
    url: siteConfig.url,
    image: `${siteConfig.url}${loc.image}`,
    telephone: loc.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.addressRegion,
      postalCode: loc.postalCode,
      addressCountry: "ID",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: loc.openingHours.days,
      opens: loc.openingHours.opens,
      closes: loc.openingHours.closes,
    },
  };
}
