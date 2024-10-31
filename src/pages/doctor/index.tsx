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
import { Textarea } from "@dapp/components/ui/textarea";
import { Dialog,DialogFooter,DialogContent,DialogHeader,DialogTitle,DialogDescription } from "@dapp/components/ui/dialog";
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
import AdminPanelLayout from "@dapp/components/doctor-panel/admin-panel-layout";
import { BellIcon, GiftIcon, MoonIcon, PencilIcon } from 'lucide-react';
import { contract } from "@dapp/web3-services";
import { Doctor,Patient,Appointment } from "@dapp/web3-services/near-interface";
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
  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>([]);
  const sidebar = useStore(useSidebar, (x) => x);
  const { accountId } = useWeb3Auth();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const [patients, doctors,appointments] = await Promise.all([
          contract.getPatients(),
          contract.getDoctors(),
          contract.getAppointments()
        ]); // Fetch all patient data
        const foundDoctor = doctors.find((p) => p.account_id === accountId); // Filter by account_id
        setDoctor(foundDoctor || null);

        for (let i = 0; i < doctors.length; i++) {
          console.log(`Patient ${i} Account ID:`, doctors[i].account_id);
          console.log("Is it matching",doctors[i].account_id === accountId)
          if(doctors[i].account_id.trim().toLowerCase() === accountId.trim().toLowerCase()) {
            const appointment = await contract.getDoctorAppointmentHistory(doctors[i].id);
            console.log("Appointments for doctor: ", appointment);
            setDoctorAppointments(appointment);
          }
        }
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
                  <span className="ml-2">{doctorAppointments.length}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium">Successful Treatment:</span>
                  <span className="ml-2">{doctor.successful_treaments}</span>
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


const AppointmentItem: React.FC<AppointmentItemProps> = ({ name, phone, time }) => {
  const { isWalletConnected, accountId } = useWeb3Auth();
  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalHistory, setMedicalHistory] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  

  useEffect(() => {
    const checkExistingRegistration = async () => {
      if (isWalletConnected && accountId) {
        try {
          // Fetch both patients and doctors simultaneously
          const [patients, doctors,appointments] = await Promise.all([
            contract.getPatients(),
            contract.getDoctors(),
            contract.getAppointments()
          ]);

          console.log("Patients:", patients);
          console.log("AccountId: ", accountId);

          for (let i = 0; i < doctors.length; i++) {
            console.log(`Patient ${i} Account ID:`, doctors[i].account_id);
            console.log("Is it matching",doctors[i].account_id === accountId)
            if(doctors[i].account_id.trim().toLowerCase() === accountId.trim().toLowerCase()) {
              const appointment = await contract.getDoctorAppointmentHistory(doctors[i].id);
              console.log("Appointments for doctor: ", appointment);
              setDoctorAppointments(appointment);
            }
          }

          for (let i = 0; i < patients.length; i++) {
            console.log(`Patient ${i} Account ID:`, patients[i].account_id);
            console.log("Is it matching",patients[i].account_id === accountId)
            for(let j= 0; j< appointments.length; j++) {
              if(appointments[j].patient_id === patients[i].account_id) {
                console.log("Appointment: ", appointments[j]);
                const data = await contract.getPatients();
                const foundPatient = data.find((p) => p.account_id === patients[i].account_id); // Filter by account_id
                setPatient(foundPatient || null);
                console.log("Patient info:",foundPatient);
              }
            }
          }
          

        } catch (error) {
          console.error("Error checking registration:", error);
        }
      }
    };

    checkExistingRegistration();
  }, [isWalletConnected, accountId]);

  const handleUpdate = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const updatePatientCondition = async () => {
    try {
      const [patients,appointments] = await Promise.all([
        contract.getPatients(),
        contract.getAppointments()
      ]);
      for (let i = 0; i < patients.length; i++) {
        console.log(`Patient ${i} Account ID:`, patients[i].account_id);
        for(let j= 0; j< appointments.length; j++) {
          if(appointments[j].patient_id === patients[i].account_id) {
              const newCondition = await contract.updatePatientMedicalHistory(patients[i].id, medicalHistory);
              setMedicalHistory(newCondition);
          }
        }
        console.log("Updated Sucessfully");
      }
    } catch (error) {
      // console.error("Error fetching patient data:", error);
    }
  }
  
  return (
    <div>
    {doctorAppointments.map((appointment) => (
    <div key={appointment.id || index} className="bg-gray-50 p-3 rounded-lg mb-3">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <Avatar className="w-8 h-8 mr-2">
        <AvatarImage src={patient?.profile_pic} alt={patient?.first_name} />
          <AvatarFallback>{patient?.profile_pic}</AvatarFallback>
        </Avatar>
        <div >
          <h3 className="font-semibold text-sm">{patient?.first_name} {patient?.last_name}</h3>
          <p className="text-xs text-gray-500">Phone: {patient?.phone}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mt-2 bg-white border-light-blue-500">
    <Badge variant="outline" className="text-xs">
        <ClockIcon className="w-3 h-3 mr-1" />
        {String(appointment.appointment_date)}
      </Badge>
      <Button 
          variant="outline" 
          size="sm" 
          className="text-xs py-1 h-7 bg-black text-white"
          onClick={() => handleUpdate(appointment)}>
        <PersonIcon className="w-3 h-3 mr-1text " />
        Update
      </Button>
      <Button variant="outline" size="sm" className="text-xs py-1 h-7 bg-black text-white">
        <PersonIcon className="w-3 h-3 mr-1text " />
          Prescribe
      </Button>
      <Button variant="outline" size="sm" className="text-xs py-1 h-7 bg-black text-white">
        <CalendarIcon className="w-3 h-3 mr-1" />
        Complete Appointment
      </Button>
    </div>
  </div>
    ))}
         <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-slate-900 rounded-lg shadow-md p-0">
          <DialogHeader className="px-6 pt-8 pb-4 border-b border-b-slate-200">
            <DialogTitle className="text-lg font-medium text-slate-900">Update Patient Condition</DialogTitle>
            <DialogDescription>
              {selectedAppointment && (
                <p className="text-slate-500">Current patient conditions for {selectedAppointment.patient_id}</p>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <Textarea id="medicalHistory" placeholder="Enter medical history here" className="h-40 w-full" />
          </div>
          <DialogFooter className="px-6 py-4 border-t border-t-slate-200">
            <Button type="submit" onClick={updatePatientCondition} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg">
              Update Condition
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  </div>
  );
};


const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-green-500 mr-2">{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  </div>
);
