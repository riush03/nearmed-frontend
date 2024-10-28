import { Button } from "@dapp/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@dapp/components/ui/avatar"
import { Input } from "@dapp/components/ui/input"
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@dapp/components/ui/dialog"
import { Textarea } from "@dapp/components/ui/textarea"
import { Label } from "@dapp/components/ui/label"

export default function Home() {
  const patients = [
    {
      id: 1,
      name: "Mr. Toby Donge",
      email: "tobe@gmail.com",
      bookingDate: "09/30/2024, 02:43:59 AM",
      date: "2024-10-01",
      from: "9:31 AM",
      to: "12:32 AM",
      mobile: "0712345678",
      appointment: "#A-001",
      status: "Close",
      image: "https://avatars.githubusercontent.com/u/87783670?v=4",
    },
    // ... other patients
  ]
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setOpen(true);
  }

  return (
    <div className="container mx-auto p-4">
      {/* ... other elements */}
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            {/* ... other table cells */}
            <td className="px-4 py-2">
              <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                View Patient
              </Button>
            </td>
            {/* ... other table cells */}
          </tr>
        ))}
      </tbody>
      {/* ... other elements */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-slate-900 rounded-lg shadow-md p-0">
          <DialogHeader className="px-6 pt-8 pb-4 border-b border-b-slate-200">
            <DialogTitle className="text-lg font-medium text-slate-900">Update Patient Condition</DialogTitle>
            <DialogDescription>
              {selectedPatient && <p className="text-slate-500">Current patient conditions</p>}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <Textarea id="medicalHistory" placeholder="Enter medical history here" className="h-40 w-full" />
          </div>
          <DialogFooter className="px-6 py-4 border-t border-t-slate-200">
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg">
              Update Condition
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
