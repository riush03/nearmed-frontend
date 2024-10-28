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
import { Input } from "@dapp/components/ui/input";
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import { MapPinIcon, MailIcon, PhoneIcon, CalendarIcon, ActivityIcon, ChevronDownCircleIcon } from 'lucide-react';
import AdminPanelLayout from "@dapp/components/patient-panel/admin-panel-layout";
import { BellIcon, GiftIcon, MoonIcon, SendIcon } from 'lucide-react';
import { contract } from "@dapp/web3-services";
import { Patient } from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";


export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient | null>(null); // State to hold a single patient's data
  const sidebar = useStore(useSidebar, (x) => x);
  const { accountId } = useWeb3Auth();

  const [selectedDoctor, setSelectedDoctor] = useState('Mr. TOby Donge');
  const [messageInput, setMessageInput] = useState('');

  const doctors = [
    { name: 'Assign Doctors', isAssign: true },
    { name: 'Mr. TOby Donge', isAssign: false },
    { name: 'Mr. Test test', isAssign: false },
  ];

  const messages = [
    { sender: '0x648daf...4c24', content: 'Hello sir', timestamp: '10/02/2024, 05:58:41 AM' },
    { sender: '0x483a20...1f14', content: 'Am waiting for your response on my appointment', timestamp: '10/06/2024, 08:58:17 AM' },
  ];

  const handleSendMessage = () => {
    // Logic to send message
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  
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
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Chat Area */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex h-[600px]">
                  {/* Doctor List */}
                  <div className="w-1/3 border-r pr-4">
                    <h2 className="text-xl font-semibold mb-4">Message / Doctors</h2>
                    {doctors.map((doctor, index) => (
                      <Button
                        key={index}
                        variant={doctor.isAssign ? "default" : "ghost"}
                        className={`w-full justify-start mb-2 ${selectedDoctor === doctor.name ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => setSelectedDoctor(doctor.name)}
                      >
                        {doctor.isAssign ? doctor.name : <span className="flex items-center"><span className="w-8 h-8 rounded-full bg-gray-300 mr-2"></span>{doctor.name}</span>}
                      </Button>
                    ))}
                  </div>

                  {/* Message Area */}
                  <div className="w-2/3 pl-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">{selectedDoctor}</h2>
                    <div className="flex-1 overflow-y-auto mb-4">
                      {messages.map((message, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-sm text-gray-500">{message.sender} ({message.timestamp})</p>
                          <p className="bg-gray-100 p-2 rounded-lg mt-1">{message.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <Input
                        type="text"
                        placeholder="Enter text ..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 mr-2"
                      />
                      <Button onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600">
                        <SendIcon className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </main>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
