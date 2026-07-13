// Billions Coffee — data statis situs.
// Semua as const supaya tipe literal & aman dipakai lintas komponen.

export const siteConfig = {
  name: "Billions Coffee",
  shortName: "Billions",
  tagline: "Coffee Sensation",
  description:
    "Where culinary craftsmanship meets modern elegance. Indulge in the finest coffee sensation, expertly curated to elevate your dining experience.",
  url: "https://billions-coffee.example.com", // TODO: ganti domain asli
  logo: "/logo.png",
  locale: "id_ID",
  ogImage: "/og-image.jpg", // TODO: siapkan gambar OG 1200x630
} as const;

// Link navigasi utama (navbar + mobile sheet).
export const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Reservation", href: "/#locations" },
  { label: "About", href: "/tentang-kami" },
  { label: "Contact", href: "/kontak" },
  { label: "Blog", href: "/blog" },
] as const;

// Subset link yang tampil inline di navbar desktop (sisanya via hamburger).
export const primaryNavLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Reservation", href: "/#locations" },
] as const;

// CTA utama navbar.
export const ctaLink = {
  label: "VENUE & EVENT",
  href: "/reservation",
} as const;

export const contactInfo = {
  address: "23 Greenfield Avenue, Prague 120 00",
  phone: "+49 1234 567890",
  email: "email@example.com", // TODO: email asli
} as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
] as const;

export const footerLinks = [
  { label: "Licensing", href: "/licensing" },
  { label: "Styleguide", href: "/styleguide" },
] as const;

// Kredit bar paling bawah footer.
export const footerConfig = {
  credit: "By Billions Coffee",
} as const;

// Slide hero (carousel fade). Set `primary: true` pada satu slide untuk
// menjadikannya gambar utama — tampil duluan (LCP) & jadi awal rotasi.
// Untuk banner event: cukup ubah primary ke slide yang diinginkan.
export const heroSlides = [
  {
    src: "/hero/hero-4.png",
    alt: "Suasana barista Billions Coffee",
    primary: true,
  },
  {
    src: "/hero/hero-5.png",
    alt: "Sajian kopi Billions Coffee",
    primary: false,
  },
  {
    src: "/hero/hero-6.png",
    alt: "Interior kedai Billions Coffee",
    primary: false,
  },
] as const;

export const heroContent = {
  title: ["SIP, SAVOR,", "AND STAY A WHILE"], // dua baris seperti desain
  intervalMs: 5000,
} as const;

// Section About ("... Artistry Redefined" di desain), disesuaikan ke tema kopi.
export const aboutContent = {
  eyebrow: "Coffee Artistry Redefined",
  body:
    "Where culinary craftsmanship meets modern elegance. Indulge in the finest coffee, expertly curated to elevate your every moment.",
  image: "/hero/hero-3.png", // pakai foto hero interior yang sudah ada
  imageAlt: "Interior kedai Billions Coffee",
} as const;

// Section "Best Of Taste" (3 kartu menu unggulan, klik -> halaman menu).
export const bestOfTaste = [
  {
    image: "/menu/dish1.png",
    alt: "Signature pour-over Billions",
    name: "Signature Pour-Over",
    description:
      "Biji single-origin diseduh perlahan untuk rasa bersih dengan aroma floral yang khas.",
    href: "/menu",
  },
  {
    image: "/menu/dish3.png",
    alt: "Butter steak plate Billions",
    name: "Butter Steak Plate",
    description:
      "Steak lembut dipadukan saus mentega herbal, disajikan hangat dengan sisi musiman.",
    href: "/menu",
  },
  {
    image: "/menu/dish2.png",
    alt: "Fresh garden bowl Billions",
    name: "Fresh Garden Bowl",
    description:
      "Sajian segar berbahan sayuran pilihan, ringan namun kaya rasa untuk teman kopi.",
    href: "/menu",
  },
] as const;

// Section Awards (3 kartu rating bintang di desain).
export const awards = [
  { title: "TRIP ADVISOR", subtitle: "Best Coffee House", location: "Prague" },
  { title: "MICHELIN GUIDE", subtitle: "Best Coffee House", location: "Prague" },
  { title: "STAR DINING", subtitle: "Best Coffee House", location: "Prague" },
] as const;

// Section Testimonials (ulasan pelanggan, 3 kartu senada dengan grid Awards).
export const testimonials = [
  {
    name: "Alya Farida",
    role: "Happy Customer",
    quote:
      "Tempatnya nyaman buat nongkrong atau ngerjain tugas. <span>Kopinya enak, rasanya pas dan nggak bikin enek.</span> Interiornya estetik, banyak spot foto yang cakep. <span>Pelayanannya ramah dan gercep,</span> jadi betah lama-lama. Wajib sih mampir ke Billions Coffee Tulungagung kalau lagi pengen ngopi santai",
    rating: 5,
  },
  {
    name: "Putri Larasati",
    role: "Happy Customer",
    quote:
      "<span>Pelayanannya okee bgt,</span> dimintain sarann sama pegawainyaa auto direspon permintaannya lgsg diturutin.. <span>menu makanannya juga banyakk dan worth it sih menurut akuu..</span> next bakal kesini lagi dan ngrekomin temen temenn kesini.. COBAINNN GUYSSS",
    rating: 5,
  },
  {
    name: "Angeline Nurfika",
    role: "Happy Customer",
    quote:
      "Tempat nyaman untuk briefing, nongkrong ataupun sekedar <span>makan bersama keluarga, estetik, menu nya variatif</span> dan rasa pun enak semua, harga affordable, termasuk murah menurut saya karena porsi nya cukup untuk sharing. <span>Lantai 2 super nyaman sih</span>",
    rating: 5,
  },  
] as const;

export type Testimonial = (typeof testimonials)[number];

// Lokasi cabang Billions (klik kartu -> maps + kontak berubah).
export const locations = [
  {
    id: "kediri",
    city: "Kediri",
    image: "/locations/kediri.jpg",
    address:
      "Jl. Hasanudin No.14, Balowerti, Kec. Kota, Kota Kediri, Jawa Timur 64121",
    phone: "+6282332563676",
    phoneDisplay: "0823 3256 3676",
    waNumber: "6282332563676",
    waMsg: "Halo Billions Kediri, saya ingin bertanya dan reservasi.",
    hours: "Mon – Sun: 09:00 – 22:00",
    mapsUrl: "https://maps.app.goo.gl/F2enCqWB7q12gpMz8",
    mapsQuery: "Billions+Coffee+Kediri",
  },
  {
    id: "tulungagung",
    city: "Tulungagung",
    image: "/locations/tulungagung-1.jpg",
    address:
      "Jl. Dr. Sutomo No.33, Tertek, Kec. Tulungagung, Tulungagung, Jawa Timur 66216",
    phone: "+6281246780540",
    phoneDisplay: "0812 4678 0540",
    waNumber: "6281246780540",
    waMsg: "Halo Billions Tulungagung, saya ingin bertanya dan reservasi.",
    hours: "Tue – Sun: 09:00 – 22:00",
    mapsUrl: "https://maps.app.goo.gl/PQDYvfnHCxjxTeTi7",
    mapsQuery: "Billions+Coffee+Tulungagung",
  },
  {
    id: "madiun",
    city: "Madiun",
    image: "/locations/madiun-1.jpg",
    address:
      "Jl. Abdurrahman Saleh, Kejuron, Kec. Taman, Kota Madiun, Jawa Timur 63131",
    phone: "+6282322525405",
    phoneDisplay: "0823 2252 5405",
    waNumber: "6282322525405",
    waMsg: "Halo Billions Madiun, saya ingin bertanya dan reservasi.",
    hours: "Mon – Sun: 09:00 – 22:00",
    mapsUrl: "https://maps.google.com/?q=Madiun,East+Java",
    mapsQuery: "Billions+Coffee+Madiun",
  },
] as const;

export type Location = (typeof locations)[number];

export type NavLink = (typeof navLinks)[number];
export type SocialLink = (typeof socialLinks)[number];