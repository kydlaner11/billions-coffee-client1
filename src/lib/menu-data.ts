// Billions Coffee — data menu untuk flip-book.
// Placeholder realistis; gampang diganti begitu data menu asli tersedia.

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: "signature" | "new" | "seasonal";
};

export type MenuPageData =
  | {
      id: string;
      type: "cover";
      title: string;
      subtitle: string;
      image: string;
      imageAlt: string;
    }
  | {
      id: string;
      type: "category";
      eyebrow: string;
      category: string;
      items: MenuItem[];
    }
  | {
      id: string;
      type: "back-cover";
      title: string;
      note: string;
    };

export const menuPages: readonly MenuPageData[] = [
  {
    id: "cover",
    type: "cover",
    title: "MENU",
    subtitle: "Billions Coffee",
    image: "/menu/dish-1.jpg",
    imageAlt: "Sampul menu Billions Coffee",
  },
  {
    id: "coffee-hot",
    type: "category",
    eyebrow: "Coffee",
    category: "Hot Coffee",
    items: [
      {
        name: "Signature Pour-Over",
        description:
          "Biji single-origin diseduh perlahan, rasa bersih dengan aroma floral khas.",
        price: "Rp 32.000",
        tag: "signature",
      },
      {
        name: "Kopi Susu Gula Aren",
        description:
          "Espresso, susu segar, dan gula aren asli — manis hangat yang pas.",
        price: "Rp 25.000",
      },
      {
        name: "Cappuccino",
        description:
          "Espresso dengan foam susu lembut, ditabur bubuk kayu manis.",
        price: "Rp 28.000",
      },
      {
        name: "Long Black",
        description:
          "Espresso ganda di atas air panas, body penuh tanpa rasa pahit berlebih.",
        price: "Rp 24.000",
      },
    ],
  },
  {
    id: "coffee-iced",
    type: "category",
    eyebrow: "Coffee",
    category: "Iced & Blended",
    items: [
      {
        name: "Iced Palm Sugar Latte",
        description:
          "Espresso, susu dingin, dan gula aren yang menyatu manis di setiap tegukan.",
        price: "Rp 27.000",
        tag: "signature",
      },
      {
        name: "Butterscotch Iced Latte",
        description:
          "Perpaduan espresso dan sirup butterscotch dengan susu dingin yang creamy.",
        price: "Rp 29.000",
        tag: "new",
      },
      {
        name: "Coffee Frappe",
        description:
          "Kopi blended es krim, tekstur lembut dengan rasa kopi yang kuat.",
        price: "Rp 31.000",
      },
      {
        name: "Cold Brew Tonic",
        description:
          "Cold brew 12 jam dipadu air tonik segar, ringan dan sedikit citrusy.",
        price: "Rp 30.000",
      },
    ],
  },
  {
    id: "non-coffee",
    type: "category",
    eyebrow: "Non-Coffee",
    category: "Tea & Chocolate",
    items: [
      {
        name: "Matcha Latte",
        description:
          "Matcha grade premium dengan susu segar, lembut dan tidak terlalu manis.",
        price: "Rp 28.000",
      },
      {
        name: "Chocolate Frappe",
        description:
          "Cokelat blended es krim, pekat dan creamy untuk pencinta cokelat.",
        price: "Rp 29.000",
      },
      {
        name: "Lemon Tea",
        description:
          "Teh hitam segar dengan perasan lemon asli, menyegarkan di siang hari.",
        price: "Rp 20.000",
      },
      {
        name: "Taro Latte",
        description:
          "Taro asli dipadu susu segar, warna ungu lembut dengan rasa manis alami.",
        price: "Rp 27.000",
        tag: "seasonal",
      },
    ],
  },
  {
    id: "food-mains",
    type: "category",
    eyebrow: "Food",
    category: "Mains",
    items: [
      {
        name: "Butter Steak Plate",
        description:
          "Steak lembut dipadukan saus mentega herbal, disajikan hangat dengan sisi musiman.",
        price: "Rp 68.000",
        tag: "signature",
      },
      {
        name: "Chicken Katsu Rice",
        description:
          "Ayam katsu renyah dengan nasi hangat dan saus katsu manis gurih.",
        price: "Rp 45.000",
      },
      {
        name: "Beef Rendang Toast",
        description:
          "Roti panggang isi rendang sapi, perpaduan cita rasa lokal dan modern.",
        price: "Rp 42.000",
        tag: "new",
      },
      {
        name: "Truffle Aglio Olio",
        description:
          "Pasta aglio olio dengan aroma truffle oil dan taburan parmesan.",
        price: "Rp 48.000",
      },
    ],
  },
  {
    id: "food-light",
    type: "category",
    eyebrow: "Food",
    category: "Light Bites & Sides",
    items: [
      {
        name: "Truffle Fries",
        description:
          "Kentang goreng renyah dengan minyak truffle dan parmesan parut.",
        price: "Rp 32.000",
      },
      {
        name: "Fresh Garden Bowl",
        description:
          "Sajian segar berbahan sayuran pilihan, ringan namun kaya rasa untuk teman kopi.",
        price: "Rp 35.000",
      },
      {
        name: "Loaded Nachos",
        description:
          "Nachos dengan keju leleh, salsa segar, dan saus krim asam.",
        price: "Rp 38.000",
      },
      {
        name: "Garlic Bread",
        description: "Roti panggang mentega bawang putih, hangat dan renyah.",
        price: "Rp 22.000",
      },
    ],
  },
  {
    id: "dessert",
    type: "category",
    eyebrow: "Dessert",
    category: "Sweet Finish",
    items: [
      {
        name: "Molten Lava Cake",
        description:
          "Kue cokelat hangat dengan isian leleh, disajikan dengan es krim vanila.",
        price: "Rp 36.000",
        tag: "signature",
      },
      {
        name: "Tiramisu Jar",
        description:
          "Lapisan biskuit kopi dan krim mascarpone dalam sajian jar yang manis.",
        price: "Rp 34.000",
      },
      {
        name: "Banana Fritters with Vanilla Ice Cream",
        description:
          "Pisang goreng crispy dipadu es krim vanila dan saus karamel.",
        price: "Rp 30.000",
      },
      {
        name: "Cheese Tart",
        description: "Tart keju lembut dengan lapisan karamel tipis di atasnya.",
        price: "Rp 28.000",
      },
    ],
  },
  {
    id: "back-cover",
    type: "back-cover",
    title: "Billions Coffee",
    note: "Terima kasih sudah membuka menu kami — sampai jumpa di kedai.",
  },
] as const;

export type MenuItemTag = NonNullable<MenuItem["tag"]>;
