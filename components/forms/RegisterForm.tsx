"use client";

import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const form = useForm<z.infer<typeof PatientForm>>({
    resolver: zodResolver(PatientForm),
  });

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
};

export default RegisterForm;
