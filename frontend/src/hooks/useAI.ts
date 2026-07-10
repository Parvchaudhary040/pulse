import { useState } from "react";

export function useAI() {
  const [isOpen, setIsOpen] = useState(false);

  const openAI = () => setIsOpen(true);

  const closeAI = () => setIsOpen(false);

  const toggleAI = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    openAI,
    closeAI,
    toggleAI,
  };
}