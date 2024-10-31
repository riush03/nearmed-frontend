import Link from "next/link";
import React, {useState,useEffect} from "react";
import PlaceholderContent from "@dapp/components/placeholder-content";
import { ContentLayout } from "@dapp/components/admin-panel/content-layout";
import { Button } from "@dapp/components/ui/button";
import { useRouter } from 'next/router';
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@dapp/components/ui/breadcrumb";
import { Card, CardContent } from "@dapp/components/ui/card";
import { BellIcon,  MoonIcon,  } from '@radix-ui/react-icons';
import AdminPanelLayout from "@dapp/components/patient-panel/admin-panel-layout";

const medicines = [
  { id: "M-001", name: "AMOXICILLIN", price: "$7", image: "https://cdn.pixabay.com/photo/2016/02/09/19/45/pills-1190217_1280.jpg" },
  { id: "M-002", name: "Penicillin", price: "$12", image: "https://cdn.pixabay.com/photo/2021/03/27/05/10/pills-6127501_1280.jpg" },
  { id: "M-003", name: "Cephalexin", price: "$15", image: "https://cdn.pixabay.com/photo/2018/02/18/19/12/globuli-3163133_1280.jpg" },
  { id: "M-004", name: "Azithromycin", price: "$8", image: "https://cdn.pixabay.com/photo/2023/10/24/14/48/medicine-8338354_1280.jpg" },
  { id: "M-005", name: "Ciprofloxacin", price: "$17", image: "https://cdn.pixabay.com/photo/2015/12/06/18/28/capsules-1079838_1280.jpg" },
  // Add more medicines as needed
];

export default function Shop() {
 
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
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
         {/* Content */}
           {/* Content */}
           <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Shop</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {medicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}

const MedicineCard: React.FC<{ medicine: typeof medicines[0] }> = ({ medicine }) => {
  return (
    <Link href={`/patient/shop/details/${medicine.id}`} passHref>
      <Card className="w-full max-w-xs bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardContent className="p-4">
          <div className="relative w-full h-48 mb-4">
            <Image 
              src={medicine.image} 
              alt={medicine.name} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-t-lg"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">{medicine.name}</h4>
          <p className="text-xl text-green-600 font-medium text-center mb-4">{medicine.price}</p>
          <Button className="w-full bg-green-500" variant="outline">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};

