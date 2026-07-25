import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as authService from "../services/authService";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("pulse_token")
  );

  const [loading, setLoading] = useState(true);

  const login = async (jwt: string) => {
    localStorage.setItem("pulse_token", jwt);

    setToken(jwt);

    const response = await authService.getCurrentUser();

    setUser(response.user);

    localStorage.setItem(
      "pulse_user",
      JSON.stringify(response.user)
    );

    setLoading(false);
  };

  const logout = () => {
      localStorage.clear();

      setUser(null);
      setToken(null);

      window.location.href = "/login";
  };

  useEffect(() => {
    const initialize = async () => {
      const savedToken =
        localStorage.getItem("pulse_token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response =
          await authService.getCurrentUser();

        setToken(savedToken);

        setUser(response.user);
      } catch {
        logout();
      }

      setLoading(false);
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);