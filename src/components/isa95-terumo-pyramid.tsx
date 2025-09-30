import React, { useState, useEffect } from 'react';
import { 
  Server, Database, Monitor, Cpu, Thermometer, Gauge, Zap, 
  Factory, BarChart3, Users, FileText, DollarSign, TrendingUp,
  ArrowUp, ArrowDown, Play, Pause, Settings, Eye, Wifi,
  Activity, Shield, Package, Wrench, Calendar, Target,
  ChevronRight, Info, CheckCircle, AlertTriangle, Circle
} from 'lucide-react';

const ISA95TerumoDemo = () => {
  const [selectedLevel, setSelectedLevel] = useState(4);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [animationRunning, setAnimationRunning] = useState(true);
  const [currentScenario, setCurrentScenario] = useState('normal');

  // ISA-95 Level Definitions for Terumo
  const levels = {
    4: {
      title: "Level 4: Business Planning & Logistics",
      subtitle: "Enterprise Resource Planning (ERP)",
      color: "bg-purple-600",
      icon: DollarSign,
      description: "Strategic business planning, supply chain management, and enterprise-wide coordination",
      systems: [
        {
          name: "SAP S/4HANA ERP",
          function: "Enterprise Resource Planning",
          examples: [
            "Customer order management (Apollo Hospitals, NHS-UK)",
            "Supply chain planning for global distribution",
            "Financial reporting and cost accounting",
            "Raw material procurement (PVC resin, DEHP)",
            "Regulatory compliance management"
          ]
        },
        {
          name: "Business Intelligence",
          function: "Strategic Analytics",
          examples: [
            "Market demand forecasting",
            "Profitability analysis by product type",
            "Resource optimization planning",
            "Risk assessment and mitigation"
          ]
        }
      ],
      dataFlow: {
        receives: ["Production reports", "Quality metrics", "Equipment performance", "Inventory status"],
        sends: ["Production targets", "Resource allocation", "Budget constraints", "Strategic priorities"]
      },
      kpis: [
        { metric: "Revenue", value: "₹2.4B", trend: "up" },
        { metric: "Order Fulfillment", value: "96.8%", trend: "up" },
        { metric: "Inventory Turns", value: "12.3", trend: "down" },
        { metric: "Customer Satisfaction", value: "98.2%", trend: "up" }
      ]
    },
    3: {
      title: "Level 3: Manufacturing Operations Management",
      subtitle: "Manufacturing Execution System (MES)",
      color: "bg-blue-600",
      icon: Factory,
      description: "Production planning, scheduling, quality management, and manufacturing intelligence",
      systems: [
        {
          name: "Terumo MES",
          function: "Manufacturing Execution",
          examples: [
            "Work order management for blood bag production",
            "Real-time OEE monitoring across 5 production lines",
            "Quality control workflows and batch release",
            "Material genealogy and traceability",
            "Production scheduling optimization"
          ]
        },
        {
          name: "LIMS Integration",
          function: "Laboratory Information Management",
          examples: [
            "Automated test result import",
            "Certificate of Analysis generation",
            "Statistical Process Control (SPC)",
            "Biocompatibility test management"
          ]
        },
        {
          name: "Warehouse Management",
          function: "Inventory Control",
          examples: [
            "Raw material tracking (PVC, DEHP, CPD)",
            "Finished goods inventory",
            "Lot expiry management",
            "Automated reorder points"
          ]
        }
      ],
      dataFlow: {
        receives: ["Real-time production data", "Quality results", "Equipment status", "Operator inputs"],
        sends: ["Production schedules", "Quality specifications", "Resource assignments", "Performance reports"]
      },
      kpis: [
        { metric: "Overall OEE", value: "87.5%", trend: "up" },
        { metric: "First Pass Yield", value: "98.2%", trend: "up" },
        { metric: "On-Time Delivery", value: "96.8%", trend: "down" },
        { metric: "Schedule Adherence", value: "94.3%", trend: "up" }
      ]
    },
    2: {
      title: "Level 2: Supervisory Control",
      subtitle: "SCADA & Human Machine Interface (HMI)",
      color: "bg-green-600",
      icon: Monitor,
      description: "Real-time monitoring, operator interfaces, data collection, and production line supervision",
      systems: [
        {
          name: "Production Line SCADA",
          function: "Supervisory Control",
          examples: [
            "Real-time line monitoring dashboards",
            "Operator control panels for each line",
            "Alarm management and escalation",
            "Historical data trending",
            "Recipe management for different bag types"
          ]
        },
        {
          name: "Quality Control HMI",
          function: "Quality Monitoring",
          examples: [
            "SPC chart displays",
            "Test result entry screens",
            "Non-conformance tracking",
            "Batch approval workflows"
          ]
        },
        {
          name: "Maintenance HMI",
          function: "Equipment Monitoring",
          examples: [
            "Equipment health dashboards",
            "Predictive maintenance alerts",
            "Work order tracking screens",
            "Spare parts inventory displays"
          ]
        }
      ],
      dataFlow: {
        receives: ["Process variables", "Equipment status", "Control outputs", "Operator commands"],
        sends: ["Aggregated data", "Trend information", "Alarm notifications", "Production reports"]
      },
      kpis: [
        { metric: "System Availability", value: "99.2%", trend: "up" },
        { metric: "Alarm Rate", value: "3.2/hr", trend: "down" },
        { metric: "Response Time", value: "0.8s", trend: "up" },
        { metric: "Data Accuracy", value: "99.8%", trend: "up" }
      ]
    },
    1: {
      title: "Level 1: Basic Control",
      subtitle: "Programmable Logic Controllers (PLCs) & DCS",
      color: "bg-orange-600",
      icon: Cpu,
      description: "Automated control loops, safety systems, and direct process control",
      systems: [
        {
          name: "Extrusion Line PLC",
          function: "Process Control",
          examples: [
            "Temperature control loops (185±5°C)",
            "Pressure regulation (2.8±0.2 bar)",
            "Speed control for film production",
            "Safety interlocks and emergency stops",
            "Recipe-based parameter control"
          ]
        },
        {
          name: "Welding Control System",
          function: "Precision Control",
          examples: [
            "RF welding temperature control (298±10°C)",
            "Weld pressure optimization",
            "Cycle time management",
            "Quality feedback loops",
            "Servo motor positioning"
          ]
        },
        {
          name: "Sterilization DCS",
          function: "Critical Process Control",
          examples: [
            "Steam temperature control (121±2°C)",
            "Pressure vessel management",
            "Cycle time validation",
            "FDA compliance logging",
            "Safety system integration"
          ]
        }
      ],
      dataFlow: {
        receives: ["Sensor signals", "Setpoint commands", "Recipe parameters", "Safety signals"],
        sends: ["Control outputs", "Process data", "Status information", "Alarm signals"]
      },
      kpis: [
        { metric: "Control Loop Performance", value: "98.5%", trend: "up" },
        { metric: "Safety System Availability", value: "100%", trend: "stable" },
        { metric: "Response Time", value: "50ms", trend: "up" },
        { metric: "Process Stability", value: "σ=0.8", trend: "up" }
      ]
    },
    0: {
      title: "Level 0: Field Instrumentation",
      subtitle: "Sensors, Actuators & Field Devices",
      color: "bg-red-600",
      icon: Thermometer,
      description: "Physical sensors, actuators, and field devices that interface directly with the manufacturing process",
      systems: [
        {
          name: "Temperature Sensors",
          function: "Process Monitoring",
          examples: [
            "RTD sensors in extruder barrels (185°C)",
            "Thermocouple arrays in welding heads",
            "Steam temperature sensors in sterilizers",
            "Ambient temperature monitoring in cleanrooms",
            "IR sensors for non-contact measurement"
          ]
        },
        {
          name: "Pressure Instrumentation",
          function: "Pressure Control",
          examples: [
            "Hydraulic pressure transducers",
            "Pneumatic pressure sensors",
            "Vacuum sensors for material handling",
            "Steam pressure monitoring",
            "Differential pressure in cleanrooms"
          ]
        },
        {
          name: "Flow & Level Sensors",
          function: "Material Monitoring",
          examples: [
            "Anticoagulant flow meters",
            "Material level sensors in hoppers",
            "Compressed air flow monitoring",
            "Cooling water flow sensors",
            "Chemical dosing flow controllers"
          ]
        },
        {
          name: "Actuators & Motors",
          function: "Process Control",
          examples: [
            "Servo motors for precise positioning",
            "Pneumatic cylinders for clamping",
            "Electric heaters for temperature control",
            "Solenoid valves for fluid control",
            "Variable frequency drives for pumps"
          ]
        }
      ],
      dataFlow: {
        receives: ["Control signals", "Power supply", "Pneumatic/hydraulic power"],
        sends: ["Sensor readings", "Status feedback", "Alarm conditions", "Diagnostic data"]
      },
      kpis: [
        { metric: "Sensor Availability", value: "99.7%", trend: "up" },
        { metric: "Calibration Compliance", value: "100%", trend: "stable" },
        { metric: "Response Time", value: "10ms", trend: "up" },
        { metric: "Accuracy", value: "±0.1%", trend: "stable" }
      ]
    }
  };

  // Scenario-based data simulation
  const scenarios = {
    normal: {
      name: "Normal Operations",
      description: "All systems operating within normal parameters"
    },
    maintenance: {
      name: "Maintenance Event", 
      description: "Line 3 tube welder undergoing planned maintenance"
    },
    quality_issue: {
      name: "Quality Alert",
      description: "Leak test failure detected in batch BG240922003"
    },
    supply_delay: {
      name: "Supply Chain Issue",
      description: "Raw material delivery delay affecting production schedule"
    }
  };

  const dataFlowAnimation = showDataFlow ? "animate-pulse" : "";

  // Real-time data simulation
  useEffect(() => {
    if (!animationRunning) return;
    
    const interval = setInterval(() => {
      // Simulate real-time updates
    }, 2000);
    
    return () => clearInterval(interval);
  }, [animationRunning]);

  const PyramidLevel = ({ level, levelData, isSelected, onClick }) => {
    const IconComponent = levelData.icon;
    const width = `${60 + level * 15}%`;
    
    return (
      <div 
        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          isSelected ? 'z-10' : 'hover:z-10'
        }`}
        onClick={() => onClick(level)}
        style={{ width }}
      >
        <div className={`${levelData.color} ${isSelected ? 'ring-4 ring-yellow-400' : ''} 
          text-white p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
              <div>
                <h3 className="font-bold text-sm md:text-lg">{levelData.title}</h3>
                <p className="text-xs md:text-sm opacity-90">{levelData.subtitle}</p>
              </div>
            </div>
            <div className="text-2xl md:text-4xl font-bold opacity-50">
              {level}
            </div>
          </div>
          
          {isSelected && (
            <div className="mt-4 space-y-2">
              <p className="text-xs md:text-sm opacity-90">{levelData.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {levelData.kpis.map((kpi, index) => (
                  <div key={index} className="bg-white bg-opacity-20 rounded p-2">
                    <div className="text-xs opacity-75">{kpi.metric}</div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-sm">{kpi.value}</span>
                      {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-300" />}
                      {kpi.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-300" />}
                      {kpi.trend === 'stable' && <Circle className="w-3 h-3 text-yellow-300" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Data Flow Arrows */}
        {showDataFlow && level < 4 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <ArrowUp className={`w-6 h-6 text-blue-500 ${dataFlowAnimation}`} />
          </div>
        )}
        {showDataFlow && level > 0 && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <ArrowDown className={`w-6 h-6 text-green-500 ${dataFlowAnimation}`} />
          </div>
        )}
      </div>
    );
  };

  const DetailPanel = ({ levelData }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{levelData.title}</h2>
        <p className="text-gray-600 mt-2">{levelData.description}</p>
      </div>

      {/* Systems */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Systems & Functions</h3>
        <div className="space-y-4">
          {levelData.systems.map((system, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{system.name}</h4>
                <span className="text-sm text-gray-500">{system.function}</span>
              </div>
              <ul className="space-y-1">
                {system.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Data Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <ArrowDown className="w-4 h-4 mr-2" />
            Receives Data From:
          </h4>
          <ul className="space-y-1">
            {levelData.dataFlow.receives.map((item, index) => (
              <li key={index} className="text-sm text-blue-700">• {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <ArrowUp className="w-4 h-4 mr-2" />
            Sends Data To:
          </h4>
          <ul className="space-y-1">
            {levelData.dataFlow.sends.map((item, index) => (
              <li key={index} className="text-sm text-green-700">• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* KPIs */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {levelData.kpis.map((kpi, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">{kpi.metric}</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl font-bold text-gray-800">{kpi.value}</span>
                {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {kpi.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                {kpi.trend === 'stable' && <Circle className="w-4 h-4 text-yellow-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScenarioPanel = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Operational Scenarios</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setCurrentScenario(key)}
            className={`p-4 text-left rounded-lg border transition-colors ${
              currentScenario === key 
                ? 'bg-blue-50 border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="font-medium text-gray-900">{scenario.name}</div>
            <div className="text-sm text-gray-600 mt-1">{scenario.description}</div>
          </button>
        ))}
      </div>
      
      {/* Scenario Impact Visualization */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Current Scenario Impact:</h4>
        <p className="text-sm text-yellow-700">{scenarios[currentScenario].description}</p>
        
        {currentScenario === 'maintenance' && (
          <div className="mt-3 text-sm">
            <div className="text-red-600">• Level 0: Tube welder sensors offline</div>
            <div className="text-orange-600">• Level 1: PLC in maintenance mode</div>
            <div className="text-yellow-600">• Level 2: HMI showing maintenance status</div>
            <div className="text-blue-600">• Level 3: MES rescheduling production</div>
            <div className="text-purple-600">• Level 4: ERP updating delivery schedules</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">ISA-95 Automation Pyramid</h1>
              <p className="text-gray-600 mt-1">Terumo Blood Bag Manufacturing Integration Architecture</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowDataFlow(!showDataFlow)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showDataFlow ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Data Flow</span>
              </button>
              
              <button
                onClick={() => setAnimationRunning(!animationRunning)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  animationRunning ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {animationRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{animationRunning ? 'Live' : 'Paused'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pyramid Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Integration Architecture</h2>
                <p className="text-gray-600">Click on each level to explore systems and data flows</p>
              </div>
              
              <div className="space-y-4">
                {[4, 3, 2, 1, 0].map(level => (
                  <div key={level} className="flex justify-center">
                    <PyramidLevel
                      level={level}
                      levelData={levels[level]}
                      isSelected={selectedLevel === level}
                      onClick={setSelectedLevel}
                    />
                  </div>
                ))}
              </div>

              {/* Integration Overview */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Integration Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Real-time production visibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Automated quality control</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Predictive maintenance</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Regulatory compliance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Supply chain optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Enterprise-wide coordination</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <ScenarioPanel />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Connected Devices</span>
                  <span className="font-bold text-blue-600">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data Points/Second</span>
                  <span className="font-bold text-green-600">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Availability</span>
                  <span className="font-bold text-purple-600">99.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Integration Points</span>
                  <span className="font-bold text-orange-600">15</span>
                </div>
              </div>
            </div>

            {/* Data Flow Legend */}
            {showDataFlow && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Flow Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Upward Data Flow</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowDown className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Downward Control</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  Data flows upward for reporting and analysis, while control commands and setpoints flow downward for execution.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Level Information */}
        <div className="mt-8">
          <DetailPanel levelData={levels[selectedLevel]} />
        </div>

        {/* Manufacturing Process Context */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Blood Bag Manufacturing Process Context</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { stage: "PVC Extrusion", temp: "185°C", level: "0-2" },
              { stage: "Bag Forming", temp: "298°C", level: "0-2" },
              { stage: "Tube Welding", temp: "285°C", level: "0-2" },
              { stage: "Needle Assembly", temp: "Ambient", level: "1-2" },
              { stage: "Sterilization", temp: "121°C", level: "0-3" }
            ].map((stage, index) => (
              <div key={index} className="border rounded-lg p-4 text-center">
                <div className="font-medium text-gray-900">{stage.stage}</div>
                <div className="text-sm text-gray-600 mt-1">{stage.temp}</div>
                <div className="text-xs text-blue-600 mt-2">ISA Levels {stage.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISA95TerumoDemo;