import * as z from "zod";
import { ApplicationStatus } from "@/app/generated/prisma/enums";

export const STATUS_ORDER = [
  ApplicationStatus.APPLIED,
  ApplicationStatus.OA,
  ApplicationStatus.INTERVIEW,
  ApplicationStatus.OFFER,
  ApplicationStatus.REJECTED,
];

export const STATUS_LABELS = {
  [ApplicationStatus.APPLIED]: "Applied",
  [ApplicationStatus.OA]: "Online Assessment",
  [ApplicationStatus.INTERVIEW]: "Interview",
  [ApplicationStatus.OFFER]: "Offer",
  [ApplicationStatus.REJECTED]: "Rejected",
};

export const ApplicationFormSchema = z.object({
  companyName: z.string().min(1, { error: "Company name is required." }).trim(),
  roleTitle: z.string().min(1, { error: "Role title is required." }).trim(),
  dateApplied: z.coerce.date({ error: "Enter a valid date." }),
  notes: z.string().trim().optional(),
});

export const StatusSchema = z.enum(STATUS_ORDER, { error: "Not a valid status." });

export const SignupFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { error: "Password is required." }),
});
