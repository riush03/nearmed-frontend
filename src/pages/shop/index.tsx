import { useState } from 'react';
import { Input } from "@dapp/components/ui/input"
import { Button } from "@dapp/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@dapp/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dapp/components/ui/select"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

// Mock data for medicines with online images
const medicines = [
  { id: 1, name: "Aspirin", price: 5.99, image: "https://source.unsplash.com/featured/?aspirin" },
  { id: 2, name: "Ibuprofen", price: 7.99, image: "https://source.unsplash.com/featured/?ibuprofen" },
  { id: 3, name: "Paracetamol", price: 4.99, image: "https://source.unsplash.com/featured/?paracetamol" },
  { id: 4, name: "Amoxicillin", price: 12.99, image: "https://source.unsplash.com/featured/?antibiotic" },
  { id: 5, name: "Omeprazole", price: 15.99, image: "https://source.unsplash.com/featured/?medicine" },
  { id: 6, name: "Lisinopril", price: 9.99, image: "https://source.unsplash.com/featured/?pill" },
];

export default function MedicineStore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredMedicines = medicines
    .filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Medicine Store</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="text-gray-400" />
            <Select onValueChange={setSortBy} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold">{medicine.name}</CardTitle>
                <p className="text-gray-600 mt-2">${medicine.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black text-red-50 hover:bg-gray-800">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2023 Medicine Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}