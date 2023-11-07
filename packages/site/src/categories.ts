const categoryPriority = ['priority', 'content', 'social', 'others'] as const;

export type Categories = (typeof categoryPriority)[number];

export default categoryPriority;
