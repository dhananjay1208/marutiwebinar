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
    industry4Opportunities: [
      {
        technology: "IoT Sensors",
        application: "Automated inventory tracking with weight sensors, RFID tags, and smart shelving for steel coils and components",
        benefit: "Real-time inventory visibility, automated stock alerts, elimination of physical counts, reduced stockouts by 60%"
      },
      {
        technology: "Big Data Analytics",
        application: "Predictive material consumption analysis linking production schedules to raw material needs with supplier lead time optimization",
        benefit: "Optimized inventory levels reducing working capital by 25%, improved supplier performance metrics, prevention of production delays"
      },
      {
        technology: "Mobile Apps",
        application: "Mobile scanning for material receiving with photo documentation, quality checks, and digital gate pass management",
        benefit: "Paperless receiving process, faster material verification, instant quality issue flagging, complete traceability from supplier to line"
      },
      {
        technology: "Computer Vision",
        application: "Automated inspection of incoming steel coils for surface defects, dimensional verification, and grade identification",
        benefit: "100% incoming inspection without delays, early detection of material quality issues, reduced production rejections"
      },
      {
        technology: "Blockchain",
        application: "Immutable tracking of material certificates, heat numbers, and quality documentation across supply chain",
        benefit: "Complete material traceability for recalls, compliance proof, supplier accountability, quality audit efficiency"
      },
      {
        technology: "Automated Guided Vehicles",
        application: "AGVs for automated steel coil transportation from warehouse to stamping presses based on production schedule",
        benefit: "Reduced material handling time, improved safety, optimized warehouse space utilization, just-in-time delivery to production"
      }
    ]
  },
  {
    id: 2,
    title: "Body Shop - Stamping & Welding",
    icon: Settings,
    description: "Metal stamping operations and robotic welding processes",
    industry4Opportunities: [
      {
        technology: "IoT Sensors",
        application: "Real-time monitoring of press tonnage, slide position, die temperature, and weld current/voltage with millisecond-level data capture",
        benefit: "Consistent part quality with ±0.1mm tolerance, early detection of die wear before defects occur, 40% reduction in scrap rates"
      },
      {
        technology: "AI/ML",
        application: "Predictive maintenance using vibration analysis, thermal imaging, and acoustic sensors to predict stamping die failures and weld gun degradation",
        benefit: "Reduced unplanned downtime by 70%, optimized die maintenance schedules, 30% improvement in OEE, cost savings on premature die changes"
      },
      {
        technology: "Digital Twin",
        application: "Virtual model simulating metal flow in stamping, springback prediction, and weld pattern optimization before physical production",
        benefit: "Process improvement without disrupting production, virtual tryouts saving weeks of setup time, reduced new model launch defects by 50%"
      },
      {
        technology: "Computer Vision",
        application: "Automated 100% inspection of stamped parts for cracks, tears, and dimensional accuracy with 3D scanning technology",
        benefit: "Zero-defect forwarding to next process, immediate feedback for die adjustment, elimination of manual inspection subjectivity"
      },
      {
        technology: "Robotics",
        application: "Collaborative robots for in-line weld inspection, part handling between presses, and adaptive weld path correction",
        benefit: "Improved weld consistency, reduced operator ergonomic strain, flexible redeployment for new models, 24/7 operation capability"
      },
      {
        technology: "Edge Computing",
        application: "Local processing of sensor data for instant press shutdown on anomalies and real-time weld quality assessment",
        benefit: "Sub-second response to prevent die damage, reduced data transmission costs, continued operation during network issues"
      }
    ]
  },
  {
    id: 3,
    title: "Paint Shop Operations",
    icon: Factory,
    description: "Surface treatment, painting, and coating processes",
    industry4Opportunities: [
      {
        technology: "Computer Vision",
        application: "AI-powered automated defect detection identifying orange peel, runs, dirt particles, and color mismatch with micron-level precision",
        benefit: "100% inspection replacing manual spotters, 60% reduction in final inspection rework, consistent quality across all shifts, defect root cause analysis"
      },
      {
        technology: "Robotics",
        application: "Intelligent robotic spray systems with adaptive path planning, automatic flow adjustment, and multi-color capability without manual changeover",
        benefit: "Optimal paint thickness uniformity, 30% reduction in paint consumption, 50% faster color changeover, consistent finish quality, reduced VOC emissions"
      },
      {
        technology: "IoT Sensors",
        application: "Continuous monitoring of booth temperature, humidity, air velocity, paint viscosity, and particulate levels with automated HVAC adjustment",
        benefit: "Optimal painting conditions 24/7, 45% reduction in climate-related defects, automated compliance reporting, energy optimization, predictive booth maintenance"
      },
      {
        technology: "Digital Twin",
        application: "Virtual paint booth simulation for testing new paint formulations, robot programs, and airflow patterns before physical application",
        benefit: "Reduced trial-and-error iterations, new color launch time cut by 40%, optimized booth performance, training without production loss"
      },
      {
        technology: "AI/ML",
        application: "Predictive quality models correlating booth conditions, paint batch properties, and application parameters to final finish quality",
        benefit: "Proactive adjustment preventing defects before they occur, optimized process parameters for each paint type, reduced customer complaints by 55%"
      },
      {
        technology: "MES Integration",
        application: "Real-time tracking of vehicles through paint shop with color scheduling optimization and automatic paint kitchen preparation",
        benefit: "Reduced color grouping inefficiencies, just-in-time paint mixing reducing waste, complete traceability linking paint batch to VIN, improved throughput"
      }
    ]
  },
  {
    id: 4,
    title: "Engine & Transmission Assembly",
    icon: Cog,
    description: "Powertrain assembly and testing operations",
    industry4Opportunities: [
      {
        technology: "Robotics",
        application: "Collaborative robots for precision torque application, heavy component lifting, and complex sub-assembly operations with force-sensing",
        benefit: "Consistent torque accuracy eliminating over/under-tightening, reduced operator musculoskeletal injuries by 80%, improved cycle time, flexible redeployment"
      },
      {
        technology: "Computer Vision",
        application: "Automated verification of correct parts, assembly sequence, torque validation, and gasket positioning with multi-camera inspection stations",
        benefit: "Zero-defect assembly preventing field failures, immediate feedback before next operation, complete digital twin of every engine, elimination of missed operations"
      },
      {
        technology: "AR Technology",
        application: "AR smart glasses providing step-by-step assembly guidance, torque specifications, and real-time quality alerts with hands-free operation",
        benefit: "50% reduction in training time for new operators, near-zero assembly errors, faster troubleshooting with remote expert support, easy adaptation to new models"
      },
      {
        technology: "IoT Sensors",
        application: "Smart torque tools transmitting actual torque values, angle measurements, and assembly sequence data linked to engine serial number",
        benefit: "Complete assembly traceability for warranty claims, automatic documentation eliminating manual recording, prevention of tool-related quality issues, audit trail"
      },
      {
        technology: "AI/ML",
        application: "Predictive models analyzing assembly data to identify potential quality issues before hot testing and predict warranty failures",
        benefit: "Early detection of assembly anomalies, optimized testing parameters, reduced warranty costs by 35%, continuous process improvement insights"
      },
      {
        technology: "Digital Work Instructions",
        application: "Interactive digital displays at each workstation with dynamic instructions adapting to engine variant, error-proofing, and immediate updates",
        benefit: "Elimination of paper-based confusion, instant engineering change implementation, multi-language support, reduced wrong-part assembly by 90%"
      }
    ]
  },
  {
    id: 5,
    title: "Final Assembly Line",
    icon: Car,
    description: "Complete vehicle assembly and integration",
    industry4Opportunities: [
      {
        technology: "IoT Sensors",
        application: "Real-time tracking of each vehicle position, takt time adherence, quality gate results, and andon alerts with digital dashboard visibility",
        benefit: "Improved line balancing with 95%+ takt time adherence, immediate quality feedback preventing defect forwarding, full VIN-level traceability, proactive bottleneck resolution"
      },
      {
        technology: "Robotics",
        application: "Automated windshield installation, precise dashboard mounting, seat installation, and collaborative tire mounting with quality verification",
        benefit: "Consistent installation quality, 70% reduction in ergonomic injuries, improved safety, precise positioning eliminating rework, flexible multi-model capability"
      },
      {
        technology: "Big Data Analytics",
        application: "Real-time analysis of cycle times, downtime reasons, operator efficiency, and quality correlation with predictive bottleneck alerts",
        benefit: "Optimized production flow increasing output by 12%, reduced cycle time through waste elimination, data-driven continuous improvement, proactive capacity planning"
      },
      {
        technology: "Computer Vision",
        application: "Automated verification of component fitment, VIN matching to build specification, and completeness checking at each major station",
        benefit: "Zero wrong-variant assembly, elimination of missing parts reaching customers, instant detection of fitment issues, reduced final inspection time by 40%"
      },
      {
        technology: "Andon System 4.0",
        application: "Intelligent andon with automatic escalation, mobile alerts to supervisors, AI-suggested solutions based on historical data, and predictive issue flagging",
        benefit: "Faster problem resolution reducing line stops by 50%, automated root cause capture, knowledge sharing across shifts, predictive alerts before line stop"
      },
      {
        technology: "AGV/AMR",
        application: "Autonomous mobile robots delivering parts to line-side based on real-time consumption with route optimization and auto-replenishment",
        benefit: "Just-in-time parts delivery eliminating line-side inventory, reduced material handling labor by 60%, optimized floor space utilization, flexible routing for new models"
      }
    ]
  },
  {
    id: 6,
    title: "Quality Testing & Logistics",
    icon: Wrench,
    description: "Final testing, inspection, and vehicle dispatch",
    industry4Opportunities: [
      {
        technology: "Automated Testing",
        application: "Automated brake dynamometer testing, laser wheel alignment, emission analysis, headlight aim, and water leak testing with automatic documentation",
        benefit: "Consistent test results with ±1% accuracy, 60% reduction in testing time, improved safety compliance, elimination of human error, complete test records"
      },
      {
        technology: "IoT/RFID",
        application: "Real-time vehicle tracking from line-off to dealer delivery with GPS, geofencing, condition monitoring, and automated milestone updates",
        benefit: "Real-time vehicle location for customer queries, damage prevention through driving behavior monitoring, optimized yard management, reduced search time by 90%"
      },
      {
        technology: "Big Data Analytics",
        application: "Correlation analysis of quality data with production variables, warranty prediction models, and logistics route optimization with cost analytics",
        benefit: "Predictive quality insights enabling upstream corrections, 25% reduction in warranty costs, optimized delivery routes saving fuel costs, improved dealer satisfaction"
      },
      {
        technology: "Computer Vision",
        application: "360-degree automated exterior inspection documenting pre-existing conditions, paint quality verification, and fitment assessment with AI comparison to CAD",
        benefit: "100% documentation protecting against false damage claims, objective quality assessment, reduced inspection time by 75%, early detection of systematic issues"
      },
      {
        technology: "AI/ML",
        application: "Predictive models identifying vehicles likely to have issues based on production anomalies with intelligent sampling recommendations",
        benefit: "Risk-based quality auditing focusing resources on high-risk units, early detection of quality trends, reduced customer complaints by 40%, optimized audit efficiency"
      },
      {
        technology: "Blockchain",
        application: "Immutable digital birth certificate recording all production data, quality tests, and logistics events accessible to dealers and customers",
        benefit: "Complete vehicle history for resale value, fraud prevention, instant compliance proof, enhanced customer trust, streamlined warranty claims"
      },
      {
        technology: "Digital Twin",
        application: "Digital replica of each vehicle maintaining all production, quality, and service data throughout vehicle lifecycle with predictive maintenance",
        benefit: "Proactive service recommendations, optimized recall targeting, continuous product improvement feedback, enhanced customer experience, valuable data asset"
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
      'IoT/RFID': 'bg-cyan-100 text-cyan-800',
      'Blockchain': 'bg-yellow-100 text-yellow-800',
      'Automated Guided Vehicles': 'bg-indigo-100 text-indigo-800',
      'Edge Computing': 'bg-teal-100 text-teal-800',
      'MES Integration': 'bg-lime-100 text-lime-800',
      'Digital Work Instructions': 'bg-rose-100 text-rose-800',
      'Andon System 4.0': 'bg-amber-100 text-amber-800',
      'AGV/AMR': 'bg-indigo-100 text-indigo-800',
      'Automated Testing': 'bg-emerald-100 text-emerald-800'
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