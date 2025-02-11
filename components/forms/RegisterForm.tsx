"use client";

import { GenderOptions, PatientFormDefaultValues } from "@/constant";
import { PatientFormValidation } from "@/lib/validation";
import {  User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm, FormProvider } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./PatientForm";
import CustomFormField from "../CustomFormField";
import { FormControl } from "../ui/form";

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
  const { control } = form;
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-4">
          <div className="mb-6 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          {/* NAME */}
          <CustomFormField fieldType={FormFieldType.INPUT} control={control} name="name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" />
        </section>
        {/* EMAIL & PHONE */}
        <div className="flex flex-col gap-4 xl:flex-row">
          <CustomFormField fieldType={FormFieldType.INPUT} control={control} name="email" label="Email address" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />

          <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={control} name="phone" label="Phone Number" placeholder="(555) 123-4567" />
        </div>
        {/* BirthDate & Gender */}
        <div className="flex flex-col gap-4 xl:flex-row">
          <CustomFormField fieldType={FormFieldType.DATE_PICKER} control={form.control} name="birthDate" label="Date of birth" />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-4 xl:flex-row"></div>
        <div className="flex flex-col gap-4 xl:flex-row"></div>
        <SubmitButton isLoading={loading}>Submit</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
