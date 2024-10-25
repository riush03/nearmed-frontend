import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@dapp/components/ui/card";
import { Button } from "@dapp/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@dapp/components/ui/dropdown-menu";
import { ChevronDownIcon, HomeIcon, UserIcon, ShoppingBagIcon, ChatBubbleLeftRightIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import PatientStatistics from '@dapp/components/test_comp';

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">MedHub</h2>
        </div>
        <nav className="mt-6">
          <SidebarMenuItem icon={<HomeIcon className="w-5 h-5" />} title="Dashboard" subMenus={['Overview', 'Analytics']} />
          <SidebarMenuItem icon={<UserIcon className="w-5 h-5" />} title="Profile" subMenus={['Edit Profile', 'Settings']} />
          <SidebarMenuItem icon={<ShoppingBagIcon className="w-5 h-5" />} title="Store" />
          <SidebarMenuItem icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} title="Chat" />
          <SidebarMenuItem icon={<BeakerIcon className="w-5 h-5" />} title="AI" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <UserProfileDropdown />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to MedHub!</h2>
            <p className="text-gray-600 mb-8">Hospital Decentralized Medical Center</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Users" value="10,234" />
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
      </div>
    </div>
  );
};

const SidebarMenuItem = ({ icon, title, subMenus }: { icon: React.ReactNode, title: string, subMenus?: string[] }) => {
  return (
    <div className="px-4 py-2">
      {subMenus ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="flex items-center">
                {icon}
                <span className="ml-3">{title}</span>
              </span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {subMenus.map((subMenu) => (
              <DropdownMenuItem key={subMenu}>{subMenu}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" className="w-full justify-start">
          {icon}
          <span className="ml-3">{title}</span>
        </Button>
      )}
    </div>
  );
};

const UserProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="User" className="w-8 h-8 rounded-full mr-2" />
          <span>John Doe</span>
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  

export default DashboardPage;