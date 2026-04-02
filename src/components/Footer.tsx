import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & Description */}
          <div>
            {/* Removed brightness-0 invert, increased height to h-20, added bg-white/10 padding for contrast if needed, or just keep it simple */}
            <img src="/logo.png" alt="Yuva Computers" className="h-20 w-auto mb-6 object-contain" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Elevating the standard of refurbished technology. Precision certified, journalistically curated, and built for the modern professional.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-primary-foreground/40">Explore</h4>
            <ul className="space-y-3">
              {["Products", "Bulk Orders", "Our Stores", "Company"].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/ /g, "-").replace("our-stores", "stores")}`} 
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
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

          {/* Contact & Social */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-primary-foreground/40">Contact Us & Connect</h4>
            <div className="space-y-4 text-sm text-primary-foreground/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-primary-foreground/80" />
                <span>Metro Pillar No. 1519, Sai Towers, 204, 2nd Floor, above Tipsy Topsy Bakery, Dilsukhnagar, Hyderabad, Telangana 500060</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-primary-foreground/80" />
                <a href="tel:9709888456" className="hover:text-primary-foreground transition-colors">9709888456</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-primary-foreground/80" />
                <a href="mailto:info@yuvacomputers.in" className="hover:text-primary-foreground transition-colors">info@yuvacomputers.in</a>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/share/1ZcCzs87wv/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/yuva.computers" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@yuvacomputers" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
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