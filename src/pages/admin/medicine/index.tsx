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
import { Button } from "@dapp/components/ui/button";
import { Dialog,DialogTrigger } from "@dapp/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { Input } from "@dapp/components/ui/input";
import AdminPanelLayout from "@dapp/components/admin-panel/admin-panel-layout";
import MedicineForm from "@dapp/components/myforms/medicine_form";
import PatientRegistrationForm from "@dapp/components/myforms/patient_form";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { contract } from "@dapp/web3-services";
import { Medicine } from "@dapp/web3-services/near-interface";
import { useToast } from "@dapp/components/ui/use-toast";

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { isWalletConnected, accountId } = useWeb3Auth();
  const [drugs, setDrugs] = useState<Medicine[]>([]);
  const { toast } = useToast();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDrugs = await contract.getDrugs();
        setDrugs(fetchedDrugs);
        console.log("Fetched drugs:",fetchedDrugs);
      } catch (error) {
        console.error("Error fetching doctors:", error);
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
            <BreadcrumbPage>Appointments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-4">
      <Input type="search" placeholder="Search here" className="mb-4" />
         
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                   <Button className="bg-green-500 hover:bg-green-600">Book Appointment</Button>
               </DialogTrigger>
               <MedicineForm/>
            </Dialog>
          
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
            {patients.map((patient) => (
              <tr key={patient?.id}>
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{patient.name?.charAt(0)}</AvatarFallback>
                    
                  </Avatar>
                  {patient.name}
                </td>
                <td className="px-4 py-2 text-green-600"><a href={`mailto:${patient.email}`}>{patient?.email}</a></td>
                <td className="px-4 py-2">{String(patient.date)}</td>
                <td className="px-4 py-2">{patient.from}</td>
                <td className="px-4 py-2">{patient.to}</td>
                <td className="px-4 py-2">{patient.mobile}</td>
                <td className="px-4 py-2">{patient.appointment}</td>
                <td className="px-4 py-2">
                  <Button variant="outline" size="sm">View Patient</Button>
                </td>
                <td className="px-4 py-2">
                  <Button  size="sm">
                    {patient.status}
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
