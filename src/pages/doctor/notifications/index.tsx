import React,{useState, useEffect} from "react";
import Link from "next/link";
import PlaceholderContent from "@dapp/components/placeholder-content";
import { ContentLayout } from "@dapp/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@dapp/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar"
import { Button } from "@dapp/components/ui/button"
import { Input } from "@dapp/components/ui/input"
import AdminPanelLayout from "@dapp/components/doctor-panel/admin-panel-layout";
import { useRouter } from "next/navigation";
import { contract } from "@dapp/web3-services";
import { Doctor ,Notification} from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";

export default function CategoriesPage() {

  const { isWalletConnected, accountId } = useWeb3Auth();
  const [doctorNotifications, setDoctorNotifications] = useState<Notification[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkExistingRegistration = async () => {
      if (isWalletConnected && accountId) {
        try {
          // Fetch both patients and doctors simultaneously
          const [ doctors,notifications] = await Promise.all([
            contract.getDoctors(),
            contract.getNotifications()
          ]);
            

          for (let i = 0; i < doctors.length; i++) {
            for(let j= 0; j< notifications.length; j++){
                if(doctors[i].account_id === accountId && notifications[j].account_id === doctors[i].account_id) {
                    const notifications = await contract.getNotificationsByAccountId(doctors[i].account_id);
                    setDoctorNotifications(notifications)
                  }
          
            }   
          }

          for (let i = 0; i < doctors.length; i++) {
            
            for(let j= 0; j< notifications.length; j++) {
              if(notifications[j].account_id === doctors[i].account_id) {
                
                const data = await contract.getDoctors();
                const foundDoctor = data.find((p) => p.account_id === doctors[i].account_id); // Filter by account_id
                setDoctor(foundDoctor || null);
              }
            }
          }

        } catch (error) {
          console.error("Error checking registration:", error);
        }
      }
    };

    checkExistingRegistration();
  }, [isWalletConnected, accountId, router]);
  return (
    <div className=" bg-gray-100">
      <AdminPanelLayout>
    <ContentLayout title="Categories">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Notifications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto p-4">
      <Input type="search" placeholder="Search here" className="mb-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 font-medium text-left"></th>
              <th className="px-4 py-2 font-medium text-left">Doctor</th>
              <th className="px-4 py-2 font-medium text-left">Notification</th>
              <th className="px-4 py-2 font-medium text-left">Message</th>
              <th className="px-4 py-2 font-medium text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {doctorNotifications.map((notification) => (
              <tr key={doctor?.id}>
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={doctor?.profile_pic} alt={doctor?.first_name} />
                    
                  </Avatar>
                  {doctor?.first_name}
                </td>
                <td className="px-4 py-2">{notification.account_id}</td>
                <td className="px-4 py-2">{notification.message}</td>
                <td className="px-4 py-2">time</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
