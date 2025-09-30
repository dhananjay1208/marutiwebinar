import React, { useState } from 'react';
import { Clock, Stamp as Steam, Zap, Computer, Brain } from 'lucide-react';

interface EvolutionSectionProps {
  onComplete: () => void;
}

const revolutions = [
  {
    id: 1,
    title: "First Industrial Revolution",
    period: "1760-1840",
    icon: Steam,
    color: "brown",
    keyTechnology: "Steam Power & Mechanization",
    description: "Mechanization of production using water and steam power - from hand production to machines",
    impact: "Moved from handicraft workshops to mechanized production in factories",
    examples: ["Steam engines for powering machines", "Water wheels and power looms", "Railroad networks", "Textile mills with mechanical power"],
    keyPoint: "This era was about mechanization – using machines (powered by steam or water) instead of purely human or animal muscle. It dramatically increased production capacity, and cities and factories emerged."
  },
  {
    id: 2,
    title: "Second Industrial Revolution", 
    period: "1870-1914",
    icon: Zap,
    color: "yellow",
    keyTechnology: "Electricity & Assembly Lines",
    description: "Mass production through electrical power and division of labor - standardized manufacturing at scale",
    impact: "Standardized mass production and quality control - making identical products by millions",
    examples: ["Henry Ford's assembly line (1913)", "Electric motors for individual machines", "Telegraph and telephone communication", "Model T cars mass production"],
    keyPoint: "Industry 2.0 brought cost-effective production at scale. We got early control systems and communication tech that helped manage bigger operations. Productivity and standardization soared."
  },
  {
    id: 3,
    title: "Third Industrial Revolution",
    period: "1950-2010",
    icon: Computer,
    color: "blue", 
    keyTechnology: "Computers & Automation",
    description: "Automation using electronics, computers, and programmable logic controllers - the Digital Revolution",
    impact: "Programmable automation and computerized manufacturing - precision and control with minimal human input",
    examples: ["PLCs (Programmable Logic Controllers)", "Industrial robots (first in GM plant, 1961)", "CAD/CAM systems", "Microprocessors and semiconductor electronics"],
    keyPoint: "If Industry 2.0 was about scale, 3.0 was about precision and control. We started using IT systems to manage manufacturing, but machines often operated in silos requiring human coordination."
  },
  {
    id: 4,
    title: "Fourth Industrial Revolution",
    period: "2011-Present",
    icon: Brain,
    color: "purple",
    keyTechnology: "IoT, AI & Cyber-Physical Systems",
    description: "Smart, connected systems with artificial intelligence and machine learning - minimal human intervention in decision-making",
    impact: "Intelligent, adaptive, and self-optimizing manufacturing - factories that largely run themselves",
    examples: ["IoT sensors everywhere", "AI/ML for decision making", "Digital twins of production", "Predictive maintenance", "Smart robots that adapt"],
    keyPoint: "Unlike Industry 3.0's fixed automation, Industry 4.0 introduces 'cyber-physical systems' where physical machines are deeply integrated with networks and software, continuously communicating and adapting."
  }
];

const EvolutionSection: React.FC<EvolutionSectionProps> = ({ onComplete }) => {
  const [selectedRevolution, setSelectedRevolution] = useState<number | null>(null);
  const [completedRevolutions, setCompletedRevolutions] = useState<number[]>([]);

  const handleRevolutionClick = (id: number) => {
    setSelectedRevolution(selectedRevolution === id ? null : id);
    if (!completedRevolutions.includes(id)) {
      setCompletedRevolutions([...completedRevolutions, id]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      brown: 'bg-amber-50 border-amber-200 text-amber-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800', 
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      brown: 'text-amber-600',
      yellow: 'text-yellow-600',
      blue: 'text-blue-600', 
      purple: 'text-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Evolution of Industry 4.0</h1>
        <p className="text-gray-600">Journey through the four industrial revolutions</p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Understanding the Timeline</h2>
        <p className="text-blue-800 mb-4">
          To understand Industry 4.0, it helps to see it as part of a timeline of industrial revolutions. 
          When someone asks "What is Industry 4.0?" you can say "it's the fourth industrial revolution" and give this quick history:
        </p>
        <div className="text-center">
          <p className="text-blue-700 font-medium">Steam → Electricity → Computers → Intelligence & Connectivity</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          {/* Revolution Cards */}
          <div className="space-y-8">
            {revolutions.map((revolution) => {
              const Icon = revolution.icon;
              const isCompleted = completedRevolutions.includes(revolution.id);
              const isSelected = selectedRevolution === revolution.id;
              
              return (
                <div key={revolution.id} className="relative flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : `bg-${revolution.color}-500`
                  }`} onClick={() => handleRevolutionClick(revolution.id)}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-1 transform transition-all duration-300 cursor-pointer ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`} onClick={() => handleRevolutionClick(revolution.id)}>
                    <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{revolution.title}</h3>
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {revolution.period}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Key Technology</h4>
                        <p className={`text-sm p-3 rounded-lg ${getColorClasses(revolution.color)}`}>
                          {revolution.keyTechnology}
                        </p>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{revolution.description}</p>
                      
                      {isSelected && (
                        <div className="space-y-4 animate-fadeIn">
                          <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(revolution.color)}`}>
                            <h4 className="font-semibold mb-2">Key Insight:</h4>
                            <p className="text-sm">{revolution.keyPoint}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Key Examples & Innovations:</h4>
                            <div className="grid md:grid-cols-2 gap-2">
                              {revolution.examples.map((example, index) => (
                                <div key={index} className="text-sm text-gray-700 flex items-start bg-white p-2 rounded border border-gray-100">
                                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                                  {example}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Manufacturing Impact:</h4>
                            <p className="text-sm text-gray-700 italic bg-gray-100 p-3 rounded-lg">{revolution.impact}</p>
                          </div>
                        </div>
                      )}
                      
                      {!isSelected && (
                        <div className="text-center py-2">
                          <p className="text-gray-500 text-sm">Click to explore this revolution</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Industry 4.0 Focus */}
      {completedRevolutions.includes(4) && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-8 text-white animate-fadeIn">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">We Are Here: Industry 4.0</h2>
            <p className="text-lg mb-6 opacity-90">
              The convergence of physical and digital worlds in manufacturing
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Connectivity</h3>
                <p className="text-sm opacity-90">Everything is connected and communicating</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Intelligence</h3>
                <p className="text-sm opacity-90">Systems learn and make decisions autonomously</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Autonomy</h3>
                <p className="text-sm opacity-90">Self-optimizing and adaptive processes</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Now Context */}
      {completedRevolutions.length >= 3 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">The German Origin & Global Adoption</h2>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">🇩🇪 Born in Germany (2011)</h3>
            <div className="space-y-3 text-blue-800">
              <p className="text-sm">
                The term "Industry 4.0" was coined in 2011 in Germany as part of a high-tech strategy initiative. 
                It wasn't just academic - it was a national project to modernize German manufacturing and maintain 
                their competitive edge in global markets.
              </p>
              <p className="text-sm">
                German engineering companies and research institutes collaborated to define this vision of 
                smart, connected factories that could adapt quickly to changing market demands.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Global Adoption Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900">2011-2013:</span>
                    <span className="text-sm text-gray-700 ml-2">Germany develops concept</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900">2014-2016:</span>
                    <span className="text-sm text-gray-700 ml-2">Early adopters in Europe & US</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900">2017-Present:</span>
                    <span className="text-sm text-gray-700 ml-2">Global strategic priority</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🌍 Why It Spread Globally</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Competitive pressure: Companies saw German manufacturers gaining advantages
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Technology maturity: IoT, AI, and cloud became affordable and reliable
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Market demands: Customers wanted more customization and faster delivery
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  COVID-19 impact: Accelerated need for resilient, flexible manufacturing
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Why Industry 4.0 is Happening Now</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Maturity</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Before 2010: No affordable IoT sensors or cloud computing
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  2010s: Modern AI algorithms that actually work well
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Now: Technology advancing exponentially
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapid Global Spread</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Before 2014: "Industry 4.0\" barely known outside Germany
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  2015-2020: Major corporations worldwide adopted the term
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Now: National strategies in US, China, Japan, India, and more
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 The Numbers Tell the Story</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">2011</div>
                <div className="text-sm text-gray-700">Term coined in Germany</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">2017</div>
                <div className="text-sm text-gray-700">Global tipping point</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">Today</div>
                <div className="text-sm text-gray-700">$100B+ global market</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terumo Context */}
      {completedRevolutions.length >= 2 && (
        <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500 animate-fadeIn">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Terumo Penpol's Journey</h3>
          <p className="text-green-700 mb-4">
            We at Terumo Penpol have benefited from revolutions 1.0 through 3.0:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 text-sm">Industry 2.0</h4>
              <p className="text-xs text-green-700">Electricity and assembly line concepts</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 text-sm">Industry 3.0</h4>
              <p className="text-xs text-green-700">Automation and computerized controls</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 text-sm">Industry 4.0</h4>
              <p className="text-xs text-green-700">Our next step to remain competitive</p>
            </div>
          </div>
        </div>
      )}

      {/* Future Speculation */}
      {completedRevolutions.length === revolutions.length && (
        <div className="bg-gray-100 rounded-xl p-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">What About Industry 5.0?</h3>
          <p className="text-gray-700 text-sm mb-4">
            People have started speculating about Industry 5.0 (more human-centric manufacturing, AI-human collaboration), 
            but that's maybe in the future. For now, Industry 4.0 itself is still being adopted worldwide.
          </p>
          <div className="text-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              We're right in the midst of the 4th revolution!
            </span>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {completedRevolutions.length === revolutions.length && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent! You've explored the complete evolution</h3>
          <p className="text-green-700 mb-4">Now you understand how we arrived at Industry 4.0 and why it's happening now</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Discover Why Now
          </button>
        </div>
      )}
    </div>
  );
};

export default EvolutionSection;