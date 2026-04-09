import axios from 'axios';
import { buildApiUrl, getAuthHeaders } from '../utils/auth';

export const fetchFoodListings = (params) => axios.get(buildApiUrl('/food'), { headers: getAuthHeaders(), params });
export const createFoodListing = (payload) => axios.post(buildApiUrl('/food'), payload, { headers: getAuthHeaders() });
export const updateFoodListing = (id, payload) => axios.patch(buildApiUrl(`/food/${id}`), payload, { headers: getAuthHeaders() });
export const deleteFoodListing = (id) => axios.delete(buildApiUrl(`/food/${id}`), { headers: getAuthHeaders() });
export const getDonorHistory = () => axios.get(buildApiUrl('/food/donor/history'), { headers: getAuthHeaders() });
