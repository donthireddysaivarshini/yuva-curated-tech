// src/components/home/StatsBar.tsx
const stats = [
  { label: "Products Sold", value: "10,000+" },
  { label: "Happy Customers", value: "7,000+" },
  { label: "Quality Checks", value: "50+" },
  { label: "Legacy of Trust", value: "Since 2009" },
];

export const StatsBar = () => (
  <section className="bg-card border-y border-border/30">
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
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