import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchClients = async () => {
  const res = await axios.get(`${API_BASE}/admin/clients`);
  return res.data;
};

export const fetchLogs = async () => {
  const res = await axios.get(`${API_BASE}/admin/logs`);
  return res.data;
};

export const toggleBlockClient = async (id) => {
  const res = await axios.patch(`${API_BASE}/admin/clients/${id}/block`);
  return res.data;
};