import type { Viewport } from "next";
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
  description:
    "Kedai kopi & resto dengan cita rasa premium di Kediri, Tulungagung, dan Madiun. Nikmati signature coffee, steak, dan menu andalan Billions Coffee.",
  keywords: [
    "Billions Coffee",
    "kedai kopi Kediri",
    "coffee shop Tulungagung",
    "cafe Madiun",
    "kopi Jawa Timur",
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