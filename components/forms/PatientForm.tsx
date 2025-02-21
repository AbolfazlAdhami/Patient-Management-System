"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../CustomFormField";
import { CustomProps } from "@/types";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { patientsInputes } from "@/lib/Inputes";
import { toast } from "react-toastify";
import { ErrorMessages, SuccessMessages } from "@/configs/Messages";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

function PatientForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({ email, name, phone }: z.infer<typeof UserFormValidation>) => {
    setLoading(true);
    try {
      const userData = { email, name, phone };
      const user = await createUser(userData);
      push(`/patients/${user.$id}/register`);
      toast.success(SuccessMessages.login);
    } catch (error) {
      console.log(error);
      toast.error(ErrorMessages.userNotFound);
    }
    setLoading(false);
  };

  const inputes: Array<CustomProps> = patientsInputes({ control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section>
          <h1 className="header">Hi There 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        {inputes.map((props) => (
          <CustomFormField {...props} key={props.name} />
        ))}
        <SubmitButton isLoading={loading}>Submit</SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
