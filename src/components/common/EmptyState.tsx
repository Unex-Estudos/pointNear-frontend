import { SearchX } from 'lucide-react';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><SearchX className="mx-auto h-10 w-10 text-brand-500"/><h3 className="mt-4 text-lg font-bold text-ink">{title}</h3><p className="mt-2 text-sm text-slate-600">{description}</p></div>;
}
