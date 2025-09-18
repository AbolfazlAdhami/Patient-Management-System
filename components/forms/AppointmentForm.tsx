"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/Inputs";
import { Doctors } from "@/constant";
import { SelectItem } from "../ui/select";

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const AppointmentForm = ({ userId, patientId, type = "create", appointment, setOpen }: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment ? new Date(appointment?.schedule) : new Date(Date.now()),
      reason: appointment ? appointment?.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  const onSubmit = async () => {};

  return (
    <Form {...form}>
      <form className="flex-1 space-y-1" onSubmit={form.handleSubmit(onSubmit)}>
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-400">Request a new appointment in 10 seconds.</p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name="primaryPhysician" label="Doctor" placeholder="Select a doctor">
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image src={doctor.image} width={32} height={32} alt="doctor" className="rounded-full border border-dark-500" />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control} name="schedule" label="Expected appointment date" showTimeSelect dateFormat="MM/dd/yyyy - h:mm aa" />
            <div className={`flex flex-col gap-6 ${type === "create" && "xl:flex-row"}`} />
            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="reason" label="Appointment reason" placeholder="Annual monthly check-up" disabled={type === "schedule"} />
            <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="note" label="Comments/note" placeholder="Prefer afternoon appointments, if possible" disabled={type === "schedule"} />
          </>
        )}

        {type === "cancel" && <CustomFormField fieldType={FormFieldType.TEXTAREA} control={form.control} name="cancellationReason" label="Reason for cancellation" placeholder="Urgent meeting came up" />}

        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shadow-primary-btn"} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
