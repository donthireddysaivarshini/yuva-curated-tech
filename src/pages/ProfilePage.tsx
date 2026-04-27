import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogOut, User } from 'lucide-react';
import AddressManager from '@/components/profile/AddressManager';

export default function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    setProfileForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
    });
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await authService.updateProfile(profileForm);
      await refreshUser();
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile.');
    } finally { setSaving(false); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
              {(user.first_name || user.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {user.first_name || 'My Account'}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-destructive border border-destructive/30 px-4 py-2 rounded-lg hover:bg-destructive/5 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Personal Info */}
        <div className="bg-card rounded-2xl border border-border/30 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'first_name', label: 'First Name' },
              { key: 'last_name', label: 'Last Name' },
              { key: 'phone', label: 'Phone Number' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                  {label}
                </label>
                <input
                  value={(profileForm as any)[key]}
                  onChange={(e) => setProfileForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-border/30 rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                value={user.email}
                disabled
                className="w-full border border-border/20 rounded-lg px-3 py-2.5 text-sm bg-muted/30 text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-bold disabled:opacity-60 transition hover:opacity-90"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Addresses — uses shared component */}
        <div className="bg-card rounded-2xl border border-border/30 p-6">
          <AddressManager />
        </div>

      </div>
    </div>
  );
}