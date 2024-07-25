import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

const NewAppointment = () => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Todo => OTP Verification | Passkey modal*/}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image src="/assets/icons/logo-full.svg"
                 alt="patient"
                 height={1000}
                 width={1000}
                 className="mb-12 h-10 w-fit"/>


            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; { new Date().getFullYear() } CarePulse
            </p>

        </div>
      </section>

      <Image src="/assets/images/appointment-img.png"
             height={1000}
             width={1000}
             className="side-img max-w-[390px] bg-bottom"
             alt="appointment" />
    </div>
  )
}

export default NewAppointment
