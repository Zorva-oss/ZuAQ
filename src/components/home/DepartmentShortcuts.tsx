import React from 'react';
import {
  Headphones,
  Watch,
  Footprints,
  Sparkles,
  Briefcase,
  Activity,
  Layers,
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/mockData';

interface DepartmentShortcutsProps {
  selectedDepartment: string;
  onSelectDepartment: (dept: string) => void;
}

export const DepartmentShortcuts: React.FC<DepartmentShortcutsProps> = ({
  selectedDepartment,
  onSelectDepartment,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Watch':
        return <Watch className="w-5 h-5" />;
      case 'Footprints':
        return <Footprints className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'HeartPulse':
        return <Activity className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Popular Departments
            </h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Instant Filter
          </span>
        </div>

        {/* 6 Responsive Department Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDepartment === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => onSelectDepartment(isSelected ? 'All' : dept.id)}
                className={`p-4 rounded-2xl text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-2 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102 ring-2 ring-blue-300'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80 shadow-2xs hover:border-slate-300 hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : dept.color
                  }`}
                >
                  {getIcon(dept.icon)}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold truncate ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {dept.name}
                  </p>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {dept.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
