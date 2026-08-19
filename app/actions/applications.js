"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { ApplicationFormSchema, StatusSchema } from "@/lib/definitions";

export async function createApplication(state, formData) {
  const session = await verifySession();
  if (!session) {
    return { message: "You must be logged in to do that." };
  }

  const validatedFields = ApplicationFormSchema.safeParse({
    companyName: formData.get("companyName"),
    roleTitle: formData.get("roleTitle"),
    dateApplied: formData.get("dateApplied"),
    notes: formData.get("notes") || undefined,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { companyName, roleTitle, dateApplied, notes } = validatedFields.data;

  await prisma.application.create({
    data: {
      companyName,
      roleTitle,
      dateApplied,
      notes: notes || null,
      userId: session.userId,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateApplicationStatus(applicationId, status) {
  const session = await verifySession();
  if (!session) {
    return { message: "You must be logged in to do that." };
  }

  const validatedStatus = StatusSchema.safeParse(status);
  if (!validatedStatus.success) {
    return { message: "Not a valid status." };
  }

  const { count } = await prisma.application.updateMany({
    where: { id: applicationId, userId: session.userId },
    data: { status: validatedStatus.data },
  });

  if (count === 0) {
    return { message: "Application not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateApplicationNotes(applicationId, notes) {
  const session = await verifySession();
  if (!session) {
    return { message: "You must be logged in to do that." };
  }

  const { count } = await prisma.application.updateMany({
    where: { id: applicationId, userId: session.userId },
    data: { notes: notes?.trim() || null },
  });

  if (count === 0) {
    return { message: "Application not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteApplication(applicationId) {
  const session = await verifySession();
  if (!session) {
    return { message: "You must be logged in to do that." };
  }

  const { count } = await prisma.application.deleteMany({
    where: { id: applicationId, userId: session.userId },
  });

  if (count === 0) {
    return { message: "Application not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
