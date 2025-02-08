/* eslint-disable @typescript-eslint/no-explicit-any */
import { E164Number } from "libphonenumber-js/core";
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import { CustomProps } from "@/types";
import { FormFieldType } from "./forms/PatientForm";

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, disabled } = props;
  const { CHECKBOX, INPUT, PHONE_INPUT, TEXTAREA } = FormFieldType;
  switch (fieldType) {
    case INPUT:
      return (
        <div className="flex rounded-lg  border border-dark-500 bg-dark-400">
          {iconSrc && <Image src={iconSrc} height={24} width={24} alt={iconAlt ?? "icon"} className="ml-2" />}
          <FormControl>
            <Input placeholder={placeholder} {...field} className="shad-input border-0" />
          </FormControl>
        </div>
      );
    case TEXTAREA:
      return (
        <FormControl>
          <textarea className="shad-textArea" placeholder={placeholder} disabled={disabled} {...field} />
        </FormControl>
      );
    case PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput defaultCountry="FI" onChange={field.onChange} international value={field.value as E164Number | undefined} withCountryCallingCode className="input-phone" />
        </FormControl>
      );
    case CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">{/* <CheckBox */}</div>
        </FormControl>
      );
    default:
      return null;
  }
};

function CustomFormField(props: CustomProps) {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel className="shad-input-label">{label}</FormLabel>}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
