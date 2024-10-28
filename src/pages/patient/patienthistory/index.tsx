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

interface MedicalHistoryItem {
    id: string;
    description: string;
  }
  
  const medicalHistory: MedicalHistoryItem[] = [
    {
      id: '1',
      description: "Broken hand"
    },
    {
      id: '2',
      description: "Can you describe to me how your feeling please don't leave any detail behind"
    },
    // Add more medical history items as needed
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
        <span className="text-gray-500">History</span>
        <span className="text-gray-300 mx-2">/</span>
        <span className="text-green-500">Medicial Histories</span>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">MEDICIAL HISTORY</h2>
        <ul className="space-y-4">
          {medicalHistory.map((item) => (
            <li key={item.id} className="flex items-center space-x-3">
              <Checkbox id={item.id} />
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.description}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
