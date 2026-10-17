import React, { useState } from 'react';
import { BodyZoneId, SelectedSymptom } from '../types/nutrition';
import { BODY_ZONES, SYMPTOMS_DATA } from '../data/symptomsData';
import { NUTRIENT_LOOKUP } from '../data/vitaminsData';
import { 
  Check, 
  Plus, 
  Sparkles, 
  Info, 
  ChevronRight,
  Brain,
  Eye,
  Smile,
  Heart,
  Hand,
  Flame,
  Activity,
  Zap,
  Utensils
} from 'lucide-react';

interface BodyMapTabProps {
  selectedSymptoms: SelectedSymptom[];
  onToggleSymptom: (symptomId: string) => void;
  onNavigateToChecker: () => void;
}

export const BodyMapTab: React.FC<BodyMapTabProps> = ({
  selectedSymptoms,
  onToggleSymptom,
  onNavigateToChecker,
}) => {
  const [activeZoneId, setActiveZoneId] = useState<BodyZoneId>('head');

  const activeZone = BODY_ZONES.find((z) => z.id === activeZoneId) || BODY_ZONES[0];
  const zoneSymptoms = SYMPTOMS_DATA.filter((s) => s.zone === activeZoneId);

  const getZoneIcon = (id: BodyZoneId) => {
    switch (id) {
      case 'head': return <Brain className="w-5 h-5" />;
      case 'eyes': return <Eye className="w-5 h-5" />;
      case 'mouth': return <Smile className="w-5 h-5" />;
      case 'chest': return <Heart className="w-5 h-5" />;
      case 'nails': case 'skin': return <Hand className="w-5 h-5" />;
      case 'muscles': return <Flame className="w-5 h-5" />;
      case 'nerves': return <Activity className="w-5 h-5" />;
      case 'energy': return <Zap className="w-5 h-5" />;
      case 'digestion': return <Utensils className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const isSymptomSelected = (id: string) =>
    selectedSymptoms.some((s) => s.symptomId === id);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header card */}
      <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-5 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-teal-300 tracking-wider uppercase">Interactive Explorer</span>
            <h2 className="text-lg font-bold mt-0.5">Anatomical Body Map</h2>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 text-teal-200 backdrop-blur-md">
            {getZoneIcon(activeZoneId)}
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Select any anatomical zone to inspect localized clinical deficiency signs and direct cellular mechanisms.
        </p>

        {selectedSymptoms.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-teal-200">
              {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} currently queued
            </span>
            <button
              onClick={onNavigateToChecker}
              className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            >
              Analyze in Checker <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Anatomical Zone Quick Bar (horizontal pill-free scroll) */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-1 flex items-center gap-1.5">
        {BODY_ZONES.map((zone) => {
          const isActive = zone.id === activeZoneId;
          const count = SYMPTOMS_DATA.filter((s) => s.zone === zone.id).length;
          const selectedInZone = selectedSymptoms.filter((sel) =>
            SYMPTOMS_DATA.find((s) => s.id === sel.symptomId)?.zone === zone.id
          ).length;

          return (
            <button
              key={zone.id}
              onClick={() => setActiveZoneId(zone.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium shrink-0 transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
              }`}
            >
              <span className={isActive ? 'text-teal-300' : 'text-slate-400'}>
                {getZoneIcon(zone.id)}
              </span>
              <span>{zone.name}</span>
              {selectedInZone > 0 ? (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {selectedInZone}
                </span>
              ) : (
                <span className={`text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Visual Body Diagram + Selected Zone Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              {getZoneIcon(activeZoneId)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{activeZone.name}</h3>
              <p className="text-xs text-slate-500">{activeZone.description}</p>
            </div>
          </div>
        </div>

        {/* Symptoms list for this zone */}
        <div className="space-y-2.5 mt-4">
          {zoneSymptoms.map((symptom) => {
            const isSelected = isSymptomSelected(symptom.id);
            return (
              <div
                key={symptom.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/40'
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{symptom.name}</h4>
                      {symptom.redFlag && (
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          Red Flag
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {symptom.description}
                    </p>

                    {/* Linked nutrients text representation */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Associated with:</span>
                      {symptom.linkedNutrientIds.map((link, idx) => {
                        const nut = NUTRIENT_LOOKUP.get(link.nutrientId);
                        return (
                          <span key={link.nutrientId} className="inline-flex items-center gap-1">
                            {idx > 0 && <span className="text-slate-300">·</span>}
                            <span className={link.isPrimary ? 'font-semibold text-teal-700' : 'text-slate-600'}>
                              {nut?.name || link.nutrientId}
                            </span>
                            {link.isPrimary && <span className="text-[9px] text-teal-600 font-bold">(Key)</span>}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSymptom(symptom.id)}
                    className={`shrink-0 p-2 rounded-xl transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                    title={isSelected ? 'Remove from checker' : 'Add to checker'}
                  >
                    {isSelected ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Body Clues & High-yield Associations */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
          <Info className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Clinical High-Yield Signs by Body System</span>
        </div>
        <ul className="text-xs text-slate-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <span><strong className="text-slate-800">Mouth & Tongue:</strong> Angular cheilitis (mouth corner cracks) points to Vitamin B2, B6, or Iron deficiency. A smooth, bald red tongue (glossitis) strongly signifies B12 or Folate deficiency.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <span><strong className="text-slate-800">Eyes & Vision:</strong> Difficulty with dark adaptation or night driving is the classic earliest hallmark of Vitamin A deficiency. Involuntary eyelid twitching frequently correlates with intracellular Magnesium depletion.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
            <span><strong className="text-slate-800">Skin & Nails:</strong> Spontaneous micro-bruising points to Vitamin C (collagen vessel defect) or Vitamin K (clotting). Spoon-shaped nails (koilonychia) are pathognomonic for prolonged severe Iron deficiency.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
