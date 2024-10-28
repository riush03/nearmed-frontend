"use client"
import React, { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { Button } from "@dapp/components/ui/button";
import { Card, CardContent } from "@dapp/components/ui/card";
import { BellIcon,  MoonIcon,  } from '@radix-ui/react-icons';

const medicineData = {
  name: "AMOXICILLIN",
  discount: "6 %",
  price: "12 BTT",
  image: "/amoxicillin.jpg",
  availability: "In stock 5",
  productCode: "7464674",
  brand: "Respillin",
  companyEmail: "dennzriush@gmail.com",
  mobile: "0791570615",
  medicineId: "#M-001",
  expiryDate: "2024-10-12",
  manufactureAddress: "6020Kibirichia 60200Meru",
  currentLocation: "6020Kibirichia 60200Meru",
  manufacturer: "USAntibiotics",
  description: "Amoxicillin is a penicillin antibiotic. It is used to treat bacterial infections, such as chest infections (including pneumonia) and dental abscesses. It can also be used together with other antibiotics and medicines to treat stomach ulcers. It's often prescribed for children, to treat ear infections and chest infections. Amoxicillin is only available on prescription. It comes as capsules or as a liquid that you swallow. It's also given by injection, but this is usually only done in hospital."
};

const relatedMedicines = [
    { id: 1, name: "Penicillin", image: "/penicillin.jpg", price: "10 BTT" },
    { id: 2, name: "Cephalexin", image: "/cephalexin.jpg", price: "15 BTT" },
    { id: 3, name: "Azithromycin", image: "/azithromycin.jpg", price: "18 BTT" },
    { id: 4, name: "Ciprofloxacin", image: "/ciprofloxacin.jpg", price: "20 BTT" },
  ];

const MedicineDetail: NextPage = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">24</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MoonIcon className="h-5 w-5" />
              <span className="sr-only">Gifts</span>
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">3</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MoonIcon className="h-5 w-5" />
              <span className="sr-only">Dark mode</span>
            </Button>
            <div className="flex items-center space-x-2">
              <img src="/avatar.jpg" alt="User" className="h-8 w-8 rounded-full" />
              <span className="text-sm font-medium">Hello, Denis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 mr-8">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
              <Button variant="ghost" className="w-full justify-start">Patient</Button>
              <Button variant="ghost" className="w-full justify-start">Doctor</Button>
              <Button variant="ghost" className="w-full justify-start">Add Medicine</Button>
              <Button variant="ghost" className="w-full justify-start">All Appointments</Button>
              <Button variant="ghost" className="w-full justify-start">User</Button>
              <Button variant="ghost" className="w-full justify-start">Update</Button>
              <Button variant="default" className="w-full justify-start">Profile</Button>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Shop / Medicine Detail</h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex">
                  <div className="w-1/2 pr-8">
                    <Image src={medicineData.image} alt={medicineData.name} width={500} height={500} className="rounded-lg" />
                  </div>
                  <div className="w-1/2">
                    <h2 className="text-3xl font-bold mb-2">{medicineData.name}</h2>
                    <p className="text-gray-500 mb-4">({medicineData.discount} Discount)</p>
                    <p className="text-2xl font-semibold text-green-500 mb-6">Price: {medicineData.price}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="font-medium">Availability:</span>
                        <span className="text-green-500">{medicineData.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Product code:</span>
                        <span>{medicineData.productCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Brand:</span>
                        <span>{medicineData.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Company Email:</span>
                        <span>{medicineData.companyEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Mobile:</span>
                        <span>{medicineData.mobile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">MedicineID:</span>
                        <span>{medicineData.medicineId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Expiry Date:</span>
                        <span>{medicineData.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Manufacture Address:</span>
                        <span>{medicineData.manufactureAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Current Location:</span>
                        <span>{medicineData.currentLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Manufacturer:</span>
                        <span>{medicineData.manufacturer}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Select quantity</h3>
                      <div className="flex space-x-2">
                        {[10, 8, 5, 3, 1].map((num) => (
                          <Button
                            key={num}
                            variant={quantity === num ? "default" : "outline"}
                            onClick={() => setQuantity(num)}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Doctor Can't Buy
                    </Button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-gray-600">{medicineData.description}</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Related Medicines</h3>
              {/* Add related medicines component here */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedMedicines.map((medicine) => (
                  <RelatedMedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const RelatedMedicineCard: React.FC<{ medicine: typeof relatedMedicines[0] }> = ({ medicine }) => {
    return (
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="aspect-w-1 aspect-h-1 w-full mb-4">
            <Image 
              src={medicine.image} 
              alt={medicine.name} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
            />
          </div>
          <h4 className="font-semibold text-lg mb-2">{medicine.name}</h4>
          <p className="text-green-500 font-medium text-xl mb-4">{medicine.price}</p>
          <Button className="w-full" variant="outline">View Details</Button>
        </CardContent>
      </Card>
    );
  };

export default MedicineDetail;