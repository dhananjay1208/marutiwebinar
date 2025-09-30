import React, { useState, useEffect } from 'react';
import { 
  Cpu, Monitor, Factory, Server, Package, Wifi, Radio, 
  Smartphone, Network, Cloud, Brain, Zap, Eye, Bot,
  ArrowRight, ArrowDown, Play, Pause, Settings, Info,
  CheckCircle, AlertTriangle, Activity, Layers, Globe,
  Shield, Database, BarChart3, Wrench, Users, Target
} from 'lucide-react';

interface TechEcosystemSectionProps {
  onComplete: () => void;
}

const techComponents = {
  // Field Level
  plc: {
    name: 'PLC (Programmable Logic Controller)',
    category: 'Field Control',
    icon: Cpu,
    color: 'bg-blue-600',
    position: { x: 15, y: 75 },
    description: 'Controls stamping, welding, and paint shop processes',
    functions: ['Temperature Control', 'Pressure Regulation', 'Safety Interlocks', 'Process Automation'],
    marutiRole: 'Controls critical automotive manufacturing processes like spot welding parameters and paint booth temperature/humidity controls',
    connections: ['scada', 'iot_sensors', 'opc']
  },
  iot_sensors: {
    name: 'IIoT Sensors',
    category: 'Data Collection',
    icon: Radio,
    color: 'bg-green-600',
    position: { x: 5, y: 85 },
    description: 'Temperature, pressure, vibration, and quality sensors',
    functions: ['Real-time Monitoring', 'Data Collection', 'Predictive Analytics', 'Quality Control'],
    marutiRole: 'Monitor critical parameters across body shop welding stations, paint booths, and engine assembly lines',
    connections: ['iot_gateway', 'plc']
  },
  iot_gateway: {
    name: 'IoT Gateway',
    category: 'Edge Computing',
    icon: Wifi,
    color: 'bg-purple-600',
    position: { x: 25, y: 85 },
    description: 'Edge processing and protocol conversion',
    functions: ['Protocol Translation', 'Edge Analytics', 'Data Aggregation', 'Local Processing'],
    marutiRole: 'Aggregates sensor data from vehicle production lines and converts protocols for cloud connectivity',
    connections: ['iot_sensors', 'mqtt', 'cloud']
  },
  rfid: {
    name: 'RFID Systems',
    category: 'Identification',
    icon: Smartphone,
    color: 'bg-orange-600',
    position: { x: 35, y: 75 },
    description: 'Material tracking and identification',
    functions: ['Asset Tracking', 'Inventory Management', 'Traceability', 'Authentication'],
    marutiRole: 'Tracks steel coils, components, and finished vehicles throughout production',
    connections: ['wms', 'mes']
  },
  ble: {
    name: 'BLE Beacons',
    category: 'Location Services',
    icon: Radio,
    color: 'bg-cyan-600',
    position: { x: 45, y: 85 },
    description: 'Personnel and asset location tracking',
    functions: ['Indoor Positioning', 'Asset Location', 'Personnel Tracking', 'Proximity Detection'],
    marutiRole: 'Tracks equipment location, monitors personnel in production areas, and ensures safety compliance',
    connections: ['cloud', 'mes']
  },

  // Control Level
  scada: {
    name: 'SCADA System',
    category: 'Supervisory Control',
    icon: Monitor,
    color: 'bg-indigo-600',
    position: { x: 15, y: 55 },
    description: 'Human-machine interface and process visualization',
    functions: ['Process Monitoring', 'Operator Interface', 'Alarm Management', 'Historical Data'],
    marutiRole: 'Provides operators with real-time visibility into vehicle production processes',
    connections: ['plc', 'mes', 'opc']
  },
  opc: {
    name: 'OPC UA',
    category: 'Communication Protocol',
    icon: Network,
    color: 'bg-gray-600',
    position: { x: 25, y: 65 },
    description: 'Industrial communication standard',
    functions: ['Secure Communication', 'Interoperability', 'Data Modeling', 'Platform Independence'],
    marutiRole: 'Enables secure communication between PLCs, SCADA, and MES systems',
    connections: ['plc', 'scada', 'mes']
  },
  mqtt: {
    name: 'MQTT Broker',
    category: 'Message Protocol',
    icon: Activity,
    color: 'bg-teal-600',
    position: { x: 35, y: 55 },
    description: 'Lightweight messaging for IoT',
    functions: ['Publish/Subscribe', 'Real-time Messaging', 'Quality of Service', 'Retained Messages'],
    marutiRole: 'Facilitates real-time data exchange between IoT devices and cloud systems',
    connections: ['iot_gateway', 'cloud', 'mes']
  },

  // Operations Level
  mes: {
    name: 'MES (Manufacturing Execution System)',
    category: 'Production Management',
    icon: Factory,
    color: 'bg-blue-700',
    position: { x: 15, y: 35 },
    description: 'Production planning and execution',
    functions: ['Work Order Management', 'OEE Tracking', 'Quality Management', 'Batch Genealogy'],
    marutiRole: 'Manages vehicle production schedules, tracks build sequences, and ensures quality compliance',
    connections: ['scada', 'sap', 'wms', 'cloud']
  },
  wms: {
    name: 'WMS (Warehouse Management)',
    category: 'Inventory Control',
    icon: Package,
    color: 'bg-green-700',
    position: { x: 35, y: 35 },
    description: 'Inventory and material management',
    functions: ['Inventory Tracking', 'Material Flow', 'Lot Management', 'Expiry Control'],
    marutiRole: 'Manages raw materials (steel, engines, transmissions) and finished vehicle inventory with full traceability',
    connections: ['mes', 'sap', 'rfid']
  },

  // Enterprise Level
  sap: {
    name: 'SAP ERP',
    category: 'Enterprise Resource Planning',
    icon: Server,
    color: 'bg-purple-700',
    position: { x: 25, y: 15 },
    description: 'Business process management',
    functions: ['Order Management', 'Financial Control', 'Supply Chain', 'Customer Relations'],
    marutiRole: 'Manages customer orders from dealerships, financial planning, and global supply chain coordination',
    connections: ['mes', 'wms', 'cloud']
  },

  // Infrastructure Level
  cloud: {
    name: 'Cloud Platform',
    category: 'Computing Infrastructure',
    icon: Cloud,
    color: 'bg-sky-600',
    position: { x: 55, y: 25 },
    description: 'Scalable computing and storage',
    functions: ['Data Storage', 'Analytics', 'Machine Learning', 'Remote Access'],
    marutiRole: 'Provides scalable analytics, AI/ML capabilities, and remote monitoring for global operations',
    connections: ['ai', 'fiveg', 'mes', 'iot_gateway']
  },
  ai: {
    name: 'AI/ML Platform',
    category: 'Artificial Intelligence',
    icon: Brain,
    color: 'bg-pink-600',
    position: { x: 65, y: 35 },
    description: 'Machine learning and analytics',
    functions: ['Predictive Analytics', 'Quality Prediction', 'Optimization', 'Pattern Recognition'],
    marutiRole: 'Predicts equipment failures, optimizes production parameters, and detects quality anomalies',
    connections: ['cloud', 'mes']
  },
  fiveg: {
    name: '5G Infrastructure',
    category: 'Connectivity',
    icon: Zap,
    color: 'bg-red-600',
    position: { x: 75, y: 25 },
    description: 'Ultra-fast wireless connectivity',
    functions: ['Low Latency', 'High Bandwidth', 'Massive IoT', 'Edge Computing'],
    marutiRole: 'Enables real-time communication for AGVs, AR devices, and remote monitoring',
    connections: ['cloud', 'ar_devices', 'agv']
  },

  // Advanced Technologies
  ar_devices: {
    name: 'AR Devices',
    category: 'Augmented Reality',
    icon: Eye,
    color: 'bg-amber-600',
    position: { x: 65, y: 55 },
    description: 'Augmented reality for training and maintenance',
    functions: ['Visual Guidance', 'Remote Assistance', 'Training', 'Maintenance Support'],
    marutiRole: 'Guides operators through complex assembly procedures, provides remote expert assistance',
    connections: ['fiveg', 'cloud']
  },
  agv: {
    name: 'AGV/AMR',
    category: 'Autonomous Vehicles',
    icon: Bot,
    color: 'bg-emerald-600',
    position: { x: 75, y: 55 },
    description: 'Autonomous material transport',
    functions: ['Material Transport', 'Autonomous Navigation', 'Fleet Management', 'Safety Systems'],
    marutiRole: 'Transports components and finished vehicles between production areas autonomously',
    connections: ['fiveg', 'wms', 'mes']
  }
};

const dataFlows = [
  { from: 'iot_sensors', to: 'iot_gateway', type: 'sensor_data', color: '#10b981' },
  { from: 'iot_gateway', to: 'cloud', type: 'aggregated_data', color: '#3b82f6' },
  { from: 'plc', to: 'scada', type: 'process_data', color: '#6366f1' },
  { from: 'scada', to: 'mes', type: 'production_data', color: '#8b5cf6' },
  { from: 'mes', to: 'sap', type: 'business_data', color: '#a855f7' },
  { from: 'cloud', to: 'ai', type: 'analytics_data', color: '#ec4899' },
  { from: 'rfid', to: 'wms', type: 'tracking_data', color: '#f97316' },
  { from: 'wms', to: 'mes', type: 'inventory_data', color: '#22c55e' },
  { from: 'fiveg', to: 'ar_devices', type: 'connectivity', color: '#ef4444' },
  { from: 'fiveg', to: 'agv', type: 'control_signals', color: '#10b981' }
];

const TechEcosystemSection: React.FC<TechEcosystemSectionProps> = ({ onComplete }) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [animationActive, setAnimationActive] = useState(true);
  const [exploredComponents, setExploredComponents] = useState<string[]>([]);
  const [currentScenario, setCurrentScenario] = useState('normal');

  useEffect(() => {
    if (!animationActive) return;
    
    const interval = setInterval(() => {
      // Animate data flows
      const flows = document.querySelectorAll('.data-flow-line');
      flows.forEach((flow, index) => {
        setTimeout(() => {
          flow.classList.add('animate-pulse');
          setTimeout(() => flow.classList.remove('animate-pulse'), 1000);
        }, index * 200);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [animationActive]);

  const handleComponentClick = (componentId: string) => {
    setSelectedComponent(selectedComponent === componentId ? null : componentId);
    if (!exploredComponents.includes(componentId)) {
      setExploredComponents([...exploredComponents, componentId]);
    }
  };

  const ComponentNode = ({ componentId, component }: any) => {
    const Icon = component.icon;
    const isSelected = selectedComponent === componentId;
    const isExplored = exploredComponents.includes(componentId);
    
    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
        }`}
        style={{ left: `${component.position.x}%`, top: `${component.position.y}%` }}
        onClick={() => handleComponentClick(componentId)}
      >
        <div className={`${component.color} ${isSelected ? 'ring-4 ring-yellow-400' : ''} 
          text-white p-3 rounded-lg shadow-lg min-w-20 text-center relative`}>
          <Icon className="w-6 h-6 mx-auto mb-1" />
          <div className="text-xs font-medium">{component.name.split(' ')[0]}</div>
          {isExplored && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {isSelected && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-80 border z-30">
            <h4 className="font-bold text-gray-800 mb-2">{component.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{component.description}</p>
            
            <div className="mb-3">
              <h5 className="font-semibold text-gray-800 text-sm mb-1">Key Functions:</h5>
              <div className="grid grid-cols-2 gap-1">
                {component.functions.map((func: string, index: number) => (
                  <div key={index} className="text-xs text-gray-700 flex items-center">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                    {func}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
              <h5 className="font-semibold text-blue-800 text-sm mb-1">Maruti Suzuki Role:</h5>
              <p className="text-xs text-blue-700">{component.marutiRole}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ConnectionLine = ({ flow }: any) => {
    const fromComponent = techComponents[flow.from as keyof typeof techComponents];
    const toComponent = techComponents[flow.to as keyof typeof techComponents];
    
    if (!fromComponent || !toComponent) return null;
    
    return (
      <line
        className="data-flow-line"
        x1={`${fromComponent.position.x}%`}
        y1={`${fromComponent.position.y}%`}
        x2={`${toComponent.position.x}%`}
        y2={`${toComponent.position.y}%`}
        stroke={flow.color}
        strokeWidth="2"
        opacity={showDataFlow ? 0.8 : 0.3}
        strokeDasharray={showDataFlow ? "5,5" : "none"}
      />
    );
  };

  const scenarios = {
    normal: { name: 'Normal Operations', description: 'All systems operating normally' },
    maintenance: { name: 'Predictive Maintenance', description: 'AI predicts equipment failure' },
    quality_issue: { name: 'Quality Alert', description: 'Vision system detects defect' },
    agv_transport: { name: 'Material Transport', description: 'AGV transporting materials' }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Network className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Technology Ecosystem</h1>
        <p className="text-gray-600">Integrated technology components for smart automotive manufacturing</p>
        
        <div className="flex items-center justify-center space-x-4 mt-6">
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
            onClick={() => setAnimationActive(!animationActive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              animationActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {animationActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{animationActive ? 'Live' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Ecosystem Visualization */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Maruti Suzuki Technology Ecosystem</h2>
          <p className="text-gray-600">Click on components to explore their role in automotive manufacturing</p>
        </div>
        
        <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-gray-200">
          {/* Layer Labels */}
          <div className="absolute left-2 top-2 space-y-16 text-xs font-semibold text-gray-600">
            <div>Enterprise</div>
            <div>Operations</div>
            <div>Control</div>
            <div>Field</div>
          </div>
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {dataFlows.map((flow, index) => (
              <ConnectionLine key={index} flow={flow} />
            ))}
          </svg>
          
          {/* Technology Components */}
          {Object.entries(techComponents).map(([key, component]) => (
            <ComponentNode key={key} componentId={key} component={component} />
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-3 text-xs">
            <h4 className="font-semibold mb-2">Technology Layers</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                <span>Enterprise Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span>Operations Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                <span>Control Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span>Field Level</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Benefits */}
      {exploredComponents.length >= 5 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Ecosystem Integration Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Real-time Visibility</h3>
              <p className="text-sm text-blue-700">Complete visibility from raw materials to finished products</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Predictive Operations</h3>
              <p className="text-sm text-green-700">AI-driven predictions prevent issues before they occur</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-purple-900 mb-2">Quality Assurance</h3>
              <p className="text-sm text-purple-700">Integrated quality control throughout the process</p>
            </div>
          </div>
        </div>
      )}

      {/* Use Case Scenarios */}
      {exploredComponents.length >= 8 && (
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Real-world Scenarios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">🔧 Predictive Maintenance Scenario</h3>
              <p className="text-sm text-blue-800 mb-3">
                IIoT sensors detect unusual vibration in spot welding robot → Data flows through IoT Gateway →
                AI analyzes patterns → Predicts failure in 3 days → MES schedules maintenance →
                AR device guides technician through repair
              </p>
              <div className="text-xs text-blue-700">
                <strong>Result:</strong> Zero unplanned downtime, 30% reduction in maintenance costs
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">🎯 Quality Control Scenario</h3>
              <p className="text-sm text-green-800 mb-3">
                Vision system detects paint defect → Immediately stops production → RFID tracks affected vehicle →
                WMS quarantines inventory → MES adjusts parameters → AI learns from incident →
                Prevents future occurrences
              </p>
              <div className="text-xs text-green-700">
                <strong>Result:</strong> 99.8% quality rate, complete traceability, continuous improvement
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">🚛 Smart Logistics Scenario</h3>
              <p className="text-sm text-purple-800 mb-3">
                SAP receives urgent vehicle order → MES prioritizes production → AGV automatically transports components →
                BLE beacons track progress → RFID confirms completion → WMS updates inventory →
                5G enables real-time coordination
              </p>
              <div className="text-xs text-purple-700">
                <strong>Result:</strong> 50% faster order fulfillment, reduced manual handling errors
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-900 mb-3">📊 Data-Driven Optimization</h3>
              <p className="text-sm text-orange-800 mb-3">
                All sensors feed data to cloud → AI analyzes production patterns → Identifies optimization opportunities → 
                Automatically adjusts PLC parameters → SCADA displays improvements → 
                MES tracks performance gains
              </p>
              <div className="text-xs text-orange-700">
                <strong>Result:</strong> 15% efficiency improvement, 20% energy savings
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Roadmap */}
      {exploredComponents.length >= 10 && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg p-8 text-white animate-fadeIn">
          <h2 className="text-2xl font-bold text-center mb-6">Ecosystem Implementation Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 1: Foundation</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Deploy IIoT sensors</li>
                <li>• Install IoT gateways</li>
                <li>• Implement MQTT/OPC</li>
                <li>• Basic SCADA integration</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 2: Integration</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Connect MES and WMS</li>
                <li>• Deploy RFID systems</li>
                <li>• Cloud platform setup</li>
                <li>• Basic AI analytics</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 3: Intelligence</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Advanced AI/ML models</li>
                <li>• Predictive analytics</li>
                <li>• AR device deployment</li>
                <li>• BLE beacon network</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Phase 4: Autonomy</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• AGV/AMR deployment</li>
                <li>• 5G infrastructure</li>
                <li>• Full automation</li>
                <li>• Ecosystem optimization</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Complete Section */}
      {exploredComponents.length >= 12 && (
        <div className="text-center bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent! You've explored the complete technology ecosystem</h3>
          <p className="text-green-700 mb-4">Now you understand how all components work together in smart manufacturing</p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Continue to Unified Namespace
          </button>
        </div>
      )}
    </div>
  );
};

export default TechEcosystemSection;