import React, { useState } from 'react';
import { ArrowRight, Play, Eye, Brain, Wifi, BarChart3 } from 'lucide-react';

interface TechDemosSectionProps {
  onComplete: () => void;
}

const demos = [
  {
    id: 1,
    title: "IoT Sensor Network",
    icon: Wifi,
    color: "blue",
    description: "Real-time monitoring of production parameters",
    demoType: "Live Data Simulation",
    keyFeatures: [
      "Temperature monitoring across 12 production zones",
      "Pressure sensors on welding equipment",
      "Vibration analysis for predictive maintenance",
      "Real-time alerts and notifications"
    ],
    bloodBagApplication: "Monitor critical parameters during PVC film extrusion and blood bag welding",
    metrics: {
      dataPoints: "50+",
      updateFrequency: "Every 5 seconds", 
      accuracy: "±0.1°C",
      alertResponse: "< 10 seconds"
    }
  },
  {
    id: 2,
    title: "AI Quality Control",
    icon: Brain,
    color: "purple",
    description: "Computer vision system for defect detection",
    demoType: "Image Recognition Demo",
    keyFeatures: [
      "Microscopic defect detection in blood bags",
      "Weld quality assessment using AI",
      "Real-time pass/fail decisions",
      "Defect classification and trending"
    ],
    bloodBagApplication: "Automated inspection of blood bag seals and material integrity", 
    metrics: {
      accuracy: "99.8%",
      speed: "0.2 seconds per bag",
      defectTypes: "15+ categories",
      falsePositive: "< 0.1%"
    }
  },
  {
    id: 3,
    title: "Predictive Analytics Dashboard",
    icon: BarChart3,
    color: "green", 
    description: "Machine learning for production optimization",
    demoType: "Interactive Dashboard",
    keyFeatures: [
      "Equipment failure predictions",
      "Production efficiency trends",
      "Quality correlation analysis",
      "Maintenance scheduling optimization"
    ],
    bloodBagApplication: "Predict equipment maintenance needs and optimize production schedules",
    metrics: {
      predictionAccuracy: "94%",
      maintenanceReduction: "35%",
      efficiencyGain: "22%",
      costSavings: "₹2.5M annually"
    }
  },
  {
    id: 4,
    title: "AR Maintenance Assistant",
    icon: Eye,
    color: "orange",
    description: "Augmented reality for maintenance and training",
    demoType: "AR Experience",
    keyFeatures: [
      "Step-by-step maintenance guidance",
      "3D visualization of equipment",
      "Remote expert assistance",
      "Training modules for new operators"
    ],
    bloodBagApplication: "Guide operators through complex equipment maintenance procedures",
    metrics: {
      trainingTime: "60% reduction",
      errorReduction: "45%",
      expertAccess: "24/7 remote",
      languages: "3 local languages"
    }
  }
];

const TechDemosSection: React.FC<TechDemosSectionProps> = ({ onComplete }) => {
  const [activeDemo, setActiveDemo] = useState<number | null>(null);
  const [viewedDemos, setViewedDemos] = useState<number[]>([]);
  const [simulationActive, setSimulationActive] = useState<{ [key: number]: boolean }>({});

  const handleDemoClick = (id: number) => {
    setActiveDemo(activeDemo === id ? null : id);
    if (!viewedDemos.includes(id)) {
      setViewedDemos([...viewedDemos, id]);
    }
  };

  const startSimulation = (id: number) => {
    setSimulationActive({ ...simulationActive, [id]: true });
    // Auto-stop simulation after 10 seconds
    setTimeout(() => {
      setSimulationActive({ ...simulationActive, [id]: false });
    }, 10000);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors];
  };

  const getButtonColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-600 hover:bg-orange-700'
    };
    return colors[color as keyof typeof colors];
  };

  // Mock data for IoT demo
  const generateMockData = () => {
    return {
      temperature: (Math.random() * 10 + 180).toFixed(1),
      pressure: (Math.random() * 2 + 8).toFixed(1),
      vibration: (Math.random() * 0.5 + 0.2).toFixed(2),
      efficiency: (Math.random() * 5 + 92).toFixed(1)
    };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <ArrowRight className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech Demos</h1>
        <p className="text-gray-600">Live demonstrations of Industry 4.0 technologies</p>
      </div>

      {/* Demo Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {demos.map((demo) => {
          const Icon = demo.icon;
          const isActive = activeDemo === demo.id;
          const isViewed = viewedDemos.includes(demo.id);
          const isSimulating = simulationActive[demo.id];
          
          return (
            <div
              key={demo.id}
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                isActive ? 'ring-2 ring-teal-400' : ''
              }`}
              onClick={() => handleDemoClick(demo.id)}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${demo.color}-100`}>
                    <Icon className={`w-6 h-6 text-${demo.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{demo.title}</h3>
                    <p className="text-sm text-gray-600">{demo.demoType}</p>
                  </div>
                  {isViewed && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                </div>
                
                <p className="text-gray-700 mb-4">{demo.description}</p>
                
                {isActive && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Demo Control */}
                    <div className="text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startSimulation(demo.id);
                        }}
                        disabled={isSimulating}
                        className={`${getButtonColor(demo.color)} text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto ${
                          isSimulating ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        <Play className="w-5 h-5" />
                        <span>{isSimulating ? 'Running...' : 'Start Demo'}</span>
                      </button>
                    </div>
                    
                    {/* Live Demo Content */}
                    {demo.id === 1 && isSimulating && (
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <div className="mb-2 text-center text-green-300">🔴 LIVE DATA STREAM</div>
                        {(() => {
                          const data = generateMockData();
                          return (
                            <div className="space-y-1">
                              <div>Zone 1 Temp: {data.temperature}°C ✓</div>
                              <div>Weld Pressure: {data.pressure} bar ✓</div>
                              <div>Vibration: {data.vibration} mm/s ✓</div>
                              <div>Line Efficiency: {data.efficiency}% ✓</div>
                              <div className="text-yellow-400 animate-pulse">Monitoring 12 zones...</div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    
                    {demo.id === 2 && isSimulating && (
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <div className="mb-2 text-gray-700 font-semibold">AI Vision Analysis</div>
                        <div className="bg-blue-500 text-white p-2 rounded mb-2 animate-pulse">
                          Scanning blood bag #B-2024-001...
                        </div>
                        <div className="text-green-600 font-semibold">✅ PASS - No defects detected</div>
                        <div className="text-sm text-gray-600 mt-1">Confidence: 99.7%</div>
                      </div>
                    )}
                    
                    {demo.id === 3 && isSimulating && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <span className="font-semibold">Equipment Health</span>
                          <span className="text-green-600">94% ✓</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                          <span className="font-semibold">Maintenance Alert</span>
                          <span className="text-orange-600">Extruder 2 - 3 days ⚠️</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span className="font-semibold">Production Target</span>
                          <span className="text-green-600">102% achieved 🎯</span>
                        </div>
                      </div>
                    )}
                    
                    {demo.id === 4 && isSimulating && (
                      <div className="bg-indigo-50 p-4 rounded-lg text-center">
                        <div className="mb-2 text-indigo-700 font-semibold">AR Maintenance Mode</div>
                        <div className="text-sm text-indigo-600 space-y-1">
                          <div>🔧 Step 1: Remove safety cover</div>
                          <div className="animate-pulse bg-indigo-200 p-1 rounded">→ Step 2: Check bearing alignment</div>
                          <div>🔧 Step 3: Apply lubricant</div>
                          <div>📞 Expert available for guidance</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {demo.keyFeatures.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Blood Bag Application */}
                    <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(demo.color)}`}>
                      <h4 className="font-semibold mb-1">Blood Bag Application:</h4>
                      <p className="text-sm">{demo.bloodBagApplication}</p>
                    </div>
                    
                    {/* Metrics */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics:</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {Object.entries(demo.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="font-semibold text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {!isActive && (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Click to view live demonstration</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Summary */}
      {viewedDemos.length >= 3 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Technology Integration</h2>
          <p className="text-center text-gray-600 mb-6">
            These technologies work together to create a comprehensive Industry 4.0 ecosystem
          </p>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Data Collection</h3>
              <p className="text-xs text-blue-700">IoT sensors gather information</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Intelligence</h3>
              <p className="text-xs text-purple-700">AI processes and learns</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Insights</h3>
              <p className="text-xs text-green-700">Analytics provide guidance</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900">Action</h3>
              <p className="text-xs text-orange-700">AR assists human decisions</p>
            </div>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {viewedDemos.length === demos.length && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Fantastic! You've seen all tech demos</h3>
          <p className="text-green-700 mb-4">Now let's discuss how to implement these technologies</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            View Implementation Roadmap
          </button>
        </div>
      )}
    </div>
  );
};

export default TechDemosSection;