import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verfication | PasskeyModal */}
      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[490px]">
          <Image src={"/assets/icons/logo-full.svg"} alt="Full Logo" width={1000} height={1000} className="mb-12 h-10 w-fit-content mx-auto" />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2025 CarePluse</p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/onboarding-img.png"} alt="patient" width={1000} height={1000} className="side-img max-w-[50%]" />
    </div>
  );
}
