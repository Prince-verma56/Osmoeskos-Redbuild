// Single source of truth for the confirmed OsmeKos product and ingredient
// content surfaced across the Product, Ingredients, and About pages and the
// mega-menu. Keeping the ids here in sync with the page section ids is what
// makes the deep-link navigation reliable. Copy is drawn only from approved
// product information — no invented claims, statistics, or clinical results.

export type Ingredient = {
  /** Stable anchor id — matches the section id and the mega-menu hash. */
  id: "shea-butter" | "coconut-oil" | "niacinamide" | "vitamin-e";
  name: string;
  /** Concentration as supplied in the approved product brief. */
  percentage: string;
  /** Short eyebrow role label. */
  role: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const ingredients: Ingredient[] = [
  {
    id: "shea-butter",
    name: "Shea Butter",
    percentage: "3%",
    role: "Nourishing botanical butter",
    description:
      "A rich botanical butter that deeply moisturizes and softens dry skin, providing essential fatty acids and vitamins for a supple, healthy finish.",
    image: "/images/ingredient-shea-butter.jpg",
    imageAlt: "Shea nuts and whipped shea butter in ceramic bowls",
  },
  {
    id: "coconut-oil",
    name: "Coconut Oil",
    percentage: "2%",
    role: "Emollient hydrator",
    description:
      "Renowned for its hydrating and emollient properties, it locks in moisture, improves skin elasticity, and leaves the skin smooth without a greasy residue.",
    image: "/images/ingredient-coconut-oil.jpg",
    imageAlt: "Fresh coconut halves beside a jar of pure coconut oil",
  },
  {
    id: "niacinamide",
    name: "Niacinamide",
    percentage: "2%",
    role: "Vitamin B3",
    description:
      "A versatile vitamin B3 derivative that helps even skin tone, calm the complexion, and fortify the natural skin barrier against environmental damage.",
    image: "/images/ingredient-niacinamide.jpg",
    imageAlt: "Laboratory glassware holding a niacinamide solution",
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    percentage: "0.5%",
    role: "Antioxidant",
    description:
      "A powerful antioxidant that protects the skin from free radicals while supporting the healing and repair of the skin's surface for a radiant appearance.",
    image: "/images/ingredient-vitamin-e.jpg",
    imageAlt: "Golden vitamin E oil capsules on natural linen",
  },
];

export type Ceramide = {
  code: "NP" | "AP" | "EOP";
  name: string;
  description: string;
};

// The Triple Ceramide Complex. Descriptions describe the general role of
// skin-barrier lipids, consistent with the existing product brief language.
export const ceramides: Ceramide[] = [
  {
    code: "NP",
    name: "Ceramide NP",
    description:
      "A barrier lipid that supports everyday moisture retention within the skin's surface.",
  },
  {
    code: "AP",
    name: "Ceramide AP",
    description:
      "Part of the natural lipid matrix that helps keep the skin's protective layer intact.",
  },
  {
    code: "EOP",
    name: "Ceramide EOP",
    description:
      "Works alongside NP and AP to help skin feel supple, comfortable, and cared for.",
  },
];
