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
import { medicines } from "@dapp/lib/medicine_data";
import AdminPanelLayout from "@dapp/components/patient-panel/admin-panel-layout";
import { contract } from "@dapp/web3-services";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";


export default function CategoriesPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const medicineId = parseInt(id as string);
  const [medicineData, setMedicineData] = useState<any>(null);


  useEffect(() => {
    if (id) {
      const medicine = medicines.find((med) => med.id === String(id));
      setMedicineData(medicine);
    }
  }, [id]);



  if (!medicineData) {
      return <p>Medicine not found</p>;
  }

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
                      Buy
                    </Button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-gray-600">{medicineData.description}</p>
                </div>
              </CardContent>
            </Card>

            
          </div>
    </ContentLayout>
    </AdminPanelLayout>
    </div>
  );
}
