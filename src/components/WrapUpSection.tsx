import React, { useState } from 'react';
import { Home, CheckCircle, MessageCircle, Star, Download } from 'lucide-react';

interface WrapUpSectionProps {
  onComplete: () => void;
}

const keyTakeaways = [
  {
    title: "Industry 4.0 Foundation",
    points: [
      "Understanding the evolution from manual to smart manufacturing",
      "Key technologies: IoT, AI, Big Data, Cloud, AR, Digital Twin",
      "Clear differentiation between digitization, digitalization, and digital transformation"
    ]
  },
  {
    title: "Blood Bag Production Opportunities", 
    points: [
      "Quality control through AI-powered computer vision",
      "Predictive maintenance for critical equipment",
      "Real-time monitoring across all production stages",
      "Automated data collection and analysis"
    ]
  },
  {
    title: "Implementation Strategy",
    points: [
      "Phased approach over 36 months with clear milestones",
      "Start with IoT sensors and data infrastructure (Phase 1)",
      "Build AI capabilities and predictive analytics (Phase 2)", 
      "Full automation and digital twin implementation (Phase 3)"
    ]
  },
  {
    title: "Success Factors",
    points: [
      "Strong leadership commitment and change management",
      "Comprehensive staff training and upskilling programs",
      "Structured investment with clear ROI tracking",
      "Focus on quick wins to build momentum"
    ]
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
    category: "Short Term (Next 3 months)", 
    color: "orange",
    items: [
      "Develop detailed Phase 1 project plan",
      "Secure budget approval for Phase 1",
      "Begin staff training on digital technologies",
      "Establish baseline KPIs for measurement"
    ]
  },
  {
    category: "Medium Term (Next 6 months)",
    color: "blue", 
    items: [
      "Complete Phase 1 IoT sensor deployment",
      "Implement data collection and basic analytics",
      "Start Phase 2 planning and vendor selection",
      "Measure and communicate Phase 1 results"
    ]
  }
];

const WrapUpSection: React.FC<WrapUpSectionProps> = ({ onComplete }) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comments: '',
    mostValuable: '',
    suggestions: ''
  });
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const handleFeedbackSubmit = () => {
    // In a real app, this would send feedback to a backend
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
    setShowFeedback(false);
    onComplete();
  };

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-50 border-red-200 text-red-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-white rounded-xl shadow-lg p-6">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wrap-Up & Q&A</h1>
        <p className="text-gray-600">Summary, questions, and next steps</p>
      </div>

      {/* Workshop Summary */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Workshop Summary</h2>
        
        <div className="space-y-6">
          {keyTakeaways.map((takeaway, index) => (
            <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{takeaway.title}</h3>
              <ul className="space-y-2">
                {takeaway.points.map((point, idx) => (
                  <li key={idx} className="text-sm text-blue-800 flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


      {/* Q&A Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Questions & Discussion</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Questions</h3>
            <div className="flex space-x-3">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What questions do you have about Industry 4.0 implementation?"
              />
              <button
                onClick={handleAddQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Add
              </button>
            </div>
          </div>
          
          {questions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion Topics:</h3>
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <MessageCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-800">{question}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WrapUpSection;