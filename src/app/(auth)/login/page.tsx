"use client";

import { Globe } from "@/components/ui/globe";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import LoginForm from "@/layout/auth/LoginForm";

const FEATURES = [
  {
    icon: "🚀",
    title: "Verified Founders",
    description: "Build with trusted entrepreneurs.",
  },
];

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      <div className="glass mx-auto mt-10 flex min-h-[90vh] w-full max-w-7xl overflow-hidden rounded-[32px] border border-border shadow-xl">
        {/* ================= Left Panel ================= */}
        <div className="relative hidden w-1/2 overflow-hidden lg:flex">
          {/* Background */}
          <div className="absolute inset-0 bg-background" />

          {/* Hexagon Pattern */}
          <HexagonPattern className="absolute inset-0 h-full w-full opacity-20" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />

          <div className="relative z-10 flex h-full w-full flex-col justify-between p-10">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                StartupSphere
                <span className="text-primary">+</span>
              </h1>

              <p className="max-w-md text-lg leading-8 text-muted-foreground">
                Connect founders, investors, and mentors to build the next
                generation of innovative startups.
              </p>
            </div>

            {/* Globe */}
            <div className="relative flex flex-1 items-center justify-center">
              <div className="relative h-[360px] w-[360px] xl:h-[440px] xl:w-[440px]">
                <Globe className="h-full w-full" />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-5">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Right Panel ================= */}
        <div className="flex w-full items-center justify-center p-6 md:p-10 lg:w-1/2">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;