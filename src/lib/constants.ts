// Billions Coffee — data statis situs.
// Semua as const supaya tipe literal & aman dipakai lintas komponen.

export const siteConfig = {
  name: "Billions Coffee",
  shortName: "Billions",
  tagline: "SIMPLY BILLIONS, SIMPLY BETTER",
  description:
    "Sip, savor, and stay a while. Your daily dose of joy, served in every bottle",
  url: "https://billionscoffee.co.id/", // TODO: ganti domain asli
  logo: "/logo.png",
  locale: "id_ID",
  ogImage: "/og-image.png", // TODO: siapkan gambar OG 1200x630
} as const;

// Link navigasi utama (navbar + mobile sheet).
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reservation", href: "/#locations" },
  { label: "Venue & Event", href: "/reservation" },
  // { label: "Contact", href: "/kontak" },
  // { label: "Blog", href: "/blog" },
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
  // { label: "Licensing", href: "/licensing" },
  // { label: "Styleguide", href: "/styleguide" },
] as const;

// Kredit bar paling bawah footer.
export const footerConfig = {
  credit: "@Billions Coffee 2026. All rights reserved.",
} as const;

// Slide hero (carousel fade). Set `primary: true` pada satu slide untuk
// menjadikannya gambar utama — tampil duluan (LCP) & jadi awal rotasi.
// Untuk banner event: cukup ubah primary ke slide yang diinginkan.
export const heroSlides = [
  {
    src: "/hero/hero-12.jpg",
    alt: "Suasana barista Billions Coffee",
    primary: true,
  },
  {
    src: "/hero/hero-10.jpg",
    alt: "Sajian kopi Billions Coffee",
    primary: false,
  },
  {
    src: "/hero/hero-11.jpg",
    alt: "Interior kedai Billions Coffee",
    primary: false,
  },
] as const;

export const heroContent = {
  title: ["SIMPLY BILLIONS", "SIMPLY BETTER"], // dua baris seperti desain
  intervalMs: 5000,
} as const;

// Section About ("... Artistry Redefined" di desain), disesuaikan ke tema kopi.
export const aboutContent = {
  eyebrow: "Billions Coffee",
  body:
    "Where culinary craftsmanship meets modern elegance. Indulge in the finest coffee, expertly curated to elevate your every moment.",
  image: "/hero/about1.jpg", // pakai foto hero interior yang sudah ada
  imageAlt: "Interior kedai Billions Coffee",
} as const;

// Section "Best Of Taste" (3 kartu menu unggulan, klik -> halaman menu).
export const bestOfTaste = [
  {
    image: "/menu/dish4.jpg",
    alt: "Billions Signature Bottle Billions",
    name: "Billions Signature Bottle",
    description:
      "Hadir untuk anda yg mengapresiasi rasa dan estetika, Signature bottle kami menawarkan berbagai macam varian rasa yang berkarakter kuat, dibuat dan disajikan dalam botol kaca sehingga mempertahankan kualitas dan rasa",
    href: "/menu",
  },
  {
    image: "/menu/dish2.jpg",
    alt: "Tenderlon Steak Billions",
    name: "Tenderlon Steak",
    description:
      "Sebuah paduan kelembutan dari potongan daging berkualifas yang dimasak sempurna untuk menghasilkan teksture lembut dan juicy dalam setiap gigitan",
    href: "/menu",
  },
  {
    image: "/menu/dish5.jpg",
    alt: "On the Tray Series Billions",
    name: "On the Tray Series",
    description:
      "Setiap menu signature disajikab diatas nampan kayu ekslusif, dirancang khusus agar anda dapat merasakan experience berbeda dalam setiap detail rasa dengan cara yang paling elegan",
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
// gofoodUrl/grabfoodUrl sengaja opsional (boleh kosong "") — ikon Gojek/Grab
// di section kontak cuma muncul kalau link-nya sudah diisi untuk cabang itu.
export const locations = [
  {
    id: "kediri",
    city: "Kediri",
    image: "/locations/kediri.jpg",
    address:
      "Jl. Hasanudin No.14, Balowerti, Kec. Kota, Kota Kediri, Jawa Timur 64121",
    addressRegion: "Jawa Timur",
    postalCode: "64121",
    phone: "+6282332563676",
    phoneDisplay: "0823 3256 3676",
    waNumber: "6282332563676",
    waMsg: "Halo Billions Kediri, saya ingin bertanya dan reservasi.",
    hours: "Mon – Sun: 09:00 – 22:00",
    openingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
    mapsUrl: "https://maps.app.goo.gl/F2enCqWB7q12gpMz8",
    mapsQuery: "Billions+Coffee+Kediri",
    gofoodUrl: "https://gofood.link/a/KvfvZ2J",
    grabfoodUrl: "https://r.grab.com/g/6-20260718_165725_E067549D29184FD0A3DE5FDFBA716CC9_MEXMPS-6-C7TKJ73UN3UBEX",
  },
  {
    id: "tulungagung",
    city: "Tulungagung",
    image: "/locations/tulungagung-1.jpg",
    address:
      "Jl. Dr. Sutomo No.33, Tertek, Kec. Tulungagung, Tulungagung, Jawa Timur 66216",
    addressRegion: "Jawa Timur",
    postalCode: "66216",
    phone: "+6281246780540",
    phoneDisplay: "0812 4678 0540",
    waNumber: "6281246780540",
    waMsg: "Halo Billions Tulungagung, saya ingin bertanya dan reservasi.",
    hours: "Tue – Sun: 09:00 – 22:00",
    openingHours: {
      days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
    mapsUrl: "https://maps.app.goo.gl/PQDYvfnHCxjxTeTi7",
    mapsQuery: "Billions+Coffee+Tulungagung",
    gofoodUrl: "⁠https://gofood.link/a/QyBcLZJ",
    grabfoodUrl: "https://r.grab.com/g/6-20260718_165822_E067549D29184FD0A3DE5FDFBA716CC9_MEXMPS-6-C7JUBCAEV8LCTE",
  },
  {
    id: "madiun",
    city: "Madiun",
    image: "/locations/madiun-1.jpg",
    address:
      "Jl. Abdurrahman Saleh, Kejuron, Kec. Taman, Kota Madiun, Jawa Timur 63131",
    addressRegion: "Jawa Timur",
    postalCode: "63131",
    phone: "+6282322525405",
    phoneDisplay: "0823 2252 5405",
    waNumber: "6282322525405",
    waMsg: "Halo Billions Madiun, saya ingin bertanya dan reservasi.",
    hours: "Mon – Sun: 09:00 – 22:00",
    openingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
    mapsUrl: "https://maps.google.com/?q=Madiun,East+Java",
    mapsQuery: "Billions+Coffee+Madiun",
    gofoodUrl: "",
    grabfoodUrl: "", // TODO: ganti link Grab asli
  },
] as const;

export type Location = (typeof locations)[number];

export type NavLink = (typeof navLinks)[number];
export type SocialLink = (typeof socialLinks)[number];