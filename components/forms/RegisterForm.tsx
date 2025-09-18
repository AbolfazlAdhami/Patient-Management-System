"use client";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constant";
import { PatientFormValidation } from "@/lib/validation";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import SubmitButton from "../SubmitButton";

import CustomFormField from "../CustomFormField";
import { FormControl } from "../ui/form";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { registerPatient } from "@/lib/actions/patient.actions";
import { toast } from "react-toastify";
import { SuccessMessages, WarningMessages } from "@/configs/Messages";
import { FormFieldType } from "@/lib/Inputs";

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
    setLoading(true);
    let formData;
    const { $id, email, name, phone } = user;
    const {
      address,
      birthDate,
      emergencyContactName,
      emergencyContactNumber,
      gender,
      insurancePolicyNumber,
      insuranceProvider,
      occupation,
      primaryPhysician,
      privacyConsent,
      allergies,
      pastMedicalHistory,
      currentMedication,
      familyMedicalHistory,
      identificationDocument,
      identificationNumber,
      identificationType,
    } = values;
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        userId: $id,
        name,
        email,
        phone,
        birthDate,
        address,
        gender,
        privacyConsent,
        emergencyContactName,
        emergencyContactNumber,
        insurancePolicyNumber,
        insuranceProvider,
        occupation,
        primaryPhysician,
        allergies,
        pastMedicalHistory,
        currentMedication,
        familyMedicalHistory,
        identificationNumber,
        identificationType,
        identificationDocument: identificationDocument ? formData : undefined,
      };
      const newPatient = await registerPatient(patientData);

      if (newPatient) {
        push(`/patients/${user.$id}/new-appointment`);
        toast.success(SuccessMessages.register);
      }
    } catch (error) {
      console.log(error);
      toast.warn(WarningMessages.tryAgain);
    }
    setLoading(false);
  };

  const { control, handleSubmit } = form;
  const { TEXTAREA, DATE_PICKER, INPUT, PHONE_INPUT, SELECT, SKELETON, CHECKBOX } = FormFieldType;
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-4">
          <div className="mb-6 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          {/* NAME */}
          <CustomFormField fieldType={INPUT} control={control} name="name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" />
          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={INPUT} control={control} name="email" label="Email address" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />
            <CustomFormField fieldType={PHONE_INPUT} control={control} name="phone" label="Phone Number" placeholder="(555) 123-4567" />
          </div>
          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={DATE_PICKER} control={control} name="birthDate" label="Date of birth" />
            <CustomFormField
              fieldType={SKELETON}
              control={control}
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
          {/* Address & Occupation */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={INPUT} control={control} name="address" label="Address" placeholder="14 street, New york, NY - 5101" />
            <CustomFormField fieldType={INPUT} control={control} name="occupation" label="Occupation" placeholder=" Software Engineer" />
          </div>
          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={INPUT} control={control} name="emergencyContactName" label="Emergency contact name" placeholder="Guardian's name" />
            <CustomFormField fieldType={PHONE_INPUT} control={control} name="emergencyContactNumber" label="Emergency contact number" placeholder="(555) 123-4567" />
          </div>
        </section>
        <section className="space-y-4">
          <div className="mb-6 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField fieldType={SELECT} control={control} name="primaryPhysician" label="Primary care physician" placeholder="Select a physician">
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2 bg-dark-200 p-1 border border-dark-600  rounded-full">
                  <Image src={doctor.image} width={32} height={32} alt="doctor" className="rounded-full border border-dark-500 " />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={INPUT} control={control} name="insuranceProvider" label="Insurance provider" placeholder="BlueCross BlueShield" />
            <CustomFormField fieldType={INPUT} control={control} name="insurancePolicyNumber" label="Insurance policy number" placeholder="ABC123456789" />
          </div>
          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={TEXTAREA} control={control} name="allergies" label="Allergies (if any)" placeholder="Peanuts, Penicillin, Pollen" />

            <CustomFormField fieldType={TEXTAREA} control={control} name="currentMedication" label="Current medications" placeholder="Ibuprofen 200mg, Levothyroxine 50mcg" />
          </div>
          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField fieldType={TEXTAREA} control={control} name="familyMedicalHistory" label=" Family medical history (if relevant)" placeholder="Mother had brain cancer, Father has hypertension" />
            <CustomFormField fieldType={TEXTAREA} control={control} name="pastMedicalHistory" label="Past medical history" placeholder="Appendectomy in 2015, Asthma diagnosis in childhood" />
          </div>
        </section>

        <section className="space-y-4">
          <div className="mb-6 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
          <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name="identificationType" label="Identification Type" placeholder="Select identification type">
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="identificationNumber" label="Identification Number" placeholder="123456789" />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
        <section className="space-y-4">
          <div className="mb-6 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
          <CustomFormField fieldType={CHECKBOX} control={control} name="treatmentConsent" label="I consent to receive treatment for my health condition." />
          <CustomFormField
            fieldType={CHECKBOX}
            control={control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />
          <CustomFormField
            fieldType={CHECKBOX}
            control={control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>
        <SubmitButton isLoading={loading}>Submit</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
