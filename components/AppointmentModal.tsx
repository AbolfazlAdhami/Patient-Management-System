"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Appointment } from "@/types/appwrite.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AppointmentForm from "./forms/AppointmentForm";

import "react-datepicker/dist/react-datepicker.css";

type AppointmentModalProps = {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
};

export default function AppointmentModal({ patientId, userId, appointment, type }: AppointmentModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={`capitalize ${type === "schedule" && "text-green-500"}`}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription> Please fill in the following details to {type} appointment</DialogDescription>
        </DialogHeader>
        <AppointmentForm userId={userId} patientId={patientId} appointment={appointment} type={type} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
