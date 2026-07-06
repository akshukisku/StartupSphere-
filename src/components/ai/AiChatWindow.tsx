"use client";

import AiHeader from "./AiHeader";
import AiMessages from "./AiMessages";
import AiInput from "./AiInput";

const AiChatWindow = () => {
  return (
    <div
      className="
      fixed
      bottom-24
      right-6
      z-50

      flex

      h-[550px]
      w-[420px]

      flex-col

      overflow-hidden

      rounded-3xl

      border

      border-white/10

      bg-white/10

      backdrop-blur-3xl

      shadow-[0_20px_80px_rgba(0,0,0,.35)]

      dark:bg-zinc-900/40
    "
    >
      <AiHeader />

      <AiMessages />

      <AiInput />
    </div>
  );
};

export default AiChatWindow;