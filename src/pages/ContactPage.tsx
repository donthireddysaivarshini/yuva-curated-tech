import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";

const issueTypes = ["Technical Assistance", "Order Inquiry", "Warranty Claim", "Return Request", "Bulk Order", "Other"];
const complaintTypes = ["Product Quality", "Delivery Issue", "Wrong Item Received", "Refund Not Processed", "Warranty Claim Rejected", "Other"];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", orderId: "", issueType: "Technical Assistance", message: "" });
  const [complaint, setComplaint] = useState({ orderId: "", issueType: "Product Quality", description: "", email: "", phone: "" });
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplaintSubmitted(true);
    setTimeout(() => setComplaintSubmitted(false), 4000);
    setComplaint({ orderId: "", issueType: "Product Quality", description: "", email: "", phone: "" });
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-surface-low">
        <div className="container mx-auto px-6">
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground tracking-tight max-w-lg">We're Here to Help.</h1>
          <p className="text-muted-foreground mt-4 max-w-lg">Whether you're troubleshooting a workstation or planning a bulk deployment, our precision engineering experts are ready.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">Phone Support</h3>
                  <p className="text-sm text-muted-foreground">Mon - Sat, 10am - 7pm</p>
                  <a href="tel:09709888456" className="text-primary font-display font-semibold text-lg mt-1 block">09709888456</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Instant technical guidance.</p>
                  <a href="https://wa.me/919709888456" className="text-primary font-display font-semibold text-sm mt-1 inline-flex items-center gap-1">Start Chat →</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">Response within 4 business hours.</p>
                  <a href="mailto:support@yuvacomputers.com" className="text-primary font-display font-semibold text-sm">support@yuvacomputers.com</a>
                </div>
              </div>

              <div className="bg-surface-low rounded-xl p-6 mt-8">
                <h4 className="font-display font-bold text-foreground">Grievance Redressal</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">In accordance with the Information Technology Act, please find our designated grievance officer details for escalated concerns.</p>
                <p className="text-sm text-foreground mt-3"><strong>Officer:</strong> Rajender Kumar</p>
                <p className="text-sm text-foreground"><strong>Email:</strong> grievance@yuvacomputers.com</p>
              </div>
            </div>

            <div className="bg-surface-low rounded-xl p-8">
              <h3 className="font-display font-bold text-foreground text-lg mb-6">Send us a Message</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="w-full mt-1.5 bg-card rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className="w-full mt-1.5 bg-card rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 0000000000" className="w-full mt-1.5 bg-card rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Order ID (Optional)</label>
                  <input value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} placeholder="#YUVA-0000" className="w-full mt-1.5 bg-card rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Issue Type</label>
                <select value={form.issueType} onChange={(e) => setForm({ ...form, issueType: e.target.value })} className="w-full mt-1.5 bg-card rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body">
                  {issueTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="mt-4">
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="How can our engineers assist you today?" className="w-full mt-1.5 bg-card rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body resize-none" />
              </div>
              <button className="w-full mt-6 gradient-primary text-primary-foreground py-3.5 rounded-lg font-display font-bold text-sm hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint / Feedback Form */}
      <section className="py-16 lg:py-24 bg-surface-low">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight">Register a Complaint / Feedback</h2>
              <p className="text-sm text-muted-foreground">We take every concern seriously. Fill in the details below.</p>
            </div>
          </div>

          {complaintSubmitted && (
            <div className="mb-6 p-4 rounded-lg bg-success-soft text-success text-sm font-medium">
              ✓ Your complaint has been registered successfully. Our team will reach out within 24 hours.
            </div>
          )}

          <form onSubmit={handleComplaintSubmit} className="bg-card rounded-xl p-8 shadow-ambient space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Order ID *</label>
                <input required value={complaint.orderId} onChange={(e) => setComplaint({ ...complaint, orderId: e.target.value })} placeholder="#YUVA-0000" className="w-full mt-1.5 bg-surface-low rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
              </div>
              <div>
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Issue Type *</label>
                <select required value={complaint.issueType} onChange={(e) => setComplaint({ ...complaint, issueType: e.target.value })} className="w-full mt-1.5 bg-surface-low rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body">
                  {complaintTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Email *</label>
                <input required type="email" value={complaint.email} onChange={(e) => setComplaint({ ...complaint, email: e.target.value })} placeholder="your@email.com" className="w-full mt-1.5 bg-surface-low rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
              </div>
              <div>
                <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Phone *</label>
                <input required value={complaint.phone} onChange={(e) => setComplaint({ ...complaint, phone: e.target.value })} placeholder="+91 0000000000" className="w-full mt-1.5 bg-surface-low rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body" />
              </div>
            </div>
            <div>
              <label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">Description *</label>
              <textarea required value={complaint.description} onChange={(e) => setComplaint({ ...complaint, description: e.target.value })} rows={5} placeholder="Please describe the issue in detail..." className="w-full mt-1.5 bg-surface-low rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-body resize-none" />
            </div>
            <button type="submit" className="w-full gradient-primary text-primary-foreground py-3.5 rounded-lg font-display font-bold text-sm hover:opacity-90 transition-opacity">
              Submit Complaint
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-card rounded-xl p-8 shadow-ambient">
              <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight">Visit Our Main Branch</h2>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">Dilshuknagar Main Branch</p>
                    <p className="text-sm text-muted-foreground">Yuva Precision Tower, Suite 402<br />Near Metro Station, Hyderabad, TS 500060</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">Daily: 10:00 AM - 08:30 PM</p>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/BM9uzhNAxJZ3ePAm8" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-display font-semibold text-sm hover:opacity-90 transition-opacity">
                Get Directions
              </a>
            </div>
            <div className="bg-surface-high rounded-xl aspect-[4/3] flex items-center justify-center">
              <MapPin className="w-12 h-12 text-muted-foreground/30" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
