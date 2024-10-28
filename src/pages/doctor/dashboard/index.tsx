"use client";
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
import { ChevronDownIcon, HomeIcon, UserIcon, ShoppingBagIcon, ChatBubbleLeftRightIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import AdminPanelLayout from "@dapp/components/admin-panel/admin-panel-layout";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
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
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to MedHub!</h2>
            <p className="text-gray-600 mb-8">Hospital Decentralized Medical Center</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Number of Doctors" value="1,234" />
              <StatCard title="Number of Patients" value="9,000" />
              <BalanceCard balance="9764175.BTT" />
            </div>
          </div>
          <div className='container mx-auto px-6 py-8'>
            <PatientStatistics/>
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

const StatCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

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
          <CardTitle>Your Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              
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
  

  
  const recentPatients = [
    { name: "Alice Brown", image: "https://i.pravatar.cc/150?img=4" },
    { name: "Bob Wilson", image: "https://i.pravatar.cc/150?img=5" },
    { name: "Carol Taylor", image: "https://i.pravatar.cc/150?img=6" },
    { name: "David Miller", image: "https://i.pravatar.cc/150?img=7" },
    { name: "Eva Garcia", image: "https://i.pravatar.cc/150?img=8" },
  ];
  

