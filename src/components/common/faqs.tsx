import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const faqItems = [
  {
    question: "What is MedHub?",
    answer: "MedHub is a decentralized healthcare platform that connects patients with doctors, manages medical records securely, and provides various healthcare services."
  },
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Sign Up' button on the homepage. Follow the prompts to enter your personal information and create your secure login credentials."
  },
  {
    question: "Is my medical information secure?",
    answer: "Yes, MedHub uses blockchain technology and advanced encryption to ensure your medical information is secure and private. You have full control over who can access your data."
  },
  {
    question: "How do I book an appointment with a doctor?",
    answer: "After logging in, navigate to the 'Book Appointment' section. You can search for doctors by specialty, location, or availability, and select a suitable time slot."
  },
  {
    question: "Can I access my medical records anytime?",
    answer: "Yes, you can access your medical records anytime through your MedHub account. Simply log in and navigate to the 'Medical Records' section."
  },
  {
    question: "How does the AI help feature work?",
    answer: "Our AI help feature uses advanced algorithms to analyze your medical history and symptoms. It can provide initial health insights and recommendations, but always consult with a healthcare professional for medical advice."
  }
];

function FAQSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQSection;