"use client"

import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Form} from "@/components/ui/form"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";
import {createUser} from "@/lib/actions/patient.action";
import {FormFieldType} from "@/components/forms/PatientForm";
import {Doctors} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import {getAppointmentSchema} from "@/lib/validation";

const AppointmentForm = ({
  userId,
  patientId,
  type
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true)

    let status;
    switch (type) {
      case "schedule":
        status = "Scheduled Appointment";
        break;
      case "cancel":
        status = "Cancel Appointment";
        break;
      case "create":
        status = "Create Appointment";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason:values.reason,
          note: values.note,
          status: status as Status
        }
      }

      // const appointment = await createAppointment(appointmentData)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">
            New Appointment
          </h1>
          <p className="text-dark-700">
            Request a new appointment in 10 secs.
          </p>
        </section>
        {
          type !== "cancel" && (
            <>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
              >
                {Doctors.map((doctor, i) => (
                  <SelectItem key={doctor.name + i} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </>
          )
        }
        <CustomFormField control={form.control}
                         fieldType={FormFieldType.DATE_PICKER}
                         name="schedule"
                         label="Expected appointment date"
                         showTimeSelect
                         dateFormat="MM/dd/yyyy - h:mm aa" />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
                           fieldType={FormFieldType.TEXTAREA}
                           name="Reason"
                           label="Reason for appointment"
                           placeholder="Enter reason for appointment"/>
          <CustomFormField control={form.control}
                           fieldType={FormFieldType.TEXTAREA}
                           name="notes"
                           label="Notes"
                           placeholder="Enter notes"/>
        </div>

        { type === "cancel" && (
          <CustomFormField control={form.control}
                           fieldType={FormFieldType.TEXTAREA}
                           name="cancellationReason"
                           label="Reason for cancellation"
                           placeholder="Enter reason for cancellation"/>
        )}

        <SubmitButton isLoading={isLoading}
                      className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
          {status}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
