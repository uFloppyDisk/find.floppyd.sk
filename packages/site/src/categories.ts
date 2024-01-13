import type { Link } from './links.ts'; 
const categoryPriority = ['priority', 'content', 'social', 'software'] as const;

export type Categories = (typeof categoryPriority)[number];

export function generateLinkCategories(links: Link[]) {
  const categories = new Map<string, Link[]>();
  categories.set('priority', []);

  links.forEach(link => {
    let category = 'misc.';
    if (link.category) { category = link.category };
    if (!categories.has(category)) { categories.set(category, [])}

    categories.get(category)?.push(link);

    if (link.priority ?? false) {
      categories.get('priority')?.push(link);
    }
  });

  return new Map(
    [...categories.entries()]
    .filter((cat) => cat[1].length > 0)
    .sort(function (a, b) {
      const indexA = categoryPriority.indexOf(a[0] as Categories);
      const indexB = categoryPriority.indexOf(b[0] as Categories);

      if (indexA === -1) { return 1; }
      if (indexB === -1) { return -1; }

      return indexA - indexB;
    })
    .reverse()
  );
}

export default categoryPriority;
