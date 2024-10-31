import React ,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@dapp/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dapp/components/ui/dialog";
import { Input } from "@dapp/components/ui/input";
import { Label } from "@dapp/components/ui/label";
import { Textarea } from "@dapp/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dapp/components/ui/form";
import {contract }  from "@dapp/web3-services";

const formSchema = z.object({
  medicine: z.string().min(1, { message: "Medicine is required" }),
  advice: z.string().min(10, { message: "Advice must be at least 10 characters long" }),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateAppointmentDialog = () => {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicine: "",
      advice: "",
    },
  });

  function onSubmit(values: FormValues) {
     try {
        const form_values = form.getValues();

        const result = contract.addAdvice({
          meds: form_values.medicine,
          advice: form_values.advice,
        })

        setOpen(false);
        setShowSuccess(true);
        form.reset();
     } catch (error) {
       console.error("Error submitting form:", error);
     }
  }

  return (
   
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Update Appointment</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add advice and medicine information for the patient's appointment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-black">
            <FormField
              control={form.control}
              name="medicine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medicine name" {...field} className="bg-white text-black border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="advice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advice</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your advice" {...field} className="bg-white text-black border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="space-x-4">
              <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
                Finish Appointment
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="bg-white text-black border-gray-300 hover:bg-gray-100">
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
  );
}

export default UpdateAppointmentDialog;