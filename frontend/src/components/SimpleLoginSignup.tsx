import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Github, Chrome } from "lucide-react";
import PulseLogo from "./PulseLogo";
import * as authService from "../services/authService";

interface SimpleLoginSignupProps {
  initialIsSignUp?: boolean;
  onLoginSuccess: (email: string) => Promise<void>;
  onToggleMode: () => void;
}

export default function SimpleLoginSignup({
  initialIsSignUp = false,
  onLoginSuccess,
  onToggleMode
}: SimpleLoginSignupProps) {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [email, setEmail] = useState("alex.rivera@pulse.io");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("Alex Rivera");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all layout coordinates.");
      return;
    }

    if (isSignUp && !fullName) {
      setError("Please enter your formal full name.");
      return;
    }

    if (isSignUp && !agreeTerms) {
      setError("Please agree to our privacy guidelines terms first.");
      return;
    }

    setLoading(true);

try {
  if (isSignUp) {
    const response = await authService.register({
      name: fullName,
      email,
      password,
    });

    if (response.success) {
      alert("Registration Successful! Please login.");
      setIsSignUp(false);
    } else {
      setError(response.message);
    }
  } else {
    const response = await authService.login({
      email,
      password,
    });

  if (response.success) {
  localStorage.setItem("pulse_token", response.token);
  localStorage.setItem("pulse_user", JSON.stringify(response.user));

  await onLoginSuccess(email);
}
else {
  setError(response.message);
}
  }
} catch (error) {
  setError("Unable to connect to the server.");
} finally {
  setLoading(false);
}
  };

  const handleDemoLogin = () => {
    setEmail("alex.rivera@pulse.io");
    setPassword("password123");
    setFullName("Alex Rivera");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess("alex.rivera@pulse.io");
    }, 600);
  };

  return (
    <div className="bg-[#0b0c10] text-[#f4f6fe] min-h-screen flex flex-col justify-center items-center px-6 relative selection:bg-[#4f46e5]">
      {/* Glow lines */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md p-8 md:p-10 rounded-2xl bg-[#12131a] border border-gray-800/80 shadow-2xl relative z-10">
        
        {/* Brand logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-3">
            <PulseLogo size="lg" variant="icon" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase font-sans">
            {isSignUp ? "Create Workspace Account" : "Access Pulse Dashboard"}
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-light max-w-xs">
            {isSignUp 
              ? "Gain structural coordination parameters and timeline telemetry logs." 
              : "Enter your registered credentials to synchronize active sprint boards."}
          </p>
        </div>

        {/* Demo Account Indicator Button */}
        <button 
          type="button" 
          onClick={handleDemoLogin}
          className="w-full mb-6 p-3 rounded-xl bg-indigo-950/20 text-[#6366f1] text-xs font-semibold border border-[#3e398d]/40 flex items-center justify-between hover:bg-indigo-950/30 transition-all group"
        >
          <span>👉 Quick Entry with Demo Account</span>
          <span className="flex items-center gap-1 font-mono uppercase bg-[#6366f1]/20 px-2 py-0.5 rounded text-[10px]">
            ALEX.RIVERA <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>

        {error && (
          <div id="error-banner" className="mb-4 p-3.5 rounded-lg bg-red-950/30 border border-red-900/50 text-red-300 text-xs font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div>
              <label id="label-fullname" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Full Name</label>
              <div className="relative">
                <input
                  id="input-fullname"
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl px-4 text-sm text-gray-200"
                />
              </div>
            </div>
          )}

          <div>
            <label id="label-email" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Email Coordinates</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              <input
                id="input-email"
                type="email"
                placeholder="alex.rivera@pulse.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 text-sm text-gray-250 cursor-text"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label id="label-password" className="block text-xs font-mono uppercase tracking-widest text-gray-400">Security Phrase</label>
              {!isSignUp && (
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Demo password reset initiated."); }} className="text-[10px] text-gray-500 hover:text-indigo-400 transition-colors">
                  Forgotten?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              <input
                id="input-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-10 text-sm text-gray-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-500 hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="flex items-center gap-3 py-2">
              <input
                id="checkbox-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded border-gray-800 bg-gray-900 focus:ring-0"
              />
              <span className="text-[11px] text-gray-400 leading-tight">
                I authorize Pulse coordinates to lock secure cookies and accept overall team roadmap structures.
              </span>
            </div>
          )}

          <button
            id="button-submit"
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? "Confirm Registration" : "Enter Secure Workspace"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Dynamic switcher footer */}
        <div className="mt-8 pt-6 border-t border-gray-800/60 text-center">
          <p className="text-xs text-gray-400">
            {isSignUp ? "Already hold workspace coordinates?" : "Need separate developer nodes?"}{" "}
            <button
              id="button-toggle-mode"
              onClick={() => {
                setIsSignUp(!isSignUp);
                onToggleMode();
              }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-all"
            >
              {isSignUp ? "Sign In Instead" : "Register New Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
