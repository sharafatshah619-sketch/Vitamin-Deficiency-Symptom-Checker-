export type NutrientCategory = 'water-soluble' | 'fat-soluble' | 'mineral';

export interface FoodSource {
  name: string;
  amount: string;
  percentDailyValue: number;
  category: 'plant' | 'animal' | 'fortified';
}

export interface VitaminDeficiency {
  id: string;
  name: string;
  scientificName: string;
  category: NutrientCategory;
  dailyRda: {
    male: string;
    female: string;
    pregnancy?: string;
  };
  upperLimit?: string;
  biochemicalRole: string;
  deficiencySymptoms: string[];
  earlySigns: string[];
  severeSigns: string[];
  toxicitySigns?: string[];
  topFoodSources: FoodSource[];
  absorptionBoosters: string[];
  absorptionBlockers: string[];
  recommendedLabTests: {
    testName: string;
    optimalRange: string;
    clinicalNote: string;
  }[];
  highRiskPopulations: string[];
  color: string;
}

export type BodyZoneId = 
  | 'head'
  | 'eyes'
  | 'mouth'
  | 'skin'
  | 'nails'
  | 'hair'
  | 'chest'
  | 'muscles'
  | 'nerves'
  | 'energy'
  | 'digestion';

export interface BodyZone {
  id: BodyZoneId;
  name: string;
  label: string;
  iconName: string;
  description: string;
  symptomCount?: number;
}

export interface Symptom {
  id: string;
  name: string;
  zone: BodyZoneId;
  description: string;
  linkedNutrientIds: {
    nutrientId: string;
    weight: number; // 1 to 5 (5 = hallmark pathognomonic symptom)
    isPrimary: boolean;
  }[];
  redFlag?: boolean;
  redFlagNotice?: string;
  commonConfusion?: string;
}

export interface RiskFactor {
  id: string;
  category: 'diet' | 'lifestyle' | 'medical' | 'medication';
  label: string;
  description: string;
  affectedNutrientIds: {
    nutrientId: string;
    riskMultiplier: number; // e.g. 2.0 = double likelihood
  }[];
}

export type SymptomIntensity = 'Mild' | 'Moderate' | 'Severe';

export interface SelectedSymptom {
  symptomId: string;
  intensity: SymptomIntensity;
  severity?: 'mild' | 'moderate' | 'severe';
  duration: 'days' | 'weeks' | 'months' | 'chronic';
}

export interface UserHealthProfile {
  ageGroup: 'teen' | 'adult' | 'older_adult';
  gender: 'female' | 'male' | 'other';
  isPregnantOrLactating?: boolean;
  primaryDiet: 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'restricted';
}

export interface CalculatedNutrientMatch {
  nutrient: VitaminDeficiency;
  matchScore: number; // 0 - 100
  confidenceLevel: 'High Likelihood' | 'Moderate Likelihood' | 'Possible Gap' | 'Low';
  matchingSymptoms: {
    symptomName: string;
    intensity: SymptomIntensity;
    severity?: string;
    isPrimary: boolean;
  }[];
  redFlagsTriggered: string[];
}

export interface AIAnalysisResult {
  clinicalSummary: string;
  topSuspectDeficiencies: {
    nutrient: string;
    confidence: 'High' | 'Moderate' | 'Low';
    biochemicalMechanism: string;
    matchingSymptoms: string[];
    specificDietaryFixes: string[];
    absorptionSynergies: string;
  }[];
  recommendedLabPanels: {
    testName: string;
    clinicalRationale: string;
  }[];
  redFlagWarnings: string[];
  foodProtocolHighlights: string[];
  doctorDiscussionQuestions: string[];
}

export interface SavedAssessment {
  id: string;
  timestamp: string;
  symptomsCount: number;
  topDeficiencyName: string;
  topScore: number;
  symptomsList: string[];
  aiSummary?: string;
}
