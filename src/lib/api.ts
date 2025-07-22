const dev_url = "https://travelwise-backend.onrender.com/api";
const local_url = "http://localhost:8080/api";

if (!dev_url) {
  console.error("Dev URL is not defined. Please check your environment variables.");
}
if (!local_url) {
  console.error("Local URL is not defined. Please check your environment variables.");
}

const BASE_URL = dev_url;

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const signup = async (userData: SignupRequest): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, { // Changed to BASE_URL
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


// The login function, now improved to handle both JSON and plain text error responses
export async function login(email: string, password: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errorMessage = 'Login failed';
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        const errorData = await res.json();
       
        errorMessage = errorData.message || errorData.error || res.statusText;
      } catch (e) {
        
        errorMessage = await res.text(); 
        if (!errorMessage) errorMessage = res.statusText; 
      }
    } else {
      errorMessage = await res.text();
      if (!errorMessage) errorMessage = res.statusText;
    }
    throw new Error(errorMessage);
  }

  
  const data = await res.json();
  return data;
}
