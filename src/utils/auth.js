export const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem('fw_user');
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    return null;
  }
};

export const getAuthHeaders = () => {
  const stored = getUserFromStorage();
  if (!stored?.token) return {};
  return { Authorization: `Bearer ${stored.token}` };
};

const DEFAULT_API_URL = 'http://localhost:5000/api';
export const buildApiUrl = (path) => `${process.env.REACT_APP_API_URL || DEFAULT_API_URL}${path}`;
