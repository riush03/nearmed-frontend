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

interface MedicineOrder {
    id: number;
    name: string;
    manufacturer: string;
    brand: string;
    per: string;
    quantity: number;
    paind: string;
    image: string;
  }
  
  const medicineOrders: MedicineOrder[] = [
    {
      id: 1,
      name: "Amoxicillin",
      manufacturer: "USAntibiotics",
      brand: "Respillin",
      per: "12 BTT",
      quantity: 0,
      paind: "0 BTT",
      image: "/amoxicillin.jpg"
    },
    // Add more medicine orders here
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
    <div className="min-h-screen bg-gray-100">
    <div className="container mx-auto p-4">
      <div className="text-lg mb-4">
        <span className="text-gray-500">Order</span>
        <span className="text-gray-300 mx-2">/</span>
        <span className="text-green-500">All Order</span>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">MEDICINE</TableHead>
              <TableHead>MANUFACTURER</TableHead>
              <TableHead>BRAND</TableHead>
              <TableHead>PER</TableHead>
              <TableHead>QUANTITY</TableHead>
              <TableHead>PAIND</TableHead>
              <TableHead>MEDICINE</TableHead>
              <TableHead>ORDER</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicineOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Image src={order.image} alt={order.name} width={40} height={40} className="rounded-full" />
                    <span>{order.name}</span>
                  </div>
                </TableCell>
                <TableCell>{order.manufacturer}</TableCell>
                <TableCell>
                  <span className="bg-green-500 text-white px-2 py-1 rounded">{order.brand}</span>
                </TableCell>
                <TableCell>
                  <span className="bg-green-500 text-white px-2 py-1 rounded">{order.per}</span>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.paind}</TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-green-50 text-green-500 hover:bg-green-100">Medicine</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-green-50 text-green-500 hover:bg-green-100">Order</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
