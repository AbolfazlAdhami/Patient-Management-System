import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar  ">
        <div className="sub-container max-w-[860px] flex-1 justify-center">
          <Image src={"/assets/icons/logo-full.svg"} alt="Full Logo" width={1000} height={1000} className="mb-12 h-10 w-fit-content mx-auto" />
          <AppointmentForm type="create" patientId={patient?.$id} userId={userId} />
          <p className="copyright mt-10 py-12">© 2025 CarePluse</p>
        </div>
      </section>
      <Image src={"/assets/images/appointment-img.png"} alt="appointment" width={1000} height={1000} className="side-img max-w-[390px] bg-bottom" />
    </div>
  );
};

export default Appointment;
