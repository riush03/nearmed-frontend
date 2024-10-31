"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@dapp/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dapp/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dapp/components/ui/form"
import { Input } from "@dapp/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dapp/components/ui/select"
import { Textarea } from "@dapp/components/ui/textarea"
import { useRouter } from 'next/navigation';
import { contract } from "@dapp/web3-services";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  last_work: z.string().min(1, { message: "Designation is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  college_name: z.string().min(1, { message: "College name is required" }),
  college_id: z.string().min(1, { message: "College ID is required" }),
  joining_year: z.string().min(4, { message: "Joining year is required" }),
  end_year: z.string().min(4, { message: "End year is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  registration_id: z.string().min(1, { message: "Registration ID is required" }),
  college_address: z.string().min(1, { message: "College address is required" }),
  profile_pic: z.any(),
  account_id: z.string().min(1, { message: "Account ID is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  bio: z.string().refine((val) => val.length <= 255, {message: "String can't be more than 255 characters",}),
});


type FormData = z.infer<typeof formSchema>;

export default function UserRegistrationForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      first_name: "",
      last_name: "",
      gender: "",
      designation: "",
      last_work: "",
      email: "",
      college_name: "",
      college_id: "",
      joining_year: "",
      end_year: "",
      specialization: "",
      registration_id: "",
      college_address: "",
      profile_pic: null,
      account_id: "",
      address: "",
      bio: "",
    },
  })

  async function onSubmit(values: FormData) {
    try {
      const form_values = form.getValues();
      // Assuming 'contract' is available in the scope
      const result = await contract.addDoctor({
        title: form_values.title,
        first_name: form_values.first_name,
        last_name: form_values.last_name,
        gender: form_values.gender,
        designation: form_values.designation,
        last_work:form_values.last_work,
        email: form_values.email,
        college_name: form_values.college_name,
        college_id: form_values.college_id,
        joining_year: form_values.joining_year,
        end_year: form_values.end_year,
        specialization: form_values.specialization,
        registration_id: form_values.registration_id,
        college_address: form_values.college_address,
        profile_pic: form_values.profile_pic,
        account_id: form_values.account_id,
        address: form_values.address,
        bio: form_values.bio,
      });
      console.log("Patient added successfully:", result);
      router.push("/doctor")
    } catch (error) {
      console.error("Error adding patient:", error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
   
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">Doctor Registration</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a title" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mr">Mr</SelectItem>
                            <SelectItem value="Mrs">Mrs</SelectItem>
                            <SelectItem value="Ms">Ms</SelectItem>
                            <SelectItem value="Dr">Dr</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <FormControl>
                          <Input placeholder="Your designation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_work"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Work</FormLabel>
                        <FormControl>
                          <Input placeholder="Your last work" {...field} />
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
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => setStep(2)} className="w-full sm:w-auto bg-black text-white">Next</Button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="college_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input placeholder="University of Example" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="college_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Your college ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="joining_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Joining Year</FormLabel>
                        <FormControl>
                          <Input placeholder="YYYY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Year</FormLabel>
                        <FormControl>
                          <Input placeholder="YYYY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input placeholder="Your specialization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registration_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Your registration ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="college_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter college address" {...field} className="min-h-[80px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile_pic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL to profile picture" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="account_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Your account ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your address" {...field} className="min-h-[80px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about yourself" {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button type="button" onClick={() => setStep(1)} className="w-full sm:w-auto bg-black text-white">Previous</Button>
                  <Button type="submit" className="w-full sm:w-auto bg-black text-white">Submit</Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>

  )
}