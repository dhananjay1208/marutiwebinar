import React, { useState } from 'react';
import { Cog, Cpu, Cloud, Eye, Brain, Globe, Database, Shield, Network, ArrowLeft, Play } from 'lucide-react';

interface TechnologyPillarsSectionProps {
  onComplete: () => void;
}

// Deep dive content for each technology
const deepDiveContent = {
  1: {
    title: "Industrial Internet of Things (IIoT)",
    definition: "Network of interconnected industrial devices (machines, sensors) that communicate data and can be remotely monitored/controlled",
    whatItDoes: "Enables real-time data collection from equipment (temperatures, speeds, pressures, etc.) and sends commands back to devices",
    benefits: [
      "Transparency of operations - real-time visibility into all processes",
      "Instant issue detection - catch problems before they become failures", 
      "Foundation for analytics and predictive maintenance",
      "Automated record-keeping and traceability",
      "Remote monitoring and support capabilities"
    ],
    practicalExample: "A vibration sensor on a motor sends readings to a dashboard; system alerts if vibration is abnormal, enabling preventive action before failure",
    marutiExamples: [
      {
        process: "Paint Shop Process",
        description: "Paint booth systems with networked data loggers monitoring temperature, humidity, and pressure curves in real-time",
        benefit: "Ensures optimal paint quality and immediate alerts if environmental parameters stray from specifications"
      },
      {
        process: "Steel Stamping Process",
        description: "Force and temperature sensors on stamping presses continuously feeding data to cloud platform",
        benefit: "Immediate alerts if force spikes (indicating die wear or material issues) via text to supervisor"
      },
      {
        process: "Body Shop Welding",
        description: "Current and force sensors on spot welding robots monitoring weld quality parameters",
        benefit: "Real-time quality assurance and automatic adjustment of welding parameters"
      }
    ],
    implementation: {
      hardware: "ESP32 microcontrollers, various sensors (temperature, pressure, vibration), IoT gateways",
      connectivity: "Wi-Fi/Ethernet networks connecting sensors to central database or cloud",
      software: "Dashboard platforms (like Node-RED) for real-time visualization and alerting",
      progression: "Start with monitoring and alerting, gradually implement automated control as trust builds"
    },
    demoDescription: "Live demonstration showing temperature sensor connected to ESP32 microcontroller broadcasting to Node-RED dashboard with real-time gauges and charts. System shows immediate response to temperature changes and threshold-based alerting."
  },
  2: {
    title: "Big Data & Artificial Intelligence",
    definition: "Processing large amounts of manufacturing data using AI and machine learning to extract insights, make predictions, and optimize processes",
    whatItDoes: "Converts raw data into actionable insights for decision-making, identifies patterns humans might miss, and enables predictive capabilities",
    benefits: [
      "Convert raw data into actionable insights for better decision-making",
      "Identify patterns, correlations, and trends that humans might miss",
      "Enable predictive maintenance and quality forecasting",
      "Optimize process parameters automatically in real-time",
      "Provide visual dashboards for intuitive data interpretation"
    ],
    practicalExample: "Analyzing years of production data to discover that a certain temperature range yields the best product quality, or using real-time analytics to monitor OEE and pinpoint downtime causes",
    marutiExamples: [
      {
        process: "Stamping Process Analysis",
        description: "ML models analyzing 2 years of stamping data to find correlations between press force, die temperature, and panel defects",
        benefit: "Discovered that when press force is above X and die temperature is high, surface defects double - enabling proactive adjustments"
      },
      {
        process: "Predictive Quality Control",
        description: "AI algorithms predicting weld strength based on real-time welding parameters during body assembly",
        benefit: "Real-time predictions allow process adjustments before making defective welds, reducing rework and quality issues"
      },
      {
        process: "OEE Analytics & Optimization",
        description: "Real-time analytics calculating Overall Equipment Effectiveness and automatically categorizing downtime reasons",
        benefit: "Identifies biggest efficiency losses (availability, performance, or quality) and targets improvement efforts on highest-impact areas"
      }
    ],
    implementation: {
      hardware: "High-performance servers or cloud computing resources, data storage systems, analytics software platforms",
      connectivity: "Integration with existing ERP, MES, and IoT systems for comprehensive data collection",
      software: "Analytics platforms (Tableau, Power BI), ML frameworks (TensorFlow, scikit-learn), custom dashboards",
      progression: "Start with descriptive analytics and dashboards, progress to predictive models, then prescriptive optimization"
    },
    demoDescription: "Interactive demonstration showing OEE analytics dashboard with real-time efficiency calculations, anomaly detection alerts, and predictive quality forecasting. System displays live production metrics and automatically flags potential issues before they impact production.",
    generativeAI: {
      title: "Generative AI Applications",
      description: "AI systems that can generate new content, insights, and solutions based on training data",
      applications: [
        {
          useCase: "Intelligent Knowledge Assistant",
          description: "AI chatbot trained on company manuals, procedures, and troubleshooting guides",
          example: "Engineer asks: 'What steps should I check if extruder pressure is fluctuating?' AI provides instant, contextual guidance based on internal documentation",
          benefit: "24/7 access to institutional knowledge, faster problem resolution"
        },
        {
          useCase: "Automated Report Generation",
          description: "AI generates comprehensive production reports, quality summaries, and maintenance recommendations",
          example: "AI analyzes daily production data and automatically generates executive summary: 'Production efficiency was 94.2% today, with Line 2 showing 3% improvement due to recent calibration'",
          benefit: "Saves hours of manual report writing, ensures consistent formatting and insights"
        },
        {
          useCase: "Predictive Content Creation",
          description: "Generate maintenance procedures, training materials, and process documentation",
          example: "AI creates step-by-step maintenance guide for new equipment based on similar machines and manufacturer specifications",
          benefit: "Rapid documentation creation, standardized procedures across equipment"
        },
        {
          useCase: "Code and Configuration Generation",
          description: "AI assists in creating PLC programs, HMI interfaces, and system configurations",
          example: "Describe desired automation sequence in plain English, AI generates corresponding ladder logic or structured text code",
          benefit: "Faster automation development, reduced programming errors"
        }
      ],
      implementation: "Cloud-based AI services (OpenAI, Azure AI), on-premise language models, integration with existing systems through APIs",
      considerations: [
        "Data privacy and security for proprietary information",
        "Training on company-specific knowledge base",
        "Human oversight for critical decisions",
        "Regular model updates and validation"
      ]
    }
  },
  4: {
    title: "Simulation & Digital Twins",
    definition: "Simulation uses computer models to imitate real-world processes, while Digital Twins are live digital replicas of physical assets continuously updated with real-time data",
    whatItDoes: "Enables risk-free testing of 'what-if' scenarios, process optimization, predictive analysis, and operator training in virtual environments",
    benefits: [
      "Risk-free testing of process changes and optimizations",
      "Early identification of issues in design and commissioning phases",
      "Real-time monitoring and predictive analysis capabilities",
      "Safe training environment for operators and new procedures",
      "Evidence-based decision making with quantified outcomes"
    ],
    practicalExample: "Testing a 20% production increase in simulation to identify bottlenecks, or using a digital twin of an autoclave to predict sterilization effectiveness before the cycle completes",
    marutiExamples: [
      {
        process: "Production Line Capacity Planning",
        description: "Simulate entire vehicle assembly line to test capacity increases, identify bottlenecks, and optimize equipment utilization",
        benefit: "Determine if current paint booths can handle increased demand or if additional equipment is needed before making investments"
      },
      {
        process: "Stamping Process Optimization",
        description: "Digital twin of stamping line with real-time sensor feeds to test parameter changes virtually",
        benefit: "Test higher production rates or force adjustments in digital twin before risking quality issues on real production"
      },
      {
        process: "Work Cell Design & Layout",
        description: "Simulate different assembly configurations (2 operators vs 1 operator + cobot) to optimize productivity and ergonomics",
        benefit: "Validate new layouts and staffing models before physical implementation, ensuring optimal throughput"
      },
      {
        process: "Paint Booth Process Monitoring",
        description: "Digital twin running thermal and fluid dynamics models in parallel with actual painting processes",
        benefit: "Predict paint finish quality and alert operators to adjust parameters if coating thickness is insufficient"
      },
      {
        process: "New Product Introduction",
        description: "Simulate new vehicle designs or assembly processes before building physical prototypes",
        benefit: "Identify design issues early, optimize processes, and reduce time-to-market for new products"
      }
    ],
    implementation: {
      hardware: "High-performance computing systems, real-time data acquisition systems, VR/AR hardware for immersive simulation",
      connectivity: "Integration with IoT sensors, MES systems, and real-time production data streams",
      software: "Simulation platforms (Arena, Witness, Siemens Plant Simulation), digital twin frameworks, physics-based modeling tools",
      progression: "Start with simple process simulations, develop digital twins of critical equipment, expand to full production line twins"
    },
    demoDescription: "Interactive demonstration showing 3D factory model with real-time data updates. Engineer adjusts production parameters in simulation, immediately seeing bottleneck formation and output predictions. System shows parallel comparison between actual and predicted performance.",
    simulationTypes: {
      title: "Types of Simulation & Digital Twins",
      description: "Understanding different approaches to virtual modeling and their applications",
      types: [
        {
          type: "Process Simulation",
          description: "Computer models that imitate production workflows, material flow, and system interactions",
          features: [
            "Discrete event simulation for production lines",
            "Monte Carlo simulation for variability analysis",
            "Capacity planning and bottleneck identification",
            "What-if scenario testing without production disruption"
          ],
          applications: "Production planning, layout optimization, capacity analysis, resource allocation",
          example: "Simulating vehicle assembly line to test impact of adding automated quality inspection station on overall throughput"
        },
        {
          type: "Physics-Based Digital Twins",
          description: "Virtual replicas incorporating physical laws and real-time data from actual equipment",
          features: [
            "Real-time data synchronization with physical assets",
            "Physics-based models (thermodynamics, fluid flow, mechanics)",
            "Predictive capabilities using historical and live data",
            "Continuous model validation and calibration"
          ],
          applications: "Equipment monitoring, predictive maintenance, process optimization, quality prediction",
          example: "Digital twin of extruder with thermodynamic model predicting material quality based on temperature profiles and screw speed"
        },
        {
          type: "Training & Commissioning Twins",
          description: "Virtual environments for safe operator training and system testing",
          features: [
            "VR/AR interfaces for immersive training",
            "Safe environment for practicing procedures",
            "New control logic testing before deployment",
            "Scenario-based learning modules"
          ],
          applications: "Operator training, procedure development, control system testing, emergency response training",
          example: "VR training environment where operators practice safety procedures and assembly techniques on virtual vehicle production line"
        }
      ]
    },
    digitalTwinLevels: {
      title: "Digital Twin Maturity Levels",
      description: "Progressive stages of digital twin implementation and sophistication",
      levels: [
        {
          level: "Level 1: Digital Model",
          description: "Static digital representation without automatic data exchange",
          characteristics: ["Manual data updates", "Basic visualization", "Offline analysis"],
          example: "3D CAD model of production line used for layout planning"
        },
        {
          level: "Level 2: Digital Shadow",
          description: "Automatic data flow from physical to digital, but not bidirectional",
          characteristics: ["Real-time data feeds", "Automatic updates", "Monitoring and visualization"],
          example: "Dashboard showing live production metrics from IoT sensors"
        },
        {
          level: "Level 3: Digital Twin",
          description: "Bidirectional data flow enabling digital twin to influence physical system",
          characteristics: ["Two-way data exchange", "Predictive capabilities", "Automated control responses"],
          example: "Digital twin that automatically adjusts extruder parameters based on quality predictions"
        }
      ]
    },
    implementationStrategy: {
      title: "Phased Implementation Approach",
      description: "Strategic roadmap for introducing simulation and digital twin technologies",
      phases: [
        {
          phase: "Phase 1: Process Simulation",
          timeframe: "3-6 months",
          focus: "Basic production line modeling and capacity analysis",
          deliverables: ["Production flow simulation", "Bottleneck analysis", "Capacity planning models"],
          roi: "Improved production planning, reduced trial-and-error changes"
        },
        {
          phase: "Phase 2: Equipment Digital Shadows",
          timeframe: "6-12 months",
          focus: "Real-time monitoring and visualization of critical equipment",
          deliverables: ["Live equipment dashboards", "Performance monitoring", "Basic predictive models"],
          roi: "Enhanced visibility, early problem detection, data-driven decisions"
        },
        {
          phase: "Phase 3: Full Digital Twins",
          timeframe: "12-24 months",
          focus: "Bidirectional digital twins with predictive and control capabilities",
          deliverables: ["Predictive maintenance models", "Automated optimization", "Advanced training systems"],
          roi: "Autonomous optimization, predictive capabilities, reduced downtime"
        }
      ]
    },
    industryExamples: {
      title: "Industry Success Stories",
      description: "Real-world examples of simulation and digital twin implementations",
      examples: [
        {
          company: "GE Aviation",
          application: "Digital twins of aircraft engines with IoT sensors",
          outcome: "Predictive maintenance scheduling based on actual operating conditions and component fatigue analysis"
        },
        {
          company: "Siemens",
          application: "Digital twin of entire manufacturing facility",
          outcome: "30% reduction in time-to-market for new products through virtual commissioning and testing"
        },
        {
          company: "Unilever",
          application: "Process simulation for production line optimization",
          outcome: "15% increase in overall equipment effectiveness through bottleneck identification and elimination"
        }
      ]
    }
  },
  3: {
    title: "Robotics (Autonomous Robots & Cobots)",
    definition: "Industrial machines capable of carrying out complex series of actions automatically, with new generation robots being more affordable, flexible, and able to learn/adapt while communicating with other systems",
    whatItDoes: "Automates repetitive or ergonomically challenging tasks, works collaboratively with humans, and integrates with central systems for coordinated operations",
    benefits: [
      "Increase consistency and throughput in manufacturing processes",
      "Reduce human fatigue and error in repetitive tasks",
      "Improve safety by handling dangerous or strenuous operations",
      "Enable 24/7 operations with continuous monitoring",
      "Provide flexibility for high-mix, low-volume production scenarios"
    ],
    practicalExample: "An autonomous mobile robot (AMR) navigating around obstacles to transport materials, or a robotic arm with vision system picking randomly oriented parts from a bin - tasks that were previously very difficult for robots",
    marutiExamples: [
      {
        process: "Material Handling & Transport",
        description: "Mobile robots or robotic arms handling heavy steel coils and finished vehicle components, reducing manual lifting risks",
        benefit: "Eliminates operator fatigue and injury risk from heavy lifting, enables consistent material flow"
      },
      {
        process: "Tube Assembly & Positioning",
        description: "Small robotic arms picking up tubes and aligning them in jigs before sealing, ensuring precise positioning every time",
        benefit: "Consistent tube placement, reduced contamination risk, improved weld quality"
      },
      {
        process: "Vehicle Component Assembly",
        description: "Robot arms with precision grippers installing components like door panels, seats, and trim pieces with high accuracy",
        benefit: "Consistent packaging, reduced contamination risk, improved throughput"
      },
      {
        process: "Quality Inspection Assistance",
        description: "Robots holding and positioning cameras around products for inspection or flexing products for testing as part of QA processes",
        benefit: "Standardized inspection procedures, consistent test conditions, freed QA staff for analysis"
      },
      {
        process: "Labeling & Identification",
        description: "Collaborative robot arms at labeling stations applying labels precisely at the same spot every time with scanner verification",
        benefit: "Perfect label placement, reduced operator strain, consistent product identification"
      }
    ],
    implementation: {
      hardware: "Collaborative robot arms (cobots), autonomous mobile robots (AMRs), vision systems, force sensors, safety systems",
      connectivity: "Integration with MES and central control systems, IoT connectivity for performance monitoring and coordination",
      software: "Robot programming interfaces, vision processing software, path planning algorithms, safety monitoring systems",
      progression: "Start with simple pick-and-place tasks, gradually add vision and AI capabilities, expand to coordinated multi-robot systems"
    },
    demoDescription: "Interactive demonstration showing collaborative robot working alongside human operator in assembly task. System shows robot adapting to human presence, adjusting speed and movements for safety while maintaining productivity. Dashboard displays robot performance metrics and coordination with other factory systems.",
    robotTypes: {
      title: "Types of Modern Industrial Robots",
      description: "Understanding the different categories of robots and their applications in manufacturing",
      types: [
        {
          type: "Autonomous Industrial Robots",
          description: "Advanced robots that can perform tasks with minimal human intervention and make decisions within their task scope",
          features: [
            "AI-powered decision making and adaptation",
            "Advanced sensor systems for environment awareness",
            "Vision systems for handling variations in parts/positioning",
            "Network connectivity for coordination and monitoring"
          ],
          applications: "Complex assembly, quality inspection, material handling with obstacle avoidance",
          example: "Robotic arm with vision system that can pick randomly oriented components from a conveyor and place them in precise assembly positions"
        },
        {
          type: "Collaborative Robots (Cobots)",
          description: "Robots designed to safely work alongside humans with built-in safety features and easy programming",
          features: [
            "Force sensors to detect contact and stop immediately",
            "Smaller size and controlled speed for safety",
            "Easy programming through demonstration",
            "No safety cages required for operation"
          ],
          applications: "Assembly assistance, material handling, quality checks, packaging support",
          example: "Cobot holding vehicle components in place while operator performs assembly and fastening operations"
        },
        {
          type: "Autonomous Mobile Robots (AMRs)",
          description: "Self-navigating robots that transport materials and products throughout the facility",
          features: [
            "Dynamic path planning and obstacle avoidance",
            "Fleet coordination and traffic management",
            "Automatic charging and mission scheduling",
            "Integration with warehouse management systems"
          ],
          applications: "Material transport, inventory management, work-in-process movement",
          example: "AMR automatically transporting finished vehicle subassemblies from production to final assembly area, navigating around workers and equipment"
        }
      ]
    },
    industry40Integration: {
      title: "Robotics in Industry 4.0 Context",
      description: "How modern robots integrate with other Industry 4.0 technologies",
      integrations: [
        {
          technology: "IoT Connectivity",
          description: "Robots send performance data and receive instructions from central systems",
          benefit: "Real-time monitoring, predictive maintenance, coordinated operations"
        },
        {
          technology: "AI & Machine Learning",
          description: "Robots learn from experience and adapt to variations in products and processes",
          benefit: "Improved flexibility, reduced programming time, better quality outcomes"
        },
        {
          technology: "Digital Twin",
          description: "Virtual robot models for programming, testing, and optimization before deployment",
          benefit: "Risk-free testing, optimized robot paths, reduced commissioning time"
        },
        {
          technology: "MES Integration",
          description: "Robots receive batch-specific instructions and report completion status",
          benefit: "Automated recipe changes, full traceability, coordinated production flow"
        }
      ]
    },
    implementationStrategy: {
      title: "Phased Implementation Approach",
      description: "Strategic approach to introducing robotics in automotive manufacturing",
      phases: [
        {
          phase: "Phase 1: Simple Automation",
          timeframe: "3-6 months",
          focus: "Pick-and-place operations, material handling",
          examples: ["Cobot for packaging assistance", "AMR for material transport"],
          roi: "Quick payback through reduced labor costs and improved consistency"
        },
        {
          phase: "Phase 2: Intelligent Automation",
          timeframe: "6-12 months", 
          focus: "Vision-guided operations, quality assistance",
          examples: ["Vision-guided assembly", "Automated inspection assistance"],
          roi: "Improved quality, reduced defects, enhanced throughput"
        },
        {
          phase: "Phase 3: Coordinated Systems",
          timeframe: "12-18 months",
          focus: "Multi-robot coordination, full integration",
          examples: ["Coordinated production cells", "Lights-out operations"],
          roi: "Maximum efficiency, 24/7 operations, competitive advantage"
        }
      ]
    },
    workforceImpact: {
      title: "Workforce Transformation",
      description: "How robotics implementation affects human workers",
      approach: "Robots take over tasks, not entire jobs - focusing on dull, dangerous, or dirty work",
      benefits: [
        "Reduced repetitive strain injuries and fatigue",
        "Upskilling opportunities for robot operation and maintenance",
        "More engaging work focused on quality and problem-solving",
        "Improved workplace safety and ergonomics"
      ],
      transition: "Displaced workers are retrained to oversee multiple robotic cells, perform quality checks, or handle more skilled aspects of production",
      example: "Packaging operator becomes robotic cell supervisor, managing multiple packaging stations and focusing on quality assurance rather than repetitive manual tasks"
    }
  },
  9: {
    title: "System Integration (Horizontal & Vertical)",
    definition: "Connecting systems across the factory floor (horizontal) and from shop floor to enterprise systems (vertical) for seamless data flow",
    whatItDoes: "Eliminates data silos by connecting all manufacturing systems, enabling real-time information flow and coordinated decision-making across the organization",
    benefits: [
      "Eliminates manual data entry and transcription errors",
      "Provides real-time visibility across all operations",
      "Enables faster, data-driven decision making",
      "Improves traceability and compliance reporting",
      "Coordinates activities across departments and systems"
    ],
    practicalExample: "Production order created in ERP automatically flows to MES, which sends instructions to machines. When production completes, inventory is automatically updated and quality department is notified for testing.",
    marutiExamples: [
      {
        process: "Production Order Flow",
        description: "ERP production orders automatically download to MES, which sends recipes to machines and uploads completion data back to ERP",
        benefit: "Eliminates manual order entry, ensures accurate production records, real-time inventory updates"
      },
      {
        process: "Quality Integration",
        description: "LIMS (Laboratory Information Management System) connected to production data - test results automatically release or hold batches",
        benefit: "Faster quality decisions, automatic batch status updates, reduced paperwork and delays"
      },
      {
        process: "Maintenance Integration",
        description: "Machine condition monitoring systems automatically create maintenance work orders in CMMS when thresholds are exceeded",
        benefit: "Proactive maintenance scheduling, reduced unplanned downtime, better maintenance planning"
      }
    ],
    implementation: {
      hardware: "Industrial networks, servers, integration middleware, secure communication infrastructure",
      connectivity: "OPC UA for machine connectivity, APIs for software integration, secure industrial networks",
      software: "MES platforms, integration middleware, API management systems, data synchronization tools",
      progression: "Start with vertical integration (shop floor to ERP), then expand to horizontal integration across departments and supply chain"
    },
    demoDescription: "Live demonstration showing integrated system where production order entry in ERP immediately appears on shop floor displays, machine completion automatically updates inventory, and quality test results instantly release batches for shipping.",
    deepDive: {
      overview: "System Integration connects all levels of manufacturing systems and processes, eliminating data silos and creating seamless information flow across the organization and supply chain.",
      keyComponents: [
        "Vertical Integration: Connecting all IT system levels from shop-floor sensors/PLCs to MES to ERP to management systems",
        "Horizontal Integration: Connecting systems across supply chain, departments (R&D, production, quality, logistics) and external partners",
        "MES Implementation: Bridge between ERP and control level for seamless production order flow",
        "Standard protocols: OPC UA for machine data, APIs for software integration"
      ],
      currentState: {
        challenges: [
          "Batch info manually keyed into ERP after production",
          "Lab test results in separate systems",
          "Machine logs on paper or separate files",
          "Duplicate data entry (production writes on paper, then re-enters in system)",
          "Delays in information flow (quality release paperwork)",
          "Standalone systems that don't communicate"
        ]
      },
      improvements: {
        vertical: [
          "Implement MES to bridge ERP and control level - production orders download automatically, results upload back",
          "Connect quality systems (LIMS) with production data - automatic batch holds for failed tests",
          "Real-time inventory updates from production consumption",
          "Maintenance systems integration - automatic work orders from machine signals"
        ],
        horizontal: [
          "Supplier integration: raw material inventory linked with vendor systems for automatic reordering",
          "Cross-department notifications: production completion triggers quality, warehouse, and sales updates",
          "Engineering changes automatically reflect in production instructions and inventory planning",
          "Customer integration: EDI for orders and shipment information flow"
        ]
      },
      implementation: {
        phases: [
          "Phase 1: Connect production machines to central MES",
          "Phase 2: Integrate MES with ERP for production orders",
          "Phase 3: Connect quality systems (LIMS) with production data",
          "Phase 4: Supplier and customer system integration"
        ],
        timeline: "12-18 months",
        investment: "₹75L - ₹1.5Cr"
      },
      benefits: [
        "Efficiency: Less manual data handling, faster decisions",
        "Accuracy: Fewer transcription errors",
        "Agility: Quicker response to changes with up-to-date information everywhere",
        "Traceability: Complete digital chain from raw material to finished product",
        "Real-time visibility: Management sees whole picture without waiting for reports"
      ],
      longTermVision: {
        digitalThread: "Fully integrated digital thread where every step from design to production to customer feedback is connected. Design changes automatically flow to production instructions, field performance data flows back to improve design.",
        examples: [
          "Order entry in ERP automatically creates production orders in MES",
          "Production completion automatically updates inventory and notifies quality department",
          "Quality test results automatically release or hold batches in inventory system",
          "Machine maintenance needs automatically create work orders in maintenance system"
        ]
      }
    }
  }
};

const technologies = [
  {
    id: 1,
    title: "Industrial Internet of Things (IIoT)",
    icon: Globe,
    color: "blue",
    description: "Connected industrial sensors and devices that collect and share data in real-time across manufacturing systems",
    automotiveApplication: "Temperature, pressure, and vibration sensors throughout the production line monitoring welding, painting, and quality parameters",
    benefits: ["Real-time monitoring", "Predictive maintenance", "Quality tracking", "Remote diagnostics"],
    implementation: "Sensor networks monitoring spot welding temperatures, paint booth pressure, and environmental conditions in production areas"
  },
  {
    id: 2,
    title: "Big Data & Artificial Intelligence", 
    icon: Brain,
    color: "purple",
    description: "Processing large amounts of manufacturing data using AI and machine learning to extract insights, make predictions, and optimize processes",
    automotiveApplication: "AI-powered defect detection, quality prediction, process optimization, and predictive maintenance analytics",
    benefits: ["Automated quality control", "Predictive analytics", "Process optimization", "Intelligent decision making"], 
    implementation: "AI vision systems detecting paint defects and panel imperfections, ML algorithms predicting equipment failures from sensor data"
  },
  {
    id: 3,
    title: "Robotics (Autonomous Robots & Cobots)",
    icon: Cog,
    color: "gray",
    description: "Autonomous robots and collaborative robots (cobots) that work alongside humans to automate manufacturing tasks", 
    automotiveApplication: "Automated material handling, component assembly, and collaborative operations in vehicle production",
    benefits: ["Consistency", "Speed", "Reduced labor costs", "Improved safety"],
    implementation: "Robots handling vehicle component installation and material transfer, cobots assisting with assembly and quality inspection"
  },
  {
    id: 4,
    title: "Simulation & Digital Twins",
    icon: Cpu,
    color: "red", 
    description: "Virtual replicas of physical manufacturing systems for simulation, testing, and optimization without disrupting production",
    automotiveApplication: "Digital twin of vehicle production line for process optimization, virtual testing of new procedures, and predictive modeling",
    benefits: ["Risk-free testing", "Process optimization", "Predictive modeling", "Training simulation"],
    implementation: "Virtual model of extrusion and welding processes to optimize parameters before implementing changes on actual production line"
  },
  {
    id: 5,
    title: "Additive Manufacturing (3D Printing)",
    icon: Database,
    color: "green",
    description: "Layer-by-layer manufacturing technology for rapid prototyping, custom tooling, and on-demand production of components", 
    automotiveApplication: "Rapid prototyping of new vehicle components, custom jigs and fixtures, spare parts production, and tooling",
    benefits: ["Rapid prototyping", "Customization", "Reduced inventory", "On-demand production"],
    implementation: "3D printing custom fixtures for vehicle testing, rapid prototyping of new component designs, and producing spare parts for maintenance"
  },
  {
    id: 6,
    title: "Augmented Reality (AR) & Virtual Reality (VR)",
    icon: Eye,
    color: "orange",
    description: "AR overlays digital information on the physical world, while VR creates immersive training and simulation environments",
    automotiveApplication: "AR-guided maintenance procedures, VR training for operators, and AR-assisted quality inspection", 
    benefits: ["Enhanced training", "Faster maintenance", "Reduced errors", "Remote assistance"],
    implementation: "AR glasses showing step-by-step equipment maintenance procedures, VR training modules for sterile manufacturing processes"
  },
  {
    id: 7,
    title: "Cloud Computing & Edge Computing",
    icon: Cloud,
    color: "cyan",
    description: "Cloud provides scalable computing resources and data storage, while edge computing processes data locally for real-time responses", 
    automotiveApplication: "Cloud-based production analytics and reporting, edge computing for real-time quality control and equipment monitoring",
    benefits: ["Scalability", "Real-time processing", "Cost efficiency", "Global accessibility"],
    implementation: "Cloud dashboard for global production monitoring, edge devices processing quality inspection data in real-time on production floor"
  },
  {
    id: 8,
    title: "Cybersecurity",
    icon: Shield,
    color: "red",
    description: "Protection of industrial systems, data, and networks from cyber threats and unauthorized access in connected manufacturing environments", 
    automotiveApplication: "Securing production data, protecting connected equipment from cyber attacks, and ensuring data integrity for regulatory compliance",
    benefits: ["Data protection", "System security", "Compliance assurance", "Business continuity"],
    implementation: "Secure networks for production systems, encrypted data transmission, and access controls for sensitive manufacturing information"
  },
  {
    id: 9,
    title: "System Integration (Horizontal & Vertical)",
    icon: Network,
    color: "indigo",
    description: "Connecting systems across the factory floor (horizontal) and from shop floor to enterprise systems (vertical) for seamless data flow", 
    automotiveApplication: "Integration of production equipment with ERP systems, connecting quality data with inventory management, and linking shop floor to corporate systems",
    benefits: ["Seamless data flow", "Unified operations", "Better visibility", "Coordinated decision making"],
    implementation: "Connecting vehicle production machines to ERP for real-time inventory updates, integrating quality systems with production planning"
  }
];

const TechnologyPillarsSection: React.FC<TechnologyPillarsSectionProps> = ({ onComplete }) => {
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [exploredTech, setExploredTech] = useState<number[]>([]);
  const [deepDiveTech, setDeepDiveTech] = useState<number | null>(null);

  const handleTechClick = (id: number) => {
    setSelectedTech(selectedTech === id ? null : id);
    if (!exploredTech.includes(id)) {
      setExploredTech([...exploredTech, id]);
    }
  };

  const handleDeepDive = (id: number) => {
    setDeepDiveTech(id);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800', 
      green: 'bg-green-50 border-green-200 text-green-800',
      cyan: 'bg-cyan-50 border-cyan-200 text-cyan-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      gray: 'bg-gray-50 border-gray-200 text-gray-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600', 
      cyan: 'text-cyan-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      gray: 'text-gray-600',
      indigo: 'text-indigo-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-600';
  };

  return (
    <div className="space-y-8">
      {/* Deep Dive View */}
      {deepDiveTech && deepDiveContent[deepDiveTech as keyof typeof deepDiveContent] && (
        <div className="space-y-8">
          {/* Back Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDeepDiveTech(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Technology Pillars</span>
            </button>
          </div>

          {/* Deep Dive Content */}
          {(() => {
            const content = deepDiveContent[deepDiveTech as keyof typeof deepDiveContent];
            return (
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center bg-white rounded-xl shadow-lg p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
                  <p className="text-gray-600">Deep dive into the technology that connects everything</p>
                </div>

                {/* Definition & What It Does */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Definition</h2>
                    <p className="text-gray-700">{content.definition}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">What It Does</h2>
                    <p className="text-gray-700">{content.whatItDoes}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Example */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">Practical Example</h2>
                  <p className="text-lg opacity-90">{content.practicalExample}</p>
                </div>

                {/* Terumo Examples */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Maruti Suzuki Applications</h2>
                  <div className="space-y-6">
                    {content.marutiExamples.map((example, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.process}</h3>
                        <p className="text-gray-700 mb-3">{example.description}</p>
                        <div className="bg-green-50 border-l-4 border-green-400 p-3">
                          <p className="text-sm text-green-800"><strong>Benefit:</strong> {example.benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Implementation Details */}
                {/* Generative AI Section */}
                {deepDiveTech === 2 && content.generativeAI && (
                  <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.generativeAI.title}</h2>
                    <p className="text-gray-700 mb-6">{content.generativeAI.description}</p>
                    
                    <div className="space-y-6">
                      {content.generativeAI.applications.map((app, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{app.useCase}</h3>
                          <p className="text-gray-700 mb-3">{app.description}</p>
                          
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3">
                            <h4 className="font-semibold text-blue-900 mb-1">Example:</h4>
                            <p className="text-sm text-blue-800">{app.example}</p>
                          </div>
                          
                          <div className="bg-green-50 border-l-4 border-green-400 p-3">
                            <h4 className="font-semibold text-green-900 mb-1">Benefit:</h4>
                            <p className="text-sm text-green-800">{app.benefit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation & Considerations</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Implementation:</h4>
                          <p className="text-sm text-gray-700">{content.generativeAI.implementation}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Considerations:</h4>
                          <ul className="space-y-1">
                            {content.generativeAI.considerations.map((consideration, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                {consideration}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Main Technology Pillars View */}
      {!deepDiveTech && (
        <>
          {/* Header */}
          <div className="text-center bg-white rounded-xl shadow-lg p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Cog className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Technology Pillars</h1>
            <p className="text-gray-600">The 9 core technologies that power Industry 4.0</p>
          </div>

          {/* Technology Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              const isSelected = selectedTech === tech.id;
              const isExplored = exploredTech.includes(tech.id);
              
              return (
                <div
                  key={tech.id}
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    isSelected ? 'ring-2 ring-blue-400' : ''
                  }`}
                  onClick={() => handleTechClick(tech.id)}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${tech.color}-100`}>
                        <Icon className={`w-6 h-6 ${getIconColor(tech.color)}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{tech.title}</h3>
                        {isExplored && <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
                    
                    {isSelected && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className={`p-4 rounded-lg border-l-4 ${getColorClasses(tech.color)}`}>
                          <h4 className="font-semibold mb-1">Automotive Application:</h4>
                          <p className="text-sm">{tech.automotiveApplication}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                          <div className="flex flex-wrap gap-2">
                            {tech.benefits.map((benefit, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Implementation Example:</h4>
                          <p className="text-sm text-gray-700 italic">{tech.implementation}</p>
                        </div>
                        
                        {/* Deep Dive Button */}
                        {deepDiveContent[tech.id as keyof typeof deepDiveContent] && (
                          <div className="text-center pt-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeepDive(tech.id); }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                            >
                              Deep Dive
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technology Integration */}
          {exploredTech.length >= 5 && (
            <div className="bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Technology Integration</h2>
              <div className="text-center mb-6">
                <p className="text-gray-600">These 9 technologies work together to create a comprehensive Industry 4.0 ecosystem</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Data & Intelligence Layer</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">IIoT sensors collect data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Big Data & AI process information</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="text-sm">Cloud & Edge computing enable processing</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Physical & Virtual Layer</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Robotics automate physical tasks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Digital Twins enable simulation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">3D Printing creates custom parts</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Integration & Security Layer</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm">System Integration connects everything</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      <span className="text-sm">Cybersecurity protects systems</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">AR/VR enhance human interaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Exploration Progress</h3>
              <span className="text-sm text-gray-600">{exploredTech.length}/9 technologies explored</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(exploredTech.length / 9) * 100}%` }}
              ></div>
            </div>
            {exploredTech.length >= 9 && (
              <div className="text-center mt-6">
                <button
                  onClick={onComplete}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Continue to Implementation Roadmap →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TechnologyPillarsSection;