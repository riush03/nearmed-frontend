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
import { contract } from "@dapp/web3-services";
import { Patient } from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import {  PaperPlaneIcon } from '@radix-ui/react-icons';


export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient | null>(null); // State to hold a single patient's data
  const sidebar = useStore(useSidebar, (x) => x);
  const { accountId } = useWeb3Auth();

  const [aiResponse, setAiResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState('');

  const handleAskAI = () => {
    // Logic to send prompt to AI and get response
    // For now, we'll just set a dummy response
    setAiResponse(`AI response to: ${userPrompt}`);
    setUserPrompt('');
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
                     {/* AI Chat Area */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">ASK / MEDHUB AI</h2>
            <Card>
              <CardContent className="p-6">
                <div className="h-[500px] mb-4 p-4 bg-white rounded-lg border overflow-y-auto">
                  {aiResponse || 'AI responses will appear here...'}
                </div>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Enter prompt ..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="flex-1 mr-2"
                  />
                  <Button onClick={handleAskAI} className="bg-green-500 hover:bg-green-600">
                    <PaperPlaneIcon className="h-4 w-4 mr-2" />
                    Ask AI
                  </Button>
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
