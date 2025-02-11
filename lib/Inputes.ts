/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFieldType } from "@/components/forms/PatientForm";
import { CustomProps } from "@/types";
import { Control } from "react-hook-form";

export const patientsInputes = ({ control }: { control: Control<any> }): Array<CustomProps> => [
  { control, name: "name", label: "Full Name", fieldType: FormFieldType.INPUT, placeholder: "John Doe", iconAlt: "user", iconSrc: "/assets/icons/user.svg" },
  { control, name: "email", label: "Email", fieldType: FormFieldType.INPUT, placeholder: "john@gmail.com", iconAlt: "email", iconSrc: "/assets/icons/email.svg" },
  { control, name: "phone", label: "Phone Number", fieldType: FormFieldType.PHONE_INPUT, placeholder: "(+98) 999 111 2233" },
];

export const registerInputes = ({ control }: { control: Control<any> }): Array<CustomProps> => [
  { fieldType: FormFieldType.INPUT, control, name: "name", placeholder: "John Doe", iconSrc: "/assets/icons/user.svg", iconAlt: "user" },
  {
    control,
    fieldType: FormFieldType.INPUT,
    name: "email",
    label: "Email address",
    placeholder: "johndoe@gmail.com",
    iconSrc: "/assets/icons/email.svg",
    iconAlt: "email",
  },
  {
    control,
    fieldType: FormFieldType.PHONE_INPUT,
    name: "phone",
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    iconSrc: "/assets/icons/email.svg",
    iconAlt: "email",
  },
];

//   { control, name: "", label: "", fieldType: FormFieldType.INPUT, placeholder: "", iconAlt: "", iconSrc: "" },
