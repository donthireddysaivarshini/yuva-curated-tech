import { Eye, Settings } from "lucide-react";

interface AboutData {
  heading?: string;
  vision_title?: string;
  vision_text?: string;
  mission_title?: string;
  mission_text?: string;
  about_image_1?: string;
  about_image_2?: string;
}

const DEFAULTS: AboutData = {
  heading: "Crafting Excellence Since 2009",
  vision_title: "Our Vision",
  vision_text: "To make high-end computing accessible to everyone without sacrificing the planet's resources.",
  mission_title: "Our Mission",
  mission_text: "Setting the gold standard in refurbishment through rigorous 50-step audits and industry-leading warranty support.",
};

export const AboutSnapshot = ({ data }: { data?: AboutData }) => {
  const d = { ...DEFAULTS, ...data };

  return (
    <section className="py-16 lg:py-24 bg-surface-low">
      <div className="container mx-auto px-6">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight mb-12">
          {d.heading}
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">{d.vision_title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-1">{d.vision_text}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-success-soft flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">{d.mission_title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-1">{d.mission_text}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square bg-surface-high">
              <img
                src={d.about_image_1 || "/about.png"}
                alt="Workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square relative bg-surface-high">
              <img
                src={d.about_image_2 || "/about1.png"}
                alt="Quality Control"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-6 flex flex-col justify-end">
                <h4 className="font-display font-bold text-white text-lg uppercase relative z-10">Quality Control</h4>
                <p className="text-white/70 text-xs mt-1 uppercase tracking-wider relative z-10">We Made it Safe Work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};