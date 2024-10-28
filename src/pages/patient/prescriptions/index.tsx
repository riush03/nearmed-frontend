"use client";
import React, {useState} from "react";
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
import Image from "next/image";
import { Button } from "@dapp/components/ui/button";
import { Input } from "@dapp/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@dapp/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Checkbox } from "@dapp/components/ui/checkbox"
import { MapPinIcon, MailIcon, PhoneIcon, CalendarIcon ,ActivityIcon,ChevronDownCircleIcon} from 'lucide-react';
import { ChevronDownIcon, HomeIcon, UserIcon, ShoppingBagIcon, ChatBubbleLeftRightIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import AdminPanelLayout from "@dapp/components/patient-panel/admin-panel-layout";
import AppointmentBooking from "@dapp/components/myforms/appoint_form";

interface Prescription {
  id: string;
  doctor: {
    name: string;
    image: string;
  };
  patient: {
    name: string;
    image: string;
  };
  medicine: {
    name: string;
    image: string;
  };
  date: string;
  prescriptionId: string;
}

const prescriptions: Prescription[] = [
  {
    id: '1',
    doctor: {
      name: "Mr. Denis Muriungi",
      image: "/doctor-image.jpg"
    },
    patient: {
      name: "Mr. TOby Donge",
      image: "/patient-image.jpg"
    },
    medicine: {
      name: "Amoxicillin",
      image: "/medicine-image.jpg"
    },
    date: "10/06/2024, 09:01:51 AM",
    prescriptionId: "#M00-1"
  },
  // Add more prescription data as needed
];
export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false)

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
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="text-lg mb-4">
        <span className="text-gray-500">Prescription</span>
        <span className="text-gray-300 mx-2">/</span>
        <span className="text-green-500">All Prescription</span>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>DOCTOR</TableHead>
              <TableHead>PATIENT</TableHead>
              <TableHead>MEDICINE</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>PRESCRIPTION</TableHead>
              <TableHead>PROFILE</TableHead>
              <TableHead>PROFILE</TableHead>
              <TableHead>PROFILE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Image src={prescription.doctor.image} alt={prescription.doctor.name} width={40} height={40} className="rounded-full" />
                    <span>{prescription.doctor.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image src={prescription.patient.image} alt={prescription.patient.name} width={40} height={40} className="rounded-full" />
                    <span>{prescription.patient.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image src={prescription.medicine.image} alt={prescription.medicine.name} width={40} height={40} className="rounded-full" />
                    <span>{prescription.medicine.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-green-500">{prescription.date}</TableCell>
                <TableCell>{prescription.prescriptionId}</TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-green-50 text-green-500 hover:bg-green-100">View Doctor</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-green-50 text-green-500 hover:bg-green-100">View Patient</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-green-50 text-green-500 hover:bg-green-100">View Medicine</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
