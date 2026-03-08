interface StatCardProps {
  number: string;
  label: string;
  delay?: number;
}

export function StatCard({ number, label, delay = 0 }: StatCardProps) {
  return (
    <div
      className={`stat-card animate-fade-up`}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="stat-number">{number}</div>
      <p className="mt-2 text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
}
