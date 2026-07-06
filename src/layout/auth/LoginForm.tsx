"use client";

import { Button } from "@/components/ui/button";
import DyanmicInput from "@/components/DyanmicInput";
import { loginInputField } from "@/service/json/input-field/login.input";
import { loginSchema } from "@/service/validation/login.validation";
import { LoginPayload } from "@/types/interface/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { getApprovalStatus, getUserRole } from "@/lib/auth";

const LoginForm = () => {
  const router = useRouter();

  const { login, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    const success = await login(data.email, data.password);

    if (success) {
      toast.success("Login successful");

      reset();

      // temporary
      const approvalStatus = getApprovalStatus();

      const role = getUserRole();

      if (approvalStatus === "pending") {
        router.push("/pending");
        return;
      }

      if (approvalStatus === "rejected") {
        router.push("/rejected");
        return;
      }

      if (approvalStatus === "approved") {
        switch (role) {
          case "founder":
            router.push("/founder/dashboard");
            break;

          case "mentor":
            router.push("/mentor/dashboard");
            break;

          case "investor":
            router.push("/investor/dashboard");
            break;

          case "admin":
            router.push("/admin/dashboard");
            break;

          default:
            router.push("/");
        }
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-5xl font-bold tracking-tight text-white">
        Welcome Back
      </h2>

      <p className="mt-2 text-slate-400">
        Sign in to continue to StartupSphere.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid gap-4">
          {loginInputField.map((input, index) => (
            <DyanmicInput
              key={index}
              label={input.label}
              name={input.name}
              type={input.type}
              error={errors[input.name as keyof LoginPayload]?.message}
              register={register}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-lime-400 text-black hover:bg-lime-300"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        <p className="text-center text-slate-400">
          Don't have an account?
          <Link
            href="/register"
            className="ml-2 font-medium text-white hover:text-lime-400"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
