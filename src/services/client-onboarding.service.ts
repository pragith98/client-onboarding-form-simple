/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientOnboardingFormData } from "@/types/client-onboarding.type";
import { api } from "../services/api.service";

export const submitClientOnboarding = async (
  clientData: ClientOnboardingFormData
): Promise<any> => {
  try {
    const data = await api.post<unknown>('', clientData);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error?.message || 'Failed to submit onboarding data.'
      },
    };
  }
}