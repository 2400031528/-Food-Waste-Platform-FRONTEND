import axios from 'axios';
import { buildApiUrl, getAuthHeaders } from '../utils/auth';

export const fetchRequests = () => axios.get(buildApiUrl('/requests'), { headers: getAuthHeaders() });
export const createRequest = (payload) => axios.post(buildApiUrl('/requests'), payload, { headers: getAuthHeaders() });
export const updateRequest = (id, payload) => axios.patch(buildApiUrl(`/requests/${id}`), payload, { headers: getAuthHeaders() });
