import React, { useState } from 'react';
import { Rocket, TrendingUp, DollarSign, Shield, Users, Zap, Target } from 'lucide-react';

interface WhyNowSectionProps {
  onComplete: () => void;
}

const drivers = [
  {
    id: 1,
    title: "Staying Competitive",
    icon: TrendingUp, 
    color: "blue",
    reasons: [
      "Competitors using Industry 4.0 run more efficiently and flexibly",
      "Risk of falling behind if we stick to old ways",
      "Market leadership requires embracing new technologies",
      "Industry 4.0 adoption becoming necessity, not option"
    ],
    marutiImpact: "If competitors like Hyundai or Toyota use automated quality inspection with near-zero defects at lower cost while we do manual inspection, they gain market share"
  },
  {
    id: 2, 
    title: "Cost Optimization",
    icon: DollarSign,
    color: "green",
    reasons: [
      "Predictive maintenance reduces unexpected breakdowns by up to 70%",
      "Maintenance costs can be cut by 25-30%",
      "Automation increases throughput and reduces idle time",
      "Fewer unplanned line stoppages means consistent output"
    ],
    marutiImpact: "Fewer unplanned line stoppages means more consistent vehicle production and less overtime or production delays"
  },
  {
    id: 3,
    title: "Quality & Compliance",
    icon: Shield, 
    color: "red",
    reasons: [
      "Digital systems ensure complete product traceability",
      "Automated inspection catches defects earlier",
      "Big data analytics can flag quality anomalies",
      "Critical for regulatory compliance and customer trust"
    ],
    marutiImpact: "As automotive manufacturer, we need to trace each vehicle back to raw material batch, machine settings, and operator for quality issues and recalls"
  },
  {
    id: 4,
    title: "Data-Driven Decisions",
    icon: Users, 
    color: "purple",
    reasons: [
      "Break information silos between production, quality, and management",
      "Connect shop-floor data with ERP systems",
      "Enable decisions with full picture instead of local optimization",
      "Real-time information flow where it's needed"
    ],
    marutiImpact: "Imagine operators, quality engineers, and production planners all looking at the same live dashboard instead of waiting for end-of-shift reports"
  },
  {
    id: 5,
    title: "Agility & Resilience", 
    icon: Zap, 
    color: "orange",
    reasons: [
      "Quickly adapt to demand changes or supply disruptions",
      "Smart systems can pivot production plans in real-time",
      "Simulation models allow virtual re-planning before implementation",
      "Automatic work redistribution when production lines go down"
    ],
    marutiImpact: "COVID and supply chain disruptions showed need for agility - smart systems help us quickly adjust to sudden demand surges or material shortages"
  },
  {
    id: 6,
    title: "Customer Expectations",
    icon: Target,
    color: "teal",
    reasons: [
      "Market demands higher customization and faster delivery",
      "Customers expect transparency and real-time updates",
      "Mass customization through flexible automation",
      "Value-added services like production tracking"
    ],
    marutiImpact: "Customers expect zero defects, timely delivery, and customization options - Industry 4.0 enables this flexibility in automotive manufacturing"
  }
];

const additionalFactors = [
  {
    id: 7,
    title: "Workforce Evolution",
    icon: Users,
    color: "purple",
    reasons: [
      "Aging workforce and knowledge transfer",
      "Skills gap in manufacturing",
      "Need for upskilling and reskilling",
      "Attracting younger talent"
    ],
    marutiImpact: "Smart systems can capture expert knowledge and guide new operators through complex automotive assembly processes"
  },
  {
    id: 8,
    title: "Technology Readiness",
    icon: Zap,
    color: "yellow",
    reasons: [
      "IoT sensors are now affordable and reliable",
      "Cloud computing and edge processing",
      "AI/ML algorithms are mature and accessible",
      "5G connectivity enabling real-time responses"
    ],
    marutiImpact: "Technologies needed for smart automotive manufacturing are now cost-effective and proven"
  }
];
const benefits = [
  { label: "Efficiency Improvement", value: "20-30%", color: "bg-blue-500" },
  { label: "Quality Enhancement", value: "50-90%", color: "bg-green-500" },
  { label: "Downtime Reduction", value: "30-50%", color: "bg-purple-500" },
  { label: "Energy Savings", value: "10-20%", color: "bg-orange-500" },
  { label: "Cost Reduction", value: "15-25%", color: "bg-red-500" }
];

const WhyNowSection: React.FC<WhyNowSectionProps> = ({ onComplete }) => {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [exploredDrivers, setExploredDrivers] = useState<number[]>([]);

  const handleDriverClick = (id: number) => {
    setSelectedDriver(selectedDriver === id ? null : id);
    if (!exploredDrivers.includes(id)) {
      setExploredDrivers([...exploredDrivers, id]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-500 text-blue-800',
      green: 'bg-green-100 border-green-500 text-green-800',
      red: 'bg-red-100 border-red-500 text-red-800', 
      purple: 'bg-purple-100 border-purple-500 text-purple-800',
      orange: 'bg-orange-100 border-orange-500 text-orange-800'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Why Industry 4.0, Why Now?</h1>
        <p className="text-gray-600">Understanding the driving forces behind smart manufacturing adoption</p>
      </div>

      {/* Key Drivers */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Key Driving Forces</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => {
            const Icon = driver.icon;
            const isSelected = selectedDriver === driver.id;
            const isExplored = exploredDrivers.includes(driver.id);
            
            return (
              <div
                key={driver.id}
                className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isSelected ? 'ring-2 ring-orange-400' : ''
                }`}
                onClick={() => handleDriverClick(driver.id)}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${driver.color}-100`}>
                      <Icon className={`w-6 h-6 text-${driver.color}-600`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{driver.title}</h3>
                    {isExplored && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                  </div>
                  
                  {isSelected && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Key Reasons:</h4>
                        <ul className="space-y-1">
                          {driver.reasons.map((reason, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(driver.color)}`}>
                        <h4 className="font-semibold mb-1">Maruti Suzuki Impact:</h4>
                        <p className="text-sm">{driver.marutiImpact}</p>
                      </div>
                    </div>
                  )}
                  
                  {!isSelected && (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">Click to explore this driver</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Factors */}
      {exploredDrivers.length >= 3 && (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Additional Factors</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {additionalFactors.map((factor) => {
              const Icon = factor.icon;
              const isSelected = selectedDriver === factor.id;
              const isExplored = exploredDrivers.includes(factor.id);
              
              return (
                <div
                  key={factor.id}
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    isSelected ? 'ring-2 ring-orange-400' : ''
                  }`}
                  onClick={() => handleDriverClick(factor.id)}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${factor.color}-100`}>
                        <Icon className={`w-6 h-6 text-${factor.color}-600`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{factor.title}</h3>
                      {isExplored && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                    </div>
                    
                    {isSelected && (
                      <div className="space-y-4 animate-fadeIn">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Reasons:</h4>
                          <ul className="space-y-1">
                            {factor.reasons.map((reason, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(factor.color)}`}>
                          <h4 className="font-semibold mb-1">Maruti Suzuki Impact:</h4>
                          <p className="text-sm">{factor.marutiImpact}</p>
                        </div>
                      </div>
                    )}
                    
                    {!isSelected && (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">Click to explore this factor</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Benefits Metrics */}
      {exploredDrivers.length >= 3 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Expected Benefits</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center ${benefit.color} text-white`}>
                  <span className="text-lg font-bold">{benefit.value}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{benefit.label}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Perfect Storm */}
      {exploredDrivers.length >= 4 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-8 text-white animate-fadeIn">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">The Perfect Storm</h2>
            <p className="text-lg mb-6 opacity-90">
              Multiple converging factors make this the ideal time for Industry 4.0 adoption
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Market Maturity</h3>
                <p className="text-sm opacity-90">Technologies are proven and affordable</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Business Pressure</h3>
                <p className="text-sm opacity-90">Competitive advantage is critical</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Strategic Alignment</h3>
                <p className="text-sm opacity-90">Perfect fit for automotive manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {exploredDrivers.length === (drivers.length + additionalFactors.length) && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Perfect! You understand the driving forces</h3>
          <p className="text-green-700 mb-4">Now let's explore the technologies that make it possible</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Explore Technologies
          </button>
        </div>
      )}
    </div>
  );
};

export default WhyNowSection;