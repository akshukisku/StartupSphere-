"use client";
import { Button } from "@/components/ui/button";
import RoleSelector from "./RoleSelector";
import { useForm, useWatch } from "react-hook-form";
import { RegisterPayload } from "@/types/interface/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/service/validation/register.validation";
import { registerInputField } from "@/service/json/input-field/register.input";
import DyanmicInput from "@/components/DyanmicInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole } from "@/types/enum/enum";

const RegisterForm = () => {
  const { registerUser, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: UserRole.FOUNDER,
      terms: false,
    },
  });

  const router = useRouter();

  const selectedRole = useWatch({
    control,
    name: "role",
  });
  const termsAccepted = useWatch({
    control,
    name: "terms",
  });

  const onSubmit = async (data: RegisterPayload) => {
    // console.log("FORM SUBMITTED",data);
    const success = await registerUser(data);

    if (success) {
      toast.success("Registration successful. Waiting for admin approval.");

      reset({
        full_name: "",
        email: "",
        password: "",
        role: UserRole.FOUNDER,
        terms: false,
      });

      router.push("/pending");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-5xl font-bold tracking-tight text-white">
        Create Account
      </h2>

      <p className="mt-2 text-slate-400">
        Complete your profile to access StartupSphere.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("Validation Errors", errors);
        })}
        className="mt-8 space-y-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {registerInputField.map((input, index) => (
            <DyanmicInput
              key={index}
              label={input.label}
              name={input.name}
              type={input.type}
              error={errors[input.name as keyof RegisterPayload]?.message}
              register={register}
            />
          ))}
        </div>

        <div>
          <label className="mb-4 block text-sm text-slate-300">Your Role</label>
          <RoleSelector
            value={selectedRole}
            onChange={(value) =>
              setValue("role", value as RegisterPayload["role"])
            }
          />
          {errors.role && (
            <p className="mt-2 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked) =>
              setValue("terms", !!checked, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />

          <label className="text-sm text-slate-400">
            I agree to the Terms of Service and Privacy Policy.
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500">{errors.terms.message}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-lime-400 text-black hover:bg-lime-300"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-slate-400">
          Already have an account?
          <span className="ml-2 cursor-pointer font-medium text-white">
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
