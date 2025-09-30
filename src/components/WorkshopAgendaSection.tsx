import React from 'react';
import { Calendar, Factory } from 'lucide-react';

interface WorkshopAgendaSectionProps {
  onComplete: () => void;
}

const agendaItems = [
  {
    id: 1,
    title: "Welcome & Introduction",
    description: "Goals and agenda overview"
  },
  {
    id: 2,
    title: "Demystifying Buzzwords",
    description: "Industry 4.0, Smart Manufacturing, Digitization vs Digitalization vs Digital Transformation, IIoT"
  },
  {
    id: 3,
    title: "Evolution of Industry 4.0",
    description: "The 4 industrial revolutions background"
  },
  {
    id: 4,
    title: "Why Industry 4.0, Why Now",
    description: "Importance and benefits of smart manufacturing"
  },
  {
    id: 5,
    title: "Technology Pillars",
    description: "Overview of key Industry 4.0 technologies (with short videos)"
  },
  {
    id: 6,
    title: "Mapping to Maruti Suzuki's Process",
    description: "Where these technologies can fit in our automotive production"
  },
  {
    id: 7,
    title: "Group Activity: Use Case Brainstorm",
    description: "Your ideas for applying Industry 4.0 here"
  },
  {
    id: 8,
    title: "Tech Demos",
    description: "MES, AR, Computer Vision, Gen AI and IoT Demos"
  },
  {
    id: 9,
    title: "Roadmap & Challenges",
    description: "How to adopt Industry 4.0 and potential barriers"
  },
  {
    id: 10,
    title: "Wrap-Up & Q&A",
    description: "Summary, questions, and feedback"
  }
];

const WorkshopAgendaSection: React.FC<WorkshopAgendaSectionProps> = ({ onComplete }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Workshop Agenda</h1>
        <p className="text-xl text-gray-600">Industry 4.0 Training for Maruti Suzuki Smart Manufacturing</p>
      </div>

      {/* Agenda Items */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {agendaItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.id}. {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Start Workshop */}
      <div className="text-center bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Industry 4.0 Journey?</h3>
        <p className="text-lg opacity-90 mb-6">
          Transform your understanding of smart manufacturing and discover practical applications for automotive production
        </p>
        <button
          onClick={onComplete}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors duration-200 shadow-lg"
        >
          Start Workshop
        </button>
      </div>
    </div>
  );
};

export default WorkshopAgendaSection;