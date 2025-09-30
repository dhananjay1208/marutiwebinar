import React, { useState } from 'react';
import { Factory, ChevronRight, Car, Package, Cog, Truck, Settings, Wrench } from 'lucide-react';

interface ProcessMappingSectionProps {
  onComplete: () => void;
}

const processSteps = [
  {
    id: 1,
    title: "Steel & Raw Material Management",
    icon: Package,
    description: "Steel coils, components, and parts inventory management",
    currentProcess: "Manual inventory checks, paper-based tracking, periodic audits",
    industry4Opportunities: [
      {
        technology: "IoT Sensors",
        application: "Automated inventory tracking with weight sensors, RFID tags, and smart shelving",
        benefit: "Real-time inventory levels, automated reordering, reduced stockouts"
      },
      {
        technology: "Big Data Analytics",
        application: "Material usage pattern analysis, demand forecasting, and supplier optimization",
        benefit: "Optimized inventory levels, reduced carrying costs, improved supplier performance"
      },
      {
        technology: "Mobile Apps",
        application: "Mobile scanning for material receiving, tracking, and quality verification",
        benefit: "Faster processing, reduced manual errors, real-time updates"
      }
    ]
  },
  {
    id: 2,
    title: "Body Shop - Stamping & Welding",
    icon: Settings,
    description: "Metal stamping operations and robotic welding processes",
    currentProcess: "Semi-automated stamping with manual setup, robotic welding with periodic monitoring",
    industry4Opportunities: [
      {
        technology: "IoT Sensors",
        application: "Continuous monitoring of press tonnage, temperature, and weld parameters",
        benefit: "Consistent part quality, early detection of tool wear, reduced scrap"
      },
      {
        technology: "AI/ML",
        application: "Predictive maintenance for stamping dies and weld gun tips",
        benefit: "Reduced unplanned downtime, optimized tool life, improved OEE"
      },
      {
        technology: "Digital Twin",
        application: "Virtual model of stamping and welding processes for optimization",
        benefit: "Process improvement without production disruption, virtual tryouts"
      }
    ]
  },
  {
    id: 3,
    title: "Paint Shop Operations",
    icon: Factory,
    description: "Surface treatment, painting, and coating processes",
    currentProcess: "Automated spray systems with manual quality checks and touch-ups",
    industry4Opportunities: [
      {
        technology: "Computer Vision",
        application: "Automated paint defect detection and color matching verification",
        benefit: "100% inspection coverage, consistent quality, reduced rework"
      },
      {
        technology: "Robotics",
        application: "Advanced robotic spray systems with adaptive path planning",
        benefit: "Optimal paint application, reduced material waste, consistent finish"
      },
      {
        technology: "IoT Sensors",
        application: "Environmental monitoring of temperature, humidity, and air quality",
        benefit: "Optimal painting conditions, reduced defects, compliance tracking"
      }
    ]
  },
  {
    id: 4,
    title: "Engine & Transmission Assembly",
    icon: Cog,
    description: "Powertrain assembly and testing operations",
    currentProcess: "Semi-automated assembly lines with manual testing and inspection",
    industry4Opportunities: [
      {
        technology: "Robotics",
        application: "Collaborative robots for precision assembly and handling",
        benefit: "Consistent assembly quality, reduced ergonomic stress, improved efficiency"
      },
      {
        technology: "Computer Vision",
        application: "Automated inspection of assembly quality and component verification",
        benefit: "Zero-defect assembly, immediate feedback, traceability"
      },
      {
        technology: "AR Technology",
        application: "AR guidance for complex assembly procedures and maintenance",
        benefit: "Reduced training time, fewer assembly errors, faster troubleshooting"
      }
    ]
  },
  {
    id: 5,
    title: "Final Assembly Line",
    icon: Car,
    description: "Complete vehicle assembly and integration",
    currentProcess: "Conveyor-based assembly with manual operations and quality checks",
    industry4Opportunities: [
      {
        technology: "IoT Sensors",
        application: "Real-time tracking of assembly progress and quality parameters",
        benefit: "Improved line balancing, immediate quality feedback, full traceability"
      },
      {
        technology: "Robotics",
        application: "Automated material handling and precise component installation",
        benefit: "Consistent assembly, reduced manual handling, improved safety"
      },
      {
        technology: "Big Data Analytics",
        application: "Analysis of assembly line efficiency and bottleneck identification",
        benefit: "Optimized production flow, reduced cycle time, improved throughput"
      }
    ]
  },
  {
    id: 6,
    title: "Quality Testing & Logistics",
    icon: Wrench,
    description: "Final testing, inspection, and vehicle dispatch",
    currentProcess: "Manual testing procedures with paper-based documentation",
    industry4Opportunities: [
      {
        technology: "Automated Testing",
        application: "Automated brake testing, alignment, and emission analysis",
        benefit: "Consistent test results, reduced testing time, improved accuracy"
      },
      {
        technology: "IoT/RFID",
        application: "Smart tracking throughout logistics chain with GPS monitoring",
        benefit: "Real-time vehicle location, damage prevention, delivery optimization"
      },
      {
        technology: "Big Data Analytics",
        application: "Analysis of quality trends and logistics optimization",
        benefit: "Predictive quality insights, optimized delivery routes, cost reduction"
      }
    ]
  }
];

const ProcessMappingSection: React.FC<ProcessMappingSectionProps> = ({ onComplete }) => {
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
  const [exploredProcesses, setExploredProcesses] = useState<number[]>([]);

  const handleProcessClick = (id: number) => {
    setSelectedProcess(selectedProcess === id ? null : id);
    if (!exploredProcesses.includes(id)) {
      setExploredProcesses([...exploredProcesses, id]);
    }
  };

  const getTechnologyColor = (tech: string) => {
    const colorMap: { [key: string]: string } = {
      'IoT Sensors': 'bg-blue-100 text-blue-800',
      'AI/ML': 'bg-purple-100 text-purple-800',
      'Computer Vision': 'bg-purple-100 text-purple-800',
      'Big Data Analytics': 'bg-green-100 text-green-800',
      'Mobile Apps': 'bg-pink-100 text-pink-800',
      'Digital Twin': 'bg-red-100 text-red-800',
      'Robotics': 'bg-gray-100 text-gray-800',
      'AR Technology': 'bg-orange-100 text-orange-800',
      'IoT/RFID': 'bg-cyan-100 text-cyan-800'
    };
    return colorMap[tech] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Factory className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapping to Maruti Suzuki's Process</h1>
        <p className="text-gray-600">How Industry 4.0 technologies can transform our automotive production</p>
      </div>

      {/* Process Flow */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Automotive Production Process</h2>
        
        <div className="space-y-6">
          {processSteps.map((process, index) => {
            const Icon = process.icon;
            const isSelected = selectedProcess === process.id;
            const isExplored = exploredProcesses.includes(process.id);
            const isLast = index === processSteps.length - 1;
            
            return (
              <div key={process.id} className="relative">
                {/* Process Card */}
                <div
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    isSelected ? 'ring-2 ring-indigo-400' : ''
                  }`}
                  onClick={() => handleProcessClick(process.id)}
                >
                  <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isExplored ? 'bg-green-500' : 'bg-indigo-500'
                      } text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{process.title}</h3>
                        <p className="text-sm text-gray-600">{process.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Step {process.id}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                      <h4 className="font-semibold text-yellow-800 mb-1">Current Process:</h4>
                      <p className="text-sm text-yellow-700">{process.currentProcess}</p>
                    </div>
                    
                    {isSelected && (
                      <div className="space-y-4 animate-fadeIn">
                        <h4 className="text-lg font-semibold text-gray-900">Industry 4.0 Opportunities:</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {process.industry4Opportunities.map((opportunity, oppIndex) => (
                            <div key={oppIndex} className="border border-gray-200 rounded-lg p-4">
                              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getTechnologyColor(opportunity.technology)}`}>
                                {opportunity.technology}
                              </div>
                              <h5 className="font-semibold text-gray-900 text-sm mb-2">Application:</h5>
                              <p className="text-sm text-gray-700 mb-3">{opportunity.application}</p>
                              <div className="bg-green-50 border-l-4 border-green-400 p-2">
                                <h5 className="font-semibold text-green-800 text-xs mb-1">Benefit:</h5>
                                <p className="text-xs text-green-700">{opportunity.benefit}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!isSelected && (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">Click to explore Industry 4.0 opportunities</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Arrow to next process */}
                {!isLast && (
                  <div className="flex justify-center my-4">
                    <ChevronRight className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Implementation Priorities */}
      {exploredProcesses.length >= 4 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Implementation Priorities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🥇</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Quick Wins</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>IoT sensors for monitoring</li>
                <li>Mobile inventory tracking</li>
                <li>Automated data collection</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🥈</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Medium Term</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>AI-powered quality control</li>
                <li>Predictive maintenance</li>
                <li>Process optimization</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🥉</span>
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">Long Term</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Full automation</li>
                <li>Digital twin implementation</li>
                <li>Advanced robotics</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {exploredProcesses.length === processSteps.length && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Outstanding! You've mapped all processes</h3>
          <p className="text-green-700 mb-4">Now it's time for your team to brainstorm specific use cases</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Start Brainstorming
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessMappingSection;