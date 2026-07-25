import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await login(token);

        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    initialize();
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}