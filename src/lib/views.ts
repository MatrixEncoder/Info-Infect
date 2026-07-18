const viewCounts = new Map<string, number>();

export function getViews(slug: string): number {
  return viewCounts.get(slug) ?? 0;
}

export function incrementViews(slug: string): number {
  const current = viewCounts.get(slug) ?? 0;
  const next = current + 1;
  viewCounts.set(slug, next);
  return next;
}
