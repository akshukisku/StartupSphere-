"use client";
import { Globe } from "@/components/ui/globe";
import LoginForm from "@/layout/auth/LoginForm";

const Login = () => {
  return (
  <main className="min-h-screen bg-background p-4 md:p-8">
      <div
        className="
    mx-auto
    flex
    min-h-[90vh]
    max-w-7xl
    overflow-hidden
    rounded-[32px]
    border
    border-slate-800
    bg-[#07112A]
    shadow-[0_0_80px_rgba(0,0,0,0.45)]
  "
      >
        {/* LEFT PANEL */}
        <div className="relative hidden w-1/2 overflow-hidden lg:flex">
          {/* Background */}
          <div className="absolute inset-0 bg-background" />

          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

          <div className="relative z-10 flex h-full w-full flex-col justify-between p-10">
            {/* Heading */}
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                StartupSphere
                <span className="text-primary">+</span>
              </h1>

              <p className="mt-4 max-w-sm text-lg leading-8 text-muted-foreground">
                Connect founders, investors and mentors to build the next
                generation of startups.
              </p>
            </div>

            {/* Globe */}
            <div className="relative flex flex-1 items-center justify-center">
              <Globe className="scale-125" />
            </div>

            {/* Bottom */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  🚀
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    Verified Founders
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Build with trusted entrepreneurs.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  💰
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    Active Investors
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Connect with global funding partners.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  🧠
                </div>

                <div>
                  <p className="font-medium text-foreground">Expert Mentors</p>

                  <p className="text-sm text-muted-foreground">
                    Learn from experienced founders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex w-full items-center justify-center p-6 md:p-10 lg:w-1/2">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
