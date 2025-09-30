import React, { useState } from 'react';
import { Factory, ChevronRight, Car, Package, Cog, Zap, Settings, Eye, CheckCircle, Wrench } from 'lucide-react';

interface AutomotiveManufacturingSectionProps {
  onComplete: () => void;
}

const manufacturingSteps = [
  {
    id: 1,
    title: "Body Stamping & Welding",
    icon: Settings,
    color: "blue",
    description: "Forming and joining vehicle body panels",
    details: {
      process: "Steel sheets are stamped into body panels using high-precision dies, followed by robotic spot welding to join panels. Multiple body panels including doors, hoods, fenders, and roof are welded together to form the Body-in-White (BIW).",
      marutiAdvantage: "Advanced servo press technology ensures consistent panel quality with minimal material waste, while 6-axis robotic welding provides superior joint strength and repeatability.",
      keyPoints: [
        "High-precision stamping with servo press technology",
        "Automated material handling systems",
        "Robotic spot welding with vision guidance",
        "Multi-station progressive die operations",
        "Inline dimensional inspection systems"
      ],
      qualityControls: [
        "Dimensional accuracy verification using CMM",
        "Weld strength testing and NDT inspection",
        "Surface finish quality assessment",
        "Gap and flush measurements"
      ]
    }
  },
  {
    id: 2,
    title: "Paint Shop Operations",
    icon: Package,
    color: "green",
    description: "Surface preparation and coating application",
    details: {
      process: "Body shells undergo pretreatment including degreasing, phosphating, and ED coating for corrosion protection. Multiple layers of primer, base coat, and clear coat are applied using robotic spray systems in controlled environmental conditions.",
      marutiAdvantage: "State-of-the-art paint shop with 7-tank pretreatment line and robotic application ensures consistent finish quality while meeting stringent environmental standards.",
      keyPoints: [
        "7-tank pretreatment process for optimal adhesion",
        "Cataphoretic electrodeposition (ED) coating",
        "Robotic spray application with auto color change",
        "Temperature and humidity controlled spray booths",
        "UV-cured clear coat for enhanced durability"
      ],
      qualityControls: [
        "Paint thickness measurement using eddy current",
        "Color matching verification with spectrophotometer",
        "Surface defect inspection using vision systems",
        "Gloss and orange peel measurements"
      ]
    }
  },
  {
    id: 3,
    title: "Engine Assembly",
    icon: Cog,
    color: "purple",
    description: "Complete engine build and testing",
    details: {
      process: "Engine blocks are machined and assembled with precision components including pistons, connecting rods, crankshaft, and cylinder heads. Each engine undergoes comprehensive testing including cold and hot testing on dynamometers.",
      marutiAdvantage: "Suzuki's proven K-series and diesel engine technology with advanced manufacturing processes ensures optimal performance, fuel efficiency, and reliability.",
      keyPoints: [
        "CNC machining of engine blocks and heads",
        "Automated piston and connecting rod assembly",
        "Precision torque application for critical joints",
        "Comprehensive leak testing systems",
        "Hot and cold engine testing on dynamometers"
      ],
      qualityControls: [
        "Bore diameter and surface finish inspection",
        "Torque and angle monitoring for all fasteners",
        "Compression and leak down testing",
        "Performance validation on test benches"
      ]
    }
  },
  {
    id: 4,
    title: "Transmission Assembly",
    icon: Zap,
    color: "orange",
    description: "Manual and automatic transmission build",
    details: {
      process: "Transmission cases are machined and assembled with gears, synchronizers, and control systems. Both manual and AMT (Automated Manual Transmission) units are assembled on dedicated lines with precise clearance control and lubrication.",
      marutiAdvantage: "Suzuki's advanced AGS (Auto Gear Shift) technology combined with precision assembly processes delivers smooth shifting performance and enhanced fuel efficiency.",
      keyPoints: [
        "Precision gear assembly with backlash control",
        "Automated synchronizer ring installation",
        "Hydraulic control unit calibration for AMT",
        "Final drive unit integration and testing",
        "Fluid filling and leak testing"
      ],
      qualityControls: [
        "Gear noise and vibration testing",
        "Shift quality evaluation on test rigs",
        "Hydraulic pressure validation",
        "End-of-line functional testing"
      ]
    }
  },
  {
    id: 5,
    title: "Final Assembly Line",
    icon: Car,
    color: "red",
    description: "Complete vehicle assembly and integration",
    details: {
      process: "Painted bodies move through the final assembly line where powertrain, suspension, electrical systems, interior components, and exterior parts are installed. Each station is precisely timed with ergonomic workstations for optimal efficiency.",
      marutiAdvantage: "Flexible assembly line capable of producing multiple vehicle variants with advanced kitting systems and error-proofing technologies ensures zero-defect assembly.",
      keyPoints: [
        "Synchronized conveyor system with variable speed",
        "Engine and transmission marriage operation",
        "Sequential parts delivery to line-side",
        "Ergonomic workstation design for operators",
        "Integrated quality checkpoints throughout"
      ],
      qualityControls: [
        "Torque monitoring for critical fasteners",
        "Electrical system functionality testing",
        "Fluid level verification and leak checks",
        "Pre-delivery inspection checkpoints"
      ]
    }
  },
  {
    id: 6,
    title: "Quality Testing & Inspection",
    icon: Wrench,
    color: "teal",
    description: "Comprehensive vehicle testing and validation",
    details: {
      process: "Completed vehicles undergo rigorous testing including brake testing, headlight alignment, emissions testing, and road testing. Each vehicle is inspected for fit, finish, and functionality before final approval.",
      marutiAdvantage: "State-of-the-art testing facilities including 4-wheel brake tester, emissions analyzer, and dedicated test track ensure every vehicle meets Suzuki's global quality standards.",
      keyPoints: [
        "4-wheel brake performance testing",
        "Headlight alignment and intensity verification",
        "Engine emissions and noise level testing",
        "Electronic systems diagnostic scanning",
        "Final road test on dedicated track"
      ],
      qualityControls: [
        "Brake efficiency and pedal feel evaluation",
        "Emission compliance verification",
        "Electronic system fault code scanning",
        "Comprehensive PDI checklist completion"
      ]
    }
  },
  {
    id: 7,
    title: "Logistics & Dispatch",
    icon: Eye,
    color: "pink",
    description: "Vehicle preparation and delivery logistics",
    details: {
      process: "Approved vehicles undergo final preparation including fuel filling, accessory installation, and protective covering. Vehicles are loaded onto car carriers for dispatch to dealerships with complete documentation and tracking.",
      marutiAdvantage: "Advanced logistics management system with GPS tracking and real-time inventory visibility ensures timely delivery while maintaining vehicle condition throughout the supply chain.",
      keyPoints: [
        "Final fuel filling and fluid top-off",
        "Dealer-specific accessory installation",
        "Protective film and covering application",
        "Digital documentation and invoicing",
        "GPS-enabled carrier loading and tracking"
      ],
      qualityControls: [
        "Final inspection before dispatch",
        "Accessory installation verification",
        "Transport damage prevention measures",
        "Delivery documentation accuracy check"
      ]
    }
  }
];

const AutomotiveManufacturingSection: React.FC<AutomotiveManufacturingSectionProps> = ({ onComplete }) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [exploredSteps, setExploredSteps] = useState<number[]>([]);
  const [showProcessFlow, setShowProcessFlow] = useState(false);

  const handleStepClick = (id: number) => {
    setSelectedStep(selectedStep === id ? null : id);
    if (!exploredSteps.includes(id)) {
      setExploredSteps([...exploredSteps, id]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Car className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Automotive Manufacturing Process</h1>
        <p className="text-gray-600">Understanding our current vehicle production workflow and quality standards</p>
      </div>

      {/* Process Overview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manufacturing Process Overview</h2>
          <button
            onClick={() => setShowProcessFlow(!showProcessFlow)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            {showProcessFlow ? 'Hide' : 'Show'} Process Flow
          </button>
        </div>

        {showProcessFlow && (
          <div className="mb-8 p-6 bg-gray-50 rounded-xl animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Process Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {manufacturingSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`px-3 py-2 rounded-lg font-medium bg-${step.color}-100 text-${step.color}-800`}>
                    {step.title}
                  </div>
                  {index < manufacturingSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <p className="text-gray-700 mb-6">
          Maruti Suzuki's automotive manufacturing follows a comprehensive 7-step process, from body stamping to final dispatch.
          Each step incorporates advanced technologies and Suzuki's proven manufacturing principles to ensure the highest standards
          of quality, efficiency, and customer satisfaction in vehicle production.
        </p>
      </div>

      {/* Manufacturing Steps */}
      <div className="space-y-6">
        {manufacturingSteps.map((step, index) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;
          const isExplored = exploredSteps.includes(step.id);
          const isLast = index === manufacturingSteps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-8 top-20 w-0.5 h-16 bg-gray-300"></div>
              )}

              {/* Step Card */}
              <div
                className={`cursor-pointer transform transition-all duration-300 hover:scale-102 ${
                  isSelected ? 'ring-2 ring-cyan-400' : ''
                }`}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex items-start space-x-6">
                  {/* Step Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                    isExplored ? 'bg-green-500' : `bg-${step.color}-500`
                  }`}>
                    {isExplored ? <CheckCircle className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Step {step.id}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{step.description}</p>

                    {isSelected && (
                      <div className="space-y-6 animate-fadeIn">
                        {/* Process Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Process Details:</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                            {step.details.process}
                          </p>
                        </div>

                        {/* Maruti Advantage */}
                        <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(step.color)}`}>
                          <h4 className="font-semibold mb-2">Maruti Suzuki Advantage:</h4>
                          <p className="text-sm">{step.details.marutiAdvantage}</p>
                        </div>

                        {/* Key Points and Quality Controls */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Process Points:</h4>
                            <ul className="space-y-2">
                              {step.details.keyPoints.map((point, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start">
                                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Quality Controls:</h4>
                            <ul className="space-y-2">
                              {step.details.qualityControls.map((control, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {control}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isSelected && (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">Click to explore this manufacturing step</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quality Standards Summary */}
      {exploredSteps.length >= 4 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Quality & Manufacturing Standards</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Suzuki Manufacturing System</h3>
              <p className="text-sm text-blue-700">World-class production standards</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">ISO/TS 16949</h3>
              <p className="text-sm text-green-700">Automotive quality management</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Eye className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-orange-900 mb-2">Zero Defect Goal</h3>
              <p className="text-sm text-orange-700">Continuous quality improvement</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Challenges */}
      {exploredSteps.length >= 5 && (
        <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400 animate-fadeIn">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Current Manufacturing Challenges</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Traditional Processes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Manual quality inspections in some areas</li>
                <li>• Paper-based work instructions and tracking</li>
                <li>• Reactive maintenance approach</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Efficiency Opportunities:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Limited real-time production monitoring</li>
                <li>• Manual data collection and analysis</li>
                <li>• Delayed response to quality issues</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-700 italic">
              These challenges present excellent opportunities for Industry 4.0 technologies to enhance productivity,
              quality, and operational efficiency in our automotive manufacturing processes.
            </p>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {exploredSteps.length === manufacturingSteps.length && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent! You understand our manufacturing process</h3>
          <p className="text-green-700 mb-4">Now let's explore how Industry 4.0 technologies can transform each step</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Explore Technology Pillars
          </button>
        </div>
      )}
    </div>
  );
};

export default AutomotiveManufacturingSection;