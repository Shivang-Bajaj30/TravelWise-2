const API_BASE_URL = 'http://localhost:8080/api';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  id: string;
  username: string;
  email: string;
}

export const signup = async (userData: SignupRequest): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
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