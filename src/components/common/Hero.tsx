"use client"
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/register');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white">
      <div className="container mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 transition-all duration-300 ease-in-out transform hover:scale-105">
          Revolutionizing Healthcare with Nearmed
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl transition-all duration-300 ease-in-out">
          Empowering patients and healthcare providers with seamless, secure, and efficient medical record management on the NEAR blockchain.
        </p>
        <Button 
          className="bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;