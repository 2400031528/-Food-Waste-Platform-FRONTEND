import axios from 'axios';
import { buildApiUrl, getAuthHeaders } from '../utils/auth';

export const fetchOverview = () => axios.get(buildApiUrl('/analytics/overview'), { headers: getAuthHeaders() });
export const fetchTrends = () => axios.get(buildApiUrl('/analytics/trends'), { headers: getAuthHeaders() });
export const fetchDemandSupply = () => axios.get(buildApiUrl('/analytics/demand-supply'), { headers: getAuthHeaders() });
