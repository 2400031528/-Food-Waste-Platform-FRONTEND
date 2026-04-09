import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { fetchOverview, fetchDemandSupply, fetchTrends } from '../api/analytics';
import { getUserFromStorage } from '../utils/auth';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const user = getUserFromStorage()?.user;
  const [overview, setOverview] = useState(null);
  const [demandSupply, setDemandSupply] = useState(null);
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    if (!user || !['admin', 'analyst'].includes(user.role)) {
      return;
    }

    const loadAnalytics = async () => {
      try {
        const [overviewRes, demandRes, trendsRes] = await Promise.all([fetchOverview(), fetchDemandSupply(), fetchTrends()]);
        setOverview(overviewRes.data);
        setDemandSupply(demandRes.data);
        setTrends(trendsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadAnalytics();
  }, [user]);

  if (!user || !['admin', 'analyst'].includes(user.role)) {
    return (
      <section className="mx-auto max-w-2xl space-y-6">
        <div className="card">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Analytics are available only to admin and analyst users.</p>
        </div>
      </section>
    );
  }

  const trendData = {
    labels: trends?.listings.map((item) => item.date) || [],
    datasets: [
      {
        label: 'New Listings',
        data: trends?.listings.map((item) => item.count) || [],
        fill: false,
        borderColor: '#0f766e',
        backgroundColor: '#0f766e',
      },
    ],
  };

  const wastedData = {
    labels: trends?.wasteByFood.map((item) => item.title) || [],
    datasets: [
      {
        label: 'Potential Waste Quantity',
        data: trends?.wasteByFood.map((item) => item.wasted) || [],
        backgroundColor: '#1d4ed8',
      },
    ],
  };

  return (
    <section className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Visualize food waste trends, supply metrics, and demand patterns.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="mt-3 text-3xl font-bold">{overview?.totalDonations ?? '—'}</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          <p className="mt-3 text-3xl font-bold">{overview?.totalRequests ?? '—'}</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Demand / Supply</h2>
          <p className="mt-3 text-3xl font-bold">{demandSupply ? `${demandSupply.demand} / ${demandSupply.supply}` : '—'}</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold">Listings over time</h2>
          <Line data={trendData} />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Most wasted foods</h2>
          <Bar data={wastedData} />
        </div>
      </div>
    </section>
  );
};

export default Analytics;
