import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, DollarSign, Users, Cog, Target, Shield, Database, Zap } from 'lucide-react';

interface RoadmapSectionProps {
  onComplete: () => void;
}

const roadmapSteps = [
  {
    id: 1,
    title: "Assess Digital Maturity",
    icon: Target,
    color: "blue",
    description: "Begin with a candid assessment of our current state",
    details: {
      overview: "Inventory existing machinery, control systems, IT infrastructure, and workforce digital skills. Determine our 'digital maturity' level across various departments.",
      keyActivities: [
        "Inventory existing machinery and control systems",
        "Assess IT infrastructure capabilities",
        "Evaluate workforce digital skills",
        "Identify current paper-based vs digital processes",
        "Determine sensor-capable equipment"
      ],
      frameworks: [
        "PwC Digital IQ assessment",
        "Acatech maturity index",
        "Custom Terumo assessment matrix"
      ],
      outcome: "Clear baseline understanding of where we are today to set realistic targets"
    }
  },
  {
    id: 2,
    title: "Define Vision & Objectives",
    icon: Target,
    color: "purple",
    description: "Establish clear vision aligned to business strategy",
    details: {
      overview: "Establish a clear vision of what Terumo Penpol aims to achieve with Industry 4.0, aligned to our business strategy.",
      keyActivities: [
        "Define strategic objectives (capacity, quality, compliance)",
        "Align with business strategy and goals",
        "Secure leadership buy-in and sponsorship",
        "Set measurable targets and KPIs",
        "Communicate vision across organization"
      ],
      examples: [
        "Double production capacity",
        "Achieve Six-Sigma quality levels",
        "Improve supply chain traceability",
        "Reduce operational costs by 20%"
      ],
      outcome: "Clear 'north star' objectives to guide all decision-making"
    }
  },
  {
    id: 3,
    title: "Prioritize Use Cases",
    icon: CheckCircle,
    color: "green",
    description: "Brainstorm and prioritize potential Industry 4.0 projects",
    details: {
      overview: "Brainstorm potential Industry 4.0 projects and prioritize based on impact and feasibility.",
      keyActivities: [
        "Brainstorm potential I4.0 projects",
        "Assess impact vs feasibility matrix",
        "Select high-impact, low-complexity pilots",
        "Define clear ROI expectations",
        "Address pressing pain points first"
      ],
      quickWins: [
        "IoT sensor monitoring project",
        "Machine vision QC station",
        "Digital work instructions",
        "Basic dashboard implementation"
      ],
      outcome: "Focused approach tackling most value-adding projects first"
    }
  },
  {
    id: 4,
    title: "Invest in Data Infrastructure",
    icon: Database,
    color: "orange",
    description: "Build robust data and network infrastructure foundation",
    details: {
      overview: "Plan for connectivity, data storage, compute capabilities, and cybersecurity measures.",
      keyActivities: [
        "Deploy industrial Wi-Fi/wired networks",
        "Set up data storage and compute infrastructure",
        "Implement cybersecurity measures",
        "Deploy IIoT gateways for legacy machines",
        "Adopt standard protocols (OPC UA)"
      ],
      infrastructure: [
        "MES/SCADA platform selection",
        "ERP integration planning",
        "Database and middleware setup",
        "Cloud or on-premise servers",
        "Network security implementation"
      ],
      outcome: "Agile IT infrastructure backbone for all I4.0 elements"
    }
  },
  {
    id: 5,
    title: "Pilot & Scale",
    icon: Zap,
    color: "red",
    description: "Implement controlled pilots then scale successful ones",
    details: {
      overview: "Implement chosen pilot projects in controlled scope, monitor results, and scale successful initiatives.",
      keyActivities: [
        "Implement pilot projects (e.g., one extruder with sensors)",
        "Set and monitor KPIs (downtime reduction, defect improvement)",
        "Document lessons learned",
        "Validate proof-of-concept and value",
        "Develop scaling plans for successful pilots"
      ],
      examples: [
        "Outfit one extruder with sensors and dashboard",
        "Implement one automated visual inspection station",
        "Deploy predictive maintenance on critical equipment",
        "Test digital twin on single production line"
      ],
      outcome: "Validated solutions ready for broader deployment"
    }
  },
  {
    id: 6,
    title: "Change Management & Training",
    icon: Users,
    color: "teal",
    description: "Proactive people-focused transformation management",
    details: {
      overview: "Recognize that technology is only part of transformation - people are the other critical part.",
      keyActivities: [
        "Communicate early and often about changes",
        "Provide comprehensive training programs",
        "Upskill staff on new digital tools",
        "Identify and address skill gaps",
        "Involve frontline operators as ambassadors"
      ],
      training: [
        "IoT dashboard interpretation workshops",
        "New HMI/SCADA system training",
        "Data analysis basics",
        "Digital tool proficiency",
        "Continuous learning culture development"
      ],
      outcome: "Empowered workforce that embraces digital transformation"
    }
  },
  {
    id: 7,
    title: "Partnerships & Ecosystem",
    icon: Users,
    color: "indigo",
    description: "Leverage external partnerships to accelerate implementation",
    details: {
      overview: "Don't go it alone - leverage external partnerships to accelerate learning and implementation.",
      keyActivities: [
        "Partner with technology providers",
        "Collaborate with universities/innovation labs",
        "Participate in industry forums",
        "Build supplier/customer integrations",
        "Access expert advice and research grants"
      ],
      partnerships: [
        "Sensor vendors and automation providers",
        "Local universities for research projects",
        "Industry 4.0 consortia and forums",
        "System integrators and consultants",
        "Government innovation programs"
      ],
      outcome: "Access to latest innovations and comprehensive solutions"
    }
  },
  {
    id: 8,
    title: "Continuous Improvement",
    icon: Cog,
    color: "pink",
    description: "Establish ongoing journey of digital evolution",
    details: {
      overview: "Industry 4.0 adoption is not one-and-done - it's an ongoing journey of continuous improvement.",
      keyActivities: [
        "Review and learn from each implementation",
        "Establish performance tracking metrics",
        "Stay current with emerging technologies",
        "Foster innovation mindset",
        "Regular pilot experiments"
      ],
      metrics: [
        "Out-of-spec incident reduction",
        "Predictive maintenance cost savings",
        "Overall equipment effectiveness (OEE)",
        "Quality improvement percentages",
        "ROI tracking and validation"
      ],
      outcome: "Culture of continuous digital innovation and adaptation"
    }
  }
];

const barriers = [
  {
    id: 1,
    title: "Legacy Equipment Constraints",
    icon: Cog,
    color: "red",
    challenge: "Much of our factory equipment might be older and not 'smart' out of the box - lacking built-in sensors or network connectivity. Replacing all legacy machines is often impractical due to cost.",
    solutions: [
      "Retrofit existing equipment with sensors and IoT connectivity",
      "Use external sensors and PLC add-ons for data collection",
      "Implement IoT gateways for older machinery",
      "Use middleware or protocol converters for communication",
      "Extend life of reliable old machines while gaining digital insights"
    ],
    example: "Attach vibration and temperature sensors to an old hydraulic press and use an IoT gateway to send data to our network."
  },
  {
    id: 2,
    title: "Data Silos and Integration",
    icon: Database,
    color: "orange",
    challenge: "Different systems and departments store data separately, resulting in data silos. Lack of interoperability between IT systems and shop-floor devices is common.",
    solutions: [
      "Invest in unified data platform or integration software",
      "Adopt common standards (OPC-UA, MQTT protocols)",
      "Introduce IIoT platform or MES as centralized hub",
      "Standardize data formats and interfaces",
      "Enable seamless data flow across disconnected systems"
    ],
    example: "Quality module automatically grabs process parameters from production logs, maintenance systems use production data for analytics."
  },
  {
    id: 3,
    title: "Skill Gaps in Workforce",
    icon: Users,
    color: "yellow",
    challenge: "Advanced tech requires new skills our workforce may not possess. Shortages in data analysis, IT/OT convergence, robotics programming. Worker fears about job security.",
    solutions: [
      "Upskill and reskill existing employees",
      "Provide training on digital tools and data interpretation",
      "Set up Industry 4.0 champion teams",
      "Strategic hiring of new talent or consultants",
      "Communicate augmentation vs replacement goals"
    ],
    example: "Form cross-functional innovation teams, move staff to higher-value roles overseeing automated systems and improvement initiatives."
  },
  {
    id: 4,
    title: "Cybersecurity and Compliance",
    icon: Shield,
    color: "blue",
    challenge: "Greater connectivity opens cybersecurity risks. Hacked sensors or networks could disrupt production. Digital data handling must comply with regulations.",
    solutions: [
      "Adopt robust cybersecurity strategy from outset",
      "Implement firewalls, network segmentation, encryption",
      "Regular security patches and access controls",
      "Cybersecurity training for employees",
      "Maintain audit trails and compliance standards"
    ],
    example: "Secure IoT device configuration, ISO standards compliance, 21 CFR Part 11 for electronic records, regular penetration testing."
  },
  {
    id: 5,
    title: "Change Resistance",
    icon: AlertTriangle,
    color: "purple",
    challenge: "Employees and managers may resist changes to established processes. Fear of unknown, job threats, or initiative fatigue. Lack of digital culture stalls projects.",
    solutions: [
      "Involve employees early in system selection",
      "Clearly communicate the 'why' of each change",
      "Provide adequate training and transition time",
      "Show quick wins and celebrate successes",
      "Leadership visible support and open communication"
    ],
    example: "Get operator input on interface design, highlight teams involved in successful pilots, address concerns openly."
  },
  {
    id: 6,
    title: "High Initial Costs & ROI Justification",
    icon: DollarSign,
    color: "green",
    challenge: "Significant upfront investment in hardware, software, training. Difficult to justify costs without proven ROI. Risk of pilot projects stalling in 'pilot purgatory'.",
    solutions: [
      "Use phased approach with ROI checkpoints",
      "Start with small-scale, lower-investment pilots",
      "Measure outcomes rigorously and build business case",
      "Consider OpEx models (leasing, cloud services)",
      "Include qualitative benefits in proposals"
    ],
    example: "Government grants for digital adoption, spreading costs over time, showing value at each step to maintain management support."
  }
];

const actionItems = [
  {
    category: "Immediate (Next 2 weeks)",
    color: "red",
    items: [
      "Form Industry 4.0 steering committee",
      "Conduct detailed current state assessment",
      "Identify pilot area for Phase 1 implementation",
      "Begin vendor evaluation for IoT sensors"
    ]
  },
  {
    category: "Short Term", 
    color: "orange",
    items: [
      "Develop detailed Phase 1 project plan",
      "Secure budget approval for Phase 1",
      "Begin staff training on digital technologies",
      "Establish baseline KPIs for measurement"
    ]
  },
  {
    category: "Medium Term",
    color: "blue", 
    items: [
      "Complete Phase 1 IoT sensor deployment",
      "Implement data collection and basic analytics",
      "Start Phase 2 planning and vendor selection",
      "Measure and communicate Phase 1 results"
    ]
  }
];

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ onComplete }) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedBarrier, setSelectedBarrier] = useState<number | null>(null);
  const [exploredSteps, setExploredSteps] = useState<number[]>([]);
  const [exploredBarriers, setExploredBarriers] = useState<number[]>([]);

  const handleStepClick = (id: number) => {
    setSelectedStep(selectedStep === id ? null : id);
    if (!exploredSteps.includes(id)) {
      setExploredSteps([...exploredSteps, id]);
    }
  };

  const handleBarrierClick = (id: number) => {
    setSelectedBarrier(selectedBarrier === id ? null : id);
    if (!exploredBarriers.includes(id)) {
      setExploredBarriers([...exploredBarriers, id]);
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
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800'
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
      pink: 'text-pink-600',
      yellow: 'text-yellow-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Roadmap & Challenges</h1>
        <p className="text-gray-600">Strategic adoption roadmap and overcoming implementation barriers</p>
      </div>

      {/* Section A: Creating an Adoption Roadmap */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">A. Creating an Adoption Roadmap</h2>
        <p className="text-center text-gray-600 mb-8">
          Implementing Industry 4.0 is a strategic journey. Here's a roadmap tailored for Terumo Penpol to adopt these technologies step by step.
        </p>
        
        <div className="space-y-6">
          {roadmapSteps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedStep === step.id;
            const isExplored = exploredSteps.includes(step.id);
            const isLast = index === roadmapSteps.length - 1;
            
            return (
              <div key={step.id} className="relative">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gray-300"></div>
                )}
                
                {/* Step Card */}
                <div
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-102 ${
                    isSelected ? 'ring-2 ring-pink-400' : ''
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
                    <div className="flex-1 bg-gray-50 rounded-xl p-6">
                      <div className="flex flex-wrap items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <div className="flex space-x-4 text-sm text-gray-600">
                          <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">Step {step.id}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      
                      {isSelected && (
                        <div className="space-y-6 animate-fadeIn">
                          {/* Overview */}
                          <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(step.color)}`}>
                            <h4 className="font-semibold mb-2">Overview:</h4>
                            <p className="text-sm">{step.details.overview}</p>
                          </div>
                          
                          {/* Key Activities */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Activities:</h4>
                            <div className="grid md:grid-cols-2 gap-2">
                              {step.details.keyActivities.map((activity, idx) => (
                                <div key={idx} className="text-sm text-gray-700 flex items-start bg-white p-3 rounded border border-gray-100">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {activity}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Additional Details */}
                          {step.details.frameworks && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Assessment Frameworks:</h4>
                              <div className="flex flex-wrap gap-2">
                                {step.details.frameworks.map((framework, idx) => (
                                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {framework}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.examples && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Example Objectives:</h4>
                              <div className="flex flex-wrap gap-2">
                                {step.details.examples.map((example, idx) => (
                                  <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.quickWins && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Quick Win Examples:</h4>
                              <div className="flex flex-wrap gap-2">
                                {step.details.quickWins.map((win, idx) => (
                                  <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                    {win}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.infrastructure && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Infrastructure Components:</h4>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.details.infrastructure.map((component, idx) => (
                                  <div key={idx} className="text-sm text-gray-700 flex items-start bg-orange-50 p-2 rounded">
                                    <Database className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                    {component}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.training && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Training Programs:</h4>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.details.training.map((program, idx) => (
                                  <div key={idx} className="text-sm text-gray-700 flex items-start bg-teal-50 p-2 rounded">
                                    <Users className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                                    {program}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.partnerships && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Partnership Opportunities:</h4>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.details.partnerships.map((partnership, idx) => (
                                  <div key={idx} className="text-sm text-gray-700 flex items-start bg-indigo-50 p-2 rounded">
                                    <Users className="w-4 h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                                    {partnership}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.metrics && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Key Metrics to Track:</h4>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.details.metrics.map((metric, idx) => (
                                  <div key={idx} className="text-sm text-gray-700 flex items-start bg-pink-50 p-2 rounded">
                                    <Target className="w-4 h-4 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                                    {metric}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Expected Outcome */}
                          <div className="bg-gray-100 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Expected Outcome:</h4>
                            <p className="text-sm text-gray-700 italic">{step.details.outcome}</p>
                          </div>
                        </div>
                      )}
                      
                      {!isSelected && (
                        <div className="text-center py-4">
                          <p className="text-gray-500 text-sm">Click to explore step details</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership Commitment Note */}
      {exploredSteps.length >= 4 && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white animate-fadeIn">
          <h3 className="text-xl font-bold text-center mb-4">Critical Success Factor</h3>
          <p className="text-center text-lg opacity-90 mb-4">
            Throughout this roadmap, leadership commitment and clear strategic alignment are crucial.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Leadership Requirements</h4>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Management backing with resources and resolve</li>
                <li>• Clear strategic vision communication</li>
                <li>• Long-term commitment to transformation</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Cultural Transformation</h4>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Involve workforce at every step</li>
                <li>• Turn resistance into collective movement</li>
                <li>• Industry 4.0 is as much culture as technology</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Section B: Common Barriers & Solutions */}
      {exploredSteps.length >= 6 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">B. Common Barriers & How to Overcome Them</h2>
          <p className="text-center text-gray-600 mb-8">
            While crafting the roadmap, we must be mindful of typical challenges and plan ways to overcome them.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {barriers.map((barrier) => {
              const Icon = barrier.icon;
              const isSelected = selectedBarrier === barrier.id;
              const isExplored = exploredBarriers.includes(barrier.id);
              
              return (
                <div
                  key={barrier.id}
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    isSelected ? 'ring-2 ring-red-400' : ''
                  }`}
                  onClick={() => handleBarrierClick(barrier.id)}
                >
                  <div className="border border-gray-200 rounded-xl p-6 h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isExplored ? 'bg-green-100' : `bg-${barrier.color}-100`
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isExplored ? 'text-green-600' : getIconColor(barrier.color)
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{barrier.title}</h3>
                        {isExplored && <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>}
                      </div>
                    </div>
                    
                    {isSelected ? (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <h4 className="font-semibold text-red-800 mb-2">Challenge:</h4>
                          <p className="text-sm text-red-700">{barrier.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Solutions:</h4>
                          <ul className="space-y-2">
                            {barrier.solutions.map((solution, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                          <h4 className="font-semibold text-blue-800 mb-2">Example:</h4>
                          <p className="text-sm text-blue-700">{barrier.example}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600 mb-3">
                          {barrier.challenge.substring(0, 100)}...
                        </p>
                        <p className="text-xs text-gray-500">Click to see solutions</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      {exploredSteps.length >= 6 && exploredBarriers.length >= 3 && (
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg p-8 text-white animate-fadeIn">
          <h2 className="text-2xl font-bold text-center mb-6">Key Takeaways</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Strategic Approach</h3>
              <p className="text-sm opacity-90">8-step roadmap from assessment to continuous improvement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Barrier Mitigation</h3>
              <p className="text-sm opacity-90">Proactive solutions for common implementation challenges</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">People-Centric</h3>
              <p className="text-sm opacity-90">Technology and culture transformation go hand in hand</p>
            </div>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {exploredSteps.length >= 6 && exploredBarriers.length >= 4 && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent! You have a comprehensive roadmap and barrier mitigation strategy</h3>
          <p className="text-green-700 mb-4">Ready to wrap up and discuss next steps</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Workshop Wrap-Up
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapSection;