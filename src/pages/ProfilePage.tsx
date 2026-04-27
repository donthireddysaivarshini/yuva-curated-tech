//yuva computers
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Address {
  id: number;
  label: string;
  first_name: string;
  last_name: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  landmark: string;
  is_default: boolean;
}

const emptyAddress: Omit<Address, 'id' | 'is_default'> = {
  label: 'Home',
  first_name: '',
  last_name: '',
  address: '',
  apartment: '',
  city: '',
  state: 'Telangana',
  zip_code: '',
  country: 'India',
  phone: '',
  landmark: '',
};

export default function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();

  // Profile state
  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [addressSaving, setAddressSaving] = useState(false);
  const [addressMsg, setAddressMsg] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    setProfileForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
    });
    loadAddresses();
  }, [user]);

  const loadAddresses = async () => {
    try {
      setAddressLoading(true);
      const data = await authService.getSavedAddresses();
      setAddresses(Array.isArray(data) ? data : data.results || []);
    } catch {
      setAddresses([]);
    } finally {
      setAddressLoading(false);
    }
  };

  // ── Profile handlers ──────────────────────────────────────────────────────
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSave = async () => {
    setProfileSaving(true);
    setProfileMsg('');
    try {
      await authService.updateProfile(profileForm);
      await refreshUser();
      setProfileMsg('Profile updated successfully!');
    } catch {
      setProfileMsg('Failed to update profile. Please try again.');
    } finally {
      setProfileSaving(false);
      setTimeout(() => setProfileMsg(''), 3000);
    }
  };

  // ── Address handlers ──────────────────────────────────────────────────────
  const openAddressForm = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        label: address.label,
        first_name: address.first_name,
        last_name: address.last_name,
        address: address.address,
        apartment: address.apartment,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        country: address.country,
        phone: address.phone,
        landmark: address.landmark,
      });
    } else {
      setEditingAddress(null);
      setAddressForm(emptyAddress);
    }
    setShowAddressForm(true);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAddressForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressSave = async () => {
    // 1. Basic validation
    if (!addressForm.first_name || !addressForm.address || !addressForm.zip_code) {
        toast.error("Please fill in required fields (Name, Address, ZIP).");
        return;
    }

    setAddressSaving(true);
    try {
        // 2. Prepare payload
        const payload = {
            ...addressForm,
            // Ensure ID is passed if editing
            ...(editingAddress? { id: editingAddress.id} : {})
        };

        // 3. Call Service
        await authService.saveAddress(payload);
        
        // 4. Refresh List & Reset UI
        await loadAddresses();
        setShowAddressForm(false);
        setEditingAddress(null);
        toast.success("Address saved successfully!");
    } catch (err: any) {
        console.error("Save Address Error:", err);
        // Show specific backend error if available
        toast.error(err?.non_field_errors?.[0] || "Failed to save address. Check your inputs.");
    } finally {
        setAddressSaving(false);
    }
};

  const handleDeleteAddress = async (id: number) => {
    if (!confirm('Delete this address?')) return;
    try {
      await authService.deleteAddress(id);
      await loadAddresses();
    } catch {
      alert('Failed to delete address.');
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await authService.setDefaultAddress(id);
      await loadAddresses();
    } catch {
      alert('Failed to set default address.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

        {/* ── Profile Info Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">First Name</label>
              <input
                name="first_name"
                value={profileForm.first_name}
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Last Name</label>
              <input
                name="last_name"
                value={profileForm.last_name}
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              <input
                value={user.email}
                disabled
                className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
              <input
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {profileMsg && (
            <p className={`text-sm ${profileMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
              {profileMsg}
            </p>
          )}

          <button
            onClick={handleProfileSave}
            disabled={profileSaving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {profileSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* ── Saved Addresses Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Saved Addresses</h2>
            {addresses.length < 3 && !showAddressForm && (
              <button
                onClick={() => openAddressForm()}
                className="text-sm text-blue-600 border border-blue-200 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition"
              >
                + Add Address
              </button>
            )}
          </div>

          {addressMsg && (
            <p className={`text-sm ${addressMsg.includes('saved') ? 'text-green-600' : 'text-red-500'}`}>
              {addressMsg}
            </p>
          )}

          {/* Address List */}
          {addressLoading ? (
            <p className="text-sm text-gray-400">Loading addresses...</p>
          ) : addresses.length === 0 && !showAddressForm ? (
            <p className="text-sm text-gray-400">No saved addresses yet.</p>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`border rounded-xl p-4 relative ${
                    addr.is_default
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  {addr.is_default && (
                    <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                      Default
                    </span>
                  )}
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{addr.label}</p>
                  <p className="text-sm text-gray-800 font-medium">
                    {addr.first_name} {addr.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.address}{addr.apartment ? `, ${addr.apartment}` : ''}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} — {addr.zip_code}
                  </p>
                  {addr.landmark && (
                    <p className="text-xs text-gray-400">Landmark: {addr.landmark}</p>
                  )}
                  <p className="text-sm text-gray-600">📞 {addr.phone}</p>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => openAddressForm(addr)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                    {!addr.is_default && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-xs text-gray-500 hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address Form */}
          {showAddressForm && (
            <div className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">
                {editingAddress ? 'Edit Address' : 'New Address'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Label */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                  <select
                    name="label"
                    value={addressForm.label}
                    onChange={handleAddressChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Home</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>

                {[
                  { name: 'first_name', label: 'First Name' },
                  { name: 'last_name', label: 'Last Name' },
                  { name: 'phone', label: 'Phone' },
                  { name: 'address', label: 'Street Address' },
                  { name: 'apartment', label: 'Apartment / Floor (optional)' },
                  { name: 'landmark', label: 'Landmark (optional)' },
                  { name: 'city', label: 'City' },
                  { name: 'state', label: 'State' },
                  { name: 'zip_code', label: 'ZIP Code' },
                  { name: 'country', label: 'Country' },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                    <input
                      name={name}
                      value={(addressForm as any)[name]}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddressSave}
                  disabled={addressSaving}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 transition"
                >
                  {addressSaving ? 'Saving...' : 'Save Address'}
                </button>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="text-sm text-gray-500 px-5 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}