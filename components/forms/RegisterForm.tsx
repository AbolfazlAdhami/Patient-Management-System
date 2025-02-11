"use client";

import { PatientFormDefaultValues } from "@/constant";
import { PatientFormValidation } from "@/lib/validation";
import { CustomProps, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./PatientForm";
import CustomFormField from "../CustomFormField";

const RegisterForm = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    console.log(values);
  };
  const { control } = form;

  const inputes: Array<CustomProps> = [
    { control: form.control, name: "name", label: "Full Name", fieldType: FormFieldType.INPUT, placeholder: "John Doe", iconAlt: "user", iconSrc: "/assets/icons/user.svg" },
    { control: form.control, name: "email", label: "Email", fieldType: FormFieldType.INPUT, placeholder: "john@gmail.com", iconAlt: "email", iconSrc: "/assets/icons/email.svg" },
    { control: form.control, name: "phone", label: "Phone Number", fieldType: FormFieldType.PHONE_INPUT, placeholder: "(+98) 999 111 2233" },
  ];
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" />
        </section>
        <SubmitButton isLoading={loading}>Submit</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
