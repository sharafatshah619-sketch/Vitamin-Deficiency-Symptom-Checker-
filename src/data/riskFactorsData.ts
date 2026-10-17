import { RiskFactor } from '../types/nutrition';

export const RISK_FACTORS: RiskFactor[] = [
  {
    id: 'vegan_vegetarian',
    category: 'diet',
    label: 'Strict Vegan or Vegetarian Diet',
    description: 'No meat, poultry, or fish consumed. Plant foods do not naturally supply bioactive Vitamin B12 and non-heme iron has lower bioavailability.',
    affectedNutrientIds: [
      { nutrientId: 'vit_b12', riskMultiplier: 2.8 },
      { nutrientId: 'iron', riskMultiplier: 1.8 },
      { nutrientId: 'zinc', riskMultiplier: 1.6 },
    ],
  },
  {
    id: 'low_sunlight',
    category: 'lifestyle',
    label: 'Low Direct Sun Exposure / Mostly Indoors',
    description: 'Spend daylight hours inside an office/home, wear high SPF clothing, or live at latitudes above 37° in winter.',
    affectedNutrientIds: [
      { nutrientId: 'vit_d', riskMultiplier: 2.5 },
    ],
  },
  {
    id: 'heavy_menstrual_bleeding',
    category: 'medical',
    label: 'Heavy Menstrual Cycles (Menorrhagia)',
    description: 'Needing to change pads/tampons every 1-2 hours, passing large clots, or bleeding longer than 7 days.',
    affectedNutrientIds: [
      { nutrientId: 'iron', riskMultiplier: 2.9 },
    ],
  },
  {
    id: 'ppi_antacids',
    category: 'medication',
    label: 'Taking Acid Reducers (PPIs / Omeprazole / Antacids)',
    description: 'Chronic suppression of stomach hydrochloric acid impairs cleavage of protein-bound B12 and reduces iron/magnesium ionization.',
    affectedNutrientIds: [
      { nutrientId: 'vit_b12', riskMultiplier: 2.3 },
      { nutrientId: 'magnesium', riskMultiplier: 2.0 },
      { nutrientId: 'iron', riskMultiplier: 1.7 },
      { nutrientId: 'calcium', riskMultiplier: 1.5 },
    ],
  },
  {
    id: 'metformin_use',
    category: 'medication',
    label: 'Taking Metformin for Blood Sugar',
    description: 'Metformin interferes with calcium-dependent membrane uptake of the B12-intrinsic factor complex in the ileum.',
    affectedNutrientIds: [
      { nutrientId: 'vit_b12', riskMultiplier: 2.4 },
    ],
  },
  {
    id: 'chronic_stress',
    category: 'lifestyle',
    label: 'High Chronic Psychological or Physical Stress',
    description: 'High sustained cortisol and sympathetic activation accelerate renal excretion of intracellular magnesium.',
    affectedNutrientIds: [
      { nutrientId: 'magnesium', riskMultiplier: 2.0 },
      { nutrientId: 'vit_b6', riskMultiplier: 1.5 },
      { nutrientId: 'vit_c', riskMultiplier: 1.4 },
    ],
  },
  {
    id: 'alcohol_regular',
    category: 'lifestyle',
    label: 'Regular or Heavy Alcohol Consumption',
    description: 'Ethanol blunts intestinal thiamine and folate absorption and increases urinary zinc and magnesium loss.',
    affectedNutrientIds: [
      { nutrientId: 'vit_b1', riskMultiplier: 2.6 },
      { nutrientId: 'vit_b9', riskMultiplier: 2.0 },
      { nutrientId: 'vit_b2', riskMultiplier: 1.7 },
      { nutrientId: 'zinc', riskMultiplier: 1.7 },
      { nutrientId: 'magnesium', riskMultiplier: 1.8 },
    ],
  },
  {
    id: 'low_produce_diet',
    category: 'diet',
    label: 'Low Daily Fresh Produce / Vegetables',
    description: 'Eating fewer than 2 servings of fresh fruits and vegetables per day; relying on processed or refined meals.',
    affectedNutrientIds: [
      { nutrientId: 'vit_c', riskMultiplier: 2.5 },
      { nutrientId: 'vit_b9', riskMultiplier: 2.2 },
      { nutrientId: 'vit_a', riskMultiplier: 1.9 },
      { nutrientId: 'vit_k', riskMultiplier: 1.8 },
    ],
  },
  {
    id: 'gut_malabsorption',
    category: 'medical',
    label: 'Celiac, Crohn’s, IBS, or Bariatric Surgery',
    description: 'Gastrointestinal inflammation, mucosal flattening, or shortened bowel transit drastically limits nutrient assimilation.',
    affectedNutrientIds: [
      { nutrientId: 'vit_b12', riskMultiplier: 2.7 },
      { nutrientId: 'iron', riskMultiplier: 2.4 },
      { nutrientId: 'vit_d', riskMultiplier: 2.2 },
      { nutrientId: 'zinc', riskMultiplier: 2.0 },
      { nutrientId: 'vit_a', riskMultiplier: 1.8 },
    ],
  },
  {
    id: 'smoking_vaping',
    category: 'lifestyle',
    label: 'Smoking Cigarettes or Daily Vaping',
    description: 'Each cigarette oxidizes roughly 25mg of ascorbic acid through persistent reactive oxygen species creation.',
    affectedNutrientIds: [
      { nutrientId: 'vit_c', riskMultiplier: 2.6 },
    ],
  },
];
