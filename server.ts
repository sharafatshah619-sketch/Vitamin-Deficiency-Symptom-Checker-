import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with key:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Deep Clinical Nutrition Analysis
app.post('/api/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms, riskFactors, userProfile, clinicalScores } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Symptoms array is required' });
    }

    if (!aiClient) {
      return res.status(503).json({
        error: 'Gemini API is not configured. Falling back to clinical algorithm.',
        fallback: true,
      });
    }

    const prompt = `
You are a senior clinical biochemist and clinical nutritionist specializing in human micronutrient deficiencies, metabolic pathways, and functional laboratory medicine.
Analyze the following patient symptom report and provide an evidence-based clinical evaluation.

Patient Profile:
- Age & Gender: ${userProfile?.age || 'Not specified'}, ${userProfile?.gender || 'Not specified'}
- Dietary Pattern: ${userProfile?.diet || 'Standard diet'}
- Lifestyle/Medical Risk Factors: ${(riskFactors || []).join(', ') || 'None reported'}

Reported Symptoms (with severity & duration):
${symptoms.map((s: any) => `- ${s.name} (Severity: ${s.severity || 'moderate'}, Duration: ${s.duration || 'ongoing'}, Body Area: ${s.category || 'general'})`).join('\n')}

Rule-based algorithm baseline suspect deficiencies:
${(clinicalScores || []).slice(0, 4).map((c: any) => `- ${c.name} (${c.score}% match)`).join('\n')}

Please return a valid JSON object strictly matching this schema:
{
  "clinicalSummary": "A 2-3 sentence compassionate, precise clinical synthesis explaining why this symptom cluster points to specific micronutrient pathways.",
  "topSuspectDeficiencies": [
    {
      "nutrient": "Name (e.g., Vitamin B12 / Cobalamin)",
      "confidence": "High" | "Moderate" | "Low",
      "biochemicalMechanism": "One sentence explaining cellular/biochemical role (e.g., cofactor for methionine synthase and methylmalonyl-CoA mutase, causing myelin instability and macrocytic anemia).",
      "matchingSymptoms": ["List of matching symptoms reported by user"],
      "specificDietaryFixes": ["Top 3 bioavailable food sources"],
      "absorptionSynergies": "Important co-factors (e.g. requires stomach intrinsic factor and gastric acid; synergizes with folate and iron)"
    }
  ],
  "recommendedLabPanels": [
    {
      "testName": "Exact clinical lab test name (e.g. Serum Ferritin & Iron Saturation, 25(OH) Vitamin D, Methylmalonic Acid (MMA), RBC Folate)",
      "clinicalRationale": "Why this specific test is superior to simple serum tests or why it is indicated."
    }
  ],
  "redFlagWarnings": [
    "Any urgent symptoms that warrant immediate primary care or ER evaluation (e.g., rapidly progressing ataxia, severe shortness of breath, unexplained purpura/bleeding)."
  ],
  "foodProtocolHighlights": [
    "Actionable dietary meal enhancement recommendations with nutrient bioavailability tips (e.g., pair iron with vitamin C, avoid tea/coffee within 2 hours of iron-rich meals)."
  ],
  "doctorDiscussionQuestions": [
    "3 crisp, respectful questions the patient can ask their physician during their next consultation."
  ]
}
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an evidence-based clinical nutrition consultant. Always output strict valid JSON. Do not include markdown code block backticks if responseMimeType is json. Ensure medical accuracy and safe disclaimers that this is for educational/triaging purposes and not a substitute for formal clinical diagnosis.',
      },
    });

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({ success: true, analysis: parsedData });
  } catch (error: any) {
    console.error('Error in /api/analyze-symptoms:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to complete AI nutritional analysis',
      fallback: true,
    });
  }
});

// Quick Nutrition Q&A / Ask Nutritionist
app.post('/api/ask-nutritionist', async (req, res) => {
  try {
    const { question, currentDeficiencies } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!aiClient) {
      return res.status(503).json({
        error: 'Gemini API not configured',
        answer: 'Clinical consultation requires an active API connection. Please review the built-in Vitamin Encyclopedia for standard dietary recommendations and RDA values.',
      });
    }

    const prompt = `
Patient Context: Suspected or investigated deficiencies: ${currentDeficiencies?.join(', ') || 'General nutrition inquiry'}.
Question: "${question}"

Provide a concise, scientifically accurate, clinically grounded response (max 3 short paragraphs).
Include:
1. Direct answer with biochemical clarity
2. Whole food sources or absorption synergy/antagonism rules (e.g. calcium inhibits iron absorption; vitamin C enhances non-heme iron)
3. Practical take-away advice for the patient to discuss with their healthcare provider.
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a warm, highly knowledgeable clinical dietitian and biochemist. Deliver direct, practical, evidence-based answers without conversational fluff.',
      },
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error('Error in /api/ask-nutritionist:', error);
    res.status(500).json({ error: error?.message || 'Failed to answer question' });
  }
});

// Setup Vite or static serving
async function setupVite() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NutriCheck Server listening on port ${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
