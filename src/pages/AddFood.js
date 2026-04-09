import { useState } from 'react';
import { createFoodListing } from '../api/food';
import { getUserFromStorage } from '../utils/auth';

const AddFood = () => {
  const user = getUserFromStorage()?.user;
  const [form, setForm] = useState({ title: '', description: '', quantity: 1, expiryDate: '', location: '', imageUrl: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await createFoodListing({ ...form, quantity: Number(form.quantity) });
      setMessage('Food listing created successfully.');
      setForm({ title: '', description: '', quantity: 1, expiryDate: '', location: '', imageUrl: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to create listing');
    }
  };

  if (user?.role !== 'donor') {
    return (
      <section className="mx-auto max-w-2xl space-y-6">
        <div className="card">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Only donor users can create new food listings.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Add Food Listing</h1>
        {message && <div className="mt-4 rounded-2xl bg-emerald-100 p-4 text-emerald-800">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Food title" className="rounded-xl border border-slate-300 px-4 py-3" required />
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Description" className="rounded-xl border border-slate-300 px-4 py-3" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="rounded-xl border border-slate-300 px-4 py-3" required />
            <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} className="rounded-xl border border-slate-300 px-4 py-3" required />
          </div>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="rounded-xl border border-slate-300 px-4 py-3" required />
          <label className="block rounded-2xl border border-dashed border-slate-300 p-4 text-slate-600 dark:text-slate-300">
            Upload image (optional)
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-3 block w-full" />
          </label>
          <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-white">Create Listing</button>
        </form>
      </div>
    </section>
  );
};

export default AddFood;
