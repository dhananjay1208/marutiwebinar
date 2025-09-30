import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Users, Lightbulb, Cog, Factory, Rocket, CheckCircle, Clock, ArrowRight, Brain } from 'lucide-react';
import { Network } from 'lucide-react';
import WelcomeSection from './components/WelcomeSection';
import BuzzwordsSection from './components/BuzzwordsSection';
import EvolutionSection from './components/EvolutionSection';
import WhyNowSection from './components/WhyNowSection';
import AutomotiveManufacturingSection from './components/AutomotiveManufacturingSection';
import TechnologyPillarsSection from './components/TechnologyPillarsSection';
import TechPillarsMappingSection from './components/TechPillarsMappingSection';
import ProcessMappingSection from './components/ProcessMappingSection';
import GroupActivitySection from './components/GroupActivitySection';
import RoadmapSection from './components/RoadmapSection';
import WrapUpSection from './components/WrapUpSection';
import GenAIDemoSection from './components/GenAIDemoSection';
import MESDemoSection from './components/MESDemoSection';
import ISA95PyramidSection from './components/ISA95PyramidSection';
import TechEcosystemSection from './components/TechEcosystemSection';
import UnifiedNamespaceSection from './components/UnifiedNamespaceSection';
import WorkshopAgendaSection from './components/WorkshopAgendaSection';

const sections = [
  { id: 0, title: 'Workshop Agenda', icon: Home, color: 'bg-blue-500' },
  { id: 1, title: 'Welcome & Introduction', icon: Home, color: 'bg-blue-500' },
  { id: 2, title: 'Demystifying Buzzwords', icon: Lightbulb, color: 'bg-purple-500' },
  { id: 3, title: 'Evolution of Industry 4.0', icon: Clock, color: 'bg-green-500' },
  { id: 4, title: 'Why Industry 4.0, Why Now', icon: Rocket, color: 'bg-orange-500' },
  { id: 5, title: 'Automotive Manufacturing Process', icon: Factory, color: 'bg-cyan-500' },
  { id: 6, title: 'Technology Pillars', icon: Cog, color: 'bg-red-500' },
  { id: 7, title: 'Tech Pillars Mapping', icon: Factory, color: 'bg-indigo-500' },
  { id: 8, title: 'Mapping to Maruti Suzuki Process', icon: Factory, color: 'bg-purple-500' },
  { id: 9, title: 'Group Activity: Brainstorm', icon: Users, color: 'bg-yellow-500' },
  { id: 10, title: 'Gen AI Demo', icon: Brain, color: 'bg-indigo-500' },
  { id: 11, title: 'MES Demo', icon: ArrowRight, color: 'bg-teal-500' },
  { id: 12, title: 'ISA 95 Automation Pyramid', icon: Factory, color: 'bg-purple-500' },
  { id: 13, title: 'Tech Ecosystem', icon: Network, color: 'bg-indigo-500' },
  { id: 14, title: 'Unified Namespace', icon: ArrowRight, color: 'bg-blue-500' },
  { id: 15, title: 'Roadmap & Challenges', icon: CheckCircle, color: 'bg-pink-500' },
  { id: 16, title: 'Wrap-Up & Q&A', icon: Home, color: 'bg-gray-500' },
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const markComplete = (sectionId: number) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0: return <WorkshopAgendaSection onComplete={() => markComplete(0)} />;
      case 1: return <WelcomeSection onComplete={() => markComplete(1)} />;
      case 2: return <BuzzwordsSection onComplete={() => markComplete(2)} />;
      case 3: return <EvolutionSection onComplete={() => markComplete(3)} />;
      case 4: return <WhyNowSection onComplete={() => markComplete(4)} />;
      case 5: return <AutomotiveManufacturingSection onComplete={() => markComplete(5)} />;
      case 6: return <TechnologyPillarsSection onComplete={() => markComplete(6)} />;
      case 7: return <TechPillarsMappingSection onComplete={() => markComplete(7)} />;
      case 8: return <ProcessMappingSection onComplete={() => markComplete(8)} />;
      case 9: return <GroupActivitySection onComplete={() => markComplete(9)} />;
      case 10: return <GenAIDemoSection onComplete={() => markComplete(10)} />;
      case 11: return <MESDemoSection onComplete={() => markComplete(11)} />;
      case 12: return <ISA95PyramidSection onComplete={() => markComplete(12)} />;
      case 13: return <TechEcosystemSection onComplete={() => markComplete(13)} />;
      case 14: return <UnifiedNamespaceSection onComplete={() => markComplete(14)} />;
      case 15: return <RoadmapSection onComplete={() => markComplete(15)} />;
      case 16: return <WrapUpSection onComplete={() => markComplete(16)} />;
      default: return <WorkshopAgendaSection onComplete={() => markComplete(0)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Industry 4.0 Training</h1>
                <p className="text-sm text-gray-600">Maruti Suzuki - Smart Manufacturing</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSections.length / sections.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{completedSections.length}/{sections.length}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-80 bg-white shadow-lg h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Workshop Agenda</h2>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = currentSection === section.id;
                const isCompleted = completedSections.includes(section.id);
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left ${
                      isActive 
                        ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-900' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' : section.color + ' text-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{section.id + 1}. {section.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {renderCurrentSection()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <div className="text-sm text-gray-500">
                Section {currentSection + 1} of {sections.length}
              </div>
              
              <button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                disabled={currentSection === sections.length - 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;