import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Check, Factory, Zap, Database, Cog } from 'lucide-react';

interface BuzzwordsSectionProps {
  onComplete: () => void;
}

const mainConcepts = [
  {
    term: "Industry 4.0",
    subtitle: "The Fourth Industrial Revolution",
    definition: "Integrating digital technologies, data, and automation into manufacturing production to create smart, connected systems.",
    example: "Smart blood bag production lines with IoT sensors monitoring every step, AI optimizing quality control, and systems that communicate and make real-time decisions.",
    color: "blue",
    icon: Factory,
    keyPoints: [
      "Originated in Germany around 2011",
      "Smart, connected manufacturing systems",
      "Machines that communicate and analyze data",
      "Intelligent and adaptable factories"
    ]
  },
  {
    term: "Smart Manufacturing",
    subtitle: "Intelligent Production Systems",
    definition: "Manufacturing that emphasizes intelligent, real-time decision-making and flexibility using connected technologies.",
    example: "Production systems that automatically adjust blood bag manufacturing speed when detecting delays, or alert maintenance before equipment fails.",
    color: "green",
    icon: Zap,
    keyPoints: [
      "Real-time decision making capabilities",
      "Higher productivity and flexibility",
      "Data-driven process optimization",
      "Essentially synonymous with Industry 4.0"
    ]
  }
];

const digitalSpectrum = [
  {
    term: "Digitization",
    definition: "Converting analog/physical information into digital format",
    example: "Scanning paper documents to PDFs, converting handwritten logs to Excel, digitizing photos and videos",
    terumoExample: "Scanning handwritten machine readings into a computer system",
    color: "purple",
    icon: Database,
    focus: "About Data Conversion",
    analogy: "Paper logsheets → Excel files",
    moreExamples: [
      "Converting paper-based production logs to digital databases",
      "Scanning QC test results into computer systems", 
      "Digitizing maintenance records from clipboards to apps",
      "Converting analog sensor readings to digital signals"
    ]
  },
  {
    term: "Digitalization", 
    definition: "Using digital technologies to improve or automate processes and workflows",
    example: "Apps that auto-create work orders from digital data, online banking replacing branch visits, GPS navigation optimizing delivery routes",
    terumoExample: "ERP system automatically planning blood bag production when orders come in, rather than manual planning",
    color: "orange",
    icon: Cog,
    focus: "About Process Improvement",
    analogy: "Using Excel to calculate and automate decisions",
    moreExamples: [
      "Automated maintenance scheduling based on digital sensor data",
      "Real-time inventory management systems",
      "Digital workflow approvals replacing paper signatures",
      "Automated quality alerts when parameters go out of range"
    ]
  },
  {
    term: "Digital Transformation",
    definition: "Holistic integration of digital technology into all business areas, fundamentally changing operations and value delivery",
    example: "Netflix transforming from DVD mail service to streaming platform, banks offering mobile-first services, smart factories with data-driven culture",
    terumoExample: "Fully integrated digital ecosystem from factory floor to corporate offices, with cultural shift to data-driven decision making",
    color: "red",
    icon: Factory,
    focus: "About Business & Culture Change",
    analogy: "Rethinking the entire business with digital at the core",
    moreExamples: [
      "Complete smart factory implementation across all operations",
      "New digital services for customers (order tracking apps)",
      "Data-driven decision making at all organizational levels",
      "Cultural change to embrace experimentation and digital tools"
    ]
  }
];

const BuzzwordsSection: React.FC<BuzzwordsSectionProps> = ({ onComplete }) => {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);
  const [selectedSpectrum, setSelectedSpectrum] = useState<number | null>(null);
  const [revealedConcepts, setRevealedConcepts] = useState<number[]>([]);
  const [revealedSpectrum, setRevealedSpectrum] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleConceptClick = (index: number) => {
    setSelectedConcept(selectedConcept === index ? null : index);
    if (!revealedConcepts.includes(index)) {
      setRevealedConcepts([...revealedConcepts, index]);
    }
  };

  const handleSpectrumClick = (index: number) => {
    setSelectedSpectrum(selectedSpectrum === index ? null : index);
    if (!revealedSpectrum.includes(index)) {
      setRevealedSpectrum([...revealedSpectrum, index]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      orange: 'bg-orange-50 border-orange-200 text-orange-900',
      red: 'bg-red-50 border-red-200 text-red-900'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      red: 'text-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Demystifying Buzzwords</h1>
        <p className="text-gray-600">Let's clarify the key terms we'll be using throughout this workshop</p>
      </div>

      {/* Industry 4.0 vs Smart Manufacturing */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Industry 4.0 vs Smart Manufacturing</h2>
        <p className="text-center text-gray-600 mb-8">
          These terms are often used interchangeably - let's understand what they really mean
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mainConcepts.map((concept, index) => {
            const Icon = concept.icon;
            const isSelected = selectedConcept === index;
            const isRevealed = revealedConcepts.includes(index);
            
            return (
              <div
                key={index}
                onClick={() => handleConceptClick(index)}
                className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isRevealed ? 'ring-2 ring-green-400' : ''
                }`}
              >
                <div className="bg-gray-50 rounded-xl shadow-md p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${concept.color}-100`}>
                        <Icon className={`w-6 h-6 ${getIconColor(concept.color)}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{concept.term}</h3>
                        <p className="text-sm text-gray-600">{concept.subtitle}</p>
                      </div>
                    </div>
                    {isRevealed ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  {isSelected && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Definition:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {concept.definition}
                        </p>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(concept.color)}`}>
                        <h4 className="font-semibold mb-2">Terumo Example:</h4>
                        <p className="text-sm">{concept.example}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Key Points:</h4>
                        <ul className="space-y-1">
                          {concept.keyPoints.map((point, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {!isSelected && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">Click to explore this concept</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Insight */}
        {revealedConcepts.length >= 1 && (
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white text-center animate-fadeIn">
            <h3 className="text-xl font-bold mb-2">Key Insight</h3>
            <p className="text-lg opacity-90">
              Industry 4.0 is the buzzword or era, Smart Manufacturing is what you do in that era
            </p>
            <p className="text-sm opacity-80 mt-2">
              Think of Industry 4.0 as the time period we're in, and Smart Manufacturing as the actual implementation of intelligent, connected systems in our factory
            </p>
            <button
              onClick={() => setShowComparison(true)}
              className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Explore Related Terms
            </button>
          </div>
        )}
      </div>

      {/* Digital Spectrum */}
      {(showComparison || revealedConcepts.length >= 2) && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">The Digital Journey</h2>
          <p className="text-center text-gray-600 mb-8">
            Understanding Digitization → Digitalization → Digital Transformation
          </p>
          
          <div className="space-y-6">
            {digitalSpectrum.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedSpectrum === index;
              const isRevealed = revealedSpectrum.includes(index);
              
              return (
                <div key={index} className="relative">
                  {/* Arrow between items */}
                  {index < digitalSpectrum.length - 1 && (
                    <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                    </div>
                  )}
                  
                  <div
                    onClick={() => handleSpectrumClick(index)}
                    className={`cursor-pointer transform transition-all duration-300 hover:scale-102 ${
                      isRevealed ? 'ring-2 ring-green-400' : ''
                    }`}
                  >
                    <div className="bg-gray-50 rounded-xl shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${item.color}-100`}>
                            <Icon className={`w-6 h-6 ${getIconColor(item.color)}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{item.term}</h3>
                            <p className="text-sm font-medium text-gray-600">{item.focus}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                            Step {index + 1}
                          </div>
                          {isRevealed && <Check className="w-5 h-5 text-green-500 mt-2 ml-auto" />}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className={`p-3 rounded-lg ${getColorClasses(item.color)} text-center`}>
                          <p className="font-semibold text-sm">{item.analogy}</p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="space-y-4 animate-fadeIn">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Definition:</h4>
                            <p className="text-sm text-gray-700">{item.definition}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">General Example:</h4>
                            <p className="text-sm text-gray-700">{item.example}</p>
                          </div>
                          
                          <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(item.color)}`}>
                            <h4 className="font-semibold mb-2">At Terumo Penpol:</h4>
                            <p className="text-sm">{item.terumoExample}</p>
                          </div>
                         
                         <div>
                           <h4 className="font-semibold text-gray-800 mb-2">More Examples:</h4>
                           <ul className="space-y-1">
                             {item.moreExamples.map((example, idx) => (
                               <li key={idx} className="text-sm text-gray-700 flex items-start">
                                 <span className="text-blue-500 mr-2">•</span>
                                 {example}
                               </li>
                             ))}
                           </ul>
                         </div>
                        </div>
                      )}
                      
                      {!isSelected && (
                        <div className="text-center py-4">
                          <p className="text-gray-500 text-sm">Click to explore this step</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* The Ladder Concept */}
      {revealedSpectrum.length >= 2 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Think of it as a Ladder</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Database className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-600">Digitization</h3>
              <p className="text-sm text-gray-600">Data Conversion</p>
            </div>
            
            <ArrowRight className="w-8 h-8 text-gray-400" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Cog className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="font-semibold text-orange-600">Digitalization</h3>
              <p className="text-sm text-gray-600">Process Improvement</p>
            </div>
            
            <ArrowRight className="w-8 h-8 text-gray-400" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Factory className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="font-semibold text-red-600">Digital Transformation</h3>
              <p className="text-sm text-gray-600">Organizational Change</p>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">Why This Matters for Industry 4.0:</h3>
            <p className="text-sm text-blue-800">
              Industry 4.0 (the era) and Smart Manufacturing (what we do) encompass all three levels. For example, deploying IoT sensors is partly digitization (collecting data), 
              using analytics on that sensor data to optimize processes is digitalization, and if we revamp our whole production management to be data-driven with cultural change, 
              that's digital transformation. Understanding these levels helps set the right expectations for our Industry 4.0 journey.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Question */}
      {revealedSpectrum.length >= 1 && (
        <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">💭 Think About This:</h3>
          <p className="text-yellow-700 mb-4">
            "Have you felt any instances in our current workflow where having more real-time information or automation could have helped?"
          </p>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700 italic">
              Example: "Last week a mixing machine overheated unexpectedly. If it had an automatic alert or shutoff, that would help." 
              Those are exactly the kind of issues that Smart Manufacturing (in the Industry 4.0 era) aims to address with connected, intelligent systems.
            </p>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {revealedConcepts.length >= 2 && revealedSpectrum.length >= 3 && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent! You've mastered the key terminology</h3>
          <p className="text-green-700 mb-4">Now you have a solid foundation to understand how we got to Industry 4.0</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Continue to Evolution
          </button>
        </div>
      )}
    </div>
  );
};

export default BuzzwordsSection;