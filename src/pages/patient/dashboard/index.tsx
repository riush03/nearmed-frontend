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
import { Button } from "@dapp/components/ui/button";
import { Label } from "@dapp/components/ui/label";
import { Switch } from "@dapp/components/ui/switch";
import { Badge } from "@dapp/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@dapp/components/ui/card";
import PatientStatistics from "@dapp/components/test_comp";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar";
import { useSidebar } from "@dapp/hooks/use-sidebar";
import { useStore } from "@dapp/hooks/use-store";
import { BellIcon, GiftIcon, MoonIcon, PencilIcon } from 'lucide-react';
import { MapPinIcon, MailIcon, PhoneIcon, CalendarIcon ,ActivityIcon,ChevronDownCircleIcon} from 'lucide-react';
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
    <div className="min-h-screen bg-gray-100">
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
         
          {/* Content */}
          <div className="flex-1">
            {/* Appointment Progress */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Appointment Progress</h2>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{width: '33%'}}></div>
                </div>
                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: '66%'}}></div>
                </div>
                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Appointment</span>
                <span>Assigned Doctor</span>
                <span>Member</span>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span>0</span>
                <span>Mr. Denis Muriungi</span>
                <span>25/09/2020, 10:45 AM</span>
              </div>
            </div>

            {/* Patient Information */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Mr. Test test</CardTitle>
                <div className="text-sm text-gray-500">#P00-2</div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/patient-avatar.jpg" alt="Mr. Test test" />
                    <AvatarFallback>TT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-gray-500">0x999698...Da55</p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="secondary">Male</Badge>
                      <Badge variant="secondary">ssdfdsfd</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">sdfdsfdsfds</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-gray-500">sdfdsfdsfdsf</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">EmailID</p>
                      <p className="text-sm text-gray-500">dsfdsfs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Date of Birth</p>
                      <p className="text-sm text-gray-500">2024-10-23</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical History and Assigned Doctor */}
            <div className="grid grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <ActivityIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Hurts</h3>
                      <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Assigned Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/doctor-avatar.jpg" alt="Dr. Denis Muriungi" />
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Dr. Mr. Denis Muriungi</h3>
                      <p className="text-sm text-gray-500">Phscatriatic</p>
                      <p className="text-xs text-gray-400">Am a practising doctor...</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <ChevronDownCircleIcon className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronDownCircleIcon className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronDownCircleIcon className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Patient */}
            <Card className="mt-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">About Mr. Test test</CardTitle>
                <Button variant="ghost" size="sm">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">sdfdsfdfdfsf</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
