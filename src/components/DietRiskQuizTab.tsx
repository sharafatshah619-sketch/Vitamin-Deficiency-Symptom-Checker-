import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Flame, 
  ArrowRight, 
  Utensils, 
  Sun, 
  Coffee, 
  Pill, 
  Activity, 
  RefreshCw 
} from 'lucide-react';

interface QuestionOption {
  label: string;
  sublabel?: string;
  impacts: { nutrient: string; risk: 'high' | 'moderate' | 'optimal' }[];
}

interface Question {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  options: QuestionOption[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'diet_pattern',
    title: 'Primary Dietary Intake',
    description: 'How do you typically structure your daily meals?',
    icon: <Utensils className="w-4 h-4 text-emerald-600" />,
    options: [
      {
        label: 'Strict Vegan',
        sublabel: 'No animal, dairy, egg, or fish products',
        impacts: [
          { nutrient: 'Vitamin B12', risk: 'high' },
          { nutrient: 'Iron (Ferritin)', risk: 'moderate' },
          { nutrient: 'Zinc', risk: 'moderate' }
        ]
      },
      {
        label: 'Vegetarian (with Dairy/Eggs)',
        sublabel: 'Eat cheese, yogurt, or eggs, but no meat/fish',
        impacts: [
          { nutrient: 'Iron (Ferritin)', risk: 'moderate' },
          { nutrient: 'Vitamin B12', risk: 'moderate' }
        ]
      },
      {
        label: 'Omnivore / Balanced',
        sublabel: 'Regular poultry, meat, fish, eggs, and plants',
        impacts: [
          { nutrient: 'Vitamin B12', risk: 'optimal' }
        ]
      },
      {
        label: 'Fast Food / Ultra-Processed Heavy',
        sublabel: 'Frequent packaged meals, takeout, refined grains',
        impacts: [
          { nutrient: 'Magnesium', risk: 'high' },
          { nutrient: 'Vitamin C', risk: 'high' },
          { nutrient: 'Folate (B9)', risk: 'high' }
        ]
      }
    ]
  },
  {
    id: 'sun_exposure',
    title: 'Daily Midday Sun Exposure',
    description: 'Direct sunlight on uncovered arms or legs between 10 AM and 3 PM:',
    icon: <Sun className="w-4 h-4 text-amber-500" />,
    options: [
      {
        label: 'Minimal (< 10 mins / Mostly indoors)',
        sublabel: 'Desk job, wear sunscreen, or live in cloudy/northern latitude',
        impacts: [
          { nutrient: 'Vitamin D3', risk: 'high' }
        ]
      },
      {
        label: 'Moderate (15 - 30 mins outdoors)',
        sublabel: 'Daily walk or brief outdoor breaks',
        impacts: [
          { nutrient: 'Vitamin D3', risk: 'moderate' }
        ]
      },
      {
        label: 'Abundant (30+ mins outdoors daily)',
        sublabel: 'Outdoor work, gardening, or regular sports in sunlight',
        impacts: [
          { nutrient: 'Vitamin D3', risk: 'optimal' }
        ]
      }
    ]
  },
  {
    id: 'produce_greens',
    title: 'Fresh Fruits & Dark Leafy Greens',
    description: 'How often do you eat raw salads, berries, citrus, or steamed greens?',
    icon: <Flame className="w-4 h-4 text-emerald-500" />,
    options: [
      {
        label: 'Rarely (less than 1 serving per day)',
        sublabel: 'Few whole vegetables or raw fresh fruits',
        impacts: [
          { nutrient: 'Vitamin C', risk: 'high' },
          { nutrient: 'Folate (B9)', risk: 'high' },
          { nutrient: 'Vitamin K1', risk: 'high' }
        ]
      },
      {
        label: 'Moderate (1 - 2 servings daily)',
        sublabel: 'Some fruit or cooked vegetables with dinner',
        impacts: [
          { nutrient: 'Vitamin C', risk: 'moderate' }
        ]
      },
      {
        label: 'High (3+ servings fresh raw produce daily)',
        sublabel: 'Big salads, fresh citrus, berries, and dark greens daily',
        impacts: [
          { nutrient: 'Vitamin C', risk: 'optimal' },
          { nutrient: 'Folate (B9)', risk: 'optimal' }
        ]
      }
    ]
  },
  {
    id: 'beverage_timing',
    title: 'Coffee or Tea Timing With Meals',
    description: 'Polyphenols & tannins in coffee/tea bind dietary iron and zinc:',
    icon: <Coffee className="w-4 h-4 text-amber-700" />,
    options: [
      {
        label: 'I drink coffee/tea directly with or right after food',
        sublabel: 'Tannins reduce non-heme plant iron uptake by up to 60-80%',
        impacts: [
          { nutrient: 'Iron (Ferritin)', risk: 'high' }
        ]
      },
      {
        label: 'I wait 1 - 2 hours after meals to drink coffee/tea',
        sublabel: 'Allows full gastric absorption before polyphenol chelation',
        impacts: [
          { nutrient: 'Iron (Ferritin)', risk: 'optimal' }
        ]
      },
      {
        label: 'I do not drink coffee or black/green tea',
        sublabel: 'No polyphenol-induced mineral binding',
        impacts: [
          { nutrient: 'Iron (Ferritin)', risk: 'optimal' }
        ]
      }
    ]
  },
  {
    id: 'medications',
    title: 'Prescription & OTC Medications',
    description: 'Are you taking any of these common nutrient-depleting drugs?',
    icon: <Pill className="w-4 h-4 text-indigo-500" />,
    options: [
      {
        label: 'Acid Reducers (Omeprazole, Nexium, PPIs, Tums)',
        sublabel: 'Suppresses acid required for B12, Iron, and Magnesium absorption',
        impacts: [
          { nutrient: 'Vitamin B12', risk: 'high' },
          { nutrient: 'Magnesium', risk: 'high' },
          { nutrient: 'Iron (Ferritin)', risk: 'moderate' }
        ]
      },
      {
        label: 'Metformin (for blood sugar / PCOS)',
        sublabel: 'Interferes with calcium-dependent ileal B12 uptake',
        impacts: [
          { nutrient: 'Vitamin B12', risk: 'high' }
        ]
      },
      {
        label: 'Birth Control Pills or Estrogen HRT',
        sublabel: 'Increases clearance of Vitamin B6, B9 Folate, and B2',
        impacts: [
          { nutrient: 'Vitamin B6', risk: 'moderate' },
          { nutrient: 'Folate (B9)', risk: 'moderate' }
        ]
      },
      {
        label: 'None of the above medications',
        sublabel: 'Standard drug-independent gastrointestinal absorption',
        impacts: []
      }
    ]
  },
  {
    id: 'stress_alcohol',
    title: 'Stress & Lifestyle Load',
    description: 'Elevated stress triggers renal wasting of intracellular magnesium:',
    icon: <Activity className="w-4 h-4 text-rose-500" />,
    options: [
      {
        label: 'High chronic stress / High caffeine / Poor sleep',
        sublabel: 'Cortisol stimulates renal excretion of magnesium and B-vitamins',
        impacts: [
          { nutrient: 'Magnesium', risk: 'high' },
          { nutrient: 'Vitamin B1 (Thiamine)', risk: 'moderate' }
        ]
      },
      {
        label: 'Frequent alcohol intake (3+ drinks several times/week)',
        sublabel: 'Ethanol blunts thiamine & folate uptake and wastes zinc',
        impacts: [
          { nutrient: 'Vitamin B1 (Thiamine)', risk: 'high' },
          { nutrient: 'Zinc', risk: 'moderate' },
          { nutrient: 'Magnesium', risk: 'moderate' }
        ]
      },
      {
        label: 'Moderate/Low stress and minimal alcohol',
        sublabel: 'Stable autonomic nervous and renal balance',
        impacts: [
          { nutrient: 'Magnesium', risk: 'optimal' }
        ]
      }
    ]
  }
];

export const DietRiskQuizTab: React.FC<{ onNavigateToChecker: () => void }> = ({
  onNavigateToChecker,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  // Calculate results
  const calculateRiskSummary = () => {
    const highRiskMap: Record<string, number> = {};
    const moderateRiskMap: Record<string, number> = {};

    Object.entries(selectedAnswers).forEach(([qId, optIdx]) => {
      const q = QUIZ_QUESTIONS.find((item) => item.id === qId);
      if (!q) return;
      const opt = q.options[optIdx];
      if (!opt) return;

      opt.impacts.forEach((imp) => {
        if (imp.risk === 'high') {
          highRiskMap[imp.nutrient] = (highRiskMap[imp.nutrient] || 0) + 1;
        } else if (imp.risk === 'moderate') {
          moderateRiskMap[imp.nutrient] = (moderateRiskMap[imp.nutrient] || 0) + 1;
        }
      });
    });

    const highRisks = Object.keys(highRiskMap).sort(
      (a, b) => highRiskMap[b] - highRiskMap[a]
    );
    const modRisks = Object.keys(moderateRiskMap).filter((n) => !highRisks.includes(n));

    return { highRisks, modRisks };
  };

  const { highRisks, modRisks } = calculateRiskSummary();

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-5 rounded-2xl shadow-sm">
        <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">Preventive Screener</span>
        <h2 className="text-lg font-bold mt-0.5">Dietary & Lifestyle Risk Quiz</h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Pinpoint your nutritional vulnerabilities and subclinical gaps based on diet, sunlight, medication, and lifestyle patterns.
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>{answeredCount} of {QUIZ_QUESTIONS.length} questions completed</span>
          <span className="font-semibold text-emerald-400">
            {Math.round((answeredCount / QUIZ_QUESTIONS.length) * 100)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {!showResults ? (
        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const selectedIdx = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {qIndex + 1}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">{q.title}</h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">{q.description}</p>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500/30'
                            : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 block">{opt.label}</span>
                          {opt.sublabel && (
                            <span className="text-[11px] text-slate-500 mt-0.5 block leading-relaxed">
                              {opt.sublabel}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => setShowResults(true)}
              disabled={!isComplete}
              className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                isComplete
                  ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isComplete ? 'View Nutritional Vulnerability Report' : `Answer all questions (${answeredCount}/${QUIZ_QUESTIONS.length})`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Quiz Outcome</span>
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900">Your Nutritional Vulnerability Profile</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Based on your dietary patterns, sun exposure, and medications, here are the micronutrients most vulnerable to subclinical insufficiency:
            </p>

            {/* High Vulnerabilities */}
            {highRisks.length > 0 && (
              <div className="mt-4 p-3.5 bg-rose-50/70 border border-rose-200/90 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>High Dietary Vulnerability ({highRisks.length})</span>
                </div>
                <div className="space-y-1.5">
                  {highRisks.map((n) => (
                    <div key={n} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-rose-100">
                      <span className="font-bold text-slate-900">{n}</span>
                      <span className="text-[11px] font-semibold text-rose-700">High Risk Profile</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Moderate Vulnerabilities */}
            {modRisks.length > 0 && (
              <div className="mt-3 p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Moderate Vulnerability ({modRisks.length})</span>
                </div>
                <div className="space-y-1.5">
                  {modRisks.map((n) => (
                    <div key={n} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-amber-100">
                      <span className="font-semibold text-slate-900">{n}</span>
                      <span className="text-[11px] font-medium text-amber-700">Moderate Risk</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {highRisks.length === 0 && modRisks.length === 0 && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-emerald-900">Optimal Baseline Profile</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Your reported dietary and lifestyle patterns appear well-diversified.
                </p>
              </div>
            )}

            {/* Practical Whole Food Countermeasures */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Recommended Daily Dietary Countermeasures
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                {highRisks.includes('Vitamin B12') && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span><strong>Vitamin B12:</strong> If plant-based, incorporate daily fortified nutritional yeast, fortified plant milks, or a bioavailable sublingual methylcobalamin supplement.</span>
                  </li>
                )}
                {highRisks.includes('Vitamin D3') && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span><strong>Vitamin D3:</strong> Aim for 15-20 minutes of midday sunlight or consider 1,000-2,000 IU Vitamin D3 paired with Vitamin K2 and dietary fat.</span>
                  </li>
                )}
                {highRisks.includes('Iron (Ferritin)') && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span><strong>Iron:</strong> Separate coffee/tea by at least 90 minutes from iron-rich foods, and pair legumes/greens with vitamin C (citrus or bell peppers).</span>
                  </li>
                )}
                {highRisks.includes('Magnesium') && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span><strong>Magnesium:</strong> Add pumpkin seeds (156mg/oz), cooked spinach, and 85%+ dark chocolate into your daily routine.</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Button to jump into checker */}
            <div className="mt-5">
              <button
                onClick={onNavigateToChecker}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Cross-Check With Physical Symptoms <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
