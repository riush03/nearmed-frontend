"use client";
import React,{useState,useEffect} from "react";
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
import { Label } from "@dapp/components/ui/label";
import { Switch } from "@dapp/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@dapp/components/ui/card";
import PatientStatistics from "@dapp/components/test_comp";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import {  CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { HeartPulse, Stethoscope, Calendar, Bell } from 'lucide-react'
import AdminPanelLayout from "@dapp/components/admin-panel/admin-panel-layout";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { contract } from "@dapp/web3-services";
import { Patient } from "@dapp/web3-services/near-interface";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}


export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [patients, setPatient] = useState<Patient[]>([]); // State to hold a single patient's data
  const { accountId } = useWeb3Auth();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await contract.getPatients(); // Fetch all patient data// Filter by account_id
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
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
       {/* Main Content Area */}
       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Nearmed!</h2>
            <p className="text-gray-600 mb-8">Hospital Decentralized Medical Center</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
          title="Total Patient"
          value={patients.length}
          change={4}
          icon={<HeartPulse className="h-4 w-4 text-white" />}
          color="bg-red-400"
        />
        <StatCard
          title="Doctor"
          value={1}
          change={4}
          icon={<Stethoscope className="h-4 w-4 text-white" />}
          color="bg-green-400"
        />
        <StatCard
          title="Appointment"
          value={3}
          change={2}
          icon={<Calendar className="h-4 w-4 text-white" />}
          color="bg-blue-400"
        />
        <StatCard
          title="Notifications"
          value={24}
          change={5}
          icon={<Bell className="h-4 w-4 text-white" />}
          color="bg-purple-400"
        />
            </div>
          </div>
         

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
               <PatientStatistics />
            </div>
           <div className="lg:col-span-1">
              <TopDoctorsAndPatients />
           </div>
         </div>
        </main>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => (
  <Card className={`${color} text-white`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs">
        {change > 0 ? '+' : ''}{change}%
      </p>
    </CardContent>
  </Card>
)

const BalanceCard = ({ balance }: { balance: string }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Balance</CardTitle>
        <CurrencyDollarIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{balance}</div>
        <p className="text-xs text-muted-foreground">BTT</p>
      </CardContent>
    </Card>
  );
};

const TopDoctorsAndPatients = () => {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Top Doctors & Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Top Doctors</h3>
              <div className="space-y-4">
                {topDoctors.map((doctor, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Recent Patients</h3>
              <div className="flex flex-wrap gap-2">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Avatar>
                      <AvatarImage src={patient.image} alt={patient.name} />
                      <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="text-xs mt-1">{patient.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const topDoctors = [
    { name: "Dr. John Smith", address: "123 Main St, City", image: "https://i.pravatar.cc/150?img=1" },
    { name: "Dr. Sarah Johnson", address: "456 Elm St, Town", image: "https://i.pravatar.cc/150?img=2" },
    { name: "Dr. Michael Lee", address: "789 Oak St, Village", image: "https://i.pravatar.cc/150?img=3" },
  ];
  
  const recentPatients = [
    { name: "Alice Brown", image: "https://i.pravatar.cc/150?img=4" },
    { name: "Bob Wilson", image: "https://i.pravatar.cc/150?img=5" },
    { name: "Carol Taylor", image: "https://i.pravatar.cc/150?img=6" },
    { name: "David Miller", image: "https://i.pravatar.cc/150?img=7" },
    { name: "Eva Garcia", image: "https://i.pravatar.cc/150?img=8" },
  ];
  

