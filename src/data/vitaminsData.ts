import { VitaminDeficiency } from '../types/nutrition';

export const VITAMINS_DATA: VitaminDeficiency[] = [
  {
    id: 'vit_b12',
    name: 'Vitamin B12',
    scientificName: 'Cobalamin / Methylcobalamin',
    category: 'water-soluble',
    dailyRda: {
      male: '2.4 mcg',
      female: '2.4 mcg',
      pregnancy: '2.6 - 2.8 mcg',
    },
    upperLimit: 'No established UL (excess excreted in urine)',
    biochemicalRole: 'Essential cofactor for methionine synthase (homocysteine to methionine) and methylmalonyl-CoA mutase. Required for DNA synthesis, red blood cell maturation, and myelin sheath maintenance of neurons.',
    deficiencySymptoms: [
      'Pins and needles (peripheral neuropathy in hands and feet)',
      'Severe unrefreshing fatigue and weakness',
      'Smooth, swollen, beefy red tongue (glossitis)',
      'Brain fog, memory lapses, and difficulty concentrating',
      'Pale or mild lemon-yellow skin (jaundice from hemolysis)',
      'Balance issues, unsteady gait, or loss of proprioception',
      'Mood changes, depressive symptoms, or irritability'
    ],
    earlySigns: [
      'Subtle tingling in fingertips or toes',
      'Intermittent brain fog',
      'Low exercise tolerance and shortness of breath upon exertion'
    ],
    severeSigns: [
      'Subacute combined degeneration of the spinal cord',
      'Megaloblastic / pernicious anemia',
      'Irreversible ataxia or nerve damage'
    ],
    toxicitySigns: [
      'Generally non-toxic; rare transient acneiform eruptions with high-dose megadoses'
    ],
    topFoodSources: [
      { name: 'Clams & Oysters', amount: '84 mcg per 3 oz', percentDailyValue: 3500, category: 'animal' },
      { name: 'Beef Liver', amount: '70.7 mcg per 3 oz', percentDailyValue: 2945, category: 'animal' },
      { name: 'Salmon & Mackerel', amount: '4.8 mcg per 3 oz', percentDailyValue: 200, category: 'animal' },
      { name: 'Fortified Nutritional Yeast', amount: '8 - 24 mcg per 2 tbsp', percentDailyValue: 400, category: 'fortified' },
      { name: 'Greek Yogurt & Eggs', amount: '1.2 mcg per cup / egg', percentDailyValue: 50, category: 'animal' },
      { name: 'Fortified Plant Milk', amount: '1.5 - 3.0 mcg per cup', percentDailyValue: 80, category: 'fortified' }
    ],
    absorptionBoosters: [
      'Adequate stomach hydrochloric acid',
      'Intrinsic factor secretion by gastric parietal cells',
      'Healthy ileum (terminal small intestine) function'
    ],
    absorptionBlockers: [
      'Proton Pump Inhibitors (Omeprazole, Pantoprazole) reducing stomach acid',
      'Metformin (interferes with calcium-dependent ileal B12 uptake)',
      'H2 receptor blockers and heavy chronic alcohol consumption',
      'Ileal resection, Crohn’s disease, or Celiac disease'
    ],
    recommendedLabTests: [
      { testName: 'Serum Vitamin B12', optimalRange: '> 400 - 900 pg/mL', clinicalNote: 'Standard screen, but can give false normal readings in early tissue deficiency.' },
      { testName: 'Methylmalonic Acid (MMA)', optimalRange: '< 0.40 µmol/L', clinicalNote: 'Gold standard functional marker; elevated MMA directly proves intracellular B12 starvation.' },
      { testName: 'Homocysteine', optimalRange: '< 10 µmol/L', clinicalNote: 'Elevated in B12 and folate deficits; cardiovascular & neurological risk marker.' }
    ],
    highRiskPopulations: [
      'Strict vegans and vegetarians (plant foods lack bioavailable B12)',
      'Adults over 60 (atrophic gastritis decreases intrinsic factor)',
      'Patients on long-term Metformin or acid-suppressing PPIs',
      'Post-bariatric gastric bypass surgery patients'
    ],
    color: 'emerald'
  },
  {
    id: 'vit_d',
    name: 'Vitamin D3',
    scientificName: 'Cholecalciferol',
    category: 'fat-soluble',
    dailyRda: {
      male: '600 - 800 IU (15 - 20 mcg)',
      female: '600 - 800 IU (15 - 20 mcg)',
      pregnancy: '600 - 1000 IU',
    },
    upperLimit: '4,000 IU/day (Tolerable Upper Intake Level for adults)',
    biochemicalRole: 'Acts as a steroid hormone modulating over 1,000 human genes. Regulates calcium and phosphate absorption in gut, essential for bone mineralization, neuromuscular transmission, and innate immune defense.',
    deficiencySymptoms: [
      'Deep, aching bone pain (especially in shins, sternum, or lower back)',
      'Proximal muscle weakness and heaviness in thighs',
      'Frequent respiratory infections and slow illness recovery',
      'Chronic daytime fatigue despite full night sleep',
      'Depressed mood, seasonal affective disorder (SAD), or apathy',
      'Hair shedding or telogen effluvium'
    ],
    earlySigns: [
      'Mild low back stiffness and unrefreshing sleep',
      'Catching recurrent common colds or sinus infections'
    ],
    severeSigns: [
      'Osteomalacia (adult softening of bones, bowing or pseudofractures)',
      'Rickets in growing children',
      'Severe hypocalcemic tetany'
    ],
    toxicitySigns: [
      'Hypercalcemia: nausea, polyuria, polydipsia, kidney stones, vascular calcification'
    ],
    topFoodSources: [
      { name: 'Sunlight Synthesis (UVB on skin)', amount: '10,000 IU in 15 mins summer sun', percentDailyValue: 1250, category: 'plant' },
      { name: 'Wild Sockeye Salmon', amount: '570 IU per 3 oz', percentDailyValue: 95, category: 'animal' },
      { name: 'Cod Liver Oil', amount: '1,360 IU per 1 tbsp', percentDailyValue: 227, category: 'animal' },
      { name: 'UV-Exposed Mushrooms', amount: '400 - 800 IU per 100g', percentDailyValue: 100, category: 'plant' },
      { name: 'Fortified Milk or Plant Milk', amount: '120 IU per cup', percentDailyValue: 20, category: 'fortified' },
      { name: 'Egg Yolks (pastured)', amount: '44 IU per yolk', percentDailyValue: 8, category: 'animal' }
    ],
    absorptionBoosters: [
      'Consuming with healthy dietary dietary fat (olive oil, avocado, eggs)',
      'Adequate Magnesium (magnesium is required for 8 enzymatic conversion steps to active 1,25-OH2-D)',
      'Vitamin K2 (directs calcium mobilized by Vit D into bones rather than arterial walls)'
    ],
    absorptionBlockers: [
      'High melanin skin pigmentation (reduces cutaneous UVB synthesis by up to 90%)',
      'Living above 37° latitude during winter months',
      'Fat malabsorption disorders (celiac, cystic fibrosis, Crohn’s)',
      'Obesity (vitamin D gets sequestered inside adipose tissue)'
    ],
    recommendedLabTests: [
      { testName: 'Serum 25-Hydroxy Vitamin D [25(OH)D]', optimalRange: '40 - 70 ng/mL (100 - 175 nmol/L)', clinicalNote: 'Standard definitive diagnostic test for whole-body stores. Levels < 20 ng/mL denote severe deficiency.' },
      { testName: 'Intact PTH (Parathyroid Hormone)', optimalRange: '15 - 65 pg/mL', clinicalNote: 'Rises compensatory when Vitamin D/Calcium levels drop.' }
    ],
    highRiskPopulations: [
      'Desk workers and indoor individuals with minimal direct midday sunlight',
      'Individuals with darker skin tones living in temperate/northern climates',
      'Older adults with reduced skin 7-dehydrocholesterol synthesis',
      'People with malabsorption or BMI > 30'
    ],
    color: 'amber'
  },
  {
    id: 'iron',
    name: 'Iron',
    scientificName: 'Ferritin / Elemental Iron',
    category: 'mineral',
    dailyRda: {
      male: '8 mg',
      female: '18 mg (pre-menopausal) / 8 mg (post-menopausal)',
      pregnancy: '27 mg',
    },
    upperLimit: '45 mg/day (unless therapeutic under physician care)',
    biochemicalRole: 'Central component of hemoglobin for oxygen transport to all tissues, myoglobin in muscle fibers, and mitochondrial cytochromes for cellular ATP production.',
    deficiencySymptoms: [
      'Extreme exhaustion, shortness of breath on stairs, and heart palpitations',
      'Pale inner eyelids (conjunctival pallor) and pale nailbeds',
      'Brittle, ridged, or spoon-shaped concave nails (koilonychia)',
      'Cold hands and feet with poor thermoregulation',
      'Restless Legs Syndrome (RLS) especially at bedtime',
      'Craving non-nutritive substances (pica: ice chewing, dirt, starch)',
      'Cracks at mouth corners (angular cheilitis) and diffuse hair shedding'
    ],
    earlySigns: [
      'Depleted stamina and fatigue without anemia (latent iron depletion)',
      'Difficulty catching breath on moderate climbs',
      'Compulsive craving for crunchy ice cubes (pagophagia)'
    ],
    severeSigns: [
      'Severe Microcytic Hypochromic Anemia',
      'High-output heart failure in severe chronic deficiency',
      'Prominent spoon nails (koilonychia)'
    ],
    toxicitySigns: [
      'Iron overload / Hemochromatosis: organ damage, liver cirrhosis, skin bronzing'
    ],
    topFoodSources: [
      { name: 'Cooked Oysters & Mussels', amount: '8 mg per 3 oz', percentDailyValue: 44, category: 'animal' },
      { name: 'Grass-fed Beef & Organ Meats', amount: '3 - 5 mg per 3 oz', percentDailyValue: 25, category: 'animal' },
      { name: 'Lentils & Chickpeas', amount: '6.6 mg per cup cooked', percentDailyValue: 37, category: 'plant' },
      { name: 'Cooked Spinach & Swiss Chard', amount: '6.4 mg per cup', percentDailyValue: 36, category: 'plant' },
      { name: 'Pumpkin Seeds', amount: '2.5 mg per 1 oz', percentDailyValue: 14, category: 'plant' },
      { name: 'Blackstrap Molasses', amount: '3.5 mg per 1 tbsp', percentDailyValue: 20, category: 'plant' }
    ],
    absorptionBoosters: [
      'Ascorbic Acid (Vitamin C): enhances non-heme plant iron uptake by 300% when taken simultaneously',
      'Meat-Fish-Poultry factor (MFP peptide)',
      'Soaking, sprouting, or fermenting grains to degrade phytates'
    ],
    absorptionBlockers: [
      'Tannins and polyphenols in black tea, coffee, and red wine (take 2h away from iron)',
      'Calcium supplements and dairy (competes directly with DMT1 transporter)',
      'Phytic acid in unsoaked whole grains and legumes',
      'High-dose zinc supplements'
    ],
    recommendedLabTests: [
      { testName: 'Serum Ferritin', optimalRange: '50 - 100 ng/mL for non-inflamed adults', clinicalNote: 'Reflects total intracellular storage. Values < 30 ng/mL are diagnostic of deficiency even if hemoglobin is normal.' },
      { testName: 'Complete Blood Count (CBC)', optimalRange: 'Hb: 12-16 g/dL; MCV: 80-100 fL', clinicalNote: 'Look for low MCV (microcytic) and low MCH (hypochromic).' },
      { testName: 'Transferrin Saturation (Iron Sat)', optimalRange: '20% - 45%', clinicalNote: 'Values < 16% denote inadequate circulating iron for erythropoiesis.' }
    ],
    highRiskPopulations: [
      'Menstruating women with heavy blood loss (menorrhagia)',
      'Pregnant women (blood volume expands by 50%)',
      'Strict plant-based eaters (non-heme iron is less bioavailable)',
      'Endurance runners (foot-strike hemolysis and GI micro-bleeds)'
    ],
    color: 'rose'
  },
  {
    id: 'vit_c',
    name: 'Vitamin C',
    scientificName: 'Ascorbic Acid',
    category: 'water-soluble',
    dailyRda: {
      male: '90 mg',
      female: '75 mg',
      pregnancy: '85 - 120 mg (+35 mg for active smokers)',
    },
    upperLimit: '2,000 mg/day (excess can trigger osmotic diarrhea or oxalate kidney stones)',
    biochemicalRole: 'Cofactor for prolyl and lysyl hydroxylases critical for triple-helix collagen cross-linking; powerful aqueous antioxidant; required for carnitine and norepinephrine biosynthesis and enhances non-heme iron uptake.',
    deficiencySymptoms: [
      'Gums bleeding easily when brushing or flossing',
      'Easy spontaneous skin bruising (ecchymoses)',
      'Pinpoint red-purple skin spots around hair follicles (perifollicular petechiae)',
      'Corkscrew or coiled body hairs',
      'Extremely slow wound healing or reopened old scars',
      'Dry, rough, bumpy skin (hyperkeratosis)',
      'Swollen, painful joints and recurrent infections'
    ],
    earlySigns: [
      'Gingivitis / bleeding on brushing',
      'Mild joint ache and unprovoked micro-bruising'
    ],
    severeSigns: [
      'Clinical Scurvy (loose teeth, subperiosteal hematomas, anemia, joint hemarthroses)'
    ],
    toxicitySigns: [
      'Gastrointestinal cramping, loose stools, increased risk of calcium oxalate stones'
    ],
    topFoodSources: [
      { name: 'Guava', amount: '126 mg per fruit', percentDailyValue: 140, category: 'plant' },
      { name: 'Red Bell Pepper', amount: '190 mg per cup raw', percentDailyValue: 211, category: 'plant' },
      { name: 'Kiwi Fruit', amount: '70 mg per medium kiwi', percentDailyValue: 78, category: 'plant' },
      { name: 'Strawberries & Citrus', amount: '89 mg per cup', percentDailyValue: 99, category: 'plant' },
      { name: 'Broccoli & Brussels Sprouts', amount: '80 mg per cup cooked', percentDailyValue: 90, category: 'plant' }
    ],
    absorptionBoosters: [
      'Eating raw or lightly steamed (heat, boiling water, and prolonged storage oxidize ascorbic acid)',
      'Bioflavonoids in whole citrus fruits'
    ],
    absorptionBlockers: [
      'Cigarette smoke (each cigarette consumes approx 25mg of ascorbic acid via oxidative stress)',
      'Excessive alcohol intake'
    ],
    recommendedLabTests: [
      { testName: 'Plasma Ascorbic Acid', optimalRange: '0.4 - 2.0 mg/dL', clinicalNote: 'Levels < 0.2 mg/dL denote frank deficiency; < 0.1 mg/dL indicates scurvy.' }
    ],
    highRiskPopulations: [
      'Active tobacco smokers or passive smoke-exposed individuals',
      'Diets lacking fresh raw produce, vegetables, and fruit',
      'Elderly individuals with solitary restricted cooking habits',
      'Severe alcohol dependency'
    ],
    color: 'orange'
  },
  {
    id: 'zinc',
    name: 'Zinc',
    scientificName: 'Zinc Gluconate / Picolinate / Bisglycinate',
    category: 'mineral',
    dailyRda: {
      male: '11 mg',
      female: '8 mg',
      pregnancy: '11 - 12 mg',
    },
    upperLimit: '40 mg/day (excess induces severe copper deficiency and immunosuppression)',
    biochemicalRole: 'Structural and catalytic cofactor for over 300 enzymes, including alkaline phosphatase, alcohol dehydrogenase, and RNA/DNA polymerases. Crucial for T-cell immunity, epidermal barrier repair, testosterone synthesis, and taste sensation (gustin).',
    deficiencySymptoms: [
      'Loss or blunting of taste and smell (hypogeusia / hyposmia)',
      'Impaired wound healing and frequent colds or skin infections',
      'Diffuse hair thinning and telogen hair loss',
      'White transversal flecks or spots on fingernails (leukonychia)',
      'Dermatitis around mouth and perineum (acrodermatitis)',
      'Erectile dysfunction and low libido',
      'Diarrhea and impaired gut barrier integrity'
    ],
    earlySigns: [
      'Food tastes bland or metallic',
      'Scratches take double the usual time to close'
    ],
    severeSigns: [
      'Acrodermatitis enteropathica (classic triade: dermatitis, alopecia, diarrhea)',
      'Severe secondary immune paralysis'
    ],
    toxicitySigns: [
      'Nausea, vomiting, metallic taste, copper deficiency leading to microcytic anemia & myeloneuropathy'
    ],
    topFoodSources: [
      { name: 'Pacific Oysters', amount: '32 mg per 3 oz', percentDailyValue: 290, category: 'animal' },
      { name: 'Beef Shank / Roast', amount: '7 mg per 3 oz', percentDailyValue: 64, category: 'animal' },
      { name: 'Pumpkin & Hemp Seeds', amount: '2.9 mg per 1 oz', percentDailyValue: 26, category: 'plant' },
      { name: 'Lentils & Garbanzo Beans', amount: '2.5 mg per cup cooked', percentDailyValue: 23, category: 'plant' },
      { name: 'Cashews', amount: '1.6 mg per 1 oz', percentDailyValue: 15, category: 'plant' }
    ],
    absorptionBoosters: [
      'Dietary protein (cysteine and methionine form absorbable zinc complexes)',
      'Fermented, soaked, or leavened grains'
    ],
    absorptionBlockers: [
      'Phytic acid in unfermented grains and soy (strong chelator)',
      'High-dose iron supplements taken concurrently (compete for zip transporters)',
      'High calcium levels'
    ],
    recommendedLabTests: [
      { testName: 'Plasma / Serum Zinc', optimalRange: '70 - 120 µg/dL', clinicalNote: 'Fast overnight; sample must be drawn in trace element tube avoiding hemolysis.' },
      { testName: 'Alkaline Phosphatase (ALP)', optimalRange: '44 - 147 IU/L', clinicalNote: 'A zinc-dependent enzyme; low ALP often signals functional zinc deficit.' }
    ],
    highRiskPopulations: [
      'Strict vegetarians/vegans (higher phytate-to-zinc dietary ratio)',
      'Patients with inflammatory bowel disease (Crohn’s, Ulcerative Colitis)',
      'Individuals with chronic diarrhea or short bowel syndrome',
      'Alcoholics (ethanol increases urinary zinc wasting)'
    ],
    color: 'teal'
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    scientificName: 'Magnesium Glycinate / Malate / Citrate',
    category: 'mineral',
    dailyRda: {
      male: '400 - 420 mg',
      female: '310 - 320 mg',
      pregnancy: '350 - 360 mg',
    },
    upperLimit: '350 mg/day from supplementary elemental magnesium (dietary has no UL)',
    biochemicalRole: 'Fourth most abundant cation in the human body. Obligate cofactor for ATP (which circulates as Mg-ATP complex) in >600 enzymatic reactions. Regulates neuromuscular excitability, cardiac rhythm, insulin receptor sensitivity, and vascular tone.',
    deficiencySymptoms: [
      'Involuntary eyelid twitches (myokymia) and facial muscle spasms',
      'Painful nocturnal calf cramps and feet muscle tightening',
      'Heart palpitations, skipped beats, or premature atrial/ventricular beats',
      'Chronic insomnia, restless tossing, and hyper-aroused nervous system',
      'Headaches and migraine frequency',
      'Elevated blood pressure and tension',
      'Refractory hypokalemia and hypocalcemia'
    ],
    earlySigns: [
      'Occasional eye fluttering twitches',
      'Restless legs after physical exertion',
      'Difficulty unwinding at night'
    ],
    severeSigns: [
      'Tetany, Trousseau / Chvostek signs, intractable seizures, Torsades de Pointes arrhythmia'
    ],
    toxicitySigns: [
      'Osmotic diarrhea (especially with oxide/citrate), lethargy, hypotension with IV overdose'
    ],
    topFoodSources: [
      { name: 'Pumpkin & Squash Seeds', amount: '156 mg per 1 oz', percentDailyValue: 37, category: 'plant' },
      { name: 'Dark Chocolate (85%+ cacao)', amount: '65 mg per 1 oz', percentDailyValue: 15, category: 'plant' },
      { name: 'Cooked Spinach', amount: '157 mg per cup', percentDailyValue: 37, category: 'plant' },
      { name: 'Almonds & Cashews', amount: '80 mg per 1 oz', percentDailyValue: 19, category: 'plant' },
      { name: 'Black Beans & Quinoa', amount: '120 mg per cup cooked', percentDailyValue: 28, category: 'plant' },
      { name: 'Avocado', amount: '58 mg per fruit', percentDailyValue: 14, category: 'plant' }
    ],
    absorptionBoosters: [
      'Dividing doses across the day',
      'Taking as chelated forms (magnesium glycinate or malate)',
      'Vitamin B6 (enhances cellular magnesium transport)'
    ],
    absorptionBlockers: [
      'Chronic high-dose PPI medications (impairs TRPM6/7 channel absorption)',
      'Loop and thiazide diuretics (wastes magnesium in renal tubules)',
      'Excessive refined sugar and carbonated sodas rich in phosphoric acid',
      'High chronic cortisol and physiological stress'
    ],
    recommendedLabTests: [
      { testName: 'RBC Magnesium (Red Blood Cell Mg)', optimalRange: '5.5 - 6.8 mg/dL', clinicalNote: 'Only 1% of total body magnesium is in serum. Serum Mg is tightly homeostatically controlled and falsely normal until severe crisis; RBC Mg is vastly more reliable.' }
    ],
    highRiskPopulations: [
      'People under chronic mental or physical stress (stress triggers renal magnesium dumping)',
      'Patients taking long-term Diuretics or Proton Pump Inhibitors',
      'Type 2 diabetics (glucosuria causes renal magnesium loss)',
      'People consuming ultra-processed standard Western diets stripped of magnesium'
    ],
    color: 'indigo'
  },
  {
    id: 'vit_b2',
    name: 'Vitamin B2',
    scientificName: 'Riboflavin',
    category: 'water-soluble',
    dailyRda: {
      male: '1.3 mg',
      female: '1.1 mg',
      pregnancy: '1.4 mg',
    },
    upperLimit: 'No UL established (causes harmless neon-yellow urine: riboflavinuria)',
    biochemicalRole: 'Precursor to flavin mononucleotide (FMN) and flavin adenine dinucleotide (FAD), fundamental electron carriers for mitochondrial ATP production in the Krebs cycle and fatty acid beta-oxidation.',
    deficiencySymptoms: [
      'Painful fissures or cracks at both corners of the lips (angular cheilitis / perleche)',
      'Swollen, magenta or purplish inflamed tongue',
      'Cracked, peeling lips (cheilosis)',
      'Seborrheic dermatitis around the nose, eyelids, and ears',
      'Bloodshot, burning, itchy eyes with photophobia (light sensitivity)',
      'Normocytic, normochromic anemia (erythroid hypoplasia)'
    ],
    earlySigns: [
      'Dryness and burning sensation at mouth corners',
      'Mild light sensitivity'
    ],
    severeSigns: [
      'Ariboflavinosis (severe orogenital syndrome, corneal vascularization)'
    ],
    toxicitySigns: [
      'Completely non-toxic; turns urine fluorescent yellow/green'
    ],
    topFoodSources: [
      { name: 'Beef Liver & Kidneys', amount: '3 mg per 3 oz', percentDailyValue: 230, category: 'animal' },
      { name: 'Plain Greek Yogurt & Milk', amount: '0.6 mg per cup', percentDailyValue: 46, category: 'animal' },
      { name: 'Eggs', amount: '0.2 mg per large egg', percentDailyValue: 15, category: 'animal' },
      { name: 'Portabella Mushrooms', amount: '0.5 mg per cup cooked', percentDailyValue: 38, category: 'plant' },
      { name: 'Almonds', amount: '0.3 mg per 1 oz', percentDailyValue: 23, category: 'plant' },
      { name: 'Spinach', amount: '0.4 mg per cup cooked', percentDailyValue: 31, category: 'plant' }
    ],
    absorptionBoosters: [
      'Healthy thyroid hormone levels (thyroxine activates conversion to FAD)',
      'Ingestion with meals'
    ],
    absorptionBlockers: [
      'Photodegradation (riboflavin is instantly destroyed by UV light; milk in clear glass bottles loses 50% in 2 hours)',
      'Chronic alcoholism',
      'Severe anorexia or food restriction'
    ],
    recommendedLabTests: [
      { testName: 'Erythrocyte Glutathione Reductase Activity Coefficient (EGRAC)', optimalRange: 'Activity coefficient < 1.2', clinicalNote: 'Gold standard functional assay for riboflavin status; coefficient > 1.4 confirms deficiency.' }
    ],
    highRiskPopulations: [
      'Strict vegans avoiding both dairy and eggs',
      'Pregnant and lactating mothers with inadequate protein intake',
      'Athletes with extreme energy demands and low caloric intake'
    ],
    color: 'yellow'
  },
  {
    id: 'vit_b9',
    name: 'Vitamin B9',
    scientificName: 'Folate / 5-MTHF (Methylfolate)',
    category: 'water-soluble',
    dailyRda: {
      male: '400 mcg DFE',
      female: '400 mcg DFE',
      pregnancy: '600 mcg DFE (crucial first trimester for neural tube closure)',
    },
    upperLimit: '1,000 mcg/day synthetic folic acid (to avoid masking B12 deficiency neuropathy)',
    biochemicalRole: 'One-carbon metabolism transfer agent. Essential for purine and thymidine synthesis (DNA replication/repair), amino acid interconversions, and homocysteine remethylation alongside B12.',
    deficiencySymptoms: [
      'Severe unrefreshing fatigue, lethargy, and breathlessness',
      'Glossitis (sore, smooth, tender red tongue)',
      'Angular cheilitis and shallow aphthous mouth ulcers',
      'Premature graying of hair',
      'Depression, irritability, and cognitive slowdown',
      'Elevated homocysteine and neural tube birth defects in offspring'
    ],
    earlySigns: [
      'General sluggishness and burning sensation on tongue',
      'Frequent minor mouth sores'
    ],
    severeSigns: [
      'Megaloblastic anemia (indistinguishable on peripheral smear from B12 deficiency)',
      'Neural tube defects (spina bifida / anencephaly) in embryonic development'
    ],
    toxicitySigns: [
      'High synthetic folic acid intake can mask B12 deficiency anemia while allowing irreversible neurological damage to advance'
    ],
    topFoodSources: [
      { name: 'Cooked Edamame & Lentils', amount: '358 mcg per cup', percentDailyValue: 90, category: 'plant' },
      { name: 'Asparagus', amount: '268 mcg per cup cooked', percentDailyValue: 67, category: 'plant' },
      { name: 'Raw Spinach & Dark Leafy Greens', amount: '131 mcg per cup', percentDailyValue: 33, category: 'plant' },
      { name: 'Avocado', amount: '122 mcg per whole avocado', percentDailyValue: 30, category: 'plant' },
      { name: 'Beef Liver', amount: '215 mcg per 3 oz', percentDailyValue: 54, category: 'animal' },
      { name: 'Brussels Sprouts & Broccoli', amount: '94 mcg per cup', percentDailyValue: 24, category: 'plant' }
    ],
    absorptionBoosters: [
      'Consuming fresh, raw, or minimally steamed greens (50-90% destroyed by prolonged boiling)',
      'Active MTHFR enzyme function'
    ],
    absorptionBlockers: [
      'Methotrexate and Trimethoprim (inhibit dihydrofolate reductase)',
      'Sulfasalazine and Anticonvulsants (Phenytoin, Carbamazepine)',
      'Chronic alcohol consumption (interferes with enterohepatic circulation of folate)'
    ],
    recommendedLabTests: [
      { testName: 'RBC Folate (Red Blood Cell Folate)', optimalRange: '> 300 ng/mL', clinicalNote: 'Reflects tissue folate over prior 3-4 months; much more stable than serum folate which fluctuates with yesterday’s meal.' },
      { testName: 'Total Plasma Homocysteine', optimalRange: '< 10 µmol/L', clinicalNote: 'Sensitive marker of one-carbon methyl starvation.' }
    ],
    highRiskPopulations: [
      'Women of childbearing age and early pregnancy',
      'Individuals with MTHFR C677T polymorphism',
      'Patients taking Methotrexate, Sulfasalazine, or anti-seizure medications',
      'Diets lacking fresh green vegetables'
    ],
    color: 'emerald'
  },
  {
    id: 'vit_a',
    name: 'Vitamin A',
    scientificName: 'Retinol (preformed) / Beta-Carotene (provitamin)',
    category: 'fat-soluble',
    dailyRda: {
      male: '900 mcg RAE (3,000 IU)',
      female: '700 mcg RAE (2,333 IU)',
      pregnancy: '770 mcg RAE',
    },
    upperLimit: '3,000 mcg RAE/day (10,000 IU) preformed retinol due to teratogenicity and hepatotoxicity',
    biochemicalRole: 'Forms rhodopsin pigment in retina for low-light night vision. Essential for maintaining epithelial cellular differentiation (skin, corneal surface, respiratory, and GI tract lining) and immune competence.',
    deficiencySymptoms: [
      'Impaired night vision (nyctalopia) and slow dark adaptation',
      'Dry, gritty eyes and loss of tears (xerophthalmia)',
      'Foamy white plaques on the conjunctiva (Bitot’s spots)',
      'Bumpy, rough "chicken skin" on back of upper arms (keratosis pilaris / follicular hyperkeratosis)',
      'Frequent chest and ear infections',
      'Dry, brittle hair and cracked skin'
    ],
    earlySigns: [
      'Straining to see when driving at dusk or entering dark cinemas',
      'Persistent dry sensation under eyelids'
    ],
    severeSigns: [
      'Keratomalacia (corneal ulceration, melting, and permanent irreversible blindness)',
      'Severe systemic immunodeficiency'
    ],
    toxicitySigns: [
      'Teratogenic birth defects if taken in excess during pregnancy; intracranial hypertension (pseudotumor cerebri), liver fibrosis, bone fractures'
    ],
    topFoodSources: [
      { name: 'Beef Liver', amount: '6,582 mcg per 3 oz', percentDailyValue: 731, category: 'animal' },
      { name: 'Baked Sweet Potato (with skin)', amount: '1,403 mcg RAE per medium potato', percentDailyValue: 156, category: 'plant' },
      { name: 'Carrots', amount: '509 mcg RAE per 1/2 cup raw', percentDailyValue: 56, category: 'plant' },
      { name: 'Spinach & Kale', amount: '470 mcg RAE per cup cooked', percentDailyValue: 52, category: 'plant' },
      { name: 'Pastured Butter & Egg Yolks', amount: '100 - 150 mcg RAE', percentDailyValue: 15, category: 'animal' }
    ],
    absorptionBoosters: [
      'Consuming plant carotenoids with dietary fat (e.g. olive oil on carrots increases beta-carotene uptake by 4x)',
      'Adequate Zinc status (zinc is required to synthesize Retinol Binding Protein [RBP] in liver)'
    ],
    absorptionBlockers: [
      'Fat malabsorption (bile acid deficiency, celiac, pancreatic insufficiency)',
      'Poor thyroid function (hypothyroidism inhibits BCMO1 carotene-to-retinol conversion enzyme)'
    ],
    recommendedLabTests: [
      { testName: 'Serum Retinol', optimalRange: '30 - 65 µg/dL (1.05 - 2.27 µmol/L)', clinicalNote: 'Homeostatically maintained until liver retinol stores are over 90% depleted.' },
      { testName: 'Retinol-Binding Protein (RBP)', optimalRange: '3.0 - 6.0 mg/dL', clinicalNote: 'Parallel measure of circulating transport capacity.' }
    ],
    highRiskPopulations: [
      'Patients with cystic fibrosis, chronic pancreatitis, or post-cholecystectomy bile issues',
      'Poor converters of beta-carotene to retinol due to BCMO1 genetic variations on strict vegan diets',
      'Low socioeconomic groups with restricted produce access'
    ],
    color: 'amber'
  },
  {
    id: 'vit_b1',
    name: 'Vitamin B1',
    scientificName: 'Thiamine',
    category: 'water-soluble',
    dailyRda: {
      male: '1.2 mg',
      female: '1.1 mg',
      pregnancy: '1.4 mg',
    },
    upperLimit: 'No UL established (rapidly cleared by kidneys)',
    biochemicalRole: 'Precursor to Thiamine Pyrophosphate (TPP), essential rate-limiting cofactor for pyruvate dehydrogenase and alpha-ketoglutarate dehydrogenase in glucose ATP metabolism, and transketolase in pentose phosphate pathway. Crucial for heart muscle and high-energy central nervous tissue.',
    deficiencySymptoms: [
      'Loss of sensation, burning feet, or tingling in lower legs (dry beriberi)',
      'Rapid resting pulse, shortness of breath on mild exertion, leg edema (wet beriberi)',
      'Severe mental confusion, apathy, and memory deficits (Wernicke-Korsakoff syndrome)',
      'Muscle wasting in calf muscles and loss of knee-jerk reflexes',
      'Unexplained nausea, vomiting, and profound appetite loss'
    ],
    earlySigns: [
      'Fatigue, heavy feeling in legs after climbing steps, loss of appetite'
    ],
    severeSigns: [
      'Wernicke’s Encephalopathy: triad of ataxia, ophthalmoplegia (nystagmus/paralysis), and confusion',
      'High-output congestive heart failure (Wet Beriberi)'
    ],
    toxicitySigns: [
      'Non-toxic via oral route'
    ],
    topFoodSources: [
      { name: 'Pork Tenderloin', amount: '0.8 mg per 3 oz', percentDailyValue: 67, category: 'animal' },
      { name: 'Sunflower Seeds', amount: '0.4 mg per 1 oz', percentDailyValue: 33, category: 'plant' },
      { name: 'Black Beans & Navy Beans', amount: '0.4 mg per cup cooked', percentDailyValue: 33, category: 'plant' },
      { name: 'Fortified Whole Wheat / Enriched Grain', amount: '0.3 mg per serving', percentDailyValue: 25, category: 'fortified' },
      { name: 'Trout', amount: '0.4 mg per 3 oz', percentDailyValue: 33, category: 'animal' }
    ],
    absorptionBoosters: [
      'Adequate Magnesium (magnesium is required by thiamine pyrophosphokinase to convert thiamine into its active form TPP)'
    ],
    absorptionBlockers: [
      'Alcohol (drastically reduces intestinal absorption and hepatic storage)',
      'Thiaminases in raw freshwater fish and betel nuts',
      'Refined white carbohydrate diets with high caloric throughput'
    ],
    recommendedLabTests: [
      { testName: 'Whole Blood Thiamine Diphosphate (TDP)', optimalRange: '70 - 180 nmol/L', clinicalNote: 'Whole blood is critical; serum thiamine is inaccurate as 80% of thiamine is inside RBCs.' }
    ],
    highRiskPopulations: [
      'Individuals with alcohol use disorder',
      'Bariatric surgery patients experiencing protracted postoperative vomiting',
      'Patients on long-term intravenous TPN without vitamin fortification',
      'Dialysis patients and severe hyperemesis gravidarum in pregnancy'
    ],
    color: 'cyan'
  },
  {
    id: 'vit_b6',
    name: 'Vitamin B6',
    scientificName: 'Pyridoxal 5-Phosphate (P5P)',
    category: 'water-soluble',
    dailyRda: {
      male: '1.3 - 1.7 mg',
      female: '1.3 - 1.5 mg',
      pregnancy: '1.9 mg',
    },
    upperLimit: '100 mg/day (excess pyridoxine HCl can paradoxically trigger sensory neuropathy)',
    biochemicalRole: 'Cofactor for over 140 transamination, decarboxylation, and racemization reactions. Required for neurotransmitter synthesis (Serotonin, Dopamine, GABA, Melatonin), heme synthesis, and glycogen breakdown.',
    deficiencySymptoms: [
      'Microcytic sideroblastic anemia (small pale red cells with iron trapped inside mitochondria)',
      'Greasy, scaly dermatitis over forehead, eyebrows, and nasolabial folds (seborrheic)',
      'Glossitis (bright red sore tongue) and angular stomatitis',
      'Extreme irritability, depression, and confusion',
      'Peripheral neuropathy (tingling in fingers and toes)',
      'Impaired cell-mediated immunity and recurring morning sickness in pregnancy'
    ],
    earlySigns: [
      'Sleep disturbances, vivid dreaming loss, mild cracks at lips'
    ],
    severeSigns: [
      'Intractable seizures in neonates / infants',
      'Severe sideroblastic anemia unresponsive to iron'
    ],
    toxicitySigns: [
      'Sensory neuropathy, sensory ataxia, loss of vibration sensation with chronic high doses (>200-500mg/day of Pyridoxine HCl)'
    ],
    topFoodSources: [
      { name: 'Chickpeas / Garbanzo Beans', amount: '1.1 mg per cup', percentDailyValue: 65, category: 'plant' },
      { name: 'Yellowfin Tuna & Salmon', amount: '0.9 mg per 3 oz', percentDailyValue: 53, category: 'animal' },
      { name: 'Chicken Breast', amount: '0.5 mg per 3 oz', percentDailyValue: 29, category: 'animal' },
      { name: 'Potatoes (with skin)', amount: '0.4 mg per medium potato', percentDailyValue: 24, category: 'plant' },
      { name: 'Bananas', amount: '0.4 mg per medium banana', percentDailyValue: 24, category: 'plant' }
    ],
    absorptionBoosters: [
      'Consuming as bioactive Pyridoxal 5-Phosphate (P5P)',
      'Healthy liver function (liver phosphorylates dietary pyridoxine)'
    ],
    absorptionBlockers: [
      'Isoniazid (anti-tuberculosis medication that binds and deactivates B6)',
      'Oral contraceptive pills with high estrogen',
      'Theophylline and Penicillamine'
    ],
    recommendedLabTests: [
      { testName: 'Plasma Pyridoxal 5-Phosphate (PLP)', optimalRange: '20 - 125 nmol/L (5 - 30 µg/L)', clinicalNote: 'Direct circulating bioactive form.' }
    ],
    highRiskPopulations: [
      'Patients on Isoniazid therapy for tuberculosis without B6 co-prescription',
      'Women on oral contraceptives or hormone replacement',
      'Patients with end-stage renal disease on hemodialysis',
      'Individuals with chronic alcohol dependence'
    ],
    color: 'sky'
  },
  {
    id: 'vit_b7',
    name: 'Biotin',
    scientificName: 'Vitamin B7 / Vitamin H',
    category: 'water-soluble',
    dailyRda: {
      male: '30 mcg Adequate Intake',
      female: '30 mcg Adequate Intake',
      pregnancy: '35 mcg',
    },
    upperLimit: 'No UL established (can severely interfere with troponin and thyroid lab tests!)',
    biochemicalRole: 'Prosthetic group for carboxylase enzymes in gluconeogenesis, fatty acid synthesis, and branched-chain amino acid catabolism. Crucial for keratin protein infrastructure in hair, skin, and nail plates.',
    deficiencySymptoms: [
      'Diffuse hair thinning, loss of luster, and progressing alopecia',
      'Brittle, split, peeling, and fragile fingernails',
      'Red, scaly erythematous rash around mouth, nose, eyes, and genital orifices',
      'Lethargy, hallucinations, depression, and localized paresthesias',
      'Conjunctivitis and mild muscle pains'
    ],
    earlySigns: [
      'Fingernails chip easily and break horizontally',
      'Increased hair shedding during brushing'
    ],
    severeSigns: [
      'Total alopecia, severe neurologic deterioration, hypotonia in biotinidase deficiency'
    ],
    toxicitySigns: [
      'Physiologically safe, BUT high-dose biotin supplements (>5mg) produce FALSE positives/negatives in streptavidin-biotin immunoassays (can falsely mask cardiac troponin in heart attack, or falsely simulate Graves disease on thyroid panel!)'
    ],
    topFoodSources: [
      { name: 'Cooked Eggs (Whole)', amount: '10 mcg per large egg', percentDailyValue: 33, category: 'animal' },
      { name: 'Beef Liver', amount: '31 mcg per 3 oz', percentDailyValue: 103, category: 'animal' },
      { name: 'Pork Chop', amount: '3.8 mcg per 3 oz', percentDailyValue: 13, category: 'animal' },
      { name: 'Salmon', amount: '5 mcg per 3 oz', percentDailyValue: 17, category: 'animal' },
      { name: 'Sunflower Seeds & Almonds', amount: '2.6 mcg per 1 oz', percentDailyValue: 9, category: 'plant' },
      { name: 'Sweet Potato', amount: '2.4 mcg per 1/2 cup', percentDailyValue: 8, category: 'plant' }
    ],
    absorptionBoosters: [
      'Cooking egg whites (cooking completely denatures avidin)',
      'Healthy colonic microbiome (synthesizes endogenous biotin)'
    ],
    absorptionBlockers: [
      'Consuming RAW egg whites (contains avidin, a glycoprotein that binds biotin with the highest known non-covalent biological affinity)',
      'Long-term broad-spectrum antibiotics eradicating gut flora',
      'Chronic anti-epileptic medications (Carbamazepine, Primidone)'
    ],
    recommendedLabTests: [
      { testName: 'Urinary 3-Hydroxyisovaleric Acid', optimalRange: '< 30 µmol/mmol creatinine', clinicalNote: 'Functional marker of beta-methylcrotonyl-CoA carboxylase activity; rises early in biotin depletion.' }
    ],
    highRiskPopulations: [
      'Bodybuilders or individuals drinking raw egg protein shakes',
      'Pregnant women (accelerated biotin catabolism occurs in ~30% of normal pregnancies)',
      'Individuals with rare inborn biotinidase deficiency',
      'Patients on prolonged total parenteral nutrition (TPN)'
    ],
    color: 'violet'
  },
  {
    id: 'vit_k',
    name: 'Vitamin K',
    scientificName: 'K1 (Phylloquinone) & K2 (Menaquinone-7)',
    category: 'fat-soluble',
    dailyRda: {
      male: '120 mcg Adequate Intake',
      female: '90 mcg Adequate Intake',
      pregnancy: '90 mcg',
    },
    upperLimit: 'No UL established',
    biochemicalRole: 'Essential co-factor for gamma-glutamyl carboxylase, which carboxylates glutamic acid residues in clotting factors (II, VII, IX, X) and bone regulatory proteins (Osteocalcin, Matrix Gla Protein - preventing arterial calcification).',
    deficiencySymptoms: [
      'Easy, unexplained skin bruising (ecchymoses)',
      'Frequent spontaneous nosebleeds (epistaxis) or bleeding gums',
      'Oozing from small cuts or venipuncture sites for prolonged minutes',
      'Heavy menstrual cycles (menorrhagia)',
      'Black tarry stools (melena) or blood in urine (hematuria)',
      'Decreased bone mineral density and arterial vessel stiffening'
    ],
    earlySigns: [
      'Bruising from trivial bumping against furniture',
      'Minor cuts take several minutes to clot'
    ],
    severeSigns: [
      'Hemorrhagic disease of the newborn / catastrophic intracranial hemorrhage',
      'Massive gastrointestinal bleeding'
    ],
    toxicitySigns: [
      'Natural K1/K2 are non-toxic. Synthetic menadione (K3) was discontinued due to neonatal jaundice and hemolytic anemia'
    ],
    topFoodSources: [
      { name: 'Japanese Natto (Fermented Soy)', amount: '850 mcg (K2-MK7) per 3 oz', percentDailyValue: 708, category: 'plant' },
      { name: 'Cooked Collards, Kale & Spinach', amount: '530 - 1,050 mcg (K1) per cup', percentDailyValue: 800, category: 'plant' },
      { name: 'Hard Aged Gouda / Brie Cheeses', amount: '75 mcg (K2) per 3 oz', percentDailyValue: 62, category: 'animal' },
      { name: 'Broccoli & Brussels Sprouts', amount: '110 mcg (K1) per cup', percentDailyValue: 92, category: 'plant' },
      { name: 'Pastured Egg Yolks', amount: '32 mcg (K2) per yolk', percentDailyValue: 27, category: 'animal' }
    ],
    absorptionBoosters: [
      'Consuming with healthy cooking fats or butter (fat-soluble vitamin)'
    ],
    absorptionBlockers: [
      'Warfarin / Coumadin (mechanistically antagonizes vitamin K epoxide reductase VKOR)',
      'High-dose Vitamin E (>1,000 IU interferes with K-dependent carboxylation)',
      'Orlistat or bile acid sequestrants (Cholestyramine)'
    ],
    recommendedLabTests: [
      { testName: 'Prothrombin Time (PT) & INR', optimalRange: 'INR: 0.9 - 1.1 (non-anticoagulated)', clinicalNote: 'Prolongs when functional prothrombin (Factor II) drops below 30% of normal.' },
      { testName: 'Under-carboxylated Osteocalcin (ucOC)', optimalRange: '< 20% total osteocalcin', clinicalNote: 'Sensitive functional marker for bone tissue Vitamin K2 insufficiency.' }
    ],
    highRiskPopulations: [
      'Newborn infants (minimal placental transfer + sterile newborn gut lack bacteria)',
      'Patients with chronic biliary obstruction, celiac disease, or cystic fibrosis',
      'Patients on prolonged broad-spectrum antibiotic regimens'
    ],
    color: 'emerald'
  },
  {
    id: 'calcium',
    name: 'Calcium',
    scientificName: 'Calcium Carbonate / Citrate / Hydroxyapatite',
    category: 'mineral',
    dailyRda: {
      male: '1,000 mg (1,200 mg for >70y)',
      female: '1,000 mg (1,200 mg for >50y)',
      pregnancy: '1,000 - 1,300 mg',
    },
    upperLimit: '2,000 - 2,500 mg/day (excess supplements linked to kidney stones & vascular plaques)',
    biochemicalRole: 'Most abundant mineral in skeleton (99% stored in hydroxyapatite matrix). 1% ionized serum calcium controls vital cardiac contraction, vascular dilation, nerve signal propagation, and blood coagulation.',
    deficiencySymptoms: [
      'Numbness and tingling in fingertips, toes, and perioral mouth region',
      'Muscle spasms, cramps, and carpopedal spasm (hand clawing)',
      'Brittle, fragile nails and easily chipped teeth',
      'Osteopenia, progressive osteoporosis, and increased bone fracture risk',
      'Cardiac arrhythmias (QT interval prolongation on ECG)'
    ],
    earlySigns: [
      'Tingling sensations around lips',
      'Muscle twitching after strenuous exercise'
    ],
    severeSigns: [
      'Tetany, Laryngospasm, Seizures, Chvostek’s sign (facial nerve tap twitch), Trousseau’s sign (carpal spasm with BP cuff)'
    ],
    toxicitySigns: [
      'Hypercalcemia: constipation, abdominal pain, renal calculi (stones), metastatic calcification'
    ],
    topFoodSources: [
      { name: 'Parmesan & Hard Aged Cheese', amount: '330 mg per 1 oz', percentDailyValue: 25, category: 'animal' },
      { name: 'Plain Greek Yogurt & Milk', amount: '300 - 450 mg per cup', percentDailyValue: 35, category: 'animal' },
      { name: 'Canned Sardines (with soft bones)', amount: '325 mg per 3 oz', percentDailyValue: 25, category: 'animal' },
      { name: 'Calcium-Set Firm Tofu', amount: '430 mg per 1/2 cup', percentDailyValue: 33, category: 'plant' },
      { name: 'Collard Greens & Bok Choy', amount: '268 mg per cup cooked', percentDailyValue: 21, category: 'plant' },
      { name: 'Fortified Orange Juice / Plant Milk', amount: '300 mg per cup', percentDailyValue: 23, category: 'fortified' }
    ],
    absorptionBoosters: [
      'Adequate Vitamin D (active calcitriol drives intestinal calcium transport proteins)',
      'Dividing doses (no more than 500 mg elemental calcium per serving for optimal receptor uptake)',
      'Calcium Citrate does not require stomach acid (better for elderly/PPI users)'
    ],
    absorptionBlockers: [
      'Oxalates in raw spinach, rhubarb, and beet greens (bind calcium irreversibly in stool)',
      'Phytates in unsoaked legumes',
      'Taking at same moment as Iron supplements (DMT-1 receptor competition)'
    ],
    recommendedLabTests: [
      { testName: 'Ionized Calcium', optimalRange: '4.6 - 5.3 mg/dL (1.15 - 1.33 mmol/L)', clinicalNote: 'Gold standard measure of active unbound calcium. Serum total calcium must always be corrected for albumin!' },
      { testName: 'DEXA Bone Mineral Density Scan', optimalRange: 'T-score > -1.0', clinicalNote: 'Assesses skeletal bone matrix loss (osteopenia / osteoporosis).' }
    ],
    highRiskPopulations: [
      'Post-menopausal women (estrogen drop accelerates bone resorption)',
      'Individuals avoiding all dairy and fortified plant milks',
      'Hypoparathyroidism or post-thyroidectomy patients',
      'Long-term corticosteroid (Prednisone) users'
    ],
    color: 'slate'
  }
];

export const NUTRIENT_LOOKUP = new Map<string, VitaminDeficiency>(
  VITAMINS_DATA.map((v) => [v.id, v])
);
