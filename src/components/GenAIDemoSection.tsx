import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Bot, User, Zap, FileText, Wrench, BookOpen, BarChart3, Shield, Users, TrendingUp } from 'lucide-react';

interface GenAIDemoSectionProps {
  onComplete: () => void;
}

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface UseCase {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  quickQueries: string[];
}

const useCases: UseCase[] = [
  {
    id: 'production',
    title: 'Production Performance Chat',
    icon: BarChart3,
    color: 'blue',
    description: 'Real-time production analytics, OEE monitoring, and performance insights',
    quickQueries: [
      'What is our current OEE across all lines?',
      'Show me today\'s production metrics',
      'Which line has the highest downtime?',
      'Compare this week vs last week performance',
      'What are the main quality issues today?',
      'Predict tomorrow\'s production capacity'
    ]
  },
  {
    id: 'sop',
    title: 'SOP Generator',
    icon: FileText,
    color: 'green',
    description: 'Generate comprehensive SOPs for blood bag manufacturing processes',
    quickQueries: [
      'Create SOP for RF welding process',
      'Generate cleanroom entry procedure',
      'Write quality inspection checklist',
      'Create equipment calibration SOP'
    ]
  },
  {
    id: 'troubleshoot',
    title: 'Troubleshooting Assistant',
    icon: Wrench,
    color: 'orange',
    description: 'AI-powered assistant to diagnose and resolve production issues',
    quickQueries: [
      'Weak seal strength on Line 3',
      'Extruder temperature fluctuations',
      'Autoclave pressure issues',
      'Packaging machine jamming frequently'
    ]
  },
  {
    id: 'training',
    title: 'Training Content Creator',
    icon: BookOpen,
    color: 'purple',
    description: 'Generate customized training materials for operators and engineers',
    quickQueries: [
      'Create operator training for new hires',
      'Generate quality control training module',
      'Write safety protocol training',
      'Create equipment operation guide'
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance Assistant',
    icon: Shield,
    color: 'red',
    description: 'Verify compliance with FDA, ISO 13485, and regulatory requirements',
    quickQueries: [
      'Check ISO 13485 compliance status',
      'Review FDA 21 CFR Part 820 requirements',
      'Generate audit preparation checklist',
      'Validate documentation completeness'
    ]
  },
  {
    id: 'optimization',
    title: 'Process Optimizer',
    icon: TrendingUp,
    color: 'teal',
    description: 'Analyze production data to identify optimization opportunities',
    quickQueries: [
      'Optimize changeover times',
      'Reduce material waste',
      'Improve line efficiency',
      'Minimize energy consumption'
    ]
  }
];

const GenAIDemoSection: React.FC<GenAIDemoSectionProps> = ({ onComplete }) => {
  const [activeUseCase, setActiveUseCase] = useState('production');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentUseCase = useCases.find(uc => uc.id === activeUseCase) || useCases[0];

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: messageIdCounter,
      content: getWelcomeMessage(activeUseCase),
      sender: 'assistant',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setMessageIdCounter(1);
  }, [activeUseCase]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getWelcomeMessage = (useCaseId: string): string => {
    const welcomeMessages = {
      production: `Hello! I'm your Production Performance Assistant. I can help you with:

📊 Real-time OEE monitoring
📈 Production trend analysis  
⏱️ Downtime investigation
🎯 Performance benchmarking
🔍 Quality metrics review
📅 Capacity planning

What would you like to know about your production performance?`,
      sop: `Hi! I'm your SOP Generator Assistant. I can help create comprehensive Standard Operating Procedures for:

📋 Blood bag assembly processes
🧪 Quality control procedures
🏭 Equipment operation protocols
🧼 Cleanroom procedures
⚙️ Maintenance procedures

What SOP would you like me to generate?`,
      troubleshoot: `Hello! I'm your Troubleshooting Assistant. I can help diagnose and resolve:

🔧 Equipment malfunctions
⚠️ Quality issues
🌡️ Process parameter deviations
⏰ Production delays
🔍 Root cause analysis

Describe the issue you're experiencing and I'll help you solve it.`,
      training: `Hi! I'm your Training Content Creator. I can generate:

👥 Operator training materials
📚 Technical documentation
🎯 Skill assessment guides
📋 Safety training modules
🏆 Certification programs

What type of training content do you need?`,
      compliance: `Hello! I'm your Compliance Assistant. I can help with:

✅ Regulatory requirement verification
📋 Audit preparation
📄 Documentation review
🏛️ Standards compliance (ISO 13485, FDA)
📊 Compliance reporting

What compliance area would you like to review?`,
      optimization: `Hi! I'm your Process Optimization Assistant. I can analyze:

📈 Production efficiency opportunities
⚡ Energy consumption reduction
🔄 Workflow improvements
📊 Resource utilization
💰 Cost optimization strategies

What process would you like to optimize?`
    };
    
    return welcomeMessages[useCaseId as keyof typeof welcomeMessages] || welcomeMessages.production;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messageIdCounter,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageIdCounter(prev => prev + 1);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue.trim(), activeUseCase);
      const assistantMessage: Message = {
        id: messageIdCounter + 1,
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setMessageIdCounter(prev => prev + 2);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickQuery = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateAIResponse = (message: string, useCaseId: string): string => {
    const lowerMessage = message.toLowerCase();

    if (useCaseId === 'production') {
      return generateProductionResponse(lowerMessage);
    } else if (useCaseId === 'sop') {
      return generateSOPResponse(lowerMessage);
    } else if (useCaseId === 'troubleshoot') {
      return generateTroubleshootResponse(lowerMessage);
    } else if (useCaseId === 'training') {
      return generateTrainingResponse(lowerMessage);
    } else if (useCaseId === 'compliance') {
      return generateComplianceResponse(lowerMessage);
    } else if (useCaseId === 'optimization') {
      return generateOptimizationResponse(lowerMessage);
    }

    return "I'm here to help! Could you please be more specific about what you'd like to know?";
  };

  const generateProductionResponse = (message: string): string => {
    if (message.includes('oee') || message.includes('overall equipment effectiveness')) {
      return `📊 **Current OEE Status:**

**Line 1:** 82% (Target: 85%)
**Line 2:** 78% (Target: 85%) 
**Line 3:** 76% (Target: 85%)
**Line 4:** 81% (Target: 85%)

**Overall Plant OEE: 79.25%**

📉 Line 3 showing lowest performance due to recent welding issues.
🎯 **Recommendation:** Focus maintenance on Line 3 RF welding machine.

Would you like me to analyze the root causes for Line 3's performance?`;
    }

    if (message.includes('production') && (message.includes('today') || message.includes('metrics'))) {
      return `📈 **Today's Production Metrics:**

🎯 **Target:** 12,000 units
✅ **Actual:** 10,850 units (90.4%)
⏰ **Time Remaining:** 2.5 hours

**Line Performance:**
• Line 1: 2,780 units (103% of target)
• Line 2: 2,650 units (98% of target)  
• Line 3: 2,420 units (85% of target) ⚠️
• Line 4: 3,000 units (107% of target)

📊 **Quality Rate:** 98.2%
⏱️ **Average Cycle Time:** 2.4 minutes

Line 4 is performing exceptionally well today! Would you like details on what's driving their success?`;
    }

    if (message.includes('downtime')) {
      return `⏰ **Downtime Analysis:**

**Highest Downtime - Line 3:**
Total Downtime Today: 3.2 hours

🔧 **Planned Maintenance:** 1.5 hours
⚠️ **Unplanned Stops:** 1.7 hours

**Root Causes:**
• RF Welding calibration: 45 min
• Material changeover: 35 min
• Quality hold: 25 min
• Equipment adjustment: 25 min

💡 **Action Items:**
1. Schedule welding machine PM
2. Implement SMED for changeovers
3. Review quality parameters

Would you like me to create a detailed action plan for reducing Line 3 downtime?`;
    }

    if (message.includes('week') && message.includes('compar')) {
      return `📊 **Weekly Performance Comparison:**

**This Week vs Last Week:**

📈 **Production Volume:** +5.2%
(58,500 vs 55,600 units)

📊 **OEE:** +2.1%
(79.2% vs 77.1%)

✅ **Quality Yield:** +0.8%
(98.1% vs 97.3%)

⏰ **Downtime:** -15%
(18.5 hrs vs 21.8 hrs)

🎯 **Key Improvements:**
• Reduced changeover times
• Better material flow  
• Proactive maintenance

📈 **Trending positively overall!** The team's focus on continuous improvement is paying off.`;
    }

    if (message.includes('quality') && message.includes('issue')) {
      return `🔍 **Today's Quality Issues:**

**Total Rejects:** 183 units (1.8%)

📋 **Breakdown by Defect Type:**
• Weak seals: 78 units (0.76%)
• Dimensional issues: 45 units (0.44%)
• Leak failures: 32 units (0.31%)
• Label defects: 28 units (0.27%)

🎯 **Primary Concern:**
Line 3 seal strength - investigating welding parameters

✅ **Actions Taken:**
1. Parameter adjustment completed
2. Increased sampling frequency
3. Operator retrained

📈 **Improvement trend observed in last 2 hours**

Would you like me to generate a detailed quality improvement plan?`;
    }

    if (message.includes('predict') || message.includes('forecast') || message.includes('capacity')) {
      return `🔮 **Tomorrow's Production Forecast:**

**Predicted Capacity:** 11,800 units
(Based on current OEE trends)

📊 **Line Forecasts:**
• Line 1: 3,100 units (Excellent condition)
• Line 2: 2,950 units (Good condition)
• Line 3: 2,650 units (Post-maintenance) ⚠️
• Line 4: 3,100 units (Excellent condition)

⚠️ **Risk Factors:**
• Line 3 post-maintenance verification
• Weather forecast (potential power issues)
• Material delivery scheduled for 10 AM

💡 **Recommendations:**
• Complete Line 3 validation early
• Pre-position emergency materials
• Schedule preventive maintenance for weekend`;
    }

    return `I can help you analyze production data. Here are some areas I can assist with:

📊 OEE analysis and trends
⏰ Downtime root cause analysis  
🎯 Quality metrics tracking
⚡ Energy consumption monitoring
📅 Capacity planning
🔧 Equipment performance

What specific aspect would you like to explore?`;
  };

  const generateSOPResponse = (message: string): string => {
    if (message.includes('rf welding') || message.includes('welding')) {
      return `📋 **RF Welding SOP Generated:**

**STANDARD OPERATING PROCEDURE**
**Document:** SOP-PRD-001 | **Version:** 2.0

**TITLE:** Blood Bag Assembly - RF Welding Process

**1. PURPOSE**
Establish standardized procedures for blood bag assembly using RF welding equipment in ISO Class 3 cleanroom.

**2. EQUIPMENT & MATERIALS**
• RF Welding Machine (Model: XYZ-2000)
• Medical grade PVC sheets (DEHP-free)
• Tubing components (pre-sterilized)
• Cleanroom garments (Class 3 compliant)

**3. CRITICAL PARAMETERS**
• Welding temperature: 130°C ± 5°C
• Dwell time: 3.5 seconds ± 0.2s
• Cooling time: Minimum 2 seconds
• Weld strength: >15 N

**4. PROCEDURE STEPS**
✅ Pre-operation checks
✅ Material preparation
✅ Welding process execution
✅ Quality verification
✅ Documentation

Would you like me to expand on any specific section or generate additional SOPs?`;
    }

    if (message.includes('cleanroom') || message.includes('entry')) {
      return `🧼 **Cleanroom Entry SOP Generated:**

**CLEANROOM ENTRY PROCEDURE**
**Document:** SOP-FAC-003 | **Class:** ISO 3

**ENTRY SEQUENCE:**

**1. PRE-ENTRY (Changing Room 1)**
• Remove street clothes and jewelry
• Put on disposable shoe covers
• Wash hands thoroughly (30 seconds minimum)

**2. GOWNING (Changing Room 2)**  
• Don sterile undergarments
• Put on cleanroom suit (head to toe)
• Install face mask and hair cover
• Put on sterile gloves

**3. AIRLOCK ENTRY**
• Enter through personnel airlock
• Wait for air shower cycle (30 seconds)
• Verify pressure differential >15 Pa

**4. FINAL VERIFICATION**
• Check gown integrity
• Verify no exposed skin/hair
• Log entry time and personnel ID

**CRITICAL CONTROLS:**
• Particle count monitoring
• Pressure differential alarms
• Personnel training verification

Need SOPs for other cleanroom procedures?`;
    }

    return `📋 I can generate comprehensive SOPs for various processes:

🏭 **Manufacturing Processes:**
• Blood bag assembly
• RF welding procedures
• Quality inspection
• Packaging operations

🧪 **Quality Procedures:**
• Testing protocols
• Calibration procedures
• Documentation requirements

🧼 **Facility Procedures:**
• Cleanroom protocols
• Equipment maintenance
• Safety procedures

What specific SOP would you like me to create?`;
  };

  const generateTroubleshootResponse = (message: string): string => {
    if (message.includes('weak seal') || message.includes('seal strength')) {
      return `🔧 **Weak Seal Strength Diagnosis:**

**IMMEDIATE ACTIONS:**
1. ⏸️ Stop production on affected line
2. 🔍 Isolate suspect units for testing
3. 📊 Review last 4 hours of process data

**ROOT CAUSE ANALYSIS:**

**Most Likely Causes:**
🌡️ **Temperature Deviation** (85% probability)
• Check welding head temperature
• Verify thermocouple calibration
• Review heating element condition

⏱️ **Timing Issues** (60% probability)  
• Validate dwell time settings
• Check pneumatic response time
• Verify PLC program integrity

🔧 **Mechanical Issues** (40% probability)
• Inspect welding dies for wear
• Check pressure settings
• Verify alignment

**CORRECTIVE ACTIONS:**
1. Recalibrate temperature controller
2. Replace worn welding dies
3. Adjust pressure to 4.2 bar
4. Retrain operator on parameters

**VERIFICATION:**
• Run 10 test samples
• Perform pull tests (>15N required)
• Document results

Would you like me to create a detailed troubleshooting checklist?`;
    }

    if (message.includes('temperature') && message.includes('fluctuat')) {
      return `🌡️ **Temperature Fluctuation Diagnosis:**

**SYMPTOM ANALYSIS:**
Extruder temperature showing ±8°C variation (normal: ±2°C)

**INVESTIGATION STEPS:**

**1. SENSOR VERIFICATION**
• Check thermocouple connections
• Verify sensor calibration date
• Test with portable thermometer

**2. CONTROL SYSTEM**
• Review PID controller settings
• Check for electrical interference
• Verify power supply stability

**3. MECHANICAL CAUSES**
• Inspect heating elements
• Check insulation integrity
• Verify cooling system operation

**IMMEDIATE FIXES:**
✅ Tighten thermocouple connections
✅ Adjust PID parameters (P=2.5, I=0.8, D=0.1)
✅ Schedule heating element inspection

**PREVENTIVE MEASURES:**
• Monthly sensor calibration
• Quarterly insulation check
• Annual heating element replacement

**EXPECTED RESULT:**
Temperature stability within ±2°C within 2 hours

Need help with other equipment issues?`;
    }

    return `🛠️ **Troubleshooting Assistant Ready**

I can help diagnose and resolve:

⚙️ **Equipment Issues:**
• RF welding problems
• Extruder malfunctions  
• Autoclave issues
• Packaging machine problems

🔍 **Quality Problems:**
• Seal strength issues
• Dimensional variations
• Leak test failures
• Visual defects

📊 **Process Deviations:**
• Temperature fluctuations
• Pressure variations
• Timing issues
• Material flow problems

Describe your specific issue and I'll provide detailed troubleshooting steps!`;
  };

  const generateTrainingResponse = (message: string): string => {
    if (message.includes('new hire') || message.includes('operator training')) {
      return `👥 **New Operator Training Program Generated:**

**BLOOD BAG MANUFACTURING - NEW HIRE TRAINING**

**WEEK 1: FOUNDATIONS**
📚 **Day 1-2: Orientation**
• Company history and values
• Product overview and applications
• Quality management system
• Safety protocols and emergency procedures

📋 **Day 3-5: Basic Procedures**
• Cleanroom protocols and gowning
• Hand hygiene and contamination control
• Documentation requirements
• Basic equipment familiarization

**WEEK 2: PROCESS TRAINING**
🏭 **Production Process:**
• Material handling procedures
• RF welding operation basics
• Quality checkpoints
• Batch record completion

**WEEK 3: HANDS-ON PRACTICE**
👨‍🏫 **Supervised Operation:**
• Shadow experienced operator
• Practice under supervision
• Gradual responsibility increase
• Skills assessment

**ASSESSMENT CRITERIA:**
✅ Safety protocol compliance (100%)
✅ Quality procedure adherence (95%)
✅ Documentation accuracy (98%)
✅ Production rate targets (80% by week 3)

**CERTIFICATION REQUIREMENTS:**
• Written exam (80% minimum)
• Practical demonstration
• Supervisor sign-off

Would you like me to detail any specific training module?`;
    }

    if (message.includes('quality control') || message.includes('quality training')) {
      return `🔍 **Quality Control Training Module:**

**QUALITY INSPECTOR CERTIFICATION PROGRAM**

**MODULE 1: QUALITY FUNDAMENTALS**
📊 **Quality Management System**
• ISO 13485 requirements
• Risk-based thinking
• Process approach
• Continuous improvement

**MODULE 2: INSPECTION TECHNIQUES**
🔬 **Visual Inspection:**
• Defect identification
• Measurement techniques
• Sampling procedures
• Documentation requirements

**MODULE 3: TESTING PROCEDURES**
🧪 **Laboratory Tests:**
• Leak testing methodology
• Tensile strength testing
• Dimensional verification
• Sterility testing basics

**MODULE 4: DATA ANALYSIS**
📈 **Statistical Methods:**
• Control charts
• Capability studies
• Trend analysis
• Corrective action protocols

**PRACTICAL EXERCISES:**
• Defect classification workshop
• Measurement system analysis
• Non-conformance investigation
• Audit techniques

**CERTIFICATION:**
• Theory exam (85% minimum)
• Practical assessment
• Ongoing competency verification

Need training materials for other roles?`;
    }

    return `📚 **Training Content Creator**

I can develop comprehensive training materials for:

👥 **Personnel Training:**
• New hire orientation
• Operator skill development
• Supervisor leadership training
• Cross-training programs

🎯 **Technical Training:**
• Equipment operation
• Quality control procedures
• Maintenance techniques
• Safety protocols

📋 **Compliance Training:**
• Regulatory requirements
• Audit preparation
• Documentation standards
• Change control procedures

What specific training content would you like me to develop?`;
  };

  const generateComplianceResponse = (message: string): string => {
    if (message.includes('iso 13485') || message.includes('iso')) {
      return `✅ **ISO 13485 Compliance Status:**

**CURRENT COMPLIANCE LEVEL: 94%**

**COMPLIANT AREAS:**
✅ **Management System** (100%)
• Quality policy established
• Management review process active
• Resource management adequate

✅ **Design Controls** (98%)
• Design planning documented
• Design inputs/outputs defined
• Design verification completed

✅ **Production Controls** (92%)
• Process validation completed
• Work instructions current
• Equipment qualification active

**AREAS NEEDING ATTENTION:**
⚠️ **Risk Management** (85%)
• Risk analysis needs updating
• Post-market surveillance gaps
• Clinical evaluation incomplete

⚠️ **Corrective Actions** (88%)
• CAPA trending analysis needed
• Root cause analysis improvements
• Effectiveness verification gaps

**ACTION PLAN:**
1. 📋 Update risk management file
2. 🔍 Enhance post-market surveillance
3. 📊 Improve CAPA trending
4. 🎯 Schedule internal audit

**NEXT AUDIT:** March 2024
**CERTIFICATION EXPIRES:** June 2025

Would you like detailed recommendations for any specific clause?`;
    }

    if (message.includes('fda') || message.includes('21 cfr')) {
      return `🏛️ **FDA 21 CFR Part 820 Compliance Review:**

**QSR COMPLIANCE STATUS: 91%**

**STRONG AREAS:**
✅ **Design Controls (820.30)** - 96%
• Design history files complete
• Design reviews documented
• Verification/validation records current

✅ **Production Controls (820.70)** - 94%
• Process validation completed
• Work instructions adequate
• Environmental controls verified

**IMPROVEMENT AREAS:**
⚠️ **Management Controls (820.20)** - 85%
• Management review frequency
• Resource allocation documentation
• Training record completeness

⚠️ **Corrective Actions (820.100)** - 87%
• Investigation timeliness
• Effectiveness verification
• Trend analysis gaps

**CRITICAL REQUIREMENTS:**
🔍 **Device History Record (DHR)**
• Batch documentation complete
• Traceability maintained
• Quality data recorded

📋 **Design History File (DHF)**
• All design phases documented
• Risk analysis current
• Clinical data adequate

**RECOMMENDATIONS:**
1. Enhance management review process
2. Improve CAPA investigation timelines
3. Strengthen training documentation
4. Update risk management procedures

Ready for FDA inspection? Let me help prepare!`;
    }

    return `🛡️ **Compliance Assistant**

I can help verify compliance with:

📋 **Quality Standards:**
• ISO 13485:2016 (Medical Devices)
• ISO 9001:2015 (Quality Management)
• ISO 14971 (Risk Management)

🏛️ **Regulatory Requirements:**
• FDA 21 CFR Part 820 (QSR)
• EU MDR 2017/745
• Health Canada CMDCAS

🌍 **International Standards:**
• WHO Good Manufacturing Practice
• Japanese PMDA requirements
• Brazilian ANVISA regulations

What specific compliance area would you like me to review?`;
  };

  const generateOptimizationResponse = (message: string): string => {
    if (message.includes('changeover') || message.includes('setup')) {
      return `🔄 **Changeover Time Optimization Analysis:**

**CURRENT STATE:**
⏱️ **Average Changeover Time:** 45 minutes
🎯 **Target:** 20 minutes (SMED methodology)

**TIME BREAKDOWN:**
• Equipment shutdown: 8 minutes
• Cleaning/sanitization: 15 minutes  
• Die/tooling change: 12 minutes
• Setup/calibration: 7 minutes
• First article approval: 3 minutes

**OPTIMIZATION OPPORTUNITIES:**

**1. EXTERNAL SETUP (15 min savings)**
• Pre-stage next product materials
• Prepare tooling during production
• Pre-mix cleaning solutions
• Ready calibration equipment

**2. PARALLEL ACTIVITIES (8 min savings)**
• Simultaneous cleaning operations
• Parallel die changes (2 operators)
• Concurrent calibration checks

**3. STANDARDIZATION (5 min savings)**
• Standard tool heights
• Quick-connect fittings
• Color-coded components
• Visual setup guides

**IMPLEMENTATION PLAN:**
📅 **Week 1:** External setup preparation
📅 **Week 2:** Parallel activity training
📅 **Week 3:** Standardization implementation
📅 **Week 4:** Full SMED deployment

**EXPECTED RESULTS:**
• 56% reduction in changeover time
• 12% increase in production capacity
• ₹2.8M annual savings

Would you like detailed implementation steps?`;
    }

    if (message.includes('waste') || message.includes('material')) {
      return `♻️ **Material Waste Reduction Analysis:**

**CURRENT WASTE LEVELS:**
📊 **Total Material Waste:** 3.2% of input
🎯 **Industry Benchmark:** 1.8%
💰 **Annual Waste Cost:** ₹4.2M

**WASTE BREAKDOWN:**
• Startup/shutdown waste: 1.1%
• Quality rejects: 0.9%
• Changeover waste: 0.7%
• Trim/edge waste: 0.5%

**OPTIMIZATION STRATEGIES:**

**1. STARTUP OPTIMIZATION**
• Reduce warm-up material usage
• Implement predictive heating
• Optimize parameter ramp-up
**Potential Savings:** 0.6%

**2. QUALITY IMPROVEMENT**
• Enhanced process control
• Real-time monitoring
• Predictive quality analytics
**Potential Savings:** 0.4%

**3. CHANGEOVER EFFICIENCY**
• Minimize purge material
• Optimize cleaning procedures
• Reduce setup waste
**Potential Savings:** 0.3%

**4. DESIGN OPTIMIZATION**
• Minimize trim requirements
• Optimize nesting patterns
• Reduce edge waste
**Potential Savings:** 0.2%

**TOTAL POTENTIAL REDUCTION:** 1.5%
**ANNUAL SAVINGS:** ₹2.6M

**IMPLEMENTATION PRIORITY:**
1. 🥇 Startup optimization (quick wins)
2. 🥈 Quality improvements (medium term)
3. 🥉 Design changes (long term)

Ready to implement these improvements?`;
    }

    return `📈 **Process Optimization Assistant**

I can analyze and optimize:

⚡ **Efficiency Improvements:**
• Cycle time reduction
• Changeover optimization
• Throughput enhancement
• Bottleneck elimination

💰 **Cost Reduction:**
• Material waste minimization
• Energy consumption optimization
• Labor efficiency improvements
• Maintenance cost reduction

🎯 **Quality Enhancement:**
• Defect rate reduction
• Process capability improvement
• Variation reduction
• First-pass yield optimization

What specific process would you like me to optimize?`;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getButtonColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      red: 'bg-red-600 hover:bg-red-700',
      teal: 'bg-teal-600 hover:bg-teal-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generative AI Demo</h1>
        <p className="text-gray-600">AI-powered assistant for blood bag manufacturing excellence</p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">30M+</div>
            <div className="text-sm text-gray-600">Annual Production</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">130+</div>
            <div className="text-sm text-gray-600">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">ISO 13485</div>
            <div className="text-sm text-gray-600">Quality Certified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">24/7</div>
            <div className="text-sm text-gray-600">AI Assistant Ready</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Use Cases */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Use Cases</h3>
            <div className="space-y-2">
              {useCases.map((useCase) => {
                const Icon = useCase.icon;
                const isActive = activeUseCase === useCase.id;
                
                return (
                  <button
                    key={useCase.id}
                    onClick={() => setActiveUseCase(useCase.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center space-x-3 ${
                      isActive 
                        ? `${getColorClasses(useCase.color)} border-2` 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">{useCase.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className={`${getButtonColor(currentUseCase.color)} text-white p-4`}>
              <div className="flex items-center space-x-3">
                <currentUseCase.icon className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">{currentUseCase.title}</h3>
                  <p className="text-sm opacity-90">{currentUseCase.description}</p>
                </div>
                <div className="ml-auto text-sm opacity-80">
                  Status: Online • Real-time data enabled
                </div>
              </div>
            </div>

            {/* Quick Queries */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="text-sm font-medium text-gray-700 mb-2">Quick Questions:</div>
              <div className="flex flex-wrap gap-2">
                {currentUseCase.quickQueries.slice(0, 4).map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuery(query)}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs hover:border-indigo-300 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'order-1 ml-2' : 'order-2 mr-2'}`}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-xs lg:max-w-md xl:max-w-lg order-1">
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-lg rounded-bl-sm p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center order-2 mr-2">
                    <Bot className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-3">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask about ${currentUseCase.title.toLowerCase()}...`}
                  className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`${getButtonColor(currentUseCase.color)} text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Section */}
      <div className="text-center bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Experience the power of Gen AI!</h3>
        <p className="text-green-700 mb-4">These AI assistants can transform how we work in manufacturing</p>
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

export default GenAIDemoSection;