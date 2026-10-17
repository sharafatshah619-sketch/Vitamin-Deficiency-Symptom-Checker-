import React, { useState, useEffect } from 'react';
import { SavedAssessment } from '../types/nutrition';
import { 
  FileText, 
  Copy, 
  Check, 
  Calendar, 
  Trash2, 
  Send, 
  Sparkles, 
  HelpCircle, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface DoctorPrepTabProps {
  currentAssessment?: {
    symptomsCount: number;
    topNutrients: string[];
    redFlags: string[];
    aiQuestions?: string[];
    summary?: string;
  };
}

const RECOMMENDED_LAB_PANELS = [
  {
    name: 'Serum Ferritin & Iron Panel (with TIBC & % Saturation)',
    reason: 'Standard hemoglobin misses latent tissue iron starvation; Ferritin below 30 ng/mL indicates depleted bone marrow stores.',
    category: 'Iron Metabolism'
  },
  {
    name: '25-Hydroxy Vitamin D [25(OH)D]',
    reason: 'The definitive clinical marker of total body Vitamin D stores. Target range for optimal bone and immune function is 40-70 ng/mL.',
    category: 'Steroid & Bone'
  },
  {
    name: 'Serum Vitamin B12 + Methylmalonic Acid (MMA)',
    reason: 'Serum B12 alone has up to 30% false-normal rates in early tissue deficiency. Elevated MMA proves intracellular cellular B12 starvation.',
    category: 'Neurological & DNA'
  },
  {
    name: 'RBC Magnesium (Red Blood Cell Magnesium)',
    reason: 'Serum magnesium reflects only 1% of body stores and is kept artificially normal by homeostatic bone leeching. RBC Mg measures actual intracellular levels.',
    category: 'Electrolyte & Muscle'
  },
  {
    name: 'Complete Blood Count (CBC) with Differential',
    reason: 'Evaluates Mean Corpuscular Volume (MCV): low MCV points to Iron deficiency microcytic anemia; high MCV points to B12 or Folate macrocytic anemia.',
    category: 'Hematology'
  }
];

const STANDARD_DOCTOR_QUESTIONS = [
  'Could my reported symptoms (fatigue, tingling, or hair loss) be connected to latent micronutrient deficiencies before anemia shows on a CBC?',
  'Would you recommend checking functional markers like Serum Ferritin and Methylmalonic Acid (MMA) alongside routine metabolic tests?',
  'Are any of my current daily medications (e.g. acid blockers or metformin) contributing to reduced absorption of key vitamins?',
  'If a deficiency is identified, what specific dosage, form (e.g. methylcobalamin vs cyanocobalamin), and re-testing timeline do you recommend?',
  'Should we rule out underlying gastrointestinal malabsorption (like celiac disease or small intestinal bacterial overgrowth)?'
];

export const DoctorPrepTab: React.FC<DoctorPrepTabProps> = ({ currentAssessment }) => {
  const [savedHistory, setSavedHistory] = useState<SavedAssessment[]>([]);
  const [copied, setCopied] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nutricheck_saved_assessments');
      if (stored) {
        setSavedHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Error reading history:', e);
    }
  }, []);

  const handleCopySummary = () => {
    const textToCopy = `
NutriCheck Patient Doctor Discussion Brief:
Date: ${new Date().toLocaleDateString()}
Reported Symptoms Logged: ${currentAssessment?.symptomsCount || 'None'}
Suspected Deficiencies: ${currentAssessment?.topNutrients?.join(', ') || 'N/A'}
Red Flags Noted: ${currentAssessment?.redFlags?.length ? currentAssessment.redFlags.join('; ') : 'None reported'}

Suggested Blood Tests to Discuss:
- Serum Ferritin & Iron Saturation
- 25-Hydroxy Vitamin D
- Serum B12 & Methylmalonic Acid (MMA)
- Complete Blood Count (MCV / MCH)
- RBC Magnesium

Key Questions for Healthcare Provider:
1. Could my symptom constellation represent a micronutrient insufficiency?
2. Are any of my medications or diet interfering with absorption?
3. What is the recommended re-testing interval after starting any targeted protocol?
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('nutricheck_saved_assessments');
    setSavedHistory([]);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || isAsking) return;

    setIsAsking(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ask-nutritionist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: aiQuestion,
          currentDeficiencies: currentAssessment?.topNutrients || [],
        }),
      });

      if (!res.ok) throw new Error('Failed to ask AI');
      const data = await res.json();
      setAiAnswer(data.answer);
    } catch {
      setAiAnswer(
        'Unable to reach AI assistant at this time. Please refer to the Micronutrient Encyclopedia tab for evidence-based dietary recommendations.'
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
        <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">Clinical Collaboration</span>
        <h2 className="text-lg font-bold mt-0.5">Doctor Visit Preparation</h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Prepare for your next medical appointment with targeted questions, evidence-based lab test orders, and an exportable clinical summary.
        </p>

        {/* Quick export button */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300">
            {currentAssessment?.symptomsCount ? `${currentAssessment.symptomsCount} symptoms active` : 'Ready to export summary'}
          </span>
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary for Doctor'}</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions to Ask */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <h3 className="font-bold text-sm text-slate-900">Questions to Ask Your Doctor</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Physicians appreciate structured, specific inquiries. Use these questions during your visit:
        </p>

        <div className="space-y-2">
          {(currentAssessment?.aiQuestions && currentAssessment.aiQuestions.length > 0
            ? currentAssessment.aiQuestions
            : STANDARD_DOCTOR_QUESTIONS
          ).map((q, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 flex items-start gap-2.5"
            >
              <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Lab Tests to Request */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900">Targeted Laboratory Tests</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Tests that detect tissue deficiencies before routine screening panels show abnormalities:
        </p>

        <div className="space-y-2.5">
          {RECOMMENDED_LAB_PANELS.map((lab, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{lab.name}</span>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {lab.category}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] mt-1.5 leading-relaxed">
                {lab.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ask the Clinical Nutritionist Assistant */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-teal-700" />
          <h3 className="font-bold text-sm text-teal-950">Ask the Clinical Nutrition Assistant</h3>
        </div>
        <p className="text-xs text-teal-800 mb-3">
          Ask specific questions about food pairings, absorption blockers, or supplement timing:
        </p>

        <form onSubmit={handleAskAI} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="e.g. Can I take Vitamin D with Calcium at night?"
              className="flex-1 bg-white text-xs px-3 py-2.5 rounded-xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={isAsking || !aiQuestion.trim()}
              className="px-4 py-2.5 bg-teal-800 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isAsking ? 'Thinking...' : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>

        {aiAnswer && (
          <div className="mt-3 p-3.5 bg-white rounded-xl border border-teal-200 text-xs text-slate-800 leading-relaxed shadow-xs animate-fade-in">
            <div className="font-semibold text-teal-900 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Nutritionist Response:
            </div>
            <p className="whitespace-pre-line text-[11px] text-slate-700">{aiAnswer}</p>
          </div>
        )}
      </div>

      {/* Saved Assessment History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            <h3 className="font-bold text-sm text-slate-900">Saved Assessments History</h3>
          </div>
          {savedHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>

        {savedHistory.length > 0 ? (
          <div className="space-y-2">
            {savedHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{item.topDeficiencyName}</span>
                  <span className="text-[11px] font-semibold text-teal-700">
                    {item.topScore}% Match
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>{item.symptomsCount} symptoms evaluated</span>
                </div>
                {item.symptomsList && (
                  <p className="text-[11px] text-slate-600 mt-1.5 truncate">
                    Symptoms: {item.symptomsList.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            <p>No saved assessments yet.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Run a check in the Symptom Checker tab and tap "Save Assessment".
            </p>
          </div>
        )}
      </div>

      {/* Medical Disclaimer */}
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold">Educational & Triaging Advisory:</strong>
          NutriCheck provides clinical biochemical education and symptom correlations. It is not an official medical diagnosis, diagnostic tool, or replacement for consultation with a licensed medical practitioner. Always consult your doctor before starting high-dose vitamin or mineral supplementation.
        </div>
      </div>
    </div>
  );
};
