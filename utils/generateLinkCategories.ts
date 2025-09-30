import categoryOrder from "~/src/categoryOrder.ts";
import type { Link } from "~/types/link.d.ts";
import type { Categories } from "~/types/categories.d.ts";

export default function (links?: any[]) {
  const categories = new Map<string, Link[]>();
  if (links == null) {
    return categories;
  }

  categories.set('priority', []);

  links.forEach(rawLink => {
    const link: Link = {
      category: rawLink.meta.category,
      priority: !!rawLink.meta.priority,
      platform: rawLink.meta.platform,
      icon: rawLink.meta.icon,
      href: rawLink.meta.href,
      title: rawLink.meta.title,
      subtitle: rawLink.meta.description,
    }

    let category = 'misc.';
    if (link.category) { category = link.category };

    if (!categories.has(category)) { categories.set(category, []) }

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
