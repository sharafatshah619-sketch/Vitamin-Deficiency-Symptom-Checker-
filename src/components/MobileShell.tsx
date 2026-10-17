import React, { useState } from 'react';
import { 
  Activity, 
  BookOpen, 
  FileText, 
  Utensils, 
  Smartphone, 
  Maximize2, 
  Shuffle, 
  ShieldAlert, 
  Wifi, 
  Battery, 
  User, 
  Info,
  X
} from 'lucide-react';
import { SynergyCheckerModal } from './SynergyCheckerModal';

export type TabId = 'checker' | 'bodymap' | 'encyclopedia' | 'diet' | 'doctor';

interface MobileShellProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  symptomsCount: number;
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  activeTab,
  onTabChange,
  symptomsCount,
  children,
}) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showSynergyModal, setShowSynergyModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4 text-slate-900 font-sans">
      {/* Top Desktop Controls Bar (visible on larger screens) */}
      <div className="hidden sm:flex items-center justify-between max-w-md w-full mb-3 px-2 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>NutriCheck Mobile Clinical App</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSynergyModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Check vitamin & mineral interactions"
          >
            <Shuffle className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactions</span>
          </button>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Toggle device simulation frame"
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container - Phone Frame or Full Container */}
      <div
        className={`w-full bg-slate-100 flex flex-col relative overflow-hidden transition-all duration-300 ${
          isPhoneFrame
            ? 'sm:max-w-[420px] sm:h-[860px] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:border-[10px] sm:border-slate-800'
            : 'max-w-2xl min-h-screen sm:min-h-[90vh] sm:rounded-3xl sm:shadow-2xl sm:border border-slate-700'
        }`}
      >
        {/* Realistic Mobile Status Bar (visible in frame mode) */}
        <div className="w-full bg-slate-900 text-white px-7 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold select-none z-30 shrink-0">
          <span>9:41</span>
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* App Header */}
        <header className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 z-20 shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-sm">
              <Activity className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm tracking-tight">NutriCheck</h1>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Rx
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Micronutrient Diagnostic Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSynergyModal(true)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Nutrient interactions & synergy"
            >
              <Shuffle className="w-4 h-4 text-teal-400" />
            </button>
            <button
              onClick={() => setShowDisclaimer(true)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Medical disclaimer"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 scroll-smooth">
          {children}
        </main>

        {/* Bottom Tab Bar Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around z-30 select-none shadow-lg">
          <button
            onClick={() => onTabChange('checker')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all relative ${
              activeTab === 'checker' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Activity className={`w-5 h-5 ${activeTab === 'checker' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {symptomsCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {symptomsCount}
                </span>
              )}
            </div>
            <span className="text-[10px]">Checker</span>
          </button>

          <button
            onClick={() => onTabChange('bodymap')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'bodymap' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'bodymap' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px]">Body Map</span>
          </button>

          <button
            onClick={() => onTabChange('encyclopedia')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'encyclopedia' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'encyclopedia' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px]">Vitamins</span>
          </button>

          <button
            onClick={() => onTabChange('diet')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'diet' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className={`w-5 h-5 ${activeTab === 'diet' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px]">Diet Risk</span>
          </button>

          <button
            onClick={() => onTabChange('doctor')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'doctor' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className={`w-5 h-5 ${activeTab === 'doctor' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px]">Doctor Prep</span>
          </button>
        </nav>

        {/* Bottom Phone Bar Indicator */}
        {isPhoneFrame && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/60 rounded-full pointer-events-none z-40 hidden sm:block" />
        )}
      </div>

      {/* Synergy Checker Modal */}
      <SynergyCheckerModal
        isOpen={showSynergyModal}
        onClose={() => setShowSynergyModal(false)}
      />

      {/* Educational & Medical Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm text-slate-900">Clinical Triage & Legal Advisory</h3>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                <strong>Educational Purpose:</strong> NutriCheck is an educational and clinical triaging engine designed to help individuals and clinicians explore micronutrient pathways, biochemical co-factors, and food sources.
              </p>
              <p>
                <strong>Not a Substitute for Diagnosis:</strong> This app does not provide formal medical diagnosis, clinical treatment plans, or prescription dosing. Symptoms such as severe fatigue, tingling, or bleeding may have non-nutritional etiologies requiring physician workup.
              </p>
              <p>
                <strong>Red Flag Protocol:</strong> If you experience severe chest pain, sudden vision loss, progressive leg paralysis, or severe shortness of breath, please immediately seek emergency medical services.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDisclaimer(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
