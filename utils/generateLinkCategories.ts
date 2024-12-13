import categoryOrder from "../src/categoryOrder.ts";
import type { Link } from "../types/link.d.ts";
import type { Categories } from "../types/categories.d.ts";

export default function (links: Link[]) {
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
      const indexA = categoryOrder.indexOf(a[0] as Categories);
      const indexB = categoryOrder.indexOf(b[0] as Categories);

      if (indexA === -1) { return 1; }
      if (indexB === -1) { return -1; }

      return indexA - indexB;
    })
    .reverse()
  );
}
