import type { Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Forum } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { generateMetadata } from "@/lib/metadata";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SplashScreen } from "@/components/layout/splash-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = generateMetadata({
  title: "Coffee Shop & Tempat Nongkrong Estetik di Jatim", 
  description:
    "Cari coffee shop terdekat? Billions Coffee adalah rekomendasi tempat ngopi & resto estetik di Madiun, Tulungagung, dan Kediri. Nyaman untuk nongkrong & acara!",
  keywords: [
    "Billions Coffee",
    "coffee shop terdekat",
    "tempat ngopi terdekat",
    "cafe terdekat dari lokasi saya",
    "tempat nongkrong estetik",
    "rekomendasi cafe madiun",
    "resto tulungagung",
    "tempat ngopi di madiun",
    "cafe di tulungagung kota"
  ],
  path: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${forum.variable}`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EDSYF1PT2Y"
          strategy="afterInteractive"
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EDSYF1PT2Y');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {[organizationSchema(), websiteSchema()].map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        <SplashScreen />
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}