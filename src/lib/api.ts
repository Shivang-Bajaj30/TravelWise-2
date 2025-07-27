const dev_url = "https://travelwise-backend.onrender.com/api";
const local_url = "http://localhost:8080/api";

if (!dev_url) {
  console.error("Dev URL is not defined. Please check your environment variables.");
}
if (!local_url) {
  console.error("Local URL is not defined. Please check your environment variables.");
}

const BASE_URL = dev_url;

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const signup = async (userData: SignupRequest): Promise<Response> => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response;
};

export const login = async (email: string, password: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
};

export interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

export const fetchLocationSuggestions = async (query: string): Promise<NominatimResult[]> => {
  try {
    const res = await fetch(`${BASE_URL}/locations?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch location suggestions');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return [];
  }
};

export interface TripDetails {
  location: string;
  travelers: number;
  startDate: string;
  endDate: string;
  preferences: string;
}

export const submitTripDetails = async (trip: TripDetails): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to submit trip');
    }
    return await response.text();
  } catch (error) {
    console.error('Error submitting trip:', error);
    throw error;
  }
};