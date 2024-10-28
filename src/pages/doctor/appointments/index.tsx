import React,{useState, useEffect} from "react";
import Link from "next/link";
import PlaceholderContent from "@dapp/components/placeholder-content";
import { ContentLayout } from "@dapp/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@dapp/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar"
import { Button } from "@dapp/components/ui/button"
import { Input } from "@dapp/components/ui/input"
import AdminPanelLayout from "@dapp/components/doctor-panel/admin-panel-layout";
import { useRouter } from "next/navigation";
import { contract } from "@dapp/web3-services";
import { Appointment ,Patient} from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";

export default function CategoriesPage() {
  const patients = [
    {
      id: 1,
      name: "Mr. Toby Donge",
      email: "tobe@gmail.com",
      bookingDate: "09/30/2024, 02:43:59 AM",
      date: "2024-10-01",
      from: "9:31 AM",
      to: "12:32 AM",
      mobile: "0712345678",
      appointment: "#A-001",
      status: "Close",
      image: "https://avatars.githubusercontent.com/u/87783670?v=4",
    },
    {
      id: 2,
      name: "Mr. Toby Donge",
      email: "tobe@gmail.com",
      bookingDate: "10/02/2024, 09:58:25 PM",
      date: "2024-10-03",
      from: "10:31 AM",
      to: "1:32 PM",
      mobile: "0712345678",
      appointment: "#A-002",
      status: "Open",
      image: "https://avatars.githubusercontent.com/u/87783670?v=4",
    },
    {
      id: 3,
      name: "Mr. Toby Donge",
      email: "tobe@gmail.com",
      bookingDate: "10/06/2024, 08:56:29 AM",
      date: "2024-10-07",
      from: "10:31 AM",
      to: "2:34 PM",
      mobile: "0712345678",
      appointment: "#A-003",
      status: "Open",
      image: "https://avatars.githubusercontent.com/u/87783670?v=4",
    },
  ]

  const { isWalletConnected, accountId } = useWeb3Auth();
  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkExistingRegistration = async () => {
      if (isWalletConnected && accountId) {
        try {
          // Fetch both patients and doctors simultaneously
          const [patients, doctors,appointments] = await Promise.all([
            contract.getPatients(),
            contract.getDoctors(),
            contract.getAppointments()
          ]);

          console.log("Patients:", patients);
          console.log("AccountId: ", accountId);

          for (let i = 0; i < doctors.length; i++) {
            console.log(`Patient ${i} Account ID:`, doctors[i].account_id);
            console.log("Is it matching",doctors[i].account_id === accountId)
            if(doctors[i].account_id.trim().toLowerCase() === accountId.trim().toLowerCase()) {
              const appointment = await contract.getDoctorAppointmentHistory(doctors[i].id);
              console.log("Appointments for doctor: ", appointment);
              setDoctorAppointments(appointment);
            }
          }

          for (let i = 0; i < patients.length; i++) {
            console.log(`Patient ${i} Account ID:`, patients[i].account_id);
            console.log("Is it matching",patients[i].account_id === accountId)
            for(let j= 0; j< appointments.length; j++) {
              if(appointments[j].patient_id === patients[i].account_id) {
                console.log("Appointment: ", appointments[j]);
                const data = await contract.getPatients();
                const foundPatient = data.find((p) => p.account_id === patients[i].account_id); // Filter by account_id
                setPatient(foundPatient || null);
                console.log("Patient info:",foundPatient);
              }
            }
          }
          

        } catch (error) {
          console.error("Error checking registration:", error);
        }
      }
    };

    checkExistingRegistration();
  }, [isWalletConnected, accountId, router]);
  return (
    <div className=" bg-gray-100">
      <AdminPanelLayout>
    <ContentLayout title="Categories">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Appointments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-4">
      <Input type="search" placeholder="Search here" className="mb-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 font-medium text-left"></th>
              <th className="px-4 py-2 font-medium text-left">PATIENT</th>
              <th className="px-4 py-2 font-medium text-left">EMAIL</th>
              <th className="px-4 py-2 font-medium text-left">BOOKING DATE</th>
              <th className="px-4 py-2 font-medium text-left">FROM</th>
              <th className="px-4 py-2 font-medium text-left">TO</th>
              <th className="px-4 py-2 font-medium text-left">MOBILE</th>
              <th className="px-4 py-2 font-medium text-left">APPOINTMENT</th>
              <th className="px-4 py-2 font-medium text-left">PROFILE</th>
              <th className="px-4 py-2 font-medium text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {doctorAppointments.map((appointment) => (
              <tr key={patient?.id}>
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={patient?.profile_pic} alt={patient?.first_name} />
                    
                  </Avatar>
                  {patient?.first_name}
                </td>
                <td className="px-4 py-2 text-green-600"><a href={`mailto:${patient?.email}`}>{patient?.email}</a></td>
                <td className="px-4 py-2">{String(appointment.appointment_date)}</td>
                <td className="px-4 py-2">{appointment.from}</td>
                <td className="px-4 py-2">{appointment.to}</td>
                <td className="px-4 py-2">{patient?.phone}</td>
                <td className="px-4 py-2">{appointment.id}</td>
                <td className="px-4 py-2">
                  <Button variant="outline" size="sm">View Patient</Button>
                </td>
                <td className="px-4 py-2">
                  <Button  size="sm">
                    {appointment.status}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
