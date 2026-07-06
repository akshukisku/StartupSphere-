"use client";

import { Sparkles } from "lucide-react";

import { useAiChatStore } from "@/store/useAiChatStore";

const AiFloatingButton = () => {
  const { toggle } = useAiChatStore();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <Sparkles className="h-7 w-7" />
    </button>
  );
};

export default AiFloatingButton;