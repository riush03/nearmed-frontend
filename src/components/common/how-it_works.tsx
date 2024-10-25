import React from 'react';

const patientSteps = [
  {
    number: 1,
    title: 'Register Account',
    description: 'Create your secure MedHub account to access all features.',
  },
  {
    number: 2,
    title: 'Book Appointment',
    description: 'Easily schedule appointments with healthcare providers.',
  },
  {
    number: 3,
    title: 'Get Medical Support',
    description: 'Receive personalized care and manage your health records.',
  },
];

const doctorSteps = [
  {
    number: 1,
    title: 'Create Profile',
    description: 'Set up your professional profile on MedHub.',
  },
  {
    number: 2,
    title: 'Manage Appointments',
    description: 'View and manage your patient appointments efficiently.',
  },
  {
    number: 3,
    title: 'Provide Care',
    description: 'Access patient records and provide quality healthcare.',
  },
];

const StepList: React.FC<{ steps: typeof patientSteps; title: string }> = ({ steps, title }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold text-black mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center">
          <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">{step.number}</span>
          </div>
          <h4 className="text-xl font-semibold text-black mb-2">{step.title}</h4>
          <p className="text-black text-center">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-black mb-12">
          How It Works
        </h2>
        <StepList steps={patientSteps} title="For Patients" />
        <StepList steps={doctorSteps} title="For Doctors" />
      </div>
    </div>
  );
};

export default HowItWorks;