import { useEffect, useState } from 'react';
import { fetchRequests, updateRequest } from '../api/requests';
import { getUserFromStorage } from '../utils/auth';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const user = getUserFromStorage()?.user;

  const loadRequests = async () => {
    setLoading(true);
    try {
      const response = await fetchRequests();
      setRequests(response.data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || err.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const changeStatus = async (id, status) => {
    setMessage('');
    try {
      await updateRequest(id, { status });
      setMessage(`Request ${status}.`);
      await loadRequests();
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Unable to update request');
    }
  };

  return (
    <section className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Track pending requests and manage approvals.</p>
      </div>
      {message && <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-800">{message}</div>}
      {loading ? (
        <div className="card text-center">Loading requests...</div>
      ) : (
        <div className="grid gap-6">
          {requests.map((request) => (
            <div key={request.id} className="card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{request.foodListing?.title || 'Unknown item'}</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">Recipient: {request.recipient?.name || 'N/A'}</p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">Status: {request.status}</p>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Request created: {new Date(request.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user?.role === 'donor' && request.status === 'pending' && (
                    <>
                      <button onClick={() => changeStatus(request.id, 'accepted')} className="rounded-full bg-emerald-600 px-4 py-2 text-white">
                        Accept
                      </button>
                      <button onClick={() => changeStatus(request.id, 'rejected')} className="rounded-full bg-red-600 px-4 py-2 text-white">
                        Reject
                      </button>
                    </>
                  )}
                  {user?.role === 'donor' && request.status !== 'pending' && (
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">Request {request.status}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {requests.length === 0 && <p className="text-slate-600 dark:text-slate-300">No requests found.</p>}
        </div>
      )}
    </section>
  );
};

export default Requests;
