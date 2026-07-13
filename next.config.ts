import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image Optimization ──────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // tambahkan domain CDN/eksternal kalau kamu load gambar dari luar,
      // misal dari CMS (Sanity, Contentful) atau storage (Cloudinary, S3)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "cdn.namadomainkamu.com",
      // },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 hari
  },

  // ── Performance ──────────────────────────
  compress: true,
  poweredByHeader: false, // hilangkan header "X-Powered-By: Next.js"
  reactStrictMode: true,

  // ── Security Headers ──────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // cegah clickjacking (website di-embed iframe orang lain)
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // cegah browser "menebak" tipe file
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()", // matikan akses fitur browser yang tidak dipakai
          },
        ],
      },
    ];
  },

  // ── Redirect (opsional, contoh kalau ganti struktur URL nanti) ──
  async redirects() {
    return [
      // {
      //   source: "/about",
      //   destination: "/tentang-kami",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;