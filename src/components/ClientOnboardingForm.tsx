import { OnboardingFormData, onboardingSchema } from "@/lib/onboarding.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import CheckboxGroup from "./CheckboxGroup";
import DateField from "./DateField";
import Checkbox from "./Checkbox";
import { getTodayFormatted } from "@/utils/date.util";
import Button, { ButtonType, ButtonVariant } from "./Button";
import { clentServices } from "@/constants/client-services.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { submitClientOnboarding } from "@/services/client-onboarding.service";
import { ClientOnboardingFormData } from "@/types/client-onboarding.type";
import Alert from "./Alert";

function ClientOnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      servicesInterestedIn: [],
      projectStartDate: getTodayFormatted(),
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Set form values from query params if they exist
    if (params.get("fullName")) {
      setValue("fullName", params.get("fullName") || "");
    }
    if (params.get("email")) {
      setValue("email", params.get("email") || "");
    }
    if (params.get("companyName")) {
      setValue("companyName", params.get("companyName") || "");
    }
    if (params.get("budget")) {
      setValue("budget", params.get("budget") || "");
    }
    if (params.get("projectStartDate")) {
      setValue(
        "projectStartDate",
        params.get("projectStartDate") || getTodayFormatted()
      );
    }
    if (params.get("acceptTerms")) {
      setValue("acceptTerms", params.get("acceptTerms") === "true");
    }
    if (params.get("servicesInterestedIn")) {
      const services = params.get("servicesInterestedIn")?.split(",") || [];
      setValue("servicesInterestedIn", services);
    }
  }, [searchParams, setValue]);

  const selectedServices = watch("servicesInterestedIn") || [];

  const submitForm = async (data: OnboardingFormData) => {
    setUrlQueryParams(data);
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const dataToSubmit: ClientOnboardingFormData = {
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      services: data.servicesInterestedIn,
      budgetUsd: data.budget ? +data?.budget : undefined,
      projectStartDate: data.projectStartDate,
      acceptTerms: data.acceptTerms,
    };

    const response = await submitClientOnboarding(dataToSubmit);

    if (response.success) {
      setSuccessMessage("Form submitted successfully!");
      onClickReset();
    } else {
      setErrorMessage(
        response.error?.message ||
          "An error occurred while submitting the form."
      );
      setIsLoading(false);
    }
  };

  const onClickReset = () => {
    reset(); // Reset form

    // Clear query params
    router.replace(window.location.pathname, { scroll: false });

    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const setUrlQueryParams = (data: OnboardingFormData) => {
    // Create query string from form data
    const params = new URLSearchParams();
    if (data.fullName) params.set("fullName", data.fullName);
    if (data.email) params.set("email", data.email);
    if (data.companyName) params.set("companyName", data.companyName);
    if (data.budget) params.set("budget", data.budget);
    if (data.projectStartDate)
      params.set("projectStartDate", data.projectStartDate);
    if (data.acceptTerms)
      params.set("acceptTerms", data.acceptTerms.toString());
    if (data.servicesInterestedIn)
      params.set("servicesInterestedIn", data.servicesInterestedIn.toString());

    // Update URL without redirecting
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate className={formStyles}>
      <h1 className="text-3xl font-bold">Client Onboarding Form</h1>

      {/* Notification */}
      {successMessage && <Alert variant='SUCCESS' title="Success" >{successMessage}</Alert>}
      {errorMessage && <Alert variant='ERROR' title="Error" >{errorMessage}</Alert>}

      {/* Full name form field */}
      <TextField
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullName}
        required
        {...register("fullName")}
      />

      {/* Email form field */}
      <TextField
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email}
        required
        {...register("email")}
      />

      {/* Company name form field */}
      <TextField
        label="Company Name"
        placeholder="Enter company name"
        error={errors.companyName}
        required
        {...register("companyName")}
      />

      {/* Service interested-in checkbox group */}
      <CheckboxGroup
        label="Services Interested In"
        options={clentServices}
        value={selectedServices}
        onChange={(newValues) => setValue("servicesInterestedIn", newValues)}
        error={errors.servicesInterestedIn?.message}
      />

      {/* Budget form field */}
      <TextField
        label="Budget (USD) (optional)"
        type="number"
        placeholder="Enter your budget"
        error={errors.budget?.message}
        {...register("budget")}
      />

      {/* Project start date picker */}
      <DateField
        label="Project Start Date"
        error={errors.projectStartDate?.message}
        required
        {...register("projectStartDate")}
      />

      {/* Accept terms checkbox */}
      <Checkbox
        label="Accept terms"
        error={errors.acceptTerms?.message}
        {...register("acceptTerms")}
      />

      {/* Form action section */}
      <div className="flex flex-row gap-5">
        {/* Submit button */}
        <div className="w-40">
          <Button
            variant={ButtonVariant.OUTLINED}
            onClick={onClickReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>

        {/* Reset button */}
        <div className="w-40">
          <Button
            variant={ButtonVariant.PRIMARY}
            type={ButtonType.SUBMIT}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

// Form styles
const formStyles = `
  flex 
  flex-col 
  gap-5 
  w-full 
  max-w-lg 
  mx-auto 
  px-4 
  sm:px-6 
  lg:px-8 
  py-5
`;

export default ClientOnboardingForm;
