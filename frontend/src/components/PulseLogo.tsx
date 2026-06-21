import React from "react";

interface PulseLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "full" | "wordmark";
}

export function PulseIcon({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-11 h-11"
  };

  return (
    <svg
      viewBox="0 0 28 28"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="iconPulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {/* 
        Single continuous path heartbeat that rises up and down, 
        flows into the stem, creates the bowl of the letter 'P' 
        and finishes at the bottom stem base.
      */}
      <path
        d="M 3,14 L 7,14 L 9.5,4 L 12,24 L 14.5,14 L 17,14 L 17,4 C 23.5,4 23.5,13 17,13 L 17,24"
        stroke="url(#iconPulseGradient)"
        strokeWidth="2.8"
      />
    </svg>
  );
}

export default function PulseLogo({ className = "", size = "md", variant = "full" }: PulseLogoProps) {
  const wrapperClass = `flex items-center gap-2.5 ${className}`;
  
  const textSizes = {
    sm: "text-base tracking-tight font-extrabold",
    md: "text-xl tracking-tight font-extrabold",
    lg: "text-2xl tracking-tight font-extrabold"
  };

  if (variant === "icon") {
    return <PulseIcon size={size} className="hover:scale-105 transition-transform" />;
  }

  return (
    <div className={wrapperClass}>
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#12131a] to-[#0e1017] p-1.5 border border-indigo-500/10 shadow-lg group-hover:border-indigo-500/20 transition-all">
        <PulseIcon size={size === "lg" ? "md" : "sm"} />
      </div>
      
      {variant === "full" && (
        <span className={`${textSizes[size]} bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400 font-sans`}>
          PULSE
        </span>
      )}
    </div>
  );
}
