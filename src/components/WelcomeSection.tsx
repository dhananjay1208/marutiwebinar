import React from 'react';
import { Building, MapPin, Users, Target, Car } from 'lucide-react';

interface WelcomeSectionProps {
  onComplete: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onComplete }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Car className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Industry 4.0 Training
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming Automotive Manufacturing Through Smart Technologies
        </p>
      </div>

      {/* Company Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Maruti Suzuki</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">India's largest passenger car manufacturer</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Gurugram & Manesar Plants - Smart Manufacturing</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Manufacturing Excellence Workshop</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Workshop Objectives</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-green-600 mt-1" />
              <span className="text-gray-700">Understand Industry 4.0 concepts and their relevance</span>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-green-600 mt-1" />
              <span className="text-gray-700">Explore smart manufacturing technologies</span>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-green-600 mt-1" />
              <span className="text-gray-700">Identify opportunities in automotive production</span>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-green-600 mt-1" />
              <span className="text-gray-700">Develop implementation roadmap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Structure */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Journey</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Foundation</h3>
            <p className="text-sm text-gray-600">Understanding concepts and evolution</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Application</h3>
            <p className="text-sm text-gray-600">Technologies and process mapping</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Implementation</h3>
            <p className="text-sm text-gray-600">Roadmap and practical steps</p>
          </div>
        </div>
      </div>

      {/* Complete Section Button */}
      <div className="text-center">
        <button
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Let's Begin the Journey
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;