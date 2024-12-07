import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  User,
  Users,
  Heart,
  CheckSquare,
  Brain,
  ChevronDown,
  Folder
} from 'lucide-react';
import { GRADES } from '../types';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGradesOpen, setIsGradesOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Ana Sayfa' },
    { path: '/my-channel', icon: User, label: 'Benim Kanalım' },
    { path: '/channels', icon: Users, label: 'Tüm Kanallar' },
    { path: '/favorites', icon: Heart, label: 'Favorilerim' },
    { path: '/watched', icon: CheckSquare, label: 'İzlediklerim' },
    { path: '/ai-chat', icon: Brain, label: "AInstein'e Danış" },
  ];

  const gradeColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
  ];

  return (
    <div
      className={`h-screen bg-gray-800 transition-all duration-300 flex flex-col
        ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setIsGradesOpen(false);
      }}
    >
      <div className="p-4 border-b border-gray-700">
        <button
          className={`flex items-center space-x-2 w-full ${
            isExpanded ? 'justify-between' : 'justify-center'
          }`}
          onClick={() => setIsGradesOpen(!isGradesOpen)}
        >
          <div className="flex items-center">
            <Folder className="w-6 h-6" />
            {isExpanded && <span className="ml-2">Sınıf Seç</span>}
          </div>
          {isExpanded && (
            <ChevronDown className={`transform transition-transform ${
              isGradesOpen ? 'rotate-180' : ''
            }`} />
          )}
        </button>
        
        {isGradesOpen && isExpanded && (
          <div className="mt-2 space-y-1">
            {GRADES.map((grade, index) => (
              <Link
                key={grade}
                to={`/grade/${grade}`}
                className={`block px-2 py-1 rounded ${gradeColors[index % gradeColors.length]} 
                  hover:opacity-80 transition-opacity`}
              >
                {grade}. Sınıf
              </Link>
            ))}
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-4 hover:bg-gray-700 transition-colors
              ${location.pathname === item.path ? 'bg-gray-700' : ''}
              ${isExpanded ? 'justify-start' : 'justify-center'}`}
          >
            <item.icon className="w-6 h-6" />
            {isExpanded && <span className="ml-2">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
