export type SearchItem = {
  title: string;
  description: string;
  href: string;
};

export const searchIndex: SearchItem[] = [
  {
    title: "OsmeKos Body Lotion",
    description: "Our signature daily care formula designed to deeply hydrate and protect your skin's natural barrier.",
    href: "/product/body-lotion",
  },
  {
    title: "Triple Ceramide Complex",
    description: "Core technology featuring Ceramides NP, AP, and EOP to replenish essential lipids.",
    href: "/ingredients#triple-ceramide-complex",
  },
  {
    title: "Shea Butter",
    description: "A rich botanical butter (3%) that deeply moisturizes and softens dry skin.",
    href: "/ingredients#shea-butter",
  },
  {
    title: "Coconut Oil",
    description: "Hydrating oil (2%) that locks in moisture and improves skin elasticity.",
    href: "/ingredients#coconut-oil",
  },
  {
    title: "Niacinamide",
    description: "Vitamin B3 derivative (2%) that helps even skin tone and fortify the natural skin barrier.",
    href: "/ingredients#niacinamide",
  },
  {
    title: "Vitamin E",
    description: "Powerful antioxidant (0.5%) that protects skin from free radicals.",
    href: "/ingredients#vitamin-e",
  },
  {
    title: "Our Story",
    description: "Learn about OsmeKos and our philosophy rooted in botanical science.",
    href: "/our-story",
  },
];

export function filterSearchResults(query: string) {
  const trimmed = query.trim();

  if (!trimmed) {
    return [];
  }

  const lower = trimmed.toLowerCase();

  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower),
  );
}
