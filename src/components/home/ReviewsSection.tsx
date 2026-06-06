import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  googleUrl?: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Manideep Kumar",
    rating: 5,
    text: "I bought i7 7th gen dell lap for 22,00 .As mentioned in video even spin wheel and student id Card offer is Also there. Best laptop store for Students to buy in low price refurbished laptops",
    googleUrl: "https://share.google/LwgmvVjPdKekWMiwH",
  },
  {
    id: 2,
    name: "Ashok Kumar Duggi",
    rating: 5,
    text: "Yuva computers located Dilshik nagar Hyderabad giving best service and refurbished laptops. Very reasonable prizes and all with high quality to meet the present customer (students, businesses person, employees) needs. Nice offers also there like spinning wheel discount. Latops range starts from 15000 and i5, i7 processors. Low cost and best service. What we seen youtube and face book videos it's true and it's very reasonable and affordable prices.",
    googleUrl: "https://share.google/RPmNz7ZD39H5WMwhH",
  },
  {
    id: 3,
    name: "Venu Ponnoji",
    rating: 5,
    text: "Very good positive response from the team of Yuva…. We bought 3 laptops couple of days back and noticed few minor issues but they take full responsibility and rectified the issue very quickly. Overall my experience is awesome service and got best premium laptops in reasonable price.. thanks to Yuva computers for providing affordable laptops",
    googleUrl: "https://share.google/bHpYEAk24xtAd67F2",
  },
];

const GoogleLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
  </svg>
);

export const ReviewsSection = () => {
  const data = DEFAULT_REVIEWS;

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
            Trusted by 7,000+ Humans
          </h2>

          <div className="flex items-center justify-center gap-2 mt-3 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <GoogleLogo /> Rated 4.4 / 5
            </span>
            <span>•</span>
            <a
  href="https://share.google/W5RdRfHaAWY1fKw1C"
  target="_blank"
  rel="noopener noreferrer"
  className="underline hover:text-primary transition-colors"
>
  Verified Google Reviews
</a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.slice(0, 3).map((r) => {
            const Card = (
              <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <GoogleLogo className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  "{r.text}"
                </p>

                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Verified Purchase
                    </p>
                  </div>
                </div>
              </div>
            );

            return r.googleUrl ? (
              <a
                key={r.id}
                href={r.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Card}
              </a>
            ) : (
              <div key={r.id}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};