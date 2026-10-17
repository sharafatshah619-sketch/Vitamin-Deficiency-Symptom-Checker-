import React, { useState, useMemo } from 'react';
import { 
  SelectedSymptom, 
  CalculatedNutrientMatch, 
  AIAnalysisResult, 
  SavedAssessment, 
  BodyZoneId,
  SymptomIntensity 
} from '../types/nutrition';
import { SYMPTOMS_DATA, BODY_ZONES } from '../data/symptomsData';
import { RISK_FACTORS } from '../data/riskFactorsData';
import { calculateNutrientDeficiencies } from '../utils/symptomMatcher';
import { 
  Search, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ShieldAlert, 
  Apple, 
  FileText, 
  Save, 
  RotateCcw, 
  BookmarkCheck,
  Zap,
  Info,
  Sliders,
  Gauge
} from 'lucide-react';

// Intensity to numeric slider helpers
const intensityToValue = (intensity?: SymptomIntensity | string): number => {
  if (intensity === 'Severe' || intensity === 'severe') return 3;
  if (intensity === 'Moderate' || intensity === 'moderate') return 2;
  return 1; // Mild
};

const valueToIntensity = (val: number): SymptomIntensity => {
  if (val >= 3) return 'Severe';
  if (val === 2) return 'Moderate';
  return 'Mild';
};

interface CheckerTabProps {
  selectedSymptoms: SelectedSymptom[];
  onUpdateSymptoms: (symptoms: SelectedSymptom[]) => void;
  selectedRiskFactors: string[];
  onUpdateRiskFactors: (rf: string[]) => void;
  onAssessmentCompleted?: (data: {
    symptomsCount: number;
    topNutrients: string[];
    redFlags: string[];
    aiQuestions?: string[];
  }) => void;
}

// Preset clusters for quick clinical exploration
const PRESET_CLUSTERS = [
  {
    name: 'Exhaustion & Anemia',
    symptomIds: ['fatigue_profound', 'shortness_of_breath_exertion', 'cold_intolerance', 'pale_sallow_skin'],
    riskIds: ['heavy_menstrual_bleeding'],
  },
  {
    name: 'Tingling & Neuropathy',
    symptomIds: ['pins_needles_feet', 'brain_fog', 'glossitis_smooth_tongue', 'unsteady_gait'],
    riskIds: ['vegan_vegetarian', 'ppi_antacids'],
  },
  {
    name: 'Hair, Nails & Skin',
    symptomIds: ['hair_loss_diffuse', 'brittle_peeling_nails', 'angular_cheilitis', 'easy_bruising'],
    riskIds: ['low_produce_diet'],
  },
  {
    name: 'Winter Muscle & Mood',
    symptomIds: ['depressed_mood_winter', 'nocturnal_calf_cramps', 'eyelid_twitching', 'bone_pain_shin_sternum'],
    riskIds: ['low_sunlight', 'chronic_stress'],
  },
];

export const CheckerTab: React.FC<CheckerTabProps> = ({
  selectedSymptoms,
  onUpdateSymptoms,
  selectedRiskFactors,
  onUpdateRiskFactors,
  onAssessmentCompleted,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<'all' | BodyZoneId>('all');
  const [expandedNutrientId, setExpandedNutrientId] = useState<string | null>(null);

  // AI analysis state
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculate clinical algorithm matches
  const { matches, redFlags } = useMemo(() => {
    return calculateNutrientDeficiencies(selectedSymptoms, selectedRiskFactors);
  }, [selectedSymptoms, selectedRiskFactors]);

  // Symptoms filtered by search and body zone
  const filteredSymptoms = useMemo(() => {
    return SYMPTOMS_DATA.filter((sym) => {
      const matchesZone = selectedZone === 'all' || sym.zone === selectedZone;
      const matchesSearch =
        sym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sym.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesZone && matchesSearch;
    });
  }, [searchQuery, selectedZone]);

  // Toggle symptom selection
  const handleToggleSymptom = (symptomId: string) => {
    const exists = selectedSymptoms.find((s) => s.symptomId === symptomId);
    if (exists) {
      onUpdateSymptoms(selectedSymptoms.filter((s) => s.symptomId !== symptomId));
    } else {
      onUpdateSymptoms([
        ...selectedSymptoms,
        { symptomId, intensity: 'Moderate', severity: 'moderate', duration: 'weeks' },
      ]);
    }
  };

  // Update symptom intensity, severity or duration
  const handleUpdateSymptomProperty = (
    symptomId: string,
    property: 'intensity' | 'severity' | 'duration',
    value: any
  ) => {
    onUpdateSymptoms(
      selectedSymptoms.map((s) => {
        if (s.symptomId !== symptomId) return s;
        if (property === 'intensity') {
          const intensityVal = value as SymptomIntensity;
          return {
            ...s,
            intensity: intensityVal,
            severity: intensityVal.toLowerCase() as 'mild' | 'moderate' | 'severe',
          };
        }
        if (property === 'severity') {
          const sevVal = value as 'mild' | 'moderate' | 'severe';
          const intVal: SymptomIntensity =
            sevVal === 'severe' ? 'Severe' : sevVal === 'mild' ? 'Mild' : 'Moderate';
          return {
            ...s,
            severity: sevVal,
            intensity: intVal,
          };
        }
        return { ...s, [property]: value };
      })
    );
  };

  // Toggle risk factor
  const handleToggleRiskFactor = (rfId: string) => {
    if (selectedRiskFactors.includes(rfId)) {
      onUpdateRiskFactors(selectedRiskFactors.filter((id) => id !== rfId));
    } else {
      onUpdateRiskFactors([...selectedRiskFactors, rfId]);
    }
  };

  // Load a preset cluster
  const handleLoadPreset = (preset: typeof PRESET_CLUSTERS[0]) => {
    const newSymptoms: SelectedSymptom[] = preset.symptomIds.map((id) => ({
      symptomId: id,
      intensity: 'Moderate',
      severity: 'moderate',
      duration: 'weeks',
    }));
    onUpdateSymptoms(newSymptoms);
    onUpdateRiskFactors(preset.riskIds);
    setActiveStep(3);
  };

  // Reset entire check
  const handleReset = () => {
    onUpdateSymptoms([]);
    onUpdateRiskFactors([]);
    setAiAnalysis(null);
    setAiError(null);
    setActiveStep(1);
  };

  // Call AI Clinical Nutritionist endpoint
  const handleRunAiAnalysis = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsAiLoading(true);
    setAiError(null);

    const symptomMap = new Map(SYMPTOMS_DATA.map((s) => [s.id, s]));
    const formattedSymptoms = selectedSymptoms.map((s) => {
      const data = symptomMap.get(s.symptomId);
      const intensity = s.intensity || (s.severity ? s.severity.charAt(0).toUpperCase() + s.severity.slice(1) : 'Moderate');
      return {
        name: data?.name || s.symptomId,
        category: data?.zone || 'general',
        intensity,
        severity: intensity.toLowerCase(),
        duration: s.duration,
      };
    });

    const topScores = matches.slice(0, 4).map((m) => ({
      name: m.nutrient.name,
      score: m.matchScore,
    }));

    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: formattedSymptoms,
          riskFactors: selectedRiskFactors,
          clinicalScores: topScores,
        }),
      });

      if (!response.ok) {
        throw new Error('AI analysis service unavailable');
      }

      const resData = await response.json();
      if (resData.success && resData.analysis) {
        setAiAnalysis(resData.analysis);
        if (onAssessmentCompleted) {
          onAssessmentCompleted({
            symptomsCount: selectedSymptoms.length,
            topNutrients: matches.slice(0, 3).map((m) => m.nutrient.name),
            redFlags: redFlags.map((r) => r.notice),
            aiQuestions: resData.analysis.doctorDiscussionQuestions,
          });
        }
      } else {
        throw new Error('Could not parse AI analysis');
      }
    } catch (err: any) {
      console.warn('AI analysis fallback:', err);
      setAiError('AI consultation service is currently in offline mode. Baseline clinical algorithm results are fully active.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Save current assessment to localStorage
  const handleSaveAssessment = () => {
    if (selectedSymptoms.length === 0) return;
    const topMatch = matches[0];
    const symptomMap = new Map(SYMPTOMS_DATA.map((s) => [s.id, s]));
    const symptomNames = selectedSymptoms.map(
      (s) => symptomMap.get(s.symptomId)?.name || s.symptomId
    );

    const record: SavedAssessment = {
      id: `assessment_${Date.now()}`,
      timestamp: new Date().toISOString(),
      symptomsCount: selectedSymptoms.length,
      topDeficiencyName: topMatch?.nutrient.name || 'General Evaluation',
      topScore: topMatch?.matchScore || 0,
      symptomsList: symptomNames,
      aiSummary: aiAnalysis?.clinicalSummary,
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem('nutricheck_saved_assessments') || '[]'
      );
      localStorage.setItem(
        'nutricheck_saved_assessments',
        JSON.stringify([record, ...existing])
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.warn('Failed to save assessment:', e);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Step Navigation Pill-free bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-2xl">
        <button
          onClick={() => setActiveStep(1)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeStep === 1
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>1. Symptoms</span>
          {selectedSymptoms.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              {selectedSymptoms.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveStep(2)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeStep === 2
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>2. Risk Profile</span>
          {selectedRiskFactors.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-teal-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              {selectedRiskFactors.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveStep(3)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeStep === 3
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>3. Clinical Results</span>
          {matches.some((m) => m.matchScore >= 40) && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* ================= STEP 1: SYMPTOMS SELECTION ================= */}
      {activeStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          {/* Top Info Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Symptom Screener</span>
            <h2 className="text-lg font-bold mt-0.5">What are you experiencing?</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Select all physical, mental, and sensory signs. You can calibrate severity and duration for clinical weighting.
            </p>

            {/* Search Input */}
            <div className="relative mt-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symptoms (e.g. fatigue, numbness, hair loss, bleeding gums)..."
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Quick Preset Clinical Clusters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Clinical Clusters</span>
              <span className="text-[11px] text-slate-400">Tap to populate</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_CLUSTERS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadPreset(preset)}
                  className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-left hover:border-teal-500 hover:bg-teal-50/40 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900">{preset.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {preset.symptomIds.length} signs + risk profile
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Body Zone Filter Tabs */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-1 flex items-center gap-1.5">
            <button
              onClick={() => setSelectedZone('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedZone === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              All Zones ({SYMPTOMS_DATA.length})
            </button>
            {BODY_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedZone === zone.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>

          {/* Symptoms List */}
          <div className="space-y-2.5">
            {filteredSymptoms.map((symptom) => {
              const selectedItem = selectedSymptoms.find((s) => s.symptomId === symptom.id);
              const isSelected = Boolean(selectedItem);

              return (
                <div
                  key={symptom.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isSelected
                      ? 'bg-white border-emerald-500 ring-1 ring-emerald-500/30 shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div
                    onClick={() => handleToggleSymptom(symptom.id)}
                    className="p-3.5 flex items-start justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{symptom.name}</span>
                        {symptom.redFlag && (
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            Red Flag
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {symptom.description}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                          : 'border-slate-300 bg-slate-50'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Expandable Intensity & Duration Controls when Selected */}
                  {isSelected && selectedItem && (() => {
                    const currentIntensity: SymptomIntensity = 
                      selectedItem.intensity ||
                      (selectedItem.severity === 'severe'
                        ? 'Severe'
                        : selectedItem.severity === 'mild'
                        ? 'Mild'
                        : 'Moderate');
                    const sliderValue = intensityToValue(currentIntensity);

                    return (
                      <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-100 bg-slate-50/80 space-y-3 text-xs">
                        {/* Intensity Section with Button Group & Range Slider */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Gauge className="w-3.5 h-3.5 text-teal-700" />
                              <span className="text-[11px] font-bold text-slate-800">
                                Intensity Level:
                              </span>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                currentIntensity === 'Severe'
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : currentIntensity === 'Moderate'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {currentIntensity}
                            </span>
                          </div>

                          {/* Segmented Button Group */}
                          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                            {(['Mild', 'Moderate', 'Severe'] as const).map((lvl) => {
                              const isActive = currentIntensity === lvl;
                              return (
                                <button
                                  key={lvl}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateSymptomProperty(symptom.id, 'intensity', lvl);
                                  }}
                                  className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                                    isActive
                                      ? lvl === 'Severe'
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : lvl === 'Moderate'
                                        ? 'bg-amber-500 text-white shadow-xs'
                                        : 'bg-emerald-600 text-white shadow-xs'
                                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isActive ? 'bg-white' : 'bg-slate-300'
                                    }`}
                                  />
                                  <span>{lvl}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Interactive Range Slider */}
                          <div className="px-1 pt-1 space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-slate-600 mb-0.5">
                              <span className="flex items-center gap-1 font-medium">
                                <Sliders className="w-3 h-3 text-slate-600" /> Range Slider Adjustment
                              </span>
                              <span className="text-[10px] text-slate-700 font-semibold">
                                Level {sliderValue} of 3
                              </span>
                            </div>

                            <input
                              type="range"
                              min="1"
                              max="3"
                              step="1"
                              value={sliderValue}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                e.stopPropagation();
                                const newIntensity = valueToIntensity(Number(e.target.value));
                                handleUpdateSymptomProperty(symptom.id, 'intensity', newIntensity);
                              }}
                              className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${
                                currentIntensity === 'Severe'
                                  ? 'accent-rose-600'
                                  : currentIntensity === 'Moderate'
                                  ? 'accent-amber-500'
                                  : 'accent-emerald-600'
                              }`}
                            />

                            <div className="flex justify-between text-[10px] text-slate-600 font-medium px-0.5">
                              <span>1 · Mild</span>
                              <span>2 · Moderate</span>
                              <span>3 · Severe</span>
                            </div>
                          </div>

                          {/* Clinical guidance caption */}
                          <p className="text-[10px] text-slate-500 italic bg-white/70 p-1.5 rounded-lg border border-slate-100">
                            {currentIntensity === 'Severe' && 'High weight: persistent or debilitating symptom strongly influencing diagnostic probability.'}
                            {currentIntensity === 'Moderate' && 'Standard weight: regularly experienced symptom disrupting comfort or focus.'}
                            {currentIntensity === 'Mild' && 'Baseline weight: subtle, intermittent, or early warning symptom.'}
                          </p>
                        </div>

                        {/* Duration Selector */}
                        <div className="pt-2 border-t border-slate-200/60">
                          <span className="text-[11px] font-semibold text-slate-600 mb-1.5 block">
                            Duration / Frequency:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {(['days', 'weeks', 'months', 'chronic'] as const).map((dur) => (
                              <button
                                key={dur}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateSymptomProperty(symptom.id, 'duration', dur);
                                }}
                                className={`flex-1 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                                  selectedItem.duration === dur
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {dur}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Bar */}
          <div className="sticky bottom-16 z-20 pt-2">
            <button
              onClick={() => setActiveStep(2)}
              disabled={selectedSymptoms.length === 0}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                selectedSymptoms.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>
                {selectedSymptoms.length > 0
                  ? `Proceed to Risk Profile (${selectedSymptoms.length} selected)`
                  : 'Select at least 1 symptom to proceed'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: RISK FACTORS ================= */}
      {activeStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
            <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">Lifestyle Amplifiers</span>
            <h2 className="text-lg font-bold mt-0.5">Diet & Physiological Risk Factors</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              These factors alter your intestinal absorption efficiency, metabolic demand, or renal excretion of micronutrients.
            </p>
          </div>

          <div className="space-y-2.5">
            {RISK_FACTORS.map((rf) => {
              const isSelected = selectedRiskFactors.includes(rf.id);
              return (
                <div
                  key={rf.id}
                  onClick={() => handleToggleRiskFactor(rf.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-500 ring-1 ring-teal-500/30'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-teal-700 bg-teal-700 text-white shadow-xs'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{rf.label}</span>
                      <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        {rf.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {rf.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveStep(1)}
              className="py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Calculate Clinical Deficiency Matches</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: CLINICAL RESULTS ================= */}
      {activeStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          {/* Top Triage Result Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">Triage Evaluation</span>
                <h2 className="text-lg font-bold mt-0.5">Symptom Probability Analysis</h2>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                title="Start New Check"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
              <span>{selectedSymptoms.length} symptoms evaluated</span>
              <span aria-hidden="true">·</span>
              <span>{selectedRiskFactors.length} risk factors included</span>
            </div>

            {/* Save / Export quick buttons */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={handleSaveAssessment}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                {savedSuccess ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Assessment Saved!' : 'Save Assessment'}</span>
              </button>

              <button
                onClick={() => setActiveStep(1)}
                className="text-xs text-teal-300 hover:underline ml-auto"
              >
                Edit Symptoms
              </button>
            </div>
          </div>

          {/* Red Flag Warning Box */}
          {redFlags.length > 0 && (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs space-y-2 animate-bounce-short">
              <div className="flex items-center gap-2 text-rose-800 font-bold">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Urgent Clinical Caution: Red Flags Detected</span>
              </div>
              <ul className="space-y-1 text-rose-900">
                {redFlags.map((rf, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-semibold shrink-0">• {rf.symptomName}:</span>
                    <span>{rf.notice}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-rose-700 italic pt-1 border-t border-rose-200">
                These symptoms require timely professional medical evaluation by a licensed physician to rule out serious underlying conditions.
              </p>
            </div>
          )}

          {/* Ranked Micronutrients Suspect List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Ranked Micronutrient Probabilities
              </h3>
              <span className="text-[11px] text-slate-500">Based on clinical weighting</span>
            </div>

            {matches.filter((m) => m.matchScore > 10).map((item) => {
              const isExpanded = expandedNutrientId === item.nutrient.id;
              const isHigh = item.matchScore >= 65;
              const isModerate = item.matchScore >= 40 && item.matchScore < 65;

              return (
                <div
                  key={item.nutrient.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedNutrientId(isExpanded ? null : item.nutrient.id)}
                    className="p-4 cursor-pointer select-none hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{item.nutrient.name}</h4>
                          <span className="text-xs text-slate-500 italic">({item.nutrient.scientificName.split('/')[0].trim()})</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span
                            className={`font-semibold ${
                              isHigh
                                ? 'text-rose-700'
                                : isModerate
                                ? 'text-amber-700'
                                : 'text-slate-600'
                            }`}
                          >
                            {item.confidenceLevel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.matchingSymptoms.length} matching sign{item.matchingSymptoms.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <span
                          className={`text-sm font-extrabold ${
                            isHigh
                              ? 'text-rose-600'
                              : isModerate
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {item.matchScore}%
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Probability Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHigh
                            ? 'bg-rose-500'
                            : isModerate
                            ? 'bg-amber-500'
                            : 'bg-teal-500'
                        }`}
                        style={{ width: `${item.matchScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Expanded Nutrient Details */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3 text-xs animate-fade-in">
                      {/* Matching symptoms list */}
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-1">
                          Correlated Symptoms You Logged:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.matchingSymptoms.map((sym, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 ${
                                sym.intensity === 'Severe'
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : sym.intensity === 'Moderate'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  sym.intensity === 'Severe'
                                    ? 'bg-rose-500'
                                    : sym.intensity === 'Moderate'
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-500'
                                }`}
                              />
                              <span>{sym.symptomName}</span>
                              <span className="font-bold text-[10px] opacity-80 uppercase">
                                ({sym.intensity})
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Biochemical explanation */}
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-1">
                          Cellular Mechanism:
                        </span>
                        <p className="text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                          {item.nutrient.biochemicalRole}
                        </p>
                      </div>

                      {/* Top bioavailable food remedies */}
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-1 flex items-center gap-1">
                          <Apple className="w-3.5 h-3.5 text-emerald-600" /> Top Dietary Sources:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          {item.nutrient.topFoodSources.slice(0, 4).map((food, i) => (
                            <div key={i} className="p-2 bg-white rounded-lg border border-slate-200">
                              <span className="font-semibold text-slate-800 block truncate">{food.name}</span>
                              <span className="text-emerald-700 font-bold">{food.percentDailyValue}% DV</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended lab marker */}
                      <div className="p-2.5 bg-teal-50/70 border border-teal-200 rounded-xl text-[11px]">
                        <span className="font-bold text-teal-900 block">Suggested Blood Test:</span>
                        <span className="text-slate-800 font-semibold">{item.nutrient.recommendedLabTests[0]?.testName}</span>
                        <p className="text-slate-600 mt-0.5">{item.nutrient.recommendedLabTests[0]?.clinicalNote}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Deep AI Clinical Nutritionist Synthesis Button */}
          <div className="pt-2">
            {!aiAnalysis ? (
              <button
                onClick={handleRunAiAnalysis}
                disabled={isAiLoading}
                className="w-full py-4 px-4 bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 hover:from-teal-700 hover:to-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>
                  {isAiLoading
                    ? 'Synthesizing Biochemical Pathways...'
                    : 'Generate Deep AI Clinical Nutrition Evaluation'}
                </span>
              </button>
            ) : null}

            {aiError && (
              <p className="text-[11px] text-amber-700 mt-2 text-center bg-amber-50 p-2 rounded-xl border border-amber-200">
                {aiError}
              </p>
            )}
          </div>

          {/* AI Comprehensive Report Section */}
          {aiAnalysis && (
            <div className="bg-white rounded-2xl border border-teal-300 p-5 shadow-sm space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">AI Clinical Nutritionist Report</h3>
                    <span className="text-[10px] text-slate-500">Evidence-based biochemical synthesis</span>
                  </div>
                </div>
              </div>

              {/* Clinical Summary */}
              <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-teal-950 block mb-1">Clinical Synthesis:</span>
                {aiAnalysis.clinicalSummary}
              </div>

              {/* Deep Mechanisms */}
              {aiAnalysis.topSuspectDeficiencies && aiAnalysis.topSuspectDeficiencies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Pathophysiological Pathways
                  </span>
                  {aiAnalysis.topSuspectDeficiencies.map((def, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">{def.nutrient}</strong>
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {def.confidence} Confidence
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                        {def.biochemicalMechanism}
                      </p>
                      {def.specificDietaryFixes && (
                        <div className="mt-2 text-[11px] text-slate-700">
                          <strong className="text-slate-800">Target foods:</strong> {def.specificDietaryFixes.join(', ')}
                        </div>
                      )}
                      {def.absorptionSynergies && (
                        <div className="mt-1 text-[11px] text-emerald-800">
                          <strong className="text-emerald-950">Absorption rules:</strong> {def.absorptionSynergies}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Lab Panels */}
              {aiAnalysis.recommendedLabPanels && aiAnalysis.recommendedLabPanels.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-600" /> Suggested Diagnostic Blood Tests
                  </span>
                  {aiAnalysis.recommendedLabPanels.map((panel, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <strong className="text-slate-900 block">{panel.testName}</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">{panel.clinicalRationale}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Doctor Questions */}
              {aiAnalysis.doctorDiscussionQuestions && aiAnalysis.doctorDiscussionQuestions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Questions to Discuss with Your Doctor
                  </span>
                  <div className="space-y-1.5">
                    {aiAnalysis.doctorDiscussionQuestions.map((q, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 text-xs text-slate-800 flex items-start gap-2">
                        <span className="font-bold text-teal-800 shrink-0">{i + 1}.</span>
                        <span className="leading-relaxed text-[11px]">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
