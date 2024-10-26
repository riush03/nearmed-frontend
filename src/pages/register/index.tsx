import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dapp/components/ui/card";
import { Button } from "@dapp/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@dapp/components/ui/dialog";
import UserRegistrationForm from "@dapp/components/myforms/registration_form";
import PatientRegistrationForm from "@dapp/components/myforms/patient_form";
import { UserIcon } from "@heroicons/react/24/outline";
import { contract } from "@dapp/web3-services";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isWalletConnected, accountId } = useWeb3Auth();
  const router = useRouter();

  useEffect(() => {
    const checkExistingRegistration = async () => {
      if (isWalletConnected && accountId) {
        try {
          // Fetch both patients and doctors simultaneously
          const [patients, doctors] = await Promise.all([
            contract.getPatients(),
            contract.getDoctors(),
          ]);

          console.log("Patients:", patients);
          console.log("AccountId: ", accountId);


          for (let i = 0; i < patients.length; i++) {
            console.log(`Patient ${i} Account ID:`, patients[i].account_id);
            console.log("Is it matching",patients[i].account_id === accountId)
            if(patients[i].account_id.trim().toLowerCase() === accountId.trim().toLowerCase()) {
            
              router.push("/patient");
            }
          }

          for (let i = 0; i < doctors.length; i++) {
            console.log(`Patient ${i} Account ID:`, doctors[i].account_id);
            console.log("Is it matching",doctors[i].account_id === accountId)
            if(doctors[i].account_id.trim().toLowerCase() === accountId.trim().toLowerCase()) {
            
              router.push("/doctor");
            }
          }
          

        } catch (error) {
          console.error("Error checking registration:", error);
        }
      }
    };

    checkExistingRegistration();
  }, [isWalletConnected, accountId, router]);

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Please connect your wallet first
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Choose Registration Type</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        <Card className="w-full md:w-1/2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <UserIcon className="w-8 h-8 mr-2 text-blue-600" />
              Doctor
            </CardTitle>
            <CardDescription>Register as a healthcare professional</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Choose this option if you're a licensed medical practitioner looking to provide services through our platform.
            </p>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Register as Doctor</Button>
              </DialogTrigger>
              <UserRegistrationForm />
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-1/2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <UserIcon className="w-8 h-8 mr-2 text-green-600" />
              Patient
            </CardTitle>
            <CardDescription>Register as a patient seeking care</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Choose this option if you're looking to access medical services and book appointments with healthcare professionals.
            </p>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Register as Patient</Button>
              </DialogTrigger>
              <PatientRegistrationForm />
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
