const DEFAULT_STATS = [
  { label: "Products Sold", value: "10,000+" },
  { label: "Happy Customers", value: "7,000+" },
  { label: "Quality Checks", value: "50+" },
  { label: "Legacy of Trust", value: "Since 2009" },
];

interface Props {
  stats?: { label: string; value: string }[];
}

export const StatsBar = ({ stats }: Props) => {
  const data = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  return (
    <section className="bg-card border-y border-border/30">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-extrabold text-2xl lg:text-3xl text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};