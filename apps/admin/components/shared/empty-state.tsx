export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="card p-10 text-center">
      <h3 className="font-semibold text-slate-700">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
