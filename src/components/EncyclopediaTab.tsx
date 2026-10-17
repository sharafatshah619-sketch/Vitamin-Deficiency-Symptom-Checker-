import React, { useState } from 'react';
import { VITAMINS_DATA } from '../data/vitaminsData';
import { VitaminDeficiency, NutrientCategory } from '../types/nutrition';
import { 
  Search, 
  ChevronRight, 
  X, 
  FlaskConical, 
  ShieldCheck, 
  AlertCircle, 
  ArrowUpRight, 
  Apple, 
  Info,
  Sparkles
} from 'lucide-react';

export const EncyclopediaTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | NutrientCategory>('all');
  const [selectedNutrient, setSelectedNutrient] = useState<VitaminDeficiency | null>(null);

  const filteredNutrients = VITAMINS_DATA.filter((n) => {
    const matchesCategory = categoryFilter === 'all' || n.category === categoryFilter;
    const matchesSearch =
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.deficiencySymptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      n.topFoodSources.some((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
        <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">Reference Database</span>
        <h2 className="text-lg font-bold mt-0.5">Micronutrient Compendium</h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Clinically verified dietary reference intakes (RDAs), biochemical mechanisms, optimal blood markers, and food sources.
        </p>

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vitamin, mineral, food source, or symptom..."
            className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            categoryFilter === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({VITAMINS_DATA.length})
        </button>
        <button
          onClick={() => setCategoryFilter('water-soluble')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            categoryFilter === 'water-soluble'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Water-Soluble
        </button>
        <button
          onClick={() => setCategoryFilter('fat-soluble')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            categoryFilter === 'fat-soluble'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Fat-Soluble
        </button>
        <button
          onClick={() => setCategoryFilter('mineral')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            categoryFilter === 'mineral'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Minerals
        </button>
      </div>

      {/* Nutrient Cards Grid */}
      <div className="space-y-2.5">
        {filteredNutrients.map((nutrient) => (
          <div
            key={nutrient.id}
            onClick={() => setSelectedNutrient(nutrient)}
            className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                    {nutrient.name}
                  </h3>
                  <span className="text-[11px] text-slate-500">·</span>
                  <span className="text-xs text-slate-500 italic">
                    {nutrient.scientificName.split('/')[0].trim()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span className="capitalize font-medium text-teal-700">{nutrient.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>RDA: {nutrient.dailyRda.female} (F) / {nutrient.dailyRda.male} (M)</span>
                </div>
              </div>

              <div className="p-1 rounded-lg text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {nutrient.biochemicalRole}
            </p>

            {/* Quick Top food chips */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 flex items-center gap-1">
                <Apple className="w-3.5 h-3.5 text-emerald-600" />
                <span>Rich in: {nutrient.topFoodSources.slice(0, 2).map((f) => f.name).join(', ')}</span>
              </span>
              <span className="text-teal-600 font-semibold group-hover:underline flex items-center gap-0.5">
                Details <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}

        {filteredNutrients.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No matching micronutrients found</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for a different symptom, vitamin name, or reset the filter.</p>
          </div>
        )}
      </div>

      {/* Deep Detail Modal */}
      {selectedNutrient && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-5 py-4 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base">{selectedNutrient.name}</h3>
                  <span className="text-xs text-teal-400 capitalize">({selectedNutrient.category})</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 italic">{selectedNutrient.scientificName}</p>
              </div>
              <button
                onClick={() => setSelectedNutrient(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 flex-1">
              {/* Daily Requirements */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Dietary Reference Intakes (DRI / RDA)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Female:</span>{' '}
                    <strong className="text-slate-800">{selectedNutrient.dailyRda.female}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Male:</span>{' '}
                    <strong className="text-slate-800">{selectedNutrient.dailyRda.male}</strong>
                  </div>
                  {selectedNutrient.dailyRda.pregnancy && (
                    <div className="col-span-2">
                      <span className="text-slate-500">Pregnancy / Lactation:</span>{' '}
                      <strong className="text-slate-800">{selectedNutrient.dailyRda.pregnancy}</strong>
                    </div>
                  )}
                  {selectedNutrient.upperLimit && (
                    <div className="col-span-2 text-slate-600 border-t border-slate-200 pt-1 mt-1 text-[11px]">
                      <span className="font-semibold text-slate-700">Tolerable Upper Limit (UL):</span>{' '}
                      {selectedNutrient.upperLimit}
                    </div>
                  )}
                </div>
              </div>

              {/* Biochemical Function */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-teal-600" />
                  Biological Role & Cellular Function
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200 p-3 rounded-xl">
                  {selectedNutrient.biochemicalRole}
                </p>
              </div>

              {/* Deficiency Symptoms */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Clinical Deficiency Symptoms
                </h4>
                <ul className="text-xs text-slate-700 space-y-1.5 bg-amber-50/50 border border-amber-200/80 p-3 rounded-xl">
                  {selectedNutrient.deficiencySymptoms.map((sym, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Dietary Sources */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-emerald-600" />
                  High-Bioavailability Food Sources
                </h4>
                <div className="space-y-1.5">
                  {selectedNutrient.topFoodSources.map((food, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div>
                        <span className="font-semibold text-slate-800">{food.name}</span>
                        <span className="text-slate-500 text-[11px] block">{food.amount}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-700">{food.percentDailyValue}% DV</span>
                        <span className="text-[10px] text-slate-400 capitalize block">{food.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synergy & Blockers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl">
                  <span className="font-bold text-emerald-900 block mb-1">Absorption Enhancers</span>
                  <ul className="text-emerald-800 space-y-1 text-[11px]">
                    {selectedNutrient.absorptionBoosters.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 p-3 rounded-xl">
                  <span className="font-bold text-rose-900 block mb-1">Inhibitors & Blockers</span>
                  <ul className="text-rose-800 space-y-1 text-[11px]">
                    {selectedNutrient.absorptionBlockers.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>✕</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Lab Tests */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Gold-Standard Laboratory Blood Tests
                </h4>
                <div className="space-y-2">
                  {selectedNutrient.recommendedLabTests.map((lab, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">{lab.testName}</strong>
                        <span className="text-teal-800 font-semibold text-[11px] bg-white px-2 py-0.5 rounded border border-teal-200">
                          Target: {lab.optimalRange}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{lab.clinicalNote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedNutrient(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Encyclopedia Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
