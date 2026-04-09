import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-sky-600 p-10 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Food Waste Management & Food Security</h1>
        <p className="mt-4 max-w-2xl text-lg">Connect donors, recipients, analysts, and admins to reduce waste, improve distribution, and track impact in real time.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/register" className="rounded-full bg-white px-6 py-3 text-slate-900 shadow-lg">
            Get Started
          </Link>
          <Link to="/login" className="rounded-full border border-white px-6 py-3 text-white">
            Login
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="card">
          <h2 className="text-2xl font-semibold">For Donors</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">List food items, share location details, and accept requests from recipient organizations.</p>
        </article>
        <article className="card">
          <h2 className="text-2xl font-semibold">For Recipients</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Browse available donations, submit requests, and manage received supplies efficiently.</p>
        </article>
        <article className="card">
          <h2 className="text-2xl font-semibold">For Analysts</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Track trends, generate reports, and identify high waste categories across the system.</p>
        </article>
        <article className="card">
          <h2 className="text-2xl font-semibold">For Admins</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Monitor listings, manage users, and ensure data accuracy from a centralized dashboard.</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
