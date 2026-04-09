import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchOverview, fetchDemandSupply, fetchTrends } from '../api/analytics';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [overview, setOverview] = useState(null);
  const [demandSupply, setDemandSupply] = useState(null);
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      if (auth?.user?.role === 'admin' || auth?.user?.role === 'analyst') {
        try {
          const [overviewRes, demandRes, trendsRes] = await Promise.all([fetchOverview(), fetchDemandSupply(), fetchTrends()]);
          setOverview(overviewRes.data);
          setDemandSupply(demandRes.data);
          setTrends(trendsRes.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    loadAnalytics();
  }, [auth]);

  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-3xl font-semibold">Hello, {auth?.user?.name}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Role: {auth?.user?.role}</p>
      </section>

      {(auth?.user?.role === 'admin' || auth?.user?.role === 'analyst') && (
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="card">
            <h2 className="text-lg font-semibold">Total Donations</h2>
            <p className="mt-4 text-3xl font-bold">{overview?.totalDonations ?? '—'}</p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold">Requests</h2>
            <p className="mt-4 text-3xl font-bold">{overview?.totalRequests ?? '—'}</p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold">Completed</h2>
            <p className="mt-4 text-3xl font-bold">{overview?.completedDonations ?? '—'}</p>
          </div>
        </section>
      )}

      {demandSupply && (
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold">Demand vs Supply</h2>
            <p className="mt-4">Supply: {demandSupply.supply}</p>
            <p className="mt-2">Pending requests: {demandSupply.demand}</p>
            <p className="mt-2">Ratio: {demandSupply.ratio.toFixed(2)}</p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold">System Insights</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Use analytics to identify donation peaks and waste reduction opportunities.</p>
          </div>
        </section>
      )}

      {auth?.user?.role === 'donor' && (
        <div className="card">
          <h2 className="text-lg font-semibold">Donor Actions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
            <li>Add fresh listings quickly.</li>
            <li>Review incoming requests.</li>
            <li>Track donation history from the Food Listings page.</li>
          </ul>
        </div>
      )}

      {auth?.user?.role === 'recipient' && (
        <div className="card">
          <h2 className="text-lg font-semibold">Recipient Actions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
            <li>Browse available food listings.</li>
            <li>Submit requests.</li>
            <li>Watch request status and distribution details.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
