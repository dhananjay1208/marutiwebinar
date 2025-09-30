import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { 
  Factory, BarChart3, Shield, Package, Wrench, FileText, Calendar, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, 
  Thermometer, Gauge, Droplets, Zap, Users, Search, Filter,
  Play, Pause, RotateCcw, Download, Plus, Edit, Eye, Bell,
  ChevronRight, ChevronDown, MapPin, Beaker, Microscope,
  ClipboardCheck, FileCheck, Award, Target, Activity,
  Settings, LogOut, Menu, X, Home, GitBranch
} from 'lucide-react';

interface MESDemoSectionProps {
  onComplete: () => void;
}

const MESDemoSection: React.FC<MESDemoSectionProps> = ({ onComplete }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedProductionLine, setSelectedProductionLine] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [isRealTime, setIsRealTime] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Blood Bag Product Types
  const productTypes = {
    'SBB450': { name: 'Single Blood Bag 450ml', code: 'SBB450', volume: 450, anticoagulant: 'CPD' },
    'DBB450': { name: 'Double Blood Bag 450ml', code: 'DBB450', volume: 450, anticoagulant: 'CPD' },
    'TBB450': { name: 'Triple Blood Bag 450ml', code: 'TBB450', volume: 450, anticoagulant: 'CPDA-1' },
    'PBB200': { name: 'Pediatric Blood Bag 200ml', code: 'PBB200', volume: 200, anticoagulant: 'CPD' },
    'QBB500': { name: 'Quadruple Blood Bag 500ml', code: 'QBB500', volume: 500, anticoagulant: 'CPDA-1' }
  };

  // Production Lines with detailed configuration
  const [productionLines, setProductionLines] = useState([
    {
      id: 'LINE001',
      name: 'PVC Extrusion Line 1',
      stage: 'Film Production',
      status: 'RUNNING',
      currentProduct: 'SBB450',
      oee: 87.5,
      availability: 92.1,
      performance: 96.8,
      quality: 98.2,
      plannedOutput: 8000,
      actualOutput: 7200,
      temperature: 185.2,
      pressure: 2.8,
      speed: 145,
      operator: 'Ramesh Kumar',
      shift: 'A',
      lastMaintenance: '2024-09-10',
      nextMaintenance: '2024-10-15'
    },
    {
      id: 'LINE002',
      name: 'Bag Forming Line 1',
      stage: 'Bag Formation',
      status: 'RUNNING',
      currentProduct: 'DBB450',
      oee: 92.1,
      availability: 96.2,
      performance: 97.9,
      quality: 97.8,
      plannedOutput: 6500,
      actualOutput: 6100,
      temperature: 298.5,
      pressure: 3.2,
      speed: 120,
      operator: 'Priya Nair',
      shift: 'A',
      lastMaintenance: '2024-09-12',
      nextMaintenance: '2024-09-28'
    },
    {
      id: 'LINE003',
      name: 'Tube Welding Line 1',
      stage: 'Tube Assembly',
      status: 'MAINTENANCE',
      currentProduct: '-',
      oee: 0,
      availability: 0,
      performance: 0,
      quality: 0,
      plannedOutput: 7200,
      actualOutput: 0,
      temperature: 25.0,
      pressure: 0,
      speed: 0,
      operator: 'Maintenance Team',
      shift: 'A',
      lastMaintenance: '2024-09-22',
      nextMaintenance: '2024-09-22'
    },
    {
      id: 'LINE004',
      name: 'Needle Assembly Line 1',
      stage: 'Needle Integration',
      status: 'RUNNING',
      currentProduct: 'TBB450',
      oee: 89.3,
      availability: 94.5,
      performance: 95.2,
      quality: 99.1,
      plannedOutput: 5500,
      actualOutput: 5200,
      temperature: 22.5,
      pressure: 1.5,
      speed: 85,
      operator: 'Suresh Menon',
      shift: 'A',
      lastMaintenance: '2024-09-15',
      nextMaintenance: '2024-10-08'
    },
    {
      id: 'LINE005',
      name: 'Sterilization Line 1',
      stage: 'Final Sterilization',
      status: 'RUNNING',
      currentProduct: 'Mixed Batch',
      oee: 94.7,
      availability: 97.2,
      performance: 97.7,
      quality: 99.8,
      plannedOutput: 12000,
      actualOutput: 11800,
      temperature: 121.0,
      pressure: 2.1,
      speed: 95,
      operator: 'Automated System',
      shift: 'A',
      lastMaintenance: '2024-09-18',
      nextMaintenance: '2024-11-01'
    }
  ]);

  // Production Schedule/Dispatch Data
  const [productionSchedule, setProductionSchedule] = useState([
    {
      id: 'WO2024091501',
      productType: 'SBB450',
      quantity: 10000,
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignedLine: 'LINE001',
      scheduledStart: '2024-09-22 06:00',
      scheduledEnd: '2024-09-22 14:00',
      actualStart: '2024-09-22 06:15',
      progress: 72,
      customerOrder: 'CO-IN-2024-1205',
      customer: 'Apollo Hospitals',
      batchNumber: 'BG240922001'
    },
    {
      id: 'WO2024091502',
      productType: 'DBB450',
      quantity: 8000,
      priority: 'MEDIUM',
      status: 'SCHEDULED',
      assignedLine: 'LINE002',
      scheduledStart: '2024-09-22 14:30',
      scheduledEnd: '2024-09-22 22:30',
      actualStart: null,
      progress: 0,
      customerOrder: 'CO-EX-2024-0892',
      customer: 'NHS - UK',
      batchNumber: 'BG240922002'
    },
    {
      id: 'WO2024091503',
      productType: 'TBB450',
      quantity: 6000,
      priority: 'LOW',
      status: 'PLANNED',
      assignedLine: 'LINE004',
      scheduledStart: '2024-09-23 06:00',
      scheduledEnd: '2024-09-23 18:00',
      actualStart: null,
      progress: 0,
      customerOrder: 'CO-IN-2024-1289',
      customer: 'AIIMS Delhi',
      batchNumber: 'BG240923001'
    },
    {
      id: 'WO2024091504',
      productType: 'PBB200',
      quantity: 15000,
      priority: 'HIGH',
      status: 'PLANNED',
      assignedLine: 'LINE001',
      scheduledStart: '2024-09-24 06:00',
      scheduledEnd: '2024-09-24 16:00',
      actualStart: null,
      progress: 0,
      customerOrder: 'CO-EX-2024-0743',
      customer: 'Red Cross - Australia',
      batchNumber: 'BG240924001'
    }
  ]);

  // Quality Control Data
  const [qualityData, setQualityData] = useState({
    currentTests: [
      {
        batchId: 'BG240922001',
        product: 'SBB450',
        testType: 'Leak Test',
        status: 'IN_PROGRESS',
        startTime: '2024-09-22 10:30',
        expectedCompletion: '2024-09-22 11:30',
        operator: 'QC Team A',
        specification: '< 0.1% failure rate',
        currentResult: '0.08% (8/10000)',
        testStage: 'Random Sampling'
      },
      {
        batchId: 'BG240921003',
        product: 'DBB450',
        testType: 'Biocompatibility',
        status: 'COMPLETED',
        startTime: '2024-09-21 14:00',
        completionTime: '2024-09-22 09:00',
        operator: 'Dr. Sharma',
        specification: 'USP Class VI',
        result: 'PASS - USP Class VI Compliant',
        testStage: 'Final Release'
      },
      {
        batchId: 'BG240922001',
        product: 'SBB450',
        testType: 'Dimensional Check',
        status: 'PENDING',
        scheduledStart: '2024-09-22 15:00',
        operator: 'QC Team B',
        specification: '±2mm tolerance',
        testStage: 'In-Process'
      },
      {
        batchId: 'BG240921002',
        product: 'TBB450',
        testType: 'Sterility Test',
        status: 'COMPLETED',
        startTime: '2024-09-20 10:00',
        completionTime: '2024-09-22 08:00',
        operator: 'Microbiology Lab',
        specification: '10^-6 SAL',
        result: 'PASS - Sterile',
        testStage: 'Final Release'
      }
    ],
    spcData: [
      { time: '08:00', leakRate: 0.08, tensileStrength: 245, volumeAccuracy: 99.2 },
      { time: '09:00', leakRate: 0.12, tensileStrength: 242, volumeAccuracy: 99.1 },
      { time: '10:00', leakRate: 0.06, tensileStrength: 248, volumeAccuracy: 99.3 },
      { time: '11:00', leakRate: 0.15, tensileStrength: 239, volumeAccuracy: 98.9 },
      { time: '12:00', leakRate: 0.09, tensileStrength: 246, volumeAccuracy: 99.0 },
      { time: '13:00', leakRate: 0.11, tensileStrength: 244, volumeAccuracy: 99.2 }
    ],
    batchReleaseQueue: [
      {
        batchId: 'BG240921001',
        product: 'SBB450',
        quantity: 9850,
        qualityStatus: 'APPROVED',
        releaseStatus: 'PENDING_FINAL_APPROVAL',
        qcApprover: 'Dr. Kumar',
        productionManager: 'Pending',
        coa: 'Generated',
        shipmentReady: true
      },
      {
        batchId: 'BG240921002',
        product: 'TBB450',
        quantity: 5920,
        qualityStatus: 'APPROVED',
        releaseStatus: 'RELEASED',
        qcApprover: 'Dr. Kumar',
        productionManager: 'Mr. Rajesh',
        coa: 'Generated',
        shipmentReady: true
      },
      {
        batchId: 'BG240920005',
        product: 'DBB450',
        quantity: 7800,
        qualityStatus: 'REJECTED',
        releaseStatus: 'HOLD',
        qcApprover: 'Dr. Kumar',
        productionManager: '-',
        coa: '-',
        shipmentReady: false,
        rejectReason: 'Dimensional variance exceeded limits'
      }
    ]
  });

  // Traceability/Genealogy Data
  const traceabilityData = {
    'BG240922001': {
      batchId: 'BG240922001',
      product: 'Single Blood Bag 450ml',
      quantity: 7200,
      productionDate: '2024-09-22',
      rawMaterials: [
        {
          material: 'PVC Resin',
          supplier: 'Reliance Industries',
          lotNumber: 'PVC-240915-001',
          quantity: '120 kg',
          receiptDate: '2024-09-15',
          expiryDate: '2026-09-15',
          coa: 'COA-PVC-240915-001.pdf'
        },
        {
          material: 'DEHP Plasticizer',
          supplier: 'UPL Limited',
          lotNumber: 'DEHP-240918-002',
          quantity: '35 L',
          receiptDate: '2024-09-18',
          expiryDate: '2026-09-18',
          coa: 'COA-DEHP-240918-002.pdf'
        },
        {
          material: 'CPD Anticoagulant',
          supplier: 'Himedia Laboratories',
          lotNumber: 'CPD-240920-001',
          quantity: '15 L',
          receiptDate: '2024-09-20',
          expiryDate: '2025-09-20',
          coa: 'COA-CPD-240920-001.pdf'
        },
        {
          material: 'Needle 16G',
          supplier: 'Dispomed',
          lotNumber: 'NDL-240919-003',
          quantity: '7500 pcs',
          receiptDate: '2024-09-19',
          expiryDate: '2027-09-19',
          coa: 'COA-NDL-240919-003.pdf'
        }
      ],
      productionSteps: [
        {
          step: 1,
          process: 'PVC Film Extrusion',
          line: 'LINE001',
          startTime: '2024-09-22 06:15',
          endTime: '2024-09-22 08:45',
          operator: 'Ramesh Kumar',
          parameters: {
            temperature: '185±5°C',
            pressure: '2.8±0.2 bar',
            speed: '145 m/min',
            thickness: '0.34±0.02 mm'
          },
          qualityCheck: 'PASS'
        },
        {
          step: 2,
          process: 'Bag Forming & Sealing',
          line: 'LINE002',
          startTime: '2024-09-22 09:00',
          endTime: '2024-09-22 11:30',
          operator: 'Priya Nair',
          parameters: {
            weldTemperature: '298±10°C',
            pressure: '3.2±0.3 bar',
            cycleTime: '4.5±0.5 sec',
            sealWidth: '8±1 mm'
          },
          qualityCheck: 'PASS'
        },
        {
          step: 3,
          process: 'Tube Welding',
          line: 'LINE003',
          startTime: '2024-09-22 12:00',
          endTime: '2024-09-22 13:45',
          operator: 'Suresh Menon',
          parameters: {
            weldTemperature: '285±8°C',
            pressure: '2.5±0.2 bar',
            cycleTime: '3.0±0.3 sec'
          },
          qualityCheck: 'PASS'
        },
        {
          step: 4,
          process: 'Needle Assembly',
          line: 'LINE004',
          startTime: '2024-09-22 14:00',
          endTime: '2024-09-22 15:15',
          operator: 'Assembly Team A',
          parameters: {
            insertionForce: '2.5±0.5 N',
            sealIntegrity: 'Verified',
            needlePosition: 'Centered'
          },
          qualityCheck: 'PASS'
        },
        {
          step: 5,
          process: 'Final Sterilization',
          line: 'LINE005',
          startTime: '2024-09-22 16:00',
          endTime: '2024-09-22 18:30',
          operator: 'Automated System',
          parameters: {
            temperature: '121±2°C',
            pressure: '2.1±0.1 bar',
            time: '15±1 min',
            sterilityCycle: 'SC-240922-03'
          },
          qualityCheck: 'PASS'
        }
      ],
      qualityTests: [
        {
          test: 'Leak Test',
          result: '0.08% failure rate',
          specification: '< 0.1%',
          status: 'PASS',
          testDate: '2024-09-22 10:30',
          operator: 'QC Team A'
        },
        {
          test: 'Volume Accuracy',
          result: '450.2±1.8 ml',
          specification: '450±5 ml',
          status: 'PASS',
          testDate: '2024-09-22 11:15',
          operator: 'QC Team A'
        },
        {
          test: 'Biocompatibility',
          result: 'USP Class VI',
          specification: 'USP Class VI',
          status: 'PASS',
          testDate: '2024-09-22 14:00',
          operator: 'Dr. Sharma'
        }
      ],
      distribution: [
        {
          customerOrder: 'CO-IN-2024-1205',
          customer: 'Apollo Hospitals',
          shipmentId: 'SH-240923-001',
          quantity: 7200,
          shipmentDate: '2024-09-23',
          invoiceNumber: 'INV-2024-3421',
          transportDetails: 'Cold Chain - BlueDart Express'
        }
      ]
    }
  };

  // Maintenance Data
  const [maintenanceData, setMaintenanceData] = useState({
    equipmentHealth: [
      {
        equipmentId: 'EXT001',
        name: 'Extruder #1',
        line: 'LINE001',
        healthScore: 92,
        status: 'GOOD',
        lastMaintenance: '2024-09-10',
        nextScheduled: '2024-10-15',
        runningHours: 2340,
        maintenanceType: 'Preventive',
        criticalComponents: [
          { component: 'Heating Elements', condition: 'Good', nextReplace: '2024-12-15' },
          { component: 'Screw & Barrel', condition: 'Fair', nextReplace: '2024-11-01' },
          { component: 'Motor Bearings', condition: 'Good', nextReplace: '2025-02-10' }
        ]
      },
      {
        equipmentId: 'WLD001',
        name: 'RF Welder #1',
        line: 'LINE002',
        healthScore: 88,
        status: 'GOOD',
        lastMaintenance: '2024-09-12',
        nextScheduled: '2024-09-28',
        runningHours: 1890,
        maintenanceType: 'Preventive',
        criticalComponents: [
          { component: 'RF Generator', condition: 'Good', nextReplace: '2025-03-12' },
          { component: 'Pneumatic System', condition: 'Fair', nextReplace: '2024-10-30' },
          { component: 'Welding Dies', condition: 'Good', nextReplace: '2024-12-28' }
        ]
      },
      {
        equipmentId: 'WLD002',
        name: 'Tube Welder #1',
        line: 'LINE003',
        healthScore: 45,
        status: 'MAINTENANCE',
        lastMaintenance: '2024-09-22',
        nextScheduled: '2024-09-22',
        runningHours: 3210,
        maintenanceType: 'Corrective',
        criticalComponents: [
          { component: 'Heating Platen', condition: 'Failed', nextReplace: 'Immediate' },
          { component: 'Temperature Controller', condition: 'Poor', nextReplace: 'Immediate' },
          { component: 'Pressure Regulator', condition: 'Fair', nextReplace: '2024-09-25' }
        ]
      },
      {
        equipmentId: 'ASM001',
        name: 'Assembly Station #1',
        line: 'LINE004',
        healthScore: 91,
        status: 'GOOD',
        lastMaintenance: '2024-09-15',
        nextScheduled: '2024-10-08',
        runningHours: 1567,
        maintenanceType: 'Preventive',
        criticalComponents: [
          { component: 'Pick & Place Unit', condition: 'Good', nextReplace: '2025-01-15' },
          { component: 'Vision System', condition: 'Good', nextReplace: '2025-04-08' },
          { component: 'Pneumatic Actuators', condition: 'Good', nextReplace: '2024-11-15' }
        ]
      },
      {
        equipmentId: 'STE001',
        name: 'Steam Sterilizer #1',
        line: 'LINE005',
        healthScore: 96,
        status: 'EXCELLENT',
        lastMaintenance: '2024-09-18',
        nextScheduled: '2024-11-01',
        runningHours: 987,
        maintenanceType: 'Preventive',
        criticalComponents: [
          { component: 'Steam Generator', condition: 'Excellent', nextReplace: '2025-09-18' },
          { component: 'Pressure Vessel', condition: 'Good', nextReplace: '2027-09-18' },
          { component: 'Control System', condition: 'Good', nextReplace: '2025-06-18' }
        ]
      }
    ],
    workOrders: [
      {
        id: 'MWO-2024-001',
        equipment: 'Tube Welder #1 (WLD002)',
        type: 'CORRECTIVE',
        priority: 'CRITICAL',
        status: 'IN_PROGRESS',
        description: 'Replace failed heating platen and temperature controller',
        assignedTo: 'Maintenance Team A',
        scheduledStart: '2024-09-22 06:00',
        estimatedCompletion: '2024-09-22 18:00',
        progress: 65,
        spareParts: [
          { part: 'Heating Platen Model HP-450', partNumber: 'HP450-2024', quantity: 1 },
          { part: 'Temperature Controller TC-300', partNumber: 'TC300-2024', quantity: 1 }
        ]
      },
      {
        id: 'MWO-2024-002',
        equipment: 'RF Welder #1 (WLD001)',
        type: 'PREVENTIVE',
        priority: 'MEDIUM',
        status: 'SCHEDULED',
        description: 'Pneumatic system maintenance and calibration',
        assignedTo: 'Maintenance Team B',
        scheduledStart: '2024-09-28 14:00',
        estimatedCompletion: '2024-09-28 22:00',
        progress: 0,
        spareParts: [
          { part: 'Pneumatic Seals Kit', partNumber: 'PS-KIT-001', quantity: 1 },
          { part: 'Air Filter Element', partNumber: 'AF-ELE-002', quantity: 2 }
        ]
      }
    ]
  });

  // KPI Data for Dashboards
  const kpiData = {
    production: {
      dailyOutput: 30300,
      weeklyOutput: 189500,
      monthlyOutput: 756200,
      planAchievement: 92.3,
      oeeAverage: 90.7,
      qualityRate: 98.4,
      onTimeDelivery: 96.8
    },
    quality: {
      firstPassYield: 98.2,
      customerComplaints: 3,
      nonConformances: 12,
      capa: 2,
      auditScore: 97.5
    },
    maintenance: {
      equipmentUptime: 96.2,
      plannedMaintenance: 95.8,
      meanTimeBetweenFailure: 2340,
      meanTimeToRepair: 4.2,
      maintenanceCosts: 125000
    }
  };

  // Real-time simulation
  useEffect(() => {
    if (!isRealTime) return;

    const interval = setInterval(() => {
      setProductionLines(prev => prev.map(line => {
        if (line.status === 'RUNNING') {
          return {
            ...line,
            actualOutput: Math.min(line.plannedOutput, line.actualOutput + Math.floor(Math.random() * 15 + 5)),
            oee: Math.max(80, Math.min(100, line.oee + (Math.random() - 0.5) * 1.5)),
            temperature: line.temperature + (Math.random() - 0.5) * 2,
            pressure: Math.max(0, line.pressure + (Math.random() - 0.5) * 0.1)
          };
        }
        return line;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const Navigation = () => (
    <nav className="bg-blue-900 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Factory className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">Terumo Penpol MES</h1>
            <p className="text-blue-200 text-sm">Blood Bag Manufacturing System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'production', icon: Factory, label: 'Production' },
            { id: 'quality', icon: Shield, label: 'Quality' },
            { id: 'traceability', icon: GitBranch, label: 'Traceability' },
            { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
            { id: 'reports', icon: FileText, label: 'Reports' }
          ].map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeModule === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="hidden md:block">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`flex items-center space-x-2 px-3 py-1 rounded ${
              isRealTime ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm">{isRealTime ? 'Live' : 'Paused'}</span>
          </button>
          <Bell className="w-5 h-5" />
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );

  const Dashboard = () => {
    const runningLines = productionLines.filter(line => line.status === 'RUNNING').length;
    const totalOEE = productionLines.reduce((acc, line) => acc + line.oee, 0) / productionLines.length;
    const totalProduction = productionLines.reduce((acc, line) => acc + line.actualOutput, 0);
    const averageQuality = productionLines.reduce((acc, line) => acc + line.quality, 0) / productionLines.length;

    return (
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Overall OEE</p>
                <p className="text-3xl font-bold text-blue-600">{totalOEE.toFixed(1)}%</p>
                <p className="text-green-600 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2.3% vs yesterday
                </p>
              </div>
              <BarChart3 className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Today's Production</p>
                <p className="text-3xl font-bold text-green-600">{totalProduction.toLocaleString()}</p>
                <p className="text-green-600 text-sm">Units produced</p>
              </div>
              <Factory className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Quality Rate</p>
                <p className="text-3xl font-bold text-purple-600">{averageQuality.toFixed(1)}%</p>
                <p className="text-green-600 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Above target
                </p>
              </div>
              <Shield className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Lines</p>
                <p className="text-3xl font-bold text-orange-600">{runningLines}/5</p>
                <p className="text-gray-600 text-sm">Production lines</p>
              </div>
              <Zap className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Production Lines Overview */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Production Lines Status</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {productionLines.map(line => (
                <div key={line.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm text-gray-800">{line.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      line.status === 'RUNNING' ? 'bg-green-100 text-green-800' :
                      line.status === 'MAINTENANCE' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {line.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">OEE</span>
                        <span className="font-medium">{line.oee.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${line.oee}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product:</span>
                        <span className="font-medium">{productTypes[line.currentProduct]?.code || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Output:</span>
                        <span className="font-medium">{line.actualOutput.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operator:</span>
                        <span className="font-medium">{line.operator}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* OEE Trend */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">OEE Trend (Last 8 Hours)</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { hour: '06:00', oee: 85.2 },
                  { hour: '07:00', oee: 87.8 },
                  { hour: '08:00', oee: 92.1 },
                  { hour: '09:00', oee: 89.5 },
                  { hour: '10:00', oee: 91.3 },
                  { hour: '11:00', oee: 88.7 },
                  { hour: '12:00', oee: 90.2 },
                  { hour: '13:00', oee: 92.8 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="oee" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Production by Product Type */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Production by Product Type</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Single 450ml', value: 35, fill: '#3b82f6' },
                      { name: 'Double 450ml', value: 28, fill: '#10b981' },
                      { name: 'Triple 450ml', value: 20, fill: '#f59e0b' },
                      { name: 'Pediatric 200ml', value: 12, fill: '#ef4444' },
                      { name: 'Quadruple 500ml', value: 5, fill: '#8b5cf6' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductionModule = () => (
    <div className="p-6 space-y-6">
      {/* Production Schedule Overview */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Production Schedule & Dispatch</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>New Work Order</span>
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-700">Work Order</th>
                  <th className="text-left p-4 font-medium text-gray-700">Product</th>
                  <th className="text-left p-4 font-medium text-gray-700">Quantity</th>
                  <th className="text-left p-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-700">Priority</th>
                  <th className="text-left p-4 font-medium text-gray-700">Progress</th>
                  <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productionSchedule.map(wo => (
                  <tr key={wo.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">{wo.id}</div>
                        <div className="text-sm text-gray-600">{wo.batchNumber}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{productTypes[wo.productType]?.name}</div>
                        <div className="text-sm text-gray-600">{wo.productType}</div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{wo.quantity.toLocaleString()}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{wo.customer}</div>
                        <div className="text-sm text-gray-600">{wo.customerOrder}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        wo.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                        wo.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {wo.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${wo.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{wo.progress}%</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        wo.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        wo.status === 'SCHEDULED' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {wo.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Real-time Production Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Real-time Line Performance</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionLines.map(line => ({
                name: line.name.split(' ')[0] + ' ' + line.name.split(' ')[1],
                oee: line.oee,
                availability: line.availability,
                performance: line.performance,
                quality: line.quality
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="oee" fill="#3b82f6" name="OEE" />
                <Bar dataKey="availability" fill="#10b981" name="Availability" />
                <Bar dataKey="performance" fill="#f59e0b" name="Performance" />
                <Bar dataKey="quality" fill="#ef4444" name="Quality" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Production Parameters</h3>
          </div>
          <div className="p-6 space-y-4">
            {productionLines.filter(line => line.status === 'RUNNING').map(line => (
              <div key={line.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{line.name}</h4>
                  <span className="text-sm text-gray-600">Operator: {line.operator}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>{line.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span>{line.pressure.toFixed(1)} bar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span>{line.speed} m/min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const QualityModule = () => (
    <div className="p-6 space-y-6">
      {/* Quality Tests Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Active Quality Tests</h3>
          </div>
          <div className="p-6 space-y-4">
            {qualityData.currentTests.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{test.batchId}</h4>
                    <p className="text-sm text-gray-600">{test.testType} - {test.product}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    test.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specification:</span>
                    <span className="font-medium">{test.specification}</span>
                  </div>
                  {test.result && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Result:</span>
                      <span className="font-medium text-green-600">{test.result}</span>
                    </div>
                  )}
                  {test.currentResult && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium">{test.currentResult}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operator:</span>
                    <span className="font-medium">{test.operator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Batch Release Queue</h3>
          </div>
          <div className="p-6 space-y-4">
            {qualityData.batchReleaseQueue.map((batch, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{batch.batchId}</h4>
                    <p className="text-sm text-gray-600">{batch.product} - {batch.quantity.toLocaleString()} units</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    batch.releaseStatus === 'RELEASED' ? 'bg-green-100 text-green-800' :
                    batch.releaseStatus === 'PENDING_FINAL_APPROVAL' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {batch.releaseStatus.replace('_', ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">QC Approver:</span>
                    <div className="font-medium">{batch.qcApprover}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Production Manager:</span>
                    <div className="font-medium">{batch.productionManager}</div>
                  </div>
                </div>
                {batch.rejectReason && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-800">
                    <strong>Reject Reason:</strong> {batch.rejectReason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPC Charts */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Statistical Process Control (SPC)</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={qualityData.spcData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="leakRate" stroke="#ef4444" name="Leak Rate %" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="tensileStrength" stroke="#22c55e" name="Tensile Strength (N)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="volumeAccuracy" stroke="#3b82f6" name="Volume Accuracy %" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const TraceabilityModule = () => {
    const batch = traceabilityData['BG240922001'];
    
    return (
      <div className="p-6 space-y-6">
        {/* Batch Selection */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Batch Traceability & Genealogy</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Batch ID (e.g., BG240922001)"
                value={selectedBatch || ''}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Search
              </button>
            </div>

            {/* Batch Information */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Batch ID</label>
                  <div className="text-lg font-bold text-blue-900">{batch.batchId}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Product</label>
                  <div className="text-lg font-bold text-blue-900">{batch.product}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Quantity</label>
                  <div className="text-lg font-bold text-blue-900">{batch.quantity.toLocaleString()} units</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Production Date</label>
                  <div className="text-lg font-bold text-blue-900">{batch.productionDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Raw Materials Genealogy */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Raw Materials Genealogy</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batch.rawMaterials.map((material, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">{material.material}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supplier:</span>
                      <span className="font-medium">{material.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Number:</span>
                      <span className="font-medium">{material.lotNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{material.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Receipt Date:</span>
                      <span className="font-medium">{material.receiptDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expiry Date:</span>
                      <span className="font-medium">{material.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CoA:</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        {material.coa}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production Steps Flow */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Production Process Flow</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {batch.productionSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1 border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.process}</h4>
                        <p className="text-sm text-gray-600">{step.line} - {step.operator}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        step.qualityCheck === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {step.qualityCheck}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Start Time:</span>
                        <div className="font-medium">{step.startTime}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">End Time:</span>
                        <div className="font-medium">{step.endTime}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-600 text-sm">Process Parameters:</span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                        {Object.entries(step.parameters).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="text-gray-500">{key}:</span>
                            <div className="font-medium">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution Information */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Distribution & Customer Information</h3>
          </div>
          <div className="p-6">
            {batch.distribution.map((dist, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <div className="font-medium text-lg">{dist.customer}</div>
                    <div className="text-gray-600">{dist.customerOrder}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Shipment Details:</span>
                    <div className="font-medium">{dist.shipmentId}</div>
                    <div className="text-gray-600">{dist.transportDetails}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Shipment Date:</span>
                    <div className="font-medium">{dist.shipmentDate}</div>
                    <div className="text-gray-600">Invoice: {dist.invoiceNumber}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MaintenanceModule = () => (
    <div className="p-6 space-y-6">
      {/* Equipment Health Overview */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Equipment Health Dashboard</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {maintenanceData.equipmentHealth.map(equipment => (
              <div key={equipment.equipmentId} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{equipment.name}</h4>
                    <p className="text-sm text-gray-600">{equipment.line}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    equipment.status === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                    equipment.status === 'GOOD' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {equipment.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Health Score</span>
                    <span className="font-medium">{equipment.healthScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        equipment.healthScore > 90 ? 'bg-green-500' :
                        equipment.healthScore > 70 ? 'bg-blue-500' :
                        equipment.healthScore > 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${equipment.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Running Hours:</span>
                    <span className="font-medium">{equipment.runningHours.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Maintenance:</span>
                    <span className="font-medium">{equipment.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Scheduled:</span>
                    <span className="font-medium">{equipment.nextScheduled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{equipment.maintenanceType}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Work Orders */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Maintenance Work Orders</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            <span>New Work Order</span>
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {maintenanceData.workOrders.map(wo => (
              <div key={wo.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{wo.id}</h4>
                    <p className="text-sm text-gray-600">{wo.equipment}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      wo.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                      wo.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {wo.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      wo.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {wo.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{wo.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-600">Assigned To:</span>
                    <div className="font-medium">{wo.assignedTo}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Scheduled Start:</span>
                    <div className="font-medium">{wo.scheduledStart}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Est. Completion:</span>
                    <div className="font-medium">{wo.estimatedCompletion}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{wo.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${wo.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <span className="text-gray-600 text-sm">Spare Parts Required:</span>
                  <div className="mt-1 space-y-1">
                    {wo.spareParts.map((part, index) => (
                      <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-medium">{part.part}</span> - 
                        <span className="text-gray-600"> {part.partNumber} (Qty: {part.quantity})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Wrench className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-600">Equipment Uptime</h3>
          <p className="text-2xl font-bold text-blue-600">{kpiData.maintenance.equipmentUptime}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Calendar className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-600">Planned Maintenance</h3>
          <p className="text-2xl font-bold text-green-600">{kpiData.maintenance.plannedMaintenance}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Clock className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-600">MTTR (Hours)</h3>
          <p className="text-2xl font-bold text-orange-600">{kpiData.maintenance.meanTimeToRepair}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Target className="w-12 h-12 text-purple-500 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-600">MTBF (Hours)</h3>
          <p className="text-2xl font-bold text-purple-600">{kpiData.maintenance.meanTimeBetweenFailure.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  const ReportsModule = () => (
    <div className="p-6 space-y-6">
      {/* Report Dashboard */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Manufacturing Reports & Analytics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Daily Production Report',
                description: 'Complete production summary with OEE analysis',
                icon: BarChart3,
                color: 'blue',
                lastGenerated: '2024-09-22 18:00'
              },
              {
                title: 'Quality Trends Analysis',
                description: 'SPC charts and quality performance metrics',
                icon: Shield,
                color: 'green',
                lastGenerated: '2024-09-22 16:30'
              },
              {
                title: 'Equipment Utilization',
                description: 'Maintenance schedules and performance analysis',
                icon: Wrench,
                color: 'orange',
                lastGenerated: '2024-09-22 14:15'
              },
              {
                title: 'Inventory Movement',
                description: 'Material consumption and stock levels',
                icon: Package,
                color: 'purple',
                lastGenerated: '2024-09-22 12:00'
              },
              {
                title: 'Batch Genealogy',
                description: 'Complete traceability and compliance report',
                icon: GitBranch,
                color: 'cyan',
                lastGenerated: '2024-09-22 10:45'
              },
              {
                title: 'Regulatory Compliance',
                description: 'FDA and ISO compliance status report',
                icon: FileCheck,
                color: 'red',
                lastGenerated: '2024-09-22 09:30'
              }
            ].map((report, index) => {
              const IconComponent = report.icon;
              return (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 text-${report.color}-500`} />
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Generate
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{report.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  <div className="text-xs text-gray-500">
                    Last generated: {report.lastGenerated}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Production Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Output Achievement</span>
                <span className="text-2xl font-bold text-green-600">{kpiData.production.planAchievement}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average OEE</span>
                <span className="text-2xl font-bold text-blue-600">{kpiData.production.oeeAverage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quality Rate</span>
                <span className="text-2xl font-bold text-purple-600">{kpiData.production.qualityRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">On-Time Delivery</span>
                <span className="text-2xl font-bold text-orange-600">{kpiData.production.onTimeDelivery}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Weekly Production Trend</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={[
                { day: 'Mon', single: 8200, double: 6100, triple: 4800 },
                { day: 'Tue', single: 8500, double: 6300, triple: 5000 },
                { day: 'Wed', single: 8100, double: 5900, triple: 4700 },
                { day: 'Thu', single: 8300, double: 6200, triple: 4900 },
                { day: 'Fri', single: 8600, double: 6400, triple: 5100 },
                { day: 'Sat', single: 8000, double: 5800, triple: 4600 },
                { day: 'Sun', single: 7800, double: 5600, triple: 4400 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="single" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="double" stackId="1" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="triple" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Export & Scheduling Options</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quick Exports</h4>
              <div className="space-y-2">
                {[
                  'Current Shift Summary (PDF)',
                  'Daily Production Data (Excel)',
                  'Quality Control Log (CSV)',
                  'Equipment Status Report (PDF)'
                ].map((exportOption, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{exportOption}</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Scheduled Reports</h4>
              <div className="space-y-2">
                {[
                  { report: 'Weekly Production Summary', schedule: 'Every Monday 8:00 AM' },
                  { report: 'Monthly Quality Review', schedule: 'First day of month' },
                  { report: 'Equipment Maintenance Log', schedule: 'Every Friday 6:00 PM' },
                  { report: 'Regulatory Compliance', schedule: 'Quarterly' }
                ].map((scheduled, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{scheduled.report}</div>
                    <div className="text-sm text-gray-600">{scheduled.schedule}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Factory className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manufacturing Execution System (MES) Demo</h1>
        <p className="text-gray-600">Live demonstration of Terumo Penpol's integrated MES platform</p>
      </div>

      {/* MES Application */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Navigation />
        <main className="max-w-full">
          {activeModule === 'dashboard' && <Dashboard />}
          {activeModule === 'production' && <ProductionModule />}
          {activeModule === 'quality' && <QualityModule />}
          {activeModule === 'traceability' && <TraceabilityModule />}
          {activeModule === 'maintenance' && <MaintenanceModule />}
          {activeModule === 'reports' && <ReportsModule />}
        </main>
      </div>

      {/* Complete Section */}
      <div className="text-center bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Experience the power of integrated MES!</h3>
        <p className="text-green-700 mb-4">This comprehensive system demonstrates real-time manufacturing visibility and control</p>
        <button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          Continue to Tech Demos
        </button>
      </div>
    </div>
  );
};

export default MESDemoSection;