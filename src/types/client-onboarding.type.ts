export interface ClientOnboardingFormData {
  fullName:         string;
  email:            string;
  companyName:      string;
  services:         string[];
  budgetUsd?:       number;
  projectStartDate: string;
  acceptTerms:      boolean;
}