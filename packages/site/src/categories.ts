import type { Link } from './links.ts'; 
const categoryPriority = ['priority', 'content', 'social', 'others'] as const;

export type Categories = (typeof categoryPriority)[number];

export function generateLinkCategories(links: Link[]) {
  const categories = new Map<string, Link[]>();

  links.forEach(link => {
    let category = 'miscellaneous';
    if (link.category) { category = link.category };
    if (!categories.has(category)) { categories.set(category, [])}

    categories.get(category)?.push(link);
  });

  return new Map(
    [...categories.entries()]
    .filter((cat) => cat[1].length > 0)
    .reverse()
  );
}

export default categoryPriority;
