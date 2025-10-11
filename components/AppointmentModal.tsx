"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Appointment } from "@/types/appwrite.types";

import { AppointmentForm } from "./forms/AppointmentForm";

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
  return <div>AppointmentModal</div>;
}
