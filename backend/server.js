import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req,res)=>res.json({status:'ok',service:'NexaAI backend',aiConfigured:Boolean(process.env.GEMINI_API_KEY),model:MODEL}));

app.post('/api/chat', async (req,res)=>{
  const { message, history=[] } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({error:'message is required'});
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({error:'GEMINI_API_KEY is not configured'});
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents = [
      ...history.filter(x=>x && x.text).map(x=>({role:x.role === 'model' ? 'model' : 'user', parts:[{text:String(x.text)}]})),
      { role:'user', parts:[{text:message.trim()}] }
    ];
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: 'You are NexaAI, a helpful university-focused AI assistant. Give clear, accurate, practical answers. Use concise structure unless the user asks for detail.',
        temperature: 0.7,
        maxOutputTokens: 900
      }
    });
    const text = response.text?.trim();
    if (!text) return res.status(502).json({error:'AI returned an empty response'});
    return res.json({text, source:'Gemini', model:MODEL});
  } catch (error) {
    console.error('[Gemini error]', error);
    return res.status(502).json({error:'AI provider request failed', detail:error.message});
  }
});

app.use((_req,res)=>res.status(404).json({error:'Route not found'}));
app.listen(PORT,()=>console.log(`NexaAI backend running at http://localhost:${PORT}`));
