import Link from "next/link";
import React,{useState,useEffect} from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { useRouter } from "next/navigation";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { Patient } from "@dapp/web3-services/near-interface";
import { contract } from "@dapp/web3-services";
import { Button } from "@dapp/components/ui/button";
import { Input } from "@dapp/components/ui/input";
import AdminPanelLayout from "@dapp/components/admin-panel/admin-panel-layout";

export default function CategoriesPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isWalletConnected, accountId } = useWeb3Auth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const doctors = [
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPatients = await contract.getPatients();
        setPatients(fetchedPatients);
        console.log("Patients fetched successfully:", fetchedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, []);


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
            <BreadcrumbPage>Doctors</BreadcrumbPage>
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
              <th className="px-4 py-2 font-medium text-left">ID</th>
              <th className="px-4 py-2 font-medium text-left">NAME</th>
              <th className="px-4 py-2 font-medium text-left">GENDER</th>
              <th className="px-4 py-2 font-medium text-left">DESIGNATION</th>
              <th className="px-4 py-2 font-medium text-left">LAST WORK</th>
              <th className="px-4 py-2 font-medium text-left">EMAIL</th>
              <th className="px-4 py-2 font-medium text-left">COLLEGE NAME</th>
              <th className="px-4 py-2 font-medium text-left">COLLEGE ID</th>
              <th className="px-4 py-2 font-medium text-left">COLLEGE ADDRESS</th>
              <th className="px-4 py-2 font-medium text-left">SPECIALIZATION</th>
              <th className="px-4 py-2 font-medium text-left">REGISTRATION ID</th>
              <th className="px-4 py-2 font-medium text-left">PROFILE</th>
              <th className="px-4 py-2 font-medium text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient?.id}>
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">{patient?.first_name} {patient?.last_name}</td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.condition}</td>
                <td className="px-4 py-2">{patient.address}</td>
                <td className="px-4 py-2">{patient.email}</td>
                <td className="px-4 py-2">{patient.doctor}</td>
                <td className="px-4 py-2">{patient.city}</td>
                <td className="px-4 py-2">{patient.medical_history}</td>
                <td className="px-4 py-2">
                  <Button variant="outline" size="sm">View Doctor</Button>
                </td>
                <td className="px-4 py-2">
                  <Button  size="sm">
                    {}
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
