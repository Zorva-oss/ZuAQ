import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI on the server side with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'ZuAQ',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Personalization Recommendations Endpoint
app.post('/api/gemini/recommendations', async (req, res) => {
  try {
    const { userActivity, catalogSummary } = req.body;

    if (!ai) {
      // Fallback heuristic recommendations if no API key is provided
      return res.json({
        personalizedReason: "Curated based on your active exploration of high-performance audio and modern footwear.",
        highlightedProductIds: ["beosound-horizon", "cloudstrider-runner", "pulsestream-boom", "apex-chrono"],
        stylingTip: "Pair the CloudStrider runners with everyday carry essentials for a sleek urban transition.",
        source: 'heuristic',
      });
    }

    const prompt = `You are the AI personalization engine for ZuAQ, a modern bright lifestyle and tech e-commerce platform.
User shopping behavior context:
- Recently viewed product IDs: ${(userActivity?.viewedIds || []).join(', ') || 'None yet'}
- Searched queries: ${(userActivity?.searches || []).join(', ') || 'None yet'}
- Cart product IDs: ${(userActivity?.cartIds || []).join(', ') || 'None yet'}
- Preferred categories: ${(userActivity?.preferredCategories || []).join(', ') || 'Tech, Footwear, Audio'}

Available products in catalog:
${JSON.stringify(catalogSummary || [])}

Provide a personalized shopping recommendation in JSON format:
{
  "personalizedReason": "Short, friendly 1-sentence explanation of why these are curated for them",
  "highlightedProductIds": ["id1", "id2", "id3", "id4"],
  "stylingTip": "A 1-sentence lifestyle pairing or product care tip"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);
    res.json({ ...parsed, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating AI recommendations:', error);
    res.json({
      personalizedReason: "Curated based on trending design, audio aesthetics, and high user ratings.",
      highlightedProductIds: ["beosound-horizon", "cloudstrider-runner", "pulsestream-boom", "apex-chrono"],
      stylingTip: "All trending drops qualify for 30-Day Hassle-Free returns and free worldwide express.",
      source: 'fallback',
    });
  }
});

// AI Shopping Assistant & Stylist Chat Endpoint
app.post('/api/gemini/stylist', async (req, res) => {
  try {
    const { message, history, currentCart, catalog } = req.body;

    if (!ai) {
      return res.json({
        reply: `Welcome to ZuAQ! I'd love to help you find the perfect match. Based on our trending collections, the BeoSound Horizon Max Wireless and CloudStrider V3 Runner are customer favorites this week. Are you looking for active sports gear, audio tech, or stylish everyday carry?`,
        suggestedProductIds: ["beosound-horizon", "cloudstrider-runner"],
      });
    }

    const systemPrompt = `You are ZuAQ's intelligent shopping concierge and personal stylist.
ZuAQ is a bright, energetic, premium multi-category e-commerce platform featuring Audio, Smart Wear, Footwear, Home Aesthetics, and Everyday Carry.
Keep answers concise, warm, helpful, and under 3-4 sentences.
Recommend 1 to 3 exact product IDs from the catalog below whenever relevant.

Catalog:
${JSON.stringify((catalog || []).map((p: any) => ({ id: p.id, name: p.name, category: p.category, price: p.price, stock: p.stock, tags: p.tags })))}

Format your response as valid JSON:
{
  "reply": "Concise conversational recommendation with stylist advice",
  "suggestedProductIds": ["matching-id-1", "matching-id-2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: `User query: "${message}". History: ${JSON.stringify(history || [])}. Current cart: ${JSON.stringify(currentCart || [])}` }] },
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Stylist chat error:', error);
    res.json({
      reply: `I recommend checking out our top-rated BeoSound Horizon Max Wireless and CloudStrider V3 Pastel Runner — both are currently in high demand with 30% bundle savings!`,
      suggestedProductIds: ["beosound-horizon", "cloudstrider-runner"],
    });
  }
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const portNumber = Number(PORT) || 3000;
  app.listen(portNumber, '0.0.0.0', () => {
    console.log(`ZuAQ server listening on http://0.0.0.0:${portNumber}`);
  });
}

startServer();
