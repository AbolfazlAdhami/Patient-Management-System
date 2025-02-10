import React, { FC } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const Register: FC<SearchParamProps> = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen ">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className="mb-12 h-10 w-fit" />
          <RegisterForm user={user} />
          <p className="copyright py-12">© 2025 CarePluse</p>
        </div>
      </section>
      <Image src="/assets/images/register-img.png" alt="register" width={1000} height={1000} className="side-img max-w-[50%]" />
    </div>
  );
};

export default Register;
