"use client";
import React, {useState,useEffect} from "react";
import Link from "next/link";
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
import { Input } from "@dapp/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@dapp/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dapp/components/ui/dialog"
import { BellIcon, GiftIcon, MoonIcon, PencilIcon } from 'lucide-react';
import { MapPinIcon, MailIcon, PhoneIcon, CalendarIcon ,ActivityIcon,ChevronDownCircleIcon} from 'lucide-react';
import { ChevronDownIcon, HomeIcon, UserIcon, ShoppingBagIcon, ChatBubbleLeftRightIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import AdminPanelLayout from "@dapp/components/patient-panel/admin-panel-layout";
import AppointmentBooking from "@dapp/components/myforms/appoint_form";
import { useRouter } from "next/navigation";
import { Appointment } from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { contract } from "@dapp/web3-services"

const appointments = [
  {
    id: 1,
    doctor: "Mr. Denis Muriungi",
    email: "dennzriush@gmail.com",
    bookingDate: "09/30/2024, 02:43:59 AM",
    date: "2024-10-01",
    from: "9:31 AM",
    avatar: "https://example.com/avatar.jpg"
  },
  {
    id: 2,
    doctor: "Mr. Denis Muriungi",
    email: "dennzriush@gmail.com",
    bookingDate: "10/02/2024, 09:58:25 PM",
    date: "2024-10-03",
    from: "10:31 AM",
    avatar: "https://example.com/avatar.jpg"
  },
  {
    id: 3,
    doctor: "Mr. Denis Muriungi",
    email: "dennzriush@gmail.com",
    bookingDate: "10/06/2024, 08:56:29 AM",
    date: "2024-10-06",
    from: "10:31 AM",
    avatar: "https://example.com/avatar.jpg"
  }
];

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const [patientAppointments, setPatientAppointment] = useState<Appointment[]>([]); // State to hold a single patient's data
  const { accountId } = useWeb3Auth();

  
  useEffect(() => {
    const fetchPatientAppointment = async () => {
      try {
        const appointments:Appointment[] = await contract.getPatientAppointmentHistory(accountId); // Fetch all patient data
        setPatientAppointment(appointments);
        console.log("Appointment info:",appointments);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientAppointment();
  }, [accountId]);

  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;
  return (
    <div className=" bg-gray-100">
    <AdminPanelLayout>
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    <div className="min-h-screen bg-gray-100">
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-600">
            Dashboard / <span className="text-green-500">Appointments</span>
          </h1>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                   <Button className="bg-green-500 hover:bg-green-600">Book Appointment</Button>
               </DialogTrigger>
               <AppointmentBooking />
            </Dialog>
          </div>
          
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>DOCTOR</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>BOOKING DATE</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>FROM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar>
                        {/*<AvatarImage src={appointment.doctor_id} alt={"appoint"} /> */}
                        {/*<AvatarFallback>{appointment.doctor_id.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
                      </Avatar>
                      <span>{appointment.doctor_id}</span>
                    </TableCell>
                    <TableCell className="text-green-500">{appointment.condition}</TableCell>
                    <TableCell>{appointment.from}</TableCell>
                    <TableCell>{appointment.to}</TableCell>
                    <TableCell>{appointment.from}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
