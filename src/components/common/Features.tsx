import { 
    ShieldCheckIcon, 
    CpuChipIcon, 
    ChatBubbleLeftRightIcon,
    ShoppingCartIcon,
    CalendarIcon,
    GlobeAltIcon
  } from '@heroicons/react/24/outline';
  
  const features = [
    {
      name: 'Privacy Control',
      description: 'You have full control over who can access your medical information, ensuring your data remains private and secure.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'AI Help',
      description: 'Get instant insights and recommendations based on your medical history using our advanced AI technology.',
      icon: CpuChipIcon,
    },
    {
      name: 'Chat with Doctors',
      description: 'Connect with healthcare professionals in real-time for consultations and quick medical advice.',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: 'Medicine Store',
      description: 'Order prescribed drugs online through our secure platform, ensuring you get the medication you need.',
      icon: ShoppingCartIcon,
    },
    {
      name: 'Book Appointment',
      description: 'Easily schedule appointments with healthcare providers through our integrated booking system.',
      icon: CalendarIcon,
    },
    {
      name: 'Decentralized',
      description: 'Leverage blockchain technology for enhanced security, transparency, and control over your medical data.',
      icon: GlobeAltIcon,
    },
  ];
  
  const Features = () => {
    return (
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Healthcare Management
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              MedHub offers a range of features to enhance your healthcare experience, from secure record management to convenient services.
            </p>
          </div>
  
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    );
  };
  
  export default Features;