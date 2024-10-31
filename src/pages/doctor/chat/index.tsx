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
import AdminPanelLayout from "@dapp/components/doctor-panel/admin-panel-layout";
import { BellIcon, GiftIcon, MoonIcon, SendIcon } from 'lucide-react';
import { contract } from "@dapp/web3-services";
import { Patient,Doctor,Appointment,Message ,Notification} from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { set } from "date-fns";


export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient | null>(null); // State to hold a single patient's data
  const sidebar = useStore(useSidebar, (x) => x);
  const { accountId } = useWeb3Auth();

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const[appointment,setAppointment] = useState<Appointment | null>(null);

  // const doctors = [
  //   { name: 'Assign Doctors', isAssign: true },
  //   { name: 'Mr. TOby Donge', isAssign: false },
  //   { name: 'Mr. Test test', isAssign: false },
  // ];

  const messages = [
    { sender: '0x648daf...4c24', content: 'Hello sir', timestamp: '10/02/2024, 05:58:41 AM' },
    { sender: '0x483a20...1f14', content: 'Am waiting for your response on my appointment', timestamp: '10/06/2024, 08:58:17 AM' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ fetchedDoctors,chats,patient,notifications] = await Promise.all([
          contract.getDoctors(),
          contract.getMessages(),
          contract.getPatients(),
          contract.getNotifications()
        ]);
        setDoctors(fetchedDoctors);
        setChats(chats);
        setPatients(patient);
        setNotifications(notifications);
        console.log("Notificaons",notifications);
        console.log("chats",chats)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAppointmentData = async () => {
      try {
        const [data,docs] = await Promise.all([
          contract.getAppointments(),
          contract.getDoctors()
        ]);

        for (let i = 0; i < docs.length; i++) {
              const foundAppointment = data.find((p) => p.doctor_id === docs[i].id);
              setAppointment(foundAppointment || null)
          }
          
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [chats, setChats] = useState<Message[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const handleSendMessage = async () => {
    try {
      const [patients, doctors, appointments] = await Promise.all([
        contract.getPatients(),
        contract.getDoctors(),
        contract.getAppointments()
      ]);
  
      // Check if the current account is a patient
      const doctor = doctors.find((p) => p.account_id === accountId);
  
      if (doctor) {
        // Find the patient's appointments and related doctor
        for (let j = 0; j < appointments.length; j++) {
            for(let k = 0; k < patients.length; k++ ){
                
          const appointment = appointments[j];
          const patie = patients[k]
  
          if (appointment.patient_id === patie.account_id) {
            const patient = patients.find((d) => d.account_id === appointment.patient_id);
  
            if (patient) {
              // Send message to the selected doctor
              await contract.sendMessage(patient.account_id, messageInput);
              setMessageInput(''); // Clear the message input after sending
              console.log("Message sent to doctor:", patient.account_id);
              setSelectedPatient(patient); // Set the selected doctor
            }
          }
        }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
                    {patients.map((patient) => (
                      <Button
                        key={patient.id}
                        variant={appointment?.patient_id ? "default" : "ghost"}
                        className={`w-full justify-start mb-2 ${appointment?.patient_id === patient.account_id ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => {patient.first_name}}
                      >
                        {appointment?.patient_id ? patient.first_name : <span className="flex items-center"><span className="w-8 h-8 rounded-full bg-gray-300 mr-2"></span>{patient.first_name} {patient.last_name}</span>}
                      </Button>
                    ))}
                  </div>

                  {/* Message Area */}
                  <div className="w-2/3 pl-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">{appointment?.doctor_id}</h2>
                    <div className="flex-1 overflow-y-auto mb-4">
                      {chats.map((message, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-sm text-gray-500">{patient?.account_id} </p>
                          <p className="bg-gray-100 p-2 rounded-lg mt-1">{message.message}</p>
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
