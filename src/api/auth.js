import axios from 'axios';
import { buildApiUrl } from '../utils/auth';

export const registerUser = (payload) => axios.post(buildApiUrl('/auth/register'), payload);
export const loginUser = (payload) => axios.post(buildApiUrl('/auth/login'), payload);
