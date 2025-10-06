const BASE_URL = "http://127.0.0.1:5000"; // or your deployed Flask URL

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const submitTripDetails = async (tripData: any) => {
  const response = await fetch(`${BASE_URL}/trip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tripData),
  });
  return response.json();
};
