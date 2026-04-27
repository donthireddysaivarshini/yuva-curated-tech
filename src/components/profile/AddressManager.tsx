//yuva computers
import { useState, useEffect } from "react";
import { authService } from "@/services/api";
import { toast } from "sonner";
import { MapPin, Plus, Trash2, Home, Star } from "lucide-react";

export default function AddressManager({ onSelect }: { onSelect?: (addr: any) => void }) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await authService.getSavedAddresses();
      setAddresses(data);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authService.deleteAddress(id);
      toast.success("Address removed");
      fetchAddresses();
    } catch {
      toast.error("Could not delete address");
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await authService.setDefaultAddress(id);
      toast.success("Default address updated");
      fetchAddresses();
    } catch {
      toast.error("Could not update default");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Saved Addresses</h3>
        <button className="text-sm text-primary font-bold flex items-center gap-1">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="grid gap-4">
        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            className={`p-4 border rounded-xl flex justify-between items-start ${addr.is_default ? "border-primary bg-primary/5" : "border-border"}`}
            onClick={() => onSelect && onSelect(addr)}
          >
            <div className="flex gap-3">
              <MapPin className="text-muted-foreground mt-1" size={18} />
              <div>
                <p className="font-bold">{addr.first_name} {addr.last_name}</p>
                <p className="text-sm text-muted-foreground">{addr.address}, {addr.city}, {addr.state} - {addr.zip_code}</p>
                {addr.is_default && <span className="text-[10px] uppercase font-bold text-primary">Default</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {!addr.is_default && (
                <button onClick={() => handleSetDefault(addr.id)} className="p-2 hover:bg-muted rounded-lg" title="Set Default">
                  <Star size={16} />
                </button>
              )}
              <button onClick={() => handleDelete(addr.id)} className="p-2 hover:bg-muted text-destructive rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}