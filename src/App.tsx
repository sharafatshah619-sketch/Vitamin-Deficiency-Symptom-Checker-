import { useState } from 'react';
import { MobileShell, TabId } from './components/MobileShell';
import { CheckerTab } from './components/CheckerTab';
import { BodyMapTab } from './components/BodyMapTab';
import { EncyclopediaTab } from './components/EncyclopediaTab';
import { DietRiskQuizTab } from './components/DietRiskQuizTab';
import { DoctorPrepTab } from './components/DoctorPrepTab';
import { SelectedSymptom } from './types/nutrition';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('checker');
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [selectedRiskFactors, setSelectedRiskFactors] = useState<string[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<{
    symptomsCount: number;
    topNutrients: string[];
    redFlags: string[];
    aiQuestions?: string[];
  }>({
    symptomsCount: 0,
    topNutrients: [],
    redFlags: [],
  });

  const handleToggleSymptomFromMap = (symptomId: string) => {
    const exists = selectedSymptoms.find((s) => s.symptomId === symptomId);
    if (exists) {
      setSelectedSymptoms((prev) => prev.filter((s) => s.symptomId !== symptomId));
    } else {
      setSelectedSymptoms((prev) => [
        ...prev,
        { symptomId, intensity: 'Moderate', severity: 'moderate', duration: 'weeks' },
      ]);
    }
  };

  return (
    <MobileShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      symptomsCount={selectedSymptoms.length}
    >
      {activeTab === 'checker' && (
        <CheckerTab
          selectedSymptoms={selectedSymptoms}
          onUpdateSymptoms={setSelectedSymptoms}
          selectedRiskFactors={selectedRiskFactors}
          onUpdateRiskFactors={setSelectedRiskFactors}
          onAssessmentCompleted={setLatestAssessment}
        />
      )}

      {activeTab === 'bodymap' && (
        <BodyMapTab
          selectedSymptoms={selectedSymptoms}
          onToggleSymptom={handleToggleSymptomFromMap}
          onNavigateToChecker={() => setActiveTab('checker')}
        />
      )}

      {activeTab === 'encyclopedia' && <EncyclopediaTab />}

      {activeTab === 'diet' && (
        <DietRiskQuizTab onNavigateToChecker={() => setActiveTab('checker')} />
      )}

      {activeTab === 'doctor' && (
        <DoctorPrepTab
          currentAssessment={{
            symptomsCount: selectedSymptoms.length,
            topNutrients: latestAssessment.topNutrients,
            redFlags: latestAssessment.redFlags,
            aiQuestions: latestAssessment.aiQuestions,
          }}
        />
      )}
    </MobileShell>
  );
}
