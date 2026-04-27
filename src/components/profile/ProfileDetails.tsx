import { useEffect, useState } from "react";
import { orderService } from "@/services/api";
export default function ProfileDetails({ user, onSave }: { user: any, onSave: any }) {
  const [form, setForm] = useState(user);
  return (
    <div className="space-y-4">
      <input className="w-full border p-2 rounded" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} />
      <button onClick={() => onSave(form)} className="bg-primary text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}