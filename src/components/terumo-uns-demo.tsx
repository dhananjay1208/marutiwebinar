import React, { useState, useEffect } from 'react';
import { 
  Server, Database, Monitor, Factory, Shield, Package, Wrench, 
  Users, DollarSign, TrendingUp, TrendingDown, Zap, Cloud,
  AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, Play, Pause,
  Settings, BarChart3, FileText, Cpu, Thermometer, Activity,
  RefreshCw, Eye, Network, GitBranch, Globe, Lock, Unlock,
  Timer, Target, Award, Layers, Box, HelpCircle, Info,
  X, ChevronRight, ChevronLeft, BookOpen, Lightbulb, Cog
} from 'lucide-react';

const TerumoUNSDemo = () => {
  const [currentView, setCurrentView] = useState('concept'); // 'concept', 'traditional', 'uns', 'comparison'
  const [animationActive, setAnimationActive] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [highlightedConnections, setHighlightedConnections] = useState([]);
  const [showEducationalContent, setShowEducationalContent] = useState(true);

  // Terumo Manufacturing Systems
  const systems = {
    erp: { 
      name: 'SAP S/4HANA', 
      category: 'Enterprise', 
      icon: Server, 
      color: 'bg-purple-500',
      description: 'Enterprise Resource Planning',
      functions: ['Order Management', 'Financial Control', 'Supply Chain', 'Customer Relations']
    },
    mes: { 
      name: 'Terumo MES', 
      category: 'Manufacturing', 
      icon: Factory, 
      color: 'bg-blue-500',
      description: 'Manufacturing Execution System',
      functions: ['Production Scheduling', 'Work Orders', 'OEE Tracking', 'Batch Management']
    },
    lims: { 
      name: 'LIMS', 
      category: 'Quality', 
      icon: Shield, 
      color: 'bg-green-500',
      description: 'Laboratory Information Management',
      functions: ['Quality Tests', 'SPC Charts', 'CoA Generation', 'Batch Release']
    },
    scada: { 
      name: 'Production SCADA', 
      category: 'Control', 
      icon: Monitor, 
      color: 'bg-orange-500',
      description: 'Supervisory Control & Data Acquisition',
      functions: ['Process Monitoring', 'HMI Interfaces', 'Alarms', 'Historical Data']
    },
    wms: { 
      name: 'Warehouse Management', 
      category: 'Logistics', 
      icon: Package, 
      color: 'bg-cyan-500',
      description: 'Inventory & Material Management',
      functions: ['Raw Material Tracking', 'Lot Management', 'Expiry Control', 'Shipment']
    },
    cmms: { 
      name: 'Maintenance System', 
      category: 'Maintenance', 
      icon: Wrench, 
      color: 'bg-red-500',
      description: 'Computerized Maintenance Management',
      functions: ['Work Orders', 'Preventive Maintenance', 'Spare Parts', 'Equipment History']
    },
    plc1: { 
      name: 'Extrusion PLC', 
      category: 'Control', 
      icon: Cpu, 
      color: 'bg-indigo-500',
      description: 'PVC Film Extrusion Control',
      functions: ['Temperature Control', 'Pressure Regulation', 'Speed Control', 'Safety Systems']
    },
    plc2: { 
      name: 'Welding PLC', 
      category: 'Control', 
      icon: Cpu, 
      color: 'bg-indigo-500',
      description: 'RF Welding Control System',
      functions: ['Weld Temperature', 'Pressure Control', 'Cycle Management', 'Quality Feedback']
    },
    plc3: { 
      name: 'Sterilization PLC', 
      category: 'Control', 
      icon: Cpu, 
      color: 'bg-indigo-500',
      description: 'Steam Sterilization Control',
      functions: ['Steam Control', 'Cycle Validation', 'FDA Compliance', 'Safety Monitoring']
    },
    historian: { 
      name: 'Process Historian', 
      category: 'Data', 
      icon: Database, 
      color: 'bg-gray-500',
      description: 'Historical Data Management',
      functions: ['Time-series Data', 'Trending', 'Analytics', 'Reporting']
    },
    qms: { 
      name: 'Quality Management', 
      category: 'Quality', 
      icon: Award, 
      color: 'bg-pink-500',
      description: 'Quality System Management',
      functions: ['Document Control', 'CAPA', 'Training Records', 'Audit Management']
    },
    oee: { 
      name: 'OEE System', 
      category: 'Analytics', 
      icon: BarChart3, 
      color: 'bg-yellow-500',
      description: 'Overall Equipment Effectiveness',
      functions: ['Availability Tracking', 'Performance Analysis', 'Quality Impact', 'Downtime Analysis']
    }
  };

  // Traditional Integration Connections (Point-to-Point)
  const traditionalConnections = [
    { from: 'erp', to: 'mes', cost: 150000, complexity: 'High' },
    { from: 'erp', to: 'wms', cost: 120000, complexity: 'High' },
    { from: 'mes', to: 'lims', cost: 100000, complexity: 'High' },
    { from: 'mes', to: 'scada', cost: 80000, complexity: 'Medium' },
    { from: 'mes', to: 'cmms', cost: 90000, complexity: 'Medium' },
    { from: 'lims', to: 'qms', cost: 70000, complexity: 'Medium' },
    { from: 'scada', to: 'plc1', cost: 50000, complexity: 'Low' },
    { from: 'scada', to: 'plc2', cost: 50000, complexity: 'Low' },
    { from: 'scada', to: 'plc3', cost: 50000, complexity: 'Low' },
    { from: 'scada', to: 'historian', cost: 60000, complexity: 'Medium' },
    { from: 'mes', to: 'oee', cost: 40000, complexity: 'Low' },
    { from: 'historian', to: 'oee', cost: 30000, complexity: 'Low' },
    { from: 'lims', to: 'historian', cost: 45000, complexity: 'Medium' },
    { from: 'wms', to: 'mes', cost: 110000, complexity: 'High' },
    { from: 'qms', to: 'erp', cost: 95000, complexity: 'High' },
    { from: 'cmms', to: 'erp', cost: 85000, complexity: 'Medium' },
    { from: 'oee', to: 'erp', cost: 75000, complexity: 'Medium' }
  ];

  // UNS Connections (All through central namespace)
  const unsConnections = Object.keys(systems).map(system => ({
    system,
    cost: 25000, // Significantly reduced per connection
    complexity: 'Low'
  }));

  const calculateMetrics = () => {
    const traditional = {
      totalConnections: traditionalConnections.length,
      totalCost: traditionalConnections.reduce((sum, conn) => sum + conn.cost, 0),
      integrationTime: traditionalConnections.length * 3, // months
      maintenanceComplexity: 'High',
      scalabilityRating: 'Poor'
    };

    const uns = {
      totalConnections: unsConnections.length,
      totalCost: unsConnections.reduce((sum, conn) => sum + conn.cost, 0),
      integrationTime: Math.ceil(unsConnections.length * 0.5), // months
      maintenanceComplexity: 'Low',
      scalabilityRating: 'Excellent'
    };

    return { traditional, uns };
  };

  const metrics = calculateMetrics();

  // Data flow simulation
  useEffect(() => {
    if (!showDataFlow) return;

    const interval = setInterval(() => {
      if (currentView === 'traditional') {
        const randomConnection = traditionalConnections[Math.floor(Math.random() * traditionalConnections.length)];
        setHighlightedConnections([randomConnection]);
      } else if (currentView === 'uns') {
        const randomSystem = Object.keys(systems)[Math.floor(Math.random() * Object.keys(systems).length)];
        setHighlightedConnections([randomSystem]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [showDataFlow, currentView]);

  const SystemNode = ({ systemKey, system, position, isSelected, onClick }) => {
    const IconComponent = system.icon;
    const isHighlighted = highlightedConnections.includes(systemKey) || 
                         highlightedConnections.some(conn => conn.from === systemKey || conn.to === systemKey);
    
    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
        } ${isHighlighted ? 'animate-pulse ring-4 ring-yellow-400' : ''}`}
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
        onClick={() => onClick(systemKey)}
      >
        <div className={`${system.color} ${isSelected ? 'ring-4 ring-white' : ''} 
          text-white p-3 rounded-lg shadow-lg min-w-24 text-center`}>
          <IconComponent className="w-6 h-6 mx-auto mb-1" />
          <div className="text-xs font-medium">{system.name}</div>
        </div>
        {isSelected && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 border z-30">
            <h4 className="font-semibold text-gray-800 mb-2">{system.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{system.description}</p>
            <div className="text-xs">
              <strong>Functions:</strong>
              <ul className="mt-1 space-y-1">
                {system.functions.map((func, index) => (
                  <li key={index} className="text-gray-700">• {func}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ConnectionLine = ({ from, to, connection, isHighlighted }) => {
    const fromPos = systemPositions[from];
    const toPos = systemPositions[to];
    
    if (!fromPos || !toPos) return null;

    const cost = connection?.cost || 0;
    const strokeWidth = isHighlighted ? 4 : Math.max(1, Math.log10(cost / 10000));
    const strokeColor = isHighlighted ? '#fbbf24' : 
                       cost > 100000 ? '#ef4444' : 
                       cost > 50000 ? '#f97316' : '#22c55e';

    return (
      <line
        x1={`${fromPos.x}%`}
        y1={`${fromPos.y}%`}
        x2={`${toPos.x}%`}
        y2={`${toPos.y}%`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={isHighlighted ? 1 : 0.6}
        className={isHighlighted ? 'animate-pulse' : ''}
      />
    );
  };

  // System positions on the circle
  const systemPositions = Object.keys(systems).reduce((positions, systemKey, index) => {
    const angle = (index / Object.keys(systems).length) * 2 * Math.PI - Math.PI / 2;
    const radius = 35;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    positions[systemKey] = { x, y };
    return positions;
  }, {});

  const ConceptView = () => (
    <div className="space-y-8">
      {/* Main Concept Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
          What is a Unified Namespace (UNS)?
        </h2>
        <div className="text-lg text-gray-700 leading-relaxed space-y-4">
          <p>
            A <strong>Unified Namespace (UNS)</strong> is a centralized, hierarchical data structure that provides a single source of truth 
            for all operational data across your manufacturing enterprise. Think of it as a "digital nervous system" that connects 
            every device, system, and application in your factory through a standardized, self-organizing data hub.
          </p>
          <p>
            Instead of creating individual point-to-point connections between systems (which creates a complex web), UNS acts as a 
            central hub where all systems publish their data and subscribe to data they need - similar to how a modern city's public 
            transportation system works with a central hub connecting all routes.
          </p>
        </div>
      </div>

      {/* Key Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Layers className="w-6 h-6 mr-2 text-green-500" />
            Core Principles
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <span><strong>Single Source of Truth:</strong> All data flows through one centralized namespace</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <span><strong>Hierarchical Structure:</strong> Data organized following ISA-95 standards</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <span><strong>Self-Describing:</strong> Data paths tell you exactly what the information represents</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <span><strong>Real-Time:</strong> Live data updates flow instantly to all subscribing systems</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <span><strong>Technology Agnostic:</strong> Works with any system, any vendor, any protocol</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-blue-500" />
            How It Works
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <span><strong>Data Publishing:</strong> Systems publish their data to specific paths in the namespace</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <span><strong>Data Subscription:</strong> Other systems subscribe to data paths they need</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <span><strong>Automatic Distribution:</strong> Changes are instantly pushed to all subscribers</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">4</div>
              <span><strong>No Custom Integration:</strong> Systems connect once, access everything</span>
            </div>
          </div>
        </div>
      </div>

      {/* UNS Benefits for Manufacturing */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why UNS is Revolutionary for Manufacturing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Cost Reduction</h4>
            <p className="text-sm text-gray-600">75-90% reduction in integration costs compared to traditional point-to-point connections</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Timer className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Faster Implementation</h4>
            <p className="text-sm text-gray-600">60-80% faster deployment as systems connect once to the namespace</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Infinite Scalability</h4>
            <p className="text-sm text-gray-600">Easy to add new systems, lines, or plants without complex re-engineering</p>
          </div>
        </div>
      </div>

      {/* Real-World Analogy */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-orange-600" />
          Think of UNS Like the Internet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="font-medium mb-2">Traditional Integration (Old Phone System):</h4>
            <ul className="space-y-1 text-sm">
              <li>• Each phone needs direct wires to every other phone</li>
              <li>• Adding new phones requires wiring to all existing phones</li>
              <li>• Complex, expensive, and hard to maintain</li>
              <li>• Limited scalability and flexibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">UNS (Modern Internet):</h4>
            <ul className="space-y-1 text-sm">
              <li>• Each device connects once to the network</li>
              <li>• New devices just need one connection</li>
              <li>• Simple, cost-effective, and easily maintained</li>
              <li>• Unlimited scalability and flexibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Terumo-Specific Example */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Factory className="w-6 h-6 mr-2 text-blue-600" />
          UNS in Action: Terumo Blood Bag Manufacturing
        </h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <div className="space-y-1">
            <div className="text-yellow-400"># UNS Data Structure Example</div>
            <div>Terumo_Penpol/</div>
            <div className="ml-4">├── Kerala_Plant/</div>
            <div className="ml-8">│   ├── Line_001_Extrusion/</div>
            <div className="ml-12">│   │   ├── Equipment/Temperature: <span className="text-white">185.2°C</span></div>
            <div className="ml-12">│   │   ├── Equipment/Pressure: <span className="text-white">2.8 bar</span></div>
            <div className="ml-12">│   │   └── Performance/OEE: <span className="text-white">87.5%</span></div>
            <div className="ml-8">│   ├── Line_002_Welding/</div>
            <div className="ml-12">│   │   └── Equipment/Temperature: <span className="text-white">298.5°C</span></div>
            <div className="ml-8">│   └── Quality_Lab/</div>
            <div className="ml-12">│   │   └── Batch_BG240922001/Status: <span className="text-white">APPROVED</span></div>
          </div>
        </div>
        <p className="text-gray-700">
          In this structure, any system can subscribe to specific data points like "Line_001_Extrusion/Equipment/Temperature" 
          and automatically receive updates whenever the temperature changes. The MES, ERP, quality system, and maintenance 
          system all get the same real-time data without custom integrations.
        </p>
      </div>
    </div>
  );

  const TraditionalView = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {traditionalConnections.map((connection, index) => (
          <ConnectionLine
            key={index}
            from={connection.from}
            to={connection.to}
            connection={connection}
            isHighlighted={highlightedConnections.includes(connection)}
          />
        ))}
      </svg>
      
      {/* System Nodes */}
      {Object.entries(systems).map(([key, system]) => (
        <SystemNode
          key={key}
          systemKey={key}
          system={system}
          position={systemPositions[key]}
          isSelected={selectedSystem === key}
          onClick={setSelectedSystem}
        />
      ))}

      {/* Complexity Indicators */}
      <div className="absolute top-4 left-4 bg-red-100 border border-red-300 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold text-sm">High Complexity</span>
        </div>
        <div className="text-xs text-red-700 mt-1">
          {traditionalConnections.length} point-to-point integrations
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-red-100 border border-red-300 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-red-800">
          <DollarSign className="w-5 h-5" />
          <span className="font-semibold text-sm">High Cost</span>
        </div>
        <div className="text-xs text-red-700 mt-1">
          ${(metrics.traditional.totalCost / 1000000).toFixed(1)}M integration cost
        </div>
      </div>
    </div>
  );

  const UNSView = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
      {/* Central UNS Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-green-600 rounded-full shadow-lg flex items-center justify-center">
        <div className="text-white text-center">
          <Network className="w-8 h-8 mx-auto mb-1" />
          <div className="font-bold text-sm">Unified</div>
          <div className="font-bold text-sm">Namespace</div>
          <div className="text-xs opacity-80 mt-1">ISA-95</div>
        </div>
      </div>

      {/* UNS Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {Object.keys(systems).map((systemKey, index) => {
          const pos = systemPositions[systemKey];
          const isHighlighted = highlightedConnections.includes(systemKey);
          return (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`${pos.x}%`}
              y2={`${pos.y}%`}
              stroke={isHighlighted ? '#fbbf24' : '#22c55e'}
              strokeWidth={isHighlighted ? 3 : 2}
              opacity={isHighlighted ? 1 : 0.7}
              className={isHighlighted ? 'animate-pulse' : ''}
            />
          );
        })}
      </svg>
      
      {/* System Nodes */}
      {Object.entries(systems).map(([key, system]) => (
        <SystemNode
          key={key}
          systemKey={key}
          system={system}
          position={systemPositions[key]}
          isSelected={selectedSystem === key}
          onClick={setSelectedSystem}
        />
      ))}

      {/* Benefits Indicators */}
      <div className="absolute top-4 left-4 bg-green-100 border border-green-300 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-green-800">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">Low Complexity</span>
        </div>
        <div className="text-xs text-green-700 mt-1">
          Single integration per system
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-green-100 border border-green-300 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-green-800">
          <TrendingDown className="w-5 h-5" />
          <span className="font-semibold text-sm">75% Cost Reduction</span>
        </div>
        <div className="text-xs text-green-700 mt-1">
          ${(metrics.uns.totalCost / 1000000).toFixed(1)}M total integration cost
        </div>
      </div>

      {/* ISA-95 Structure Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-100 border border-blue-300 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-blue-800">
          <Layers className="w-5 h-5" />
          <span className="font-semibold text-sm">ISA-95 Compliant Structure</span>
        </div>
        <div className="text-xs text-blue-700 mt-1 text-center">
          Terumo / Kerala Plant / Line 1 / Extruder / Temperature
        </div>
      </div>
    </div>
  );

  const ComparisonView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Traditional Side */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-red-700 flex items-center">
          <X className="w-5 h-5 mr-2" />
          Traditional Point-to-Point
        </h3>
        <div className="bg-red-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Integration Cost:</span>
            <span className="font-bold text-red-600">${(metrics.traditional.totalCost / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Connections:</span>
            <span className="font-bold text-red-600">{metrics.traditional.totalConnections}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Integration Time:</span>
            <span className="font-bold text-red-600">{metrics.traditional.integrationTime} months</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Maintenance:</span>
            <span className="font-bold text-red-600">{metrics.traditional.maintenanceComplexity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Scalability:</span>
            <span className="font-bold text-red-600">{metrics.traditional.scalabilityRating}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-red-200">
          <h4 className="font-semibold text-red-800 mb-2">Challenges:</h4>
          <ul className="space-y-1 text-sm text-red-700">
            <li>• Each integration requires custom development</li>
            <li>• Changes impact multiple systems</li>
            <li>• Difficult to add new systems</li>
            <li>• High maintenance overhead</li>
            <li>• Data inconsistency issues</li>
            <li>• Vendor lock-in problems</li>
          </ul>
        </div>
      </div>

      {/* UNS Side */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-green-700 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Unified Namespace Approach
        </h3>
        <div className="bg-green-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Integration Cost:</span>
            <span className="font-bold text-green-600">${(metrics.uns.totalCost / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Connections:</span>
            <span className="font-bold text-green-600">{metrics.uns.totalConnections}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Integration Time:</span>
            <span className="font-bold text-green-600">{metrics.uns.integrationTime} months</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Maintenance:</span>
            <span className="font-bold text-green-600">{metrics.uns.maintenanceComplexity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Scalability:</span>
            <span className="font-bold text-green-600">{metrics.uns.scalabilityRating}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Benefits:</h4>
          <ul className="space-y-1 text-sm text-green-700">
            <li>• Single integration point per system</li>
            <li>• Plug-and-play architecture</li>
            <li>• Easy to add new systems</li>
            <li>• Consistent data structure</li>
            <li>• Vendor agnostic approach</li>
            <li>• Real-time data availability</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const ImplementationGuide = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Cog className="w-6 h-6 mr-2 text-blue-600" />
        UNS Implementation for Terumo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            phase: 'Phase 1',
            title: 'Foundation Setup',
            duration: '2-3 months',
            items: ['MQTT Broker Setup', 'Data Model Design', 'Security Framework', 'Pilot Line Integration'],
            color: 'bg-blue-50 border-blue-200'
          },
          {
            phase: 'Phase 2', 
            title: 'Core Systems',
            duration: '3-4 months',
            items: ['MES Integration', 'SCADA Connection', 'PLC Data Feeds', 'Quality Systems'],
            color: 'bg-green-50 border-green-200'
          },
          {
            phase: 'Phase 3',
            title: 'Enterprise Integration',
            duration: '2-3 months', 
            items: ['ERP Connection', 'LIMS Integration', 'WMS Interface', 'Analytics Platform'],
            color: 'bg-purple-50 border-purple-200'
          },
          {
            phase: 'Phase 4',
            title: 'Optimization',
            duration: '1-2 months',
            items: ['Performance Tuning', 'Advanced Analytics', 'AI/ML Integration', 'Full Deployment'],
            color: 'bg-orange-50 border-orange-200'
          }
        ].map((phase, index) => (
          <div key={index} className={`${phase.color} border-2 rounded-lg p-4`}>
            <div className="font-semibold text-gray-800">{phase.phase}</div>
            <div className="font-medium text-gray-700 mb-1">{phase.title}</div>
            <div className="text-sm text-gray-600 mb-3">{phase.duration}</div>
            <ul className="space-y-1">
              {phase.items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700">• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Unified Namespace (UNS) Demonstration</h1>
              <p className="text-gray-600 mt-1">Understanding the Future of Manufacturing Integration</p>
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
                onClick={() => setShowEducationalContent(!showEducationalContent)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showEducationalContent ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* View Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-md p-1">
            {[
              { value: 'concept', label: 'UNS Concept', color: 'text-blue-600' },
              { value: 'traditional', label: 'Traditional', color: 'text-red-600' },
              { value: 'uns', label: 'UNS', color: 'text-green-600' },
              { value: 'comparison', label: 'Comparison', color: 'text-purple-600' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => {
                  setCurrentView(option.value);
                  setSelectedSystem(null);
                }}
                className={`px-6 py-2 rounded-md transition-colors ${
                  currentView === option.value 
                    ? `bg-gray-100 ${option.color} font-semibold` 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Educational Content */}
        {showEducationalContent && currentView === 'concept' && <ConceptView />}

        {/* Main Visualization */}
        {currentView !== 'concept' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentView === 'traditional' && 'Traditional Point-to-Point Integration'}
                {currentView === 'uns' && 'Unified Namespace Architecture'}
                {currentView === 'comparison' && 'Architecture Comparison'}
              </h2>
              <p className="text-gray-600 mt-2">
                {currentView === 'traditional' && 'Complex web of individual system integrations'}
                {currentView === 'uns' && 'Centralized data hub with standardized access'}
                {currentView === 'comparison' && 'Side-by-side analysis of integration approaches'}
              </p>
            </div>

            {currentView === 'traditional' && <TraditionalView />}
            {currentView === 'uns' && <UNSView />}
            {currentView === 'comparison' && <ComparisonView />}
          </div>
        )}

        {/* Implementation Guide */}
        {(currentView === 'uns' || currentView === 'concept') && <ImplementationGuide />}

        {/* Key Benefits Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Why Choose UNS for Terumo?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
              <div className="text-gray-600">Cost Reduction</div>
              <div className="text-sm text-gray-500 mt-1">
                From ${(metrics.traditional.totalCost / 1000000).toFixed(1)}M to ${(metrics.uns.totalCost / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">Faster Implementation</div>
              <div className="text-sm text-gray-500 mt-1">
                From {metrics.traditional.integrationTime} to {metrics.uns.integrationTime} months
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600">Scalability</div>
              <div className="text-sm text-gray-500 mt-1">
                Easy to add new lines, plants, or systems
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerumoUNSDemo;