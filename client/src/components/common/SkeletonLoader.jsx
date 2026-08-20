import React from 'react';
import { Package, CheckCircle2, Clock, Truck, Home, AlertCircle } from 'lucide-react';

export const SkeletonLoader = ({ type = 'card', count = 4 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-3 space-y-3">
            <div className="w-full aspect-square rounded-xl animate-shimmer"></div>
            <div className="h-4 w-3/4 rounded-md animate-shimmer"></div>
            <div className="h-3 w-1/2 rounded-md animate-shimmer"></div>
            <div className="h-5 w-1/3 rounded-md animate-shimmer"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 w-full rounded-2xl animate-shimmer"></div>
      ))}
    </div>
  );
};

export const EmptyState = ({ icon: Icon = Package, title, description, actionText, onAction }) => {
  return (
    <div className="py-16 px-4 text-center glass-panel rounded-3xl max-w-md mx-auto my-8 border border-white/80">
      <div className="w-16 h-16 rounded-2xl bg-slate-200/60 flex items-center justify-center mx-auto mb-4 text-slate-700">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
      {description && <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">{description}</p>}
      {actionText && (
        <button
          onClick={onAction}
          className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const OrderTimeline = ({ timeline = [] }) => {
  return (
    <div className="space-y-6 py-4">
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pl-6">
        {timeline.map((step, idx) => {
          const isCompleted = step.isCompleted;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 transition-all ${
                  isCompleted
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={14} /> : <Clock size={12} />}
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2">
                  <h5
                    className={`text-xs font-bold ${
                      isCompleted ? 'text-slate-900 font-extrabold' : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </h5>
                  {step.timestamp && (
                    <span className="text-[10px] text-slate-400">
                      {new Date(step.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {step.description && (
                  <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
