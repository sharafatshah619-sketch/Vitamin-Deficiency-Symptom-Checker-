import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Info, ArrowRight } from 'lucide-react';

interface PairRule {
  itemA: string;
  itemB: string;
  type: 'synergistic' | 'antagonistic' | 'caution';
  title: string;
  explanation: string;
  recommendation: string;
}

const KNOWN_PAIRS: PairRule[] = [
  {
    itemA: 'iron',
    itemB: 'vit_c',
    type: 'synergistic',
    title: 'Powerful Synergistic Absorption',
    explanation: 'Vitamin C (Ascorbic Acid) reduces non-heme plant ferric iron (Fe3+) to highly absorbable ferrous iron (Fe2+), boosting intestinal uptake by up to 300%.',
    recommendation: 'Take plant-based iron (lentils, beans, spinach) or iron supplements with orange slices, bell pepper, or vitamin C.'
  },
  {
    itemA: 'iron',
    itemB: 'calcium',
    type: 'antagonistic',
    title: 'Transporter Competition & Blockade',
    explanation: 'Calcium and Iron compete directly for the Divalent Metal Transporter 1 (DMT1) in the duodenum, reducing iron absorption by 40-60%.',
    recommendation: 'Separate calcium supplements or dairy meals from iron supplements by at least 2 hours.'
  },
  {
    itemA: 'vit_d',
    itemB: 'vit_k',
    type: 'synergistic',
    title: 'Essential Bone & Vascular Synergy',
    explanation: 'Vitamin D enhances intestinal calcium absorption, while Vitamin K2 (MK-7) activates osteocalcin and Matrix Gla Protein, directing that calcium into bones and away from arterial walls.',
    recommendation: 'Pair Vitamin D3 with Vitamin K2 for optimal bone density and cardiovascular safety.'
  },
  {
    itemA: 'vit_d',
    itemB: 'magnesium',
    type: 'synergistic',
    title: 'Enzymatic Activation Co-factor',
    explanation: 'All 8 enzymatic conversion steps required to metabolize inactive Vitamin D into circulating 25(OH)D and bioactive 1,25(OH)2D are magnesium-dependent.',
    recommendation: 'Ensure adequate magnesium intake when supplementing Vitamin D, as high Vitamin D doses can deplete body magnesium stores.'
  },
  {
    itemA: 'zinc',
    itemB: 'iron',
    type: 'antagonistic',
    title: 'High-Dose Receptor Competition',
    explanation: 'When taken simultaneously in high supplemental doses, inorganic iron and zinc inhibit each other\'s intestinal carrier absorption.',
    recommendation: 'Take high-dose iron and zinc supplements at different meals or different times of the day.'
  },
  {
    itemA: 'vit_b12',
    itemB: 'vit_b9',
    type: 'synergistic',
    title: 'Interdependent Methylation Cycle',
    explanation: 'Vitamin B12 and Folate (B9) are interdependent cofactors for methionine synthase. Folate without B12 gets trapped in the "methyl trap", unable to support DNA synthesis.',
    recommendation: 'Always assess both B12 and Folate together before starting high-dose folic acid, as folic acid can correct anemia while nerve damage from B12 deficiency silently progresses.'
  },
  {
    itemA: 'magnesium',
    itemB: 'calcium',
    type: 'synergistic',
    title: 'Balanced Neuromuscular Antagonism',
    explanation: 'Calcium initiates muscle contraction and nerve firing; magnesium enables muscle relaxation and prevents tetany. The optimal physiological dietary ratio is approximately 2:1 (Calcium:Magnesium).',
    recommendation: 'Avoid high calcium supplements without balancing dietary magnesium.'
  }
];

const NUTRIENT_OPTIONS = [
  { id: 'iron', name: 'Iron' },
  { id: 'vit_c', name: 'Vitamin C' },
  { id: 'calcium', name: 'Calcium' },
  { id: 'vit_d', name: 'Vitamin D3' },
  { id: 'vit_k', name: 'Vitamin K (K1/K2)' },
  { id: 'magnesium', name: 'Magnesium' },
  { id: 'zinc', name: 'Zinc' },
  { id: 'vit_b12', name: 'Vitamin B12' },
  { id: 'vit_b9', name: 'Folate (B9)' },
];

export const SynergyCheckerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [firstId, setFirstId] = useState<string>('iron');
  const [secondId, setSecondId] = useState<string>('vit_c');

  if (!isOpen) return null;

  // Find pair match
  const matchedPair = KNOWN_PAIRS.find(
    (p) =>
      (p.itemA === firstId && p.itemB === secondId) ||
      (p.itemA === secondId && p.itemB === firstId)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Nutrient Interaction & Synergy</h3>
            <p className="text-xs text-slate-300">Compare pairs for absorption synergies or blockers</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Pickers */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nutrient 1</label>
              <select
                value={firstId}
                onChange={(e) => setFirstId(e.target.value)}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {NUTRIENT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} disabled={opt.id === secondId}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nutrient 2</label>
              <select
                value={secondId}
                onChange={(e) => setSecondId(e.target.value)}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {NUTRIENT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} disabled={opt.id === firstId}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result card */}
          {matchedPair ? (
            <div
              className={`p-4 rounded-xl border ${
                matchedPair.type === 'synergistic'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : matchedPair.type === 'antagonistic'
                  ? 'bg-amber-50/80 border-amber-200'
                  : 'bg-blue-50/70 border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {matchedPair.type === 'synergistic' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    matchedPair.type === 'synergistic' ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {matchedPair.type === 'synergistic' ? 'Synergy (Enhancer)' : 'Competition (Blocker)'}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">{matchedPair.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">{matchedPair.explanation}</p>

              <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-xs text-slate-800">
                <span className="font-semibold text-slate-900 shrink-0">Guidance:</span>
                <span>{matchedPair.recommendation}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 mb-0.5">No direct acute antagonism known</p>
                <p>These two nutrients do not typically compete for the same immediate intestinal transport pathway at standard dietary doses.</p>
              </div>
            </div>
          )}

          {/* Quick presets */}
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">Common clinical pairs:</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { setFirstId('iron'); setSecondId('vit_c'); }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
              >
                Iron + Vit C <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => { setFirstId('iron'); setSecondId('calcium'); }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
              >
                Iron vs Calcium <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => { setFirstId('vit_d'); setSecondId('vit_k'); }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
              >
                Vit D3 + K2 <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => { setFirstId('vit_d'); setSecondId('magnesium'); }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
              >
                Vit D3 + Magnesium <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
