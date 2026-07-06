"use client"
import RegisterForm from "@/layout/auth/RegisterForm";
import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {

  return (
    <main className="min-h-screen bg-[#020817] p-4 md:p-8">
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
        <div className="relative hidden w-1/2 lg:flex">
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564')",
            }}
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <div>
              <h1 className="text-4xl font-bold">
                StartupSphere<span className="text-lime-400">+</span>
              </h1>

              <p className="mt-4 max-w-sm text-lg text-slate-300">
                Connect founders, investors and mentors to build the next
                generation of startups.
              </p>
            </div>

            <div className="max-w-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                🚀
              </div>

              <h3 className="font-semibold tracking-widest text-lime-300">
                REAL-TIME EFFICIENCY
              </h3>

              <p className="mt-2 text-slate-300">
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
