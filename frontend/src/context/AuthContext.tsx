import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved =
      localStorage.getItem("pulse_user");

    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("pulse_token")
  );

  const login = (
    user: User,
    token: string
  ) => {
    localStorage.setItem(
      "pulse_user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "pulse_token",
      token
    );

    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("pulse_user");
    localStorage.removeItem("pulse_token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};