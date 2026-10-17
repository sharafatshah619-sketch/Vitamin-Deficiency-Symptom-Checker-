import { CalculatedNutrientMatch, SelectedSymptom, UserHealthProfile } from '../types/nutrition';
import { VITAMINS_DATA } from '../data/vitaminsData';
import { SYMPTOMS_DATA } from '../data/symptomsData';
import { RISK_FACTORS } from '../data/riskFactorsData';

export function calculateNutrientDeficiencies(
  selectedSymptoms: SelectedSymptom[],
  selectedRiskFactorIds: string[],
  _userProfile?: UserHealthProfile
): {
  matches: CalculatedNutrientMatch[];
  redFlags: { symptomName: string; notice: string }[];
} {
  const symptomMap = new Map(SYMPTOMS_DATA.map((s) => [s.id, s]));
  const riskMap = new Map(RISK_FACTORS.map((r) => [r.id, r]));

  // Severity multipliers
  const severityMult: Record<string, number> = {
    mild: 1.0,
    moderate: 1.4,
    severe: 1.9,
  };

  // Duration multipliers
  const durationMult: Record<string, number> = {
    days: 0.9,
    weeks: 1.2,
    months: 1.5,
    chronic: 1.7,
  };

  // Red flags identification
  const redFlags: { symptomName: string; notice: string }[] = [];
  selectedSymptoms.forEach((sel) => {
    const sym = symptomMap.get(sel.symptomId);
    const isModerateOrSevere =
      sel.intensity === 'Moderate' ||
      sel.intensity === 'Severe' ||
      sel.severity === 'moderate' ||
      sel.severity === 'severe';

    if (sym && sym.redFlag && isModerateOrSevere) {
      redFlags.push({
        symptomName: sym.name,
        notice: sym.redFlagNotice || 'Please seek prompt medical evaluation for this symptom.',
      });
    }
  });

  // Calculate scores for each nutrient
  const results: CalculatedNutrientMatch[] = VITAMINS_DATA.map((nutrient) => {
    let rawScore = 0;
    const matchingSymptomsList: {
      symptomName: string;
      intensity: 'Mild' | 'Moderate' | 'Severe';
      severity?: string;
      isPrimary: boolean;
    }[] = [];

    // Evaluate symptoms
    selectedSymptoms.forEach((sel) => {
      const sym = symptomMap.get(sel.symptomId);
      if (!sym) return;

      const link = sym.linkedNutrientIds.find((l) => l.nutrientId === nutrient.id);
      if (link) {
        const normalizedKey = (sel.intensity?.toLowerCase() || sel.severity || 'moderate');
        const sMult = severityMult[normalizedKey] || 1.4;
        const dMult = durationMult[sel.duration] || 1.0;
        const primaryBonus = link.isPrimary ? 1.4 : 1.0;

        const points = link.weight * sMult * dMult * primaryBonus;
        rawScore += points;

        const resolvedIntensity: 'Mild' | 'Moderate' | 'Severe' =
          sel.intensity ||
          (sel.severity === 'severe'
            ? 'Severe'
            : sel.severity === 'mild'
            ? 'Mild'
            : 'Moderate');

        matchingSymptomsList.push({
          symptomName: sym.name,
          intensity: resolvedIntensity,
          severity: resolvedIntensity.toLowerCase(),
          isPrimary: link.isPrimary,
        });
      }
    });

    // Evaluate risk factors
    let riskMultiplier = 1.0;
    selectedRiskFactorIds.forEach((rfId) => {
      const rf = riskMap.get(rfId);
      if (!rf) return;

      const aff = rf.affectedNutrientIds.find((a) => a.nutrientId === nutrient.id);
      if (aff) {
        // Compound multiplier with dampening
        riskMultiplier *= aff.riskMultiplier;
      }
    });

    // Cap maximum risk multiplier to 3.2
    riskMultiplier = Math.min(riskMultiplier, 3.2);

    // Apply risk factor multiplier
    let finalRaw = rawScore * riskMultiplier;

    // Normalization curve:
    // A raw score of 18+ with risk multiplier corresponds to high likelihood (~75-95%)
    let normalizedPercentage = 0;
    if (matchingSymptomsList.length > 0) {
      // Base score calculation
      normalizedPercentage = Math.min(
        96,
        Math.round((finalRaw / (finalRaw + 12)) * 100)
      );
    } else if (riskMultiplier > 1.4) {
      // Even without symptoms, high risk factor profile indicates vulnerability
      normalizedPercentage = Math.round((riskMultiplier - 1.0) * 18);
    }

    let confidence: 'High Likelihood' | 'Moderate Likelihood' | 'Possible Gap' | 'Low' = 'Low';
    if (normalizedPercentage >= 68) {
      confidence = 'High Likelihood';
    } else if (normalizedPercentage >= 40) {
      confidence = 'Moderate Likelihood';
    } else if (normalizedPercentage >= 18) {
      confidence = 'Possible Gap';
    }

    const nutrientRedFlags = redFlags
      .filter((rf) =>
        matchingSymptomsList.some((m) => m.symptomName === rf.symptomName)
      )
      .map((r) => r.notice);

    return {
      nutrient,
      matchScore: normalizedPercentage,
      confidenceLevel: confidence,
      matchingSymptoms: matchingSymptomsList,
      redFlagsTriggered: nutrientRedFlags,
    };
  });

  // Sort by match score descending
  results.sort((a, b) => b.matchScore - a.matchScore);

  return {
    matches: results,
    redFlags,
  };
}
