
const prod = 'https://travelwise-backend.onrender.com/api';
// const dev = 'http://localhost:8080/api';

const DEV_URL = prod;

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const signup = async (userData: SignupRequest): Promise<Response> => {
  try {
    const response = await fetch(`${DEV_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response; 

  } catch (error: any) {
    console.error('Error during signup:', error);
    throw error;
  }
};


export async function login(email: string, password: string): Promise<any> {
  const res = await fetch(`${DEV_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}
