"use client";
import { useEffect, useState } from "react";
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
import { Label } from "@dapp/components/ui/label";
import { Badge } from "@dapp/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@dapp/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import {  ClockIcon, PersonIcon} from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import { MapPinIcon, MailIcon, PhoneIcon, CalendarIcon, ActivityIcon, ChevronDownCircleIcon } from 'lucide-react';
import AdminPanelLayout from "@dapp/components/patient-panel/admin-panel-layout";
import { BellIcon, GiftIcon, MoonIcon, PencilIcon } from 'lucide-react';
import { contract } from "@dapp/web3-services";
import { Doctor } from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";

interface AppointmentItemProps {
  name: string;
  phone: string;
  time: Date;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}


export default function DashboardPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null); // State to hold a single patient's data
  const sidebar = useStore(useSidebar, (x) => x);
  const { accountId } = useWeb3Auth();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const data = await contract.getDoctors(); // Fetch all patient data
        const foundDoctor = data.find((p) => p.account_id === accountId); // Filter by account_id
        setDoctor(foundDoctor || null);
        console.log("Doctors info:",foundDoctor);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchDoctorData();
  }, [accountId]);

  if (!sidebar || !doctor) return null;
  
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
      <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Appointments List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Appointments List</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentItem
                name="Mr. TOby Donge"
                phone="0712345678"
                time={new Date('2024-02-10T21:58:25')}
              />
              {/* Add more AppointmentItem components as needed */}
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium">Total Appointment:</span>
                  <span className="ml-2">3</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium">Successful Treatment:</span>
                  <span className="ml-2">1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Profile */}
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row">
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarImage src={doctor.profile_pic} alt="Mr. Denis Muriungi" />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                  <h2 className="text-2xl font-bold">{doctor.title} {doctor.first_name} {doctor.last_name}</h2>
                  <p className="text-gray-500">{doctor.account_id}</p>
                  <div className="mt-2 space-x-2">
                    <Badge variant="secondary">
                      <PersonIcon className="w-4 h-4 mr-1" />
                      {doctor.gender}
                    </Badge>
                    <Badge variant="secondary">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {doctor.specialization}
                    </Badge>
                    <Badge variant="secondary">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {doctor.college_name}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <Badge variant="outline" className="text-gray-500">#D-{doctor.id}</Badge>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem icon={<MapPinIcon />} label="Doctor Address" value={doctor.address} />
                <DetailItem icon={<MailIcon />} label="Email" value={doctor.email} />
                <DetailItem icon={<MapPinIcon />} label="Designation" value={doctor.designation} />
                <DetailItem icon={<MapPinIcon />} label="RegistrationID" value={doctor.registration_id} />
                <DetailItem icon={<MapPinIcon />} label="Last Work" value={doctor.last_work} />
                <DetailItem icon={<MapPinIcon />} label="Collage Address" value={doctor.college_address} />
                <DetailItem icon={<MapPinIcon />} label="Collage Name" value={doctor.college_name} />
                <DetailItem icon={<MapPinIcon />} label="Collage ID" value={doctor.college_id} />
                <DetailItem icon={<MailIcon />} label="Specialiazation" value={doctor.specialization} />
                <DetailItem icon={<CalendarIcon />} label="Joining Year" value={doctor.joining_year} />
                <DetailItem icon={<CalendarIcon />} label="Ending Year" value={doctor.end_year} />
              </div>

              {/* About Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">About {doctor.title} {doctor.first_name} {doctor.last_name}</h3>
                <p className="text-gray-600">{doctor.bio}.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}


const AppointmentItem: React.FC<AppointmentItemProps> = ({ name, phone, time }) => (
  <div className="bg-gray-50 p-3 rounded-lg mb-3">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <Avatar className="w-8 h-8 mr-2">
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div >
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-xs text-gray-500">Phone: {phone}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
    <Badge variant="outline" className="text-xs">
        <ClockIcon className="w-3 h-3 mr-1" />
        {format(time, "dd/MM/yyyy, HH:mm")}
      </Badge>
      <Button variant="outline" size="sm" className="text-xs py-1 h-7">
        <PersonIcon className="w-3 h-3 mr-1" />
        Update
      </Button>
      <Button variant="outline" size="sm" className="text-xs py-1 h-7">
        <CalendarIcon className="w-3 h-3 mr-1" />
        Complete Appoint
      </Button>
    </div>
  </div>
);

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-green-500 mr-2">{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  </div>
);
