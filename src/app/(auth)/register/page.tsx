"use client";

import RegisterForm from "@/layout/auth/RegisterForm";

const Register = () => {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div
        className="
          glass
          mx-auto
          mt-10
          flex
          min-h-[90vh]
          max-w-7xl
          overflow-hidden
          rounded-[32px]
          border
          border-border
          bg-card
          shadow-xl
        "
      >
        {/* LEFT PANEL */}
        <div className="relative hidden w-1/2 overflow-hidden lg:flex">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            {/* Heading */}
            <div>
              <h1 className="text-4xl font-bold">
                StartupSphere
                <span className="text-primary">+</span>
              </h1>

              <p className="mt-4 max-w-sm text-lg leading-8 text-muted-foreground">
                Connect founders, investors and mentors to build the next
                generation of startups.
              </p>
            </div>

            {/* Feature */}
            <div className="max-w-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                🚀
              </div>

              <h3 className="font-semibold uppercase tracking-[0.2em] text-primary">
                Real-Time Efficiency
              </h3>

              <p className="mt-2 text-muted-foreground">
                Optimize routes in milliseconds.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex w-full items-center justify-center p-6 md:p-10 lg:w-1/2">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default Register;