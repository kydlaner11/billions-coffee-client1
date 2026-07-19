import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  path?: string; // contoh: "/menu"
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = siteConfig.ogImage,
  keywords,
  noIndex = false,
}: GenerateMetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}