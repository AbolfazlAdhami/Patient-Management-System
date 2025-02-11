/* eslint-disable @typescript-eslint/no-explicit-any */
import { E164Number } from "libphonenumber-js/core";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import { CustomProps } from "@/types";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, disabled } = props;
  const { CHECKBOX, INPUT, PHONE_INPUT, TEXTAREA, DATE_PICKER, SELECT, SKELETON } = FormFieldType;
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
          <PhoneInput defaultCountry="IR" onChange={field.onChange} value={field.value as E164Number | undefined} international withCountryCallingCode className="input-phone" />
        </FormControl>
      );
    case CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">{/* <CheckBox */}</div>
        </FormControl>
      );
    case DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calender" className="ml-2" />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
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
