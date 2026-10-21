let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchWithFallback = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (response.ok || response.status === 401 || response.status === 404) {
      return response;
    }
  } catch (err) {
    // If port 5000 fails, attempt port 5001
    if (API_BASE_URL.includes('5000')) {
      API_BASE_URL = 'http://localhost:5001/api';
      return await fetch(`${API_BASE_URL}${endpoint}`, options);
    }
    throw err;
  }
  return await fetch(`${API_BASE_URL}${endpoint}`, options);
};

// Public track API
export const trackShipmentByBl = async (blNumber) => {
  const cleanBl = String(blNumber).trim().toUpperCase();
  const response = await fetchWithFallback(`/shipments/track/${encodeURIComponent(cleanBl)}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Shipment not found.');
  }
  return data;
};

// Admin Login
export const adminLoginApi = async (password) => {
  const response = await fetchWithFallback(`/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed.');
  }
  return data;
};

// Admin Fetch All Shipments
export const getAdminShipments = async (token) => {
  const response = await fetchWithFallback(`/admin/shipments`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch shipments.');
  }
  return data;
};

// Admin Create Shipment
export const createAdminShipment = async (token, shipmentData) => {
  const response = await fetchWithFallback(`/admin/shipments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(shipmentData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create shipment.');
  }
  return data;
};

// Admin Update Milestone
export const updateAdminMilestone = async (token, shipmentId, milestone, payload) => {
  const response = await fetchWithFallback(`/admin/shipments/${shipmentId}/tracking/${milestone}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update milestone.');
  }
  return data;
};

// Admin Update General Shipment Details
export const updateAdminShipment = async (token, shipmentId, payload) => {
  const response = await fetchWithFallback(`/admin/shipments/${shipmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update shipment.');
  }
  return data;
};
