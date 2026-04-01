import { Link } from "react-router-dom";
import { Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display font-extrabold text-lg mb-4">Yuva Computers</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Elevating the standard of refurbished technology. Precision certified, journalistically curated, and built for the modern professional.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="mailto:support@yuvacomputers.com" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-primary-foreground/40">Explore</h4>
            <ul className="space-y-3">
              {["Products", "Bulk Orders", "Our Stores", "Tech Journal"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-primary-foreground/40">Support</h4>
            <ul className="space-y-3">
              {["Warranty Policy", "Returns", "Contact Us", "Shipping Info"].map((item) => (
                <li key={item}>
                  <Link to="/contact" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-primary-foreground/40">Newsletter</h4>
            <p className="text-sm text-primary-foreground/60 mb-4">Get exclusive updates on new stock drops.</p>
            <div className="flex">
              <input
                placeholder="Your email address"
                className="flex-1 bg-primary-foreground/10 text-sm px-4 py-2.5 rounded-l-lg outline-none placeholder:text-primary-foreground/30 font-body"
              />
              <button className="gradient-primary px-4 py-2.5 rounded-r-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">© 2024 Yuva Computers. Certified Precision Instruments.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
