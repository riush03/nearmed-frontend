import { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'

import { cn } from '@dapp/lib/utils'
import { Button } from "@dapp/components/ui/button"
import { Calendar } from "@dapp/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dapp/components/ui/dialog"
import { useToast } from '@dapp/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@dapp/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@dapp/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dapp/components/ui/select'
import { Input } from '@dapp/components/ui/input'
import { Textarea } from '@dapp/components/ui/textarea'
import { contract } from '@dapp/web3-services'
import { Doctor } from '@dapp/web3-services/near-interface'
import useWeb3Auth from '@dapp/hooks/useWeb3Auth'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  doctor_id: z.number(),
  from: z.string().min(1, "Start time is required"),
  to: z.string().min(1, "End time is required"),
  appointment_date: z.date({required_error: "A date of birth is required.",}),
  condition: z.string().min(1, "Condition is required"),
  message: z.string().refine((val) => val.length <= 255, {message: "String can't be more than 255 characters",}),
});

type FormData = z.infer<typeof formSchema>;

export default function AppointmentBooking() {
  const [isOpen, setIsOpen] = useState(false)
  const { isWalletConnected, accountId } = useWeb3Auth();
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ fetchedDoctors] = await Promise.all([
          contract.getDoctors(),
        ]);
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor_id: 0,
      from: "",
      to: "",
      condition: "",
      message: "",
    },
  })

  async function onSubmit(values: FormData) {
     try{
      const form_values = form.getValues();
      // Assuming 'contract' is available in the scope
      const result = await contract.bookAppointment({
        doctor_id: form_values.doctor_id,
        from: form_values.from,
        to: form_values.to,
        appointment_date: form_values.appointment_date,
        condition: form_values.condition,
        message: form_values.message,
      });

      console.log("Appoint status: successful")

      toast({
        title: "Appointment Booked Successfully! 🎉",
        description: "Your appointment has been confirmed. Check your email for details.",
        variant: "default",
        className: "bg-green-50 border-green-200",
      });

     } catch(error) {
      console.error("Error adding patient:", error);
      console.error("Error adding patient:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="p-6">
        <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details to book your appointment.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 ">
              <FormField
          control={form.control}
          name="appointment_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    className='bg-white'
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date for the appointment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select time" />
                              <Clock className="ml-auto h-4 w-4 opacity-50" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-white'>
                            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour.toString().padStart(2, '0')}:00`}
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
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select time" />
                              <Clock className="ml-auto h-4 w-4 opacity-50" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-white"'>
                            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour.toString().padStart(2, '0')}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Injury/Condition</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. fever" {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information..."
                        className="resize-none bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Book Appointment</Button>
            </form>
          </Form>
        </DialogContent>
    </div>
  )
}