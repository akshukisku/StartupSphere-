"use client";

import AiHeader from "./AiHeader";
import AiMessages from "./AiMessages";
import AiInput from "./AiInput";

const AiChatWindow = () => {
  return (
    <div
      className="
        fixed
        inset-x-3
        bottom-3
        z-50

        flex
        h-[calc(100vh-6rem)]
        max-h-[700px]
        w-auto
        flex-col

        overflow-hidden

        rounded-3xl
        border
        border-border/50

        bg-background/95
        backdrop-blur-2xl

        shadow-2xl

        sm:bottom-6
        sm:right-6
        sm:left-auto
        sm:h-[600px]
        sm:w-[420px]

        lg:h-[650px]
        lg:w-[440px]
      "
    >
      <AiHeader />

      <AiMessages />

      <AiInput />
    </div>
  );
};

export default AiChatWindow;