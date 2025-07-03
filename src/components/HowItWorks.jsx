import React from 'react';
import Nav from './Nav';
import { ShieldCheck, Mic, MapPin, AlertTriangle } from 'lucide-react';

const steps = [
  {
    title: 'Anonymous Reporting',
    description:
      'Send alerts without creating an account. Your identity stays protected.',
    icon: ShieldCheck,
  },
  {
    title: 'Quick Submission',
    description:
      'Report incidents with optional media or voice notes — fast and intuitive.',
    icon: Mic,
  },
  {
    title: 'Location Sharing',
    description:
      'Pinpoint where events happen using GPS. Location is never tracked.',
    icon: MapPin,
  },
  {
    title: 'Instant Alerts',
    description:
      'Nearby users and responders get notified immediately after you report.',
    icon: AlertTriangle,
  },
];

const HowItWorks = () => {
  return (
    <>
      
        <section className="px-2">
          <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ title, description, icon: Icon }, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6  shadow-md hover:shadow-lg transition mb-5 "
              >
                <div className="bg-orange-200/80 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <Icon className=" w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm ">{description}</p>
              </div>
            ))}
          </div>
        </section>

      
    </>
  );
};

export default HowItWorks;
