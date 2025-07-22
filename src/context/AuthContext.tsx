import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

// Define the User interface based on what your backend returns on successful login
interface User {
  id: string; // Assuming your backend returns a user ID
  email: string; // Assuming your backend returns user email
  name?: string; // Optional user name (if your backend provides it)
  // Add other user properties here as returned by your backend login API
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null; // The currently logged-in user or null if not logged in
  loginUser: (userData: User) => void; // Function to log in a user
  logoutUser: () => void; // Function to log out a user
  loadingAuth: boolean; // Indicates if the initial authentication state is being loaded (e.g., from local storage)
}

// Create the AuthContext with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap your application and provide auth context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // Initially true to show loading state

  // useEffect to load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        // Attempt to parse stored user data from JSON
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If parsing fails (e.g., corrupted data), log the error and clear localStorage
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
    // Set loadingAuth to false once the initial check is complete
    setLoadingAuth(false);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle user login
  const loginUser = (userData: User) => {
    setUser(userData); // Set user in state
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  // Function to handle user logout
  const logoutUser = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  // Provide the context values to children components
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Throw an error if the hook is used outside of an AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};