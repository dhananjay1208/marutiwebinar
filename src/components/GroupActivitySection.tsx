import React, { useState } from 'react';
import { Users, Plus, Lightbulb, Target, Star } from 'lucide-react';

interface GroupActivitySectionProps {
  onComplete: () => void;
}

const brainstormCategories = [
  {
    id: 1,
    title: "Quality Improvement",
    icon: Target,
    color: "blue",
    description: "Ideas to enhance product quality and reduce defects",
    prompts: [
      "How can we detect paint defects or panel imperfections?",
      "What sensors could monitor weld quality in real-time?",
      "How might AI help predict quality issues before they occur?"
    ]
  },
  {
    id: 2, 
    title: "Efficiency Enhancement",
    icon: Star,
    color: "green",
    description: "Ways to improve speed, reduce waste, and optimize processes",
    prompts: [
      "Which manual processes could be automated?",
      "How can we reduce material waste in production?",
      "What data could help optimize production schedules?"
    ]
  },
  {
    id: 3,
    title: "Predictive Maintenance",
    icon: Lightbulb,
    color: "purple", 
    description: "Preventing equipment failures before they happen",
    prompts: [
      "What equipment failures cause the most downtime?",
      "Which sensors could predict when maintenance is needed?",
      "How could AR help with maintenance procedures?"
    ]
  }
];

interface Idea {
  id: number;
  category: number;
  title: string;
  description: string;
  technology: string;
  impact: string;
  votes: number;
}

const GroupActivitySection: React.FC<GroupActivitySectionProps> = ({ onComplete }) => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    technology: '',
    impact: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddIdea = () => {
    if (newIdea.title && newIdea.description) {
      const idea: Idea = {
        id: Date.now(),
        category: activeCategory,
        title: newIdea.title,
        description: newIdea.description,
        technology: newIdea.technology,
        impact: newIdea.impact,
        votes: 0
      };
      
      setIdeas([...ideas, idea]);
      setNewIdea({ title: '', description: '', technology: '', impact: '' });
      setShowAddForm(false);
    }
  };

  const handleVote = (ideaId: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
    ));
  };

  const getCategoryIdeas = (categoryId: number) => {
    return ideas.filter(idea => idea.category === categoryId);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-500 text-blue-800',
      green: 'bg-green-100 border-green-500 text-green-800',
      purple: 'bg-purple-100 border-purple-500 text-purple-800'
    };
    return colors[color as keyof typeof colors];
  };

  const getButtonColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700', 
      purple: 'bg-purple-600 hover:bg-purple-700'
    };
    return colors[color as keyof typeof colors];
  };

  const activeCtg = brainstormCategories.find(c => c.id === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Activity: Use Case Brainstorm</h1>
        <p className="text-gray-600">Your ideas for applying Industry 4.0 in automotive production</p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Activity Instructions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">🎯 Objective</h3>
            <p className="text-sm text-blue-700">Generate practical Industry 4.0 use cases specific to Maruti Suzuki's automotive manufacturing process</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">⏱️ Time</h3>
            <p className="text-sm text-blue-700">20 minutes - 5 minutes per category, 5 minutes for voting and discussion</p>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Brainstorm Category</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {brainstormCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isActive 
                    ? `${getColorClasses(category.color)} border-${category.color}-500` 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-6 h-6 ${isActive ? '' : 'text-gray-600'}`} />
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <p className="text-sm opacity-80">{category.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Content */}
      {activeCtg && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{activeCtg.title}</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className={`${getButtonColor(activeCtg.color)} text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2`}
            >
              <Plus className="w-5 h-5" />
              <span>Add Idea</span>
            </button>
          </div>

          {/* Brainstorm Prompts */}
          <div className={`mb-6 p-4 rounded-lg ${getColorClasses(activeCtg.color)}`}>
            <h3 className="font-semibold mb-2">💡 Think About:</h3>
            <ul className="space-y-1">
              {activeCtg.prompts.map((prompt, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  {prompt}
                </li>
              ))}
            </ul>
          </div>

          {/* Add Idea Form */}
          {showAddForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Idea</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idea Title*</label>
                  <input
                    type="text"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief title for your idea"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technology</label>
                  <input
                    type="text"
                    value={newIdea.technology}
                    onChange={(e) => setNewIdea({...newIdea, technology: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., IoT Sensors, AI, Robotics"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Detailed description of your idea"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Impact</label>
                <input
                  type="text"
                  value={newIdea.impact}
                  onChange={(e) => setNewIdea({...newIdea, impact: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 50% reduction in defects, 30% faster production"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddIdea}
                  disabled={!newIdea.title || !newIdea.description}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Add Idea
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Ideas List */}
          <div className="space-y-4">
            {getCategoryIdeas(activeCategory).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No ideas yet. Be the first to add one!</p>
              </div>
            ) : (
              getCategoryIdeas(activeCategory)
                .sort((a, b) => b.votes - a.votes)
                .map((idea) => (
                  <div key={idea.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{idea.title}</h4>
                      <button
                        onClick={() => handleVote(idea.id)}
                        className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors duration-200"
                      >
                        <span>👍</span>
                        <span>{idea.votes}</span>
                      </button>
                    </div>
                    <p className="text-gray-700 mb-3">{idea.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {idea.technology && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {idea.technology}
                        </span>
                      )}
                      {idea.impact && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {idea.impact}
                        </span>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {ideas.length >= 3 && (
        <div className="bg-green-50 rounded-xl p-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Great brainstorming session!</h3>
          <p className="text-green-700 mb-4">
            You've generated {ideas.length} ideas across {new Set(ideas.map(i => i.category)).size} categories. 
            These practical use cases show the potential for Industry 4.0 in your production process.
          </p>
          <button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            View Tech Demos
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupActivitySection;