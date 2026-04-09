import { useEffect, useState } from 'react';
import { fetchFoodListings, deleteFoodListing } from '../api/food';
import { createRequest } from '../api/requests';
import { getUserFromStorage } from '../utils/auth';

const FoodListings = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const user = getUserFromStorage()?.user;

  const loadListings = async () => {
    try {
      const response = await fetchFoodListings({ search, location });
      setListings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleSearch = async () => {
    await loadListings();
  };

  const requestFood = async (foodId) => {
    setMessage('');
    try {
      await createRequest({ foodId });
      setMessage('Request submitted successfully.');
      await loadListings();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to request food');
    }
  };

  const deleteFood = async (foodId) => {
    if (!window.confirm('Are you sure you want to delete this food listing?')) {
      return;
    }
    setMessage('');
    try {
      await deleteFoodListing(foodId);
      setMessage('Food listing deleted successfully.');
      await loadListings();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to delete food listing');
    }
  };

  return (
    <section className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Available Food Listings</h1>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search food" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <button onClick={handleSearch} className="rounded-full bg-slate-900 px-6 py-3 text-white">Search</button>
        </div>
      </div>

      {message && <div className="rounded-2xl bg-emerald-100 p-4 text-sm text-emerald-800">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        {listings.map((item) => (
          <article key={item.id} className="card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="h-40 w-full overflow-hidden rounded-3xl bg-slate-100 sm:w-48">
                <img src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{item.description}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Qty: {item.quantity}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Location: {item.location}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>Donor: {item.donor?.name || 'N/A'}</span>
                  <span>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
                  <span>Status: {item.status}</span>
                </div>
              </div>
            </div>
            {user?.role === 'recipient' && item.status === 'available' && (
              <button onClick={() => requestFood(item.id)} className="mt-5 rounded-full bg-emerald-600 px-5 py-3 text-white">
                Request Food
              </button>
            )}
            {user?.role === 'donor' && item.donor?.id === user.id && (
              <button onClick={() => deleteFood(item.id)} className="mt-5 rounded-full bg-red-600 px-5 py-3 text-white">
                Delete Listing
              </button>
            )}
          </article>
        ))}
        {listings.length === 0 && <p className="text-slate-600 dark:text-slate-300">No matching listings found.</p>}
      </div>
    </section>
  );
};

export default FoodListings;
