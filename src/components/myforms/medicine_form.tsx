"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@dapp/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@dapp/components/ui/dialog";
import { Calendar } from "@dapp/components/ui/calendar";
import { Calendar as CalendarIcon } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@dapp/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dapp/components/ui/form";
import { Input } from "@dapp/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dapp/components/ui/select";
import { format } from 'date-fns';
import { cn } from '@dapp/lib/utils';
import { Textarea } from "@dapp/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { contract } from "@dapp/web3-services";
import { wallet } from '@dapp/web3-services/near-wallet';
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";
import { Doctor } from '@dapp/web3-services/near-interface';
import { uploadPicture } from '@dapp/lib/pinata-upload';
import { useToast } from '@dapp/components/ui/use-toast';

const formSchema = z.object({
  doctor_id: z.number().min(1, { message: "Doctor ID is required" }),
  name: z.string().min(1, { message: "Medicine name required" }),
  brand: z.string().min(1, { message: "Brand name required" }),
  manufacturer: z.string().min(1, { message: "Name of manufacturer" }),
  email: z.string().email({ message: "Valid email is required" }),
  manufacturer_address: z.string().min(1, { message: "Manufacturer address is required" }),
  current_location: z.string().min(1, { message: "Address is required" }),
  phone: z.string(),
  description: z.string().max(255, { message: "Description can't be more than 255 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export default function MedicineForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isWalletConnected, accountId } = useWeb3Auth();
  const [url, setUrl] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        doctor_id: 0,
        name: "",
        brand: "",
        manufacturer: "",
        email: "",
        manufacturer_address: "",
        current_location: "",
        phone: "",
        description: "",
    },
  });

  //const fileRef = form.register("medicine_pic");

  async function onSubmit(values: FormData) {
    try {
    

      const form_values = form.getValues();
      const result = await contract.addMedicine({
        doctor_id: form_values.doctor_id,
        name: form_values.name,
        brand: form_values.brand,
        manufacturer: form_values.manufacturer,
        company_email: form_values.email,
        manufacturer_address: form_values.manufacturer_address,
        current_location: form_values.current_location,
        phone_no: form_values.phone,
        description: form_values.description
      });
      console.log("Medicine added successfully:", result);
      router.push("/admin/medicine");
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const fileUrl  = await uploadPicture(file);
        console.log("File was uploaded to:",fileUrl);
        toast({ description: 'Image uploaded successfully!' });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({ description: 'Error uploading image.' });
      }
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDoctors = await contract.getDoctors();
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DialogContent className="sm:max-w-[1200px] md:max-w-[700px] lg:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto bg-white">
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl font-bold">Add Medicine</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="doctor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-white'>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                              {doctor.first_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Amoxil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Hipkin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <FormControl>
                        <Input placeholder="Dust" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
         
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => setStep(2)} className="w-full sm:w-auto text-white bg-green-600">Next</Button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="manufacturer_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Manufacturer Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="current_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your full address" {...field} className="min-h-[80px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional information" {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button type="button" onClick={() => setStep(1)} className="w-full sm:w-auto text-white bg-green-600">Previous</Button>
                <Button type="submit" className="w-full sm:w-auto text-white bg-green-600">Submit</Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </DialogContent>
  );
}