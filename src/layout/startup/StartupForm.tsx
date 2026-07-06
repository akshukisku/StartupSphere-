"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import StartupHeader from "./StartupHeader";
import StartupBasicInfo from "./StartupBasicInfo";
import StartupShowcase from "./StartupShowcase";
import StartupPresence from "./StartupPresence";
import StartupTeamCard from "./StartupTeamCard";
import StartupVisibility from "./StartupVisibility";

import {
  StartupFormValues,
  startupValidation,
} from "@/service/validation/startup.validation";

import { useStartupStore } from "@/store/useStartupStore";
import { StartupPayload } from "@/types/interface/startup.interface";
import {
  useCreateStartup,
  useStartup,
  useUpdateStartup,
} from "@/hooks/startup/useStartup";
import StartupFormSkeleton from "@/components/skeleton/StartupFormSkeleton";

const StartupForm = () => {
  const { data: startup, isPending } = useStartup();

  const { mutateAsync: createStartup, isPending: creatingStartup } =
    useCreateStartup();

  const { mutateAsync: updateStartup, isPending: updatingStartup } =
    useUpdateStartup();

  const isSubmitting = creatingStartup || updatingStartup;

  const logoFile = useStartupStore((state) => state.logoFile);
  const removeLogoOnSave = useStartupStore((state) => state.removeLogoOnSave);
  const showcaseFiles = useStartupStore((state) => state.showcaseFiles);
  const removedShowcaseIds = useStartupStore(
    (state) => state.removedShowcaseIds,
  );

  const methods = useForm<StartupFormValues>({
    resolver: yupResolver(startupValidation),
    defaultValues: {
      startup_name: "",
      tagline: "",
      description: "",
      industry: "",
      funding_stage: "",
      website: "",
      linkedin: "",
      github: "",
      twitter: "",
    },
  });
  const values = methods.watch();
  useEffect(() => {
  console.log("Startup response:", startup);
}, [startup]);

  // useEffect(() => {
  //   console.log("========== FORM VALUES ==========");
  //   console.table(values);
  // }, [values]);

  useEffect(() => {
    if (!startup) return;

    console.log("========== RESET ==========");
    console.log("RESET CALLED");

    methods.reset({
      startup_name: startup.startup_name,
      tagline: startup.tagline,
      description: startup.description,
      industry: startup.industry,
      funding_stage: startup.funding_stage,
      website: startup.website,
      linkedin: startup.linkedin ?? "",
      github: startup.github ?? "",
      twitter: startup.twitter ?? "",
    });

    console.log("After reset:", methods.getValues());
  }, [startup]);

  const onSubmit = async (data: StartupFormValues) => {
    console.log("SUBMIT", data);
    console.log("Startup:", startup);

    const payload: StartupPayload = {
      startup_name: data.startup_name.trim(),
      tagline: data.tagline.trim(),
      description: data.description.trim(),

      industry: data.industry,
      funding_stage: data.funding_stage,

      website: data.website.trim(),
      linkedin: data.linkedin.trim(),
      github: data.github.trim(),
      twitter: data.twitter.trim(),
      logo_url: logoFile,
      remove_logo: removeLogoOnSave,
      showcase_images: showcaseFiles,

      cover_url: null,
      cover_path: null,
    };

    if (startup) {
      await updateStartup({
        payload,
        removedShowcaseIds,
      });
    } else {
      await createStartup(payload);
    }
  };

  if (isPending) {
    return <StartupFormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-10"
        onSubmit={methods.handleSubmit(onSubmit, (errors) => {
          console.log("Validation Errors", errors);
        })}
      >
        <StartupHeader hasStartup={!!startup} isSubmitting={isSubmitting} />

        <div className="grid gap-8 lg:grid-cols-12 xl:gap-10">
          {/* Left */}
          <div className="space-y-8 lg:col-span-8">
            <StartupBasicInfo />
            <StartupShowcase />
          </div>

          {/* Right */}
          <div className="space-y-8 lg:col-span-4">
            <StartupTeamCard />
            <StartupPresence />
            <StartupVisibility />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default StartupForm;
