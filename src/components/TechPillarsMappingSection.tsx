import React, { useState } from 'react';
import { Factory, Wifi, Eye, Brain, Cog, Headphones, Database, Shield } from 'lucide-react';

interface TechPillarsMappingSectionProps {
  onComplete: () => void;
}

const techPillars = [
  {
    id: 1,
    title: "Industrial IoT (IIoT) Sensors",
    icon: Wifi,
    color: "blue",
    description: "Real-time monitoring of process parameters across all equipment",
    applications: [
      "Deploy sensors on mixers, extruders, and HF welders",
      "Monitor temperature, pressure, vibration in real-time",
      "Feed data into maintenance systems for predictive analytics",
      "Alert operators when parameters deviate from setpoints"
    ],
    terumoExample: "Sensors on an extruder could alert if temperature deviates from setpoints, or if vibration indicates wear in a gearbox",
    benefits: [
      "Continuous process optimization",
      "Early detection of equipment issues",
      "Reduced unplanned downtime",
      "Improved product consistency"
    ]
  },
  {
    id: 2,
    title: "Machine Vision and Inspection Systems",
    icon: Eye,
    color: "purple",
    description: "Camera-based quality control systems for automated inspection",
    applications: [
      "Inspect weld seams for integrity and uniformity",
      "Verify tubing is properly coiled without kinks",
      "Ensure labels/barcodes are present and correct",
      "Detect defects more reliably than manual inspection"
    ],
    terumoExample: "Vision systems can automatically check that seals are uniform and free of burns or gaps, catching issues like incomplete seals or misprinted labels immediately on the line",
    benefits: [
      "100% inspection coverage",
      "Consistent quality detection",
      "Immediate defect identification",
      "Reduced human error"
    ]
  },
  {
    id: 3,
    title: "Data Analytics & Predictive Maintenance (AI)",
    icon: Brain,
    color: "green",
    description: "AI models for predictive maintenance and process optimization",
    applications: [
      "Analyze IIoT data trends for predictive maintenance",
      "Monitor vibration signatures and temperature profiles",
      "Predict equipment failures before they occur",
      "Optimize maintenance scheduling"
    ],
    terumoExample: "An AI model could analyze autoclave sensor data to predict when a heating element is likely to fail and schedule a replacement during planned maintenance",
    benefits: [
      "Reduced unplanned downtime",
      "Optimized maintenance costs",
      "Extended equipment life",
      "Improved production reliability"
    ]
  },
  {
    id: 4,
    title: "Robotics and Automation",
    icon: Cog,
    color: "orange",
    description: "Automated systems for repetitive and ergonomically challenging tasks",
    applications: [
      "Robotic pick-and-place for molded components",
      "Automated loading/unloading of sterilizer trays",
      "AGVs for material transport between stations",
      "Automated handling of heavy materials"
    ],
    terumoExample: "Robotic arms could transfer molded components (ports, clamps) to assembly stations, or autonomous mobile robots can transport tubing reels and finished goods",
    benefits: [
      "Reduced manual labor",
      "Minimized handling errors",
      "Improved workplace safety",
      "Consistent operation quality"
    ]
  },
  {
    id: 5,
    title: "Digital Twin Simulation",
    icon: Database,
    color: "red",
    description: "Real-time digital replicas of critical process lines",
    applications: [
      "Digital twins of sheet extrusion and HF welding lines",
      "Real-time simulation fed by sensor data",
      "Virtual testing of process parameter changes",
      "What-if analysis and rapid optimization"
    ],
    terumoExample: "Engineers can test how different extrusion temperature or screw speed would affect sheet quality before trying it on the real machine",
    benefits: [
      "Risk-free process optimization",
      "Faster parameter tuning",
      "Predictive quality outcomes",
      "Reduced trial-and-error testing"
    ]
  },
  {
    id: 6,
    title: "Augmented/Virtual Reality (AR/VR)",
    icon: Headphones,
    color: "teal",
    description: "Immersive training and operational guidance systems",
    applications: [
      "AR overlays for step-by-step work instructions",
      "Guidance for die changeovers and cleaning procedures",
      "VR training simulations for complex operations",
      "Emergency response training in virtual environments"
    ],
    terumoExample: "AR headsets can guide technicians through die changeover on the extruder or show proper cleaning procedures in the sterile filling room",
    benefits: [
      "Reduced training time",
      "Fewer operational errors",
      "Improved skill retention",
      "Safe practice environment"
    ]
  },
  {
    id: 7,
    title: "Connected MES/ERP Systems",
    icon: Database,
    color: "indigo",
    description: "Integrated digital backbone connecting all processes",
    applications: [
      "Track raw material batches through production",
      "Real-time production scheduling and monitoring",
      "Complete genealogy tracking of each blood bag",
      "Integrated inventory management"
    ],
    terumoExample: "The MES can instantly trace affected lots and their ingredient sources if there's a quality issue, showing which ports/tubing batch went into each blood bag",
    benefits: [
      "End-to-end visibility",
      "Simplified compliance reporting",
      "Real-time production control",
      "Complete product traceability"
    ]
  },
  {
    id: 8,
    title: "Blockchain for Traceability",
    icon: Shield,
    color: "pink",
    description: "Secure, tamper-evident record keeping for complete traceability",
    applications: [
      "Log critical transactions in product lifecycle",
      "Track raw material sourcing to final distribution",
      "Secure sterilization and quality records",
      "Transparent audit trail for stakeholders"
    ],
    terumoExample: "Blockchain records could log each step from PVC resin sourcing through manufacturing, sterilization, and distribution, creating tamper-evident transparency",
    benefits: [
      "Enhanced supply chain trust",
      "Regulatory compliance assurance",
      "Tamper-evident records",
      "Improved quality assurance"
    ]
  }
];

const TechPillarsMappingSection: React.FC<TechPillarsMappingSectionProps> = ({ onComplete }) => {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);
  const [exploredPillars, setExploredPillars] = useState<number[]>([]);

  const handlePillarClick = (id: number) => {
    setSelectedPillar(selectedPillar === id ? null : id);
    if (!exploredPillars.includes(id)) {
      setExploredPillars([...exploredPillars, id]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      teal: 'text-teal-600',
      indigo: 'text-indigo-600',
      pink: 'text-pink-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Factory className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech Pillars Mapping</h1>
        <p className="text-gray-600">How Industry 4.0 technology pillars apply to Terumo's blood bag manufacturing</p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Technology Application Context</h2>
        <p className="text-blue-800">
          Each Industry 4.0 technology pillar has specific applications in blood bag manufacturing. 
          Understanding these practical use cases helps identify where and how to implement smart manufacturing solutions 
          in our production processes for maximum impact and ROI.
        </p>
      </div>

      {/* Tech Pillars Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {techPillars.map((pillar) => {
          const Icon = pillar.icon;
          const isSelected = selectedPillar === pillar.id;
          const isExplored = exploredPillars.includes(pillar.id);
          
          return (
            <div
              key={pillar.id}
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                isSelected ? 'ring-2 ring-indigo-400' : ''
              }`}
              onClick={() => handlePillarClick(pillar.id)}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${pillar.color}-100`}>
                    <Icon className={`w-6 h-6 ${getIconColor(pillar.color)}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{pillar.title}</h3>
                    {isExplored && <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{pillar.description}</p>
                
                {isSelected && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Applications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Applications:</h4>
                      <ul className="space-y-1">
                        {pillar.applications.map((app, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Terumo Example */}
                    <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(pillar.color)}`}>
                      <h4 className="font-semibold mb-2">Terumo Example:</h4>
                      <p className="text-sm">{pillar.terumoExample}</p>
                    </div>
                    
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Expected Benefits:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {pillar.benefits.map((benefit, index) => (
                          <div key={index} className="text-sm text-gray-700 flex items-start bg-gray-50 p-2 rounded">
                            <span className="text-blue-500 mr-2">✓</span>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {!isSelected && (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Click to explore applications and benefits</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Overview */}
      {exploredPillars.length >= 4 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Technology Integration Strategy</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Wifi className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Foundation Layer</h3>
              <p className="text-sm text-blue-700">IoT sensors and connectivity form the data foundation</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Brain className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Intelligence Layer</h3>
              <p className="text-sm text-green-700">AI and analytics process data for insights and predictions</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-purple-900 mb-2">Action Layer</h3>
              <p className="text-sm text-purple-700">Automation and human interfaces execute decisions</p>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Priorities */}
      {exploredPillars.length >= 6 && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg p-8 text-white animate-fadeIn">
          <h2 className="text-2xl font-bold text-center mb-6">Implementation Priorities</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 1: Foundation</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• IoT sensor deployment</li>
                <li>• Basic data collection</li>
                <li>• MES/ERP integration</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 2: Intelligence</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Machine vision systems</li>
                <li>• Predictive analytics</li>
                <li>• Digital twin development</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 3: Advanced</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Robotics and automation</li>
                <li>• AR/VR implementation</li>
                <li>• Blockchain traceability</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {exploredPillars.length === techPillars.length && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent! You've explored all technology applications</h3>
          <p className="text-green-700 mb-4">Now let's see how these map to your specific production processes</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Continue to Process Mapping
          </button>
        </div>
      )}
    </div>
  );
};

export default TechPillarsMappingSection;