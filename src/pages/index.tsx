import React from 'react';
import Navbar from '@dapp/components/common/Navbar';
import Hero from '@dapp/components/common/Hero';
import Features from '@dapp/components/common/Features';
import HowItWorks from '@dapp/components/common/how-it_works';
import FAQSection from '@dapp/components/common/faqs';
import Footer from '@dapp/components/common/footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;