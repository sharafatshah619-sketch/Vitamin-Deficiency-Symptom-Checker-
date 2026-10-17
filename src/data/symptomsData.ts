import { BodyZone, Symptom } from '../types/nutrition';

export const BODY_ZONES: BodyZone[] = [
  {
    id: 'energy',
    name: 'Energy & Stamina',
    label: 'Fatigue & Vitality',
    iconName: 'Zap',
    description: 'Systemic cellular ATP energy, oxygen delivery, and mitochondrial stamina.',
  },
  {
    id: 'nerves',
    name: 'Nerves & Sensation',
    label: 'Neurological & Tingling',
    iconName: 'Activity',
    description: 'Peripheral nerve myelin integrity, sensory paresthesia, and balance.',
  },
  {
    id: 'head',
    name: 'Head & Cognition',
    label: 'Brain, Mood & Hair',
    iconName: 'Brain',
    description: 'Mental clarity, focus, emotional stability, headaches, and hair health.',
  },
  {
    id: 'mouth',
    name: 'Mouth & Lips',
    label: 'Tongue, Gums & Lips',
    iconName: 'Smile',
    description: 'Oral mucosal epithelial turnover, tongue swelling, and gum integrity.',
  },
  {
    id: 'eyes',
    name: 'Eyes & Vision',
    label: 'Night Vision & Dryness',
    iconName: 'Eye',
    description: 'Retinal rhodopsin synthesis, dark adaptation, and conjunctival moisture.',
  },
  {
    id: 'nails',
    name: 'Nails & Keratin',
    label: 'Nail Shape & Strength',
    iconName: 'Hand',
    description: 'Keratin structural matrices, microvascular beds, and mineral deposition.',
  },
  {
    id: 'skin',
    name: 'Skin & Healing',
    label: 'Bruising, Rashes & Scars',
    iconName: 'ShieldAlert',
    description: 'Dermal collagen crosslinking, capillary resistance, and sebaceous balance.',
  },
  {
    id: 'muscles',
    name: 'Muscles & Bones',
    label: 'Cramps, Twitches & Aches',
    iconName: 'Flame',
    description: 'Neuromuscular excitability, bone density, and electrolyte calcium-magnesium balance.',
  },
  {
    id: 'chest',
    name: 'Chest & Circulation',
    label: 'Palpitations & Cold Limbs',
    iconName: 'Heart',
    description: 'Hemoglobin oxygen carriage, peripheral vasomotion, and cardiac rhythm.',
  },
  {
    id: 'digestion',
    name: 'Digestion & Cravings',
    label: 'Gut & Pica Cravings',
    iconName: 'Utensils',
    description: 'Enterocyte mucosal lining, digestive motility, and pica behaviors.',
  },
];

export const SYMPTOMS_DATA: Symptom[] = [
  // --- ENERGY & STAMINA ---
  {
    id: 'fatigue_profound',
    name: 'Profound, unrefreshing daily exhaustion',
    zone: 'energy',
    description: 'Deep fatigue that does not resolve after a full night of sleep, affecting work or daily chores.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 5, isPrimary: true },
      { nutrientId: 'vit_d', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 4, isPrimary: true },
      { nutrientId: 'magnesium', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'shortness_of_breath_exertion',
    name: 'Breathlessness climbing stairs or mild walking',
    zone: 'energy',
    description: 'Gasping for air or feeling winded with minimal physical movement due to diminished red cell oxygen carrying capacity.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b1', weight: 3, isPrimary: false },
    ],
    redFlag: true,
    redFlagNotice: 'Severe acute shortness of breath at rest requires urgent medical evaluation for cardiopulmonary compromise or severe anemia.',
  },
  {
    id: 'cold_intolerance',
    name: 'Chronically freezing hands, feet, or low body temp',
    zone: 'energy',
    description: 'Always wearing extra layers, icy extremities, and poor peripheral microcirculation.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 3, isPrimary: false },
    ],
  },

  // --- NERVES & SENSATION ---
  {
    id: 'pins_needles_feet',
    name: 'Pins & needles / tingling in feet or hands (Paresthesia)',
    zone: 'nerves',
    description: 'Prickling, electric, or "falling asleep" buzzing sensation in fingertips or toes without pressure.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b12', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b6', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b1', weight: 4, isPrimary: true },
      { nutrientId: 'calcium', weight: 3, isPrimary: false },
    ],
    redFlag: true,
    redFlagNotice: 'Progressive ascending numbness or tingling can signify subacute combined spinal cord degeneration and requires prompt neurology review.',
  },
  {
    id: 'unsteady_gait',
    name: 'Balance difficulties, stumbling, or unsteady walking',
    zone: 'nerves',
    description: 'Loss of proprioceptive position sense in feet, stumbling in the dark or swaying with eyes closed (Romberg sign).',
    linkedNutrientIds: [
      { nutrientId: 'vit_b12', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b1', weight: 4, isPrimary: true },
    ],
    redFlag: true,
    redFlagNotice: 'Ataxia and gait imbalance warrant urgent clinical neurological examination to prevent irreversible dorsal column damage.',
  },
  {
    id: 'burning_feet',
    name: 'Burning sensation in soles of feet (especially at night)',
    zone: 'nerves',
    description: 'Intense warmth, hypersensitivity, or aching burning pain along plantar nerves.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b1', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b6', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'restless_legs',
    name: 'Restless Legs: irresistible urge to move legs in bed',
    zone: 'nerves',
    description: 'Crawling, creeping sensations in calf muscles at night relieved only by stretching or walking.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'magnesium', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 3, isPrimary: false },
    ],
  },

  // --- HEAD & COGNITION ---
  {
    id: 'brain_fog',
    name: 'Brain fog, memory lapses, and slow mental processing',
    zone: 'head',
    description: 'Word retrieval hesitation, forgetfulness, loss of mental sharp focus, and sluggish thoughts.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b12', weight: 5, isPrimary: true },
      { nutrientId: 'iron', weight: 4, isPrimary: true },
      { nutrientId: 'vit_d', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 3, isPrimary: false },
      { nutrientId: 'magnesium', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'depressed_mood_winter',
    name: 'Low mood, apathy, or seasonal depressive symptoms',
    zone: 'head',
    description: 'Persistent low spirits, loss of motivation, worsened during overcast winter months.',
    linkedNutrientIds: [
      { nutrientId: 'vit_d', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b6', weight: 3, isPrimary: false },
      { nutrientId: 'magnesium', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'hair_loss_diffuse',
    name: 'Diffuse hair shedding or noticeable thinning',
    zone: 'head',
    description: 'Clumps of hair falling out in the shower, widened hair parting, or general scalp thinning.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_d', weight: 4, isPrimary: true },
      { nutrientId: 'zinc', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b7', weight: 4, isPrimary: true },
    ],
  },
  {
    id: 'headaches_frequent',
    name: 'Frequent tension headaches or migraines',
    zone: 'head',
    description: 'Throbbing head pain, photophobia, or recurrent neck-tension related headaches.',
    linkedNutrientIds: [
      { nutrientId: 'magnesium', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b2', weight: 4, isPrimary: true },
      { nutrientId: 'iron', weight: 3, isPrimary: false },
    ],
  },

  // --- MOUTH & LIPS ---
  {
    id: 'angular_cheilitis',
    name: 'Cracked, inflamed fissures at mouth corners',
    zone: 'mouth',
    description: 'Painful splitting, stinging red cracks at the lateral commissures of the lips (angular stomatitis).',
    linkedNutrientIds: [
      { nutrientId: 'vit_b2', weight: 5, isPrimary: true },
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b6', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 3, isPrimary: false },
      { nutrientId: 'zinc', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'glossitis_smooth_tongue',
    name: 'Swollen, smooth, beefy red or burning tongue',
    zone: 'mouth',
    description: 'Loss of normal lingual papillae making tongue look shiny, bald, fiery red, and tender to acidic food.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b12', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 5, isPrimary: true },
      { nutrientId: 'iron', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b2', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b6', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'bleeding_gums',
    name: 'Gums bleeding readily on tooth brushing or flossing',
    zone: 'mouth',
    description: 'Spongy, swollen, tender pink/red gums that bleed without vigorous trauma.',
    linkedNutrientIds: [
      { nutrientId: 'vit_c', weight: 5, isPrimary: true },
      { nutrientId: 'vit_k', weight: 4, isPrimary: true },
    ],
  },
  {
    id: 'loss_taste_smell',
    name: 'Blunted taste sensation or food tastes metallic / cardboard',
    zone: 'mouth',
    description: 'Requires extra salt or spices to taste meals; impaired flavor discernment (hypogeusia).',
    linkedNutrientIds: [
      { nutrientId: 'zinc', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'aphthous_ulcers',
    name: 'Frequent recurrent painful canker sores inside cheeks',
    zone: 'mouth',
    description: 'Round white/yellow crater-like sores on buccal mucosa with an erythematous halo.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b12', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 4, isPrimary: true },
      { nutrientId: 'iron', weight: 4, isPrimary: true },
      { nutrientId: 'zinc', weight: 3, isPrimary: false },
    ],
  },

  // --- EYES & VISION ---
  {
    id: 'night_blindness',
    name: 'Difficulty seeing in dark or blinding glare when night driving',
    zone: 'eyes',
    description: 'Eyes take unusually long to adapt when moving from bright sunlight into dim indoor lighting.',
    linkedNutrientIds: [
      { nutrientId: 'vit_a', weight: 5, isPrimary: true },
      { nutrientId: 'zinc', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'dry_gritty_eyes',
    name: 'Chronic dry, itchy, or gritty "sand in eyes" sensation',
    zone: 'eyes',
    description: 'Insufficient tear film, burning, stinging, or need for constant artificial tears.',
    linkedNutrientIds: [
      { nutrientId: 'vit_a', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b2', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'eyelid_twitching',
    name: 'Involuntary fluttering eyelid twitches (Myokymia)',
    zone: 'eyes',
    description: 'Annoying, repetitive micro-spasms of the orbicularis oculi eyelid muscle throughout the day.',
    linkedNutrientIds: [
      { nutrientId: 'magnesium', weight: 5, isPrimary: true },
      { nutrientId: 'calcium', weight: 3, isPrimary: false },
      { nutrientId: 'vit_b12', weight: 2, isPrimary: false },
    ],
  },
  {
    id: 'photophobia',
    name: 'Extreme sensitivity to bright light and bloodshot eyes',
    zone: 'eyes',
    description: 'Squinting and ocular burning when looking at normal daylight or smartphone screens.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b2', weight: 5, isPrimary: true },
      { nutrientId: 'vit_a', weight: 3, isPrimary: false },
    ],
  },

  // --- NAILS & KERATIN ---
  {
    id: 'brittle_peeling_nails',
    name: 'Brittle, soft, layered peeling or splitting fingernails',
    zone: 'nails',
    description: 'Nails chip with minor impact, peel in horizontal layers, or break before growing.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b7', weight: 5, isPrimary: true },
      { nutrientId: 'iron', weight: 4, isPrimary: true },
      { nutrientId: 'zinc', weight: 3, isPrimary: false },
      { nutrientId: 'calcium', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'spoon_nails_koilonychia',
    name: 'Spoon-shaped concave nails (holds a drop of water)',
    zone: 'nails',
    description: 'Nail plate flattens and dips inward in the center with raised lateral edges.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 2, isPrimary: false },
    ],
  },
  {
    id: 'white_nail_spots',
    name: 'White spots, flecks, or transverse bands on nails',
    zone: 'nails',
    description: 'Punctate white discolorations (leukonychia) across multiple fingernails.',
    linkedNutrientIds: [
      { nutrientId: 'zinc', weight: 5, isPrimary: true },
      { nutrientId: 'calcium', weight: 3, isPrimary: false },
    ],
  },

  // --- SKIN & HEALING ---
  {
    id: 'easy_bruising',
    name: 'Easy, unexplained skin bruising from trivial bumps',
    zone: 'skin',
    description: 'Waking up with large purple-yellow bruises without recalling any trauma.',
    linkedNutrientIds: [
      { nutrientId: 'vit_c', weight: 5, isPrimary: true },
      { nutrientId: 'vit_k', weight: 5, isPrimary: true },
    ],
    redFlag: true,
    redFlagNotice: 'Spontaneous extensive bruising or small pinpoint bleeding spots requires laboratory check of platelet counts and coagulation profile.',
  },
  {
    id: 'chicken_skin_keratosis',
    name: 'Rough "chicken skin" bumpy texture on back of arms',
    zone: 'skin',
    description: 'Small sandpapery follicular bumps (keratosis pilaris) plugged with keratin over triceps and thighs.',
    linkedNutrientIds: [
      { nutrientId: 'vit_a', weight: 5, isPrimary: true },
      { nutrientId: 'vit_c', weight: 4, isPrimary: true },
      { nutrientId: 'zinc', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'slow_wound_healing',
    name: 'Cuts, scrapes, or blemishes take weeks to heal',
    zone: 'skin',
    description: 'Minor scratches remain open, red, or re-open instead of closing within several days.',
    linkedNutrientIds: [
      { nutrientId: 'zinc', weight: 5, isPrimary: true },
      { nutrientId: 'vit_c', weight: 5, isPrimary: true },
      { nutrientId: 'vit_a', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'pale_sallow_skin',
    name: 'Abnormally pale complexion or yellowish pale tint',
    zone: 'skin',
    description: 'Loss of pink healthy hue in face, lips, and palmar creases.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b9', weight: 4, isPrimary: true },
    ],
  },

  // --- MUSCLES & BONES ---
  {
    id: 'nocturnal_calf_cramps',
    name: 'Sudden painful calf cramps or feet spasms during sleep',
    zone: 'muscles',
    description: 'Charley horse waking you with intense muscular locking in calf or arch of foot.',
    linkedNutrientIds: [
      { nutrientId: 'magnesium', weight: 5, isPrimary: true },
      { nutrientId: 'calcium', weight: 4, isPrimary: true },
      { nutrientId: 'vit_d', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'bone_pain_shin_sternum',
    name: 'Deep, aching bone soreness in shins, pelvis, or chest',
    zone: 'muscles',
    description: 'Aching deep skeletal discomfort worsened by direct pressure over tibial bone or ribs.',
    linkedNutrientIds: [
      { nutrientId: 'vit_d', weight: 5, isPrimary: true },
      { nutrientId: 'calcium', weight: 4, isPrimary: true },
    ],
  },
  {
    id: 'muscle_weakness_thighs',
    name: 'Proximal muscle weakness (trouble standing from a chair)',
    zone: 'muscles',
    description: 'Thigh and pelvic girdle muscles feel weak when climbing stairs or rising from low seats.',
    linkedNutrientIds: [
      { nutrientId: 'vit_d', weight: 5, isPrimary: true },
      { nutrientId: 'vit_b1', weight: 4, isPrimary: true },
      { nutrientId: 'magnesium', weight: 3, isPrimary: false },
    ],
  },

  // --- CHEST & CIRCULATION ---
  {
    id: 'heart_palpitations',
    name: 'Heart racing, skipping beats, or flutter in chest at rest',
    zone: 'chest',
    description: 'Awareness of pounding heartbeat, premature contractions, or racing pulse while lying down.',
    linkedNutrientIds: [
      { nutrientId: 'magnesium', weight: 5, isPrimary: true },
      { nutrientId: 'iron', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b1', weight: 4, isPrimary: true },
      { nutrientId: 'calcium', weight: 3, isPrimary: false },
    ],
    redFlag: true,
    redFlagNotice: 'Sudden unexplained tachyarrhythmias accompanied by chest tightness or dizziness require immediate medical attention.',
  },

  // --- DIGESTION & CRAVINGS ---
  {
    id: 'pica_ice_craving',
    name: 'Compulsive craving to chew ice cubes (Pagophagia) or raw starch',
    zone: 'digestion',
    description: 'Uncontrollable urge to crunch through cups of ice, freezer frost, chalk, or clay.',
    linkedNutrientIds: [
      { nutrientId: 'iron', weight: 5, isPrimary: true },
      { nutrientId: 'zinc', weight: 3, isPrimary: false },
    ],
  },
  {
    id: 'unexplained_nausea_appetite_loss',
    name: 'Profound loss of appetite, unexplained food aversion & nausea',
    zone: 'digestion',
    description: 'Feeling constantly full, repulsed by food odors, and unintentional weight loss.',
    linkedNutrientIds: [
      { nutrientId: 'vit_b1', weight: 5, isPrimary: true },
      { nutrientId: 'zinc', weight: 4, isPrimary: true },
      { nutrientId: 'vit_b12', weight: 3, isPrimary: false },
    ],
  },
];
