import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { section, input } = req.body;

  const basePrompt = {
    doppelganger: `You are the user's digital twin. Respond to: "${input}"`,
    mood: `You are a calm mental wellness coach. Give advice for: "${input}"`,
    dream: `You are a poetic dream interpreter. Analyze: "${input}"`,
    time: `Write a reflective note to future self about: "${input}"`,
    battle: `You're an AI warrior. Respond with wit and logic to: "${input}"`,
  };

  const messages = [
    { role: 'system', content: 'You are a helpful AI assistant.' },
    { role: 'user', content: basePrompt[section] || input },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo', // Updated model
    // model: 'gpt-4o',    // ← Enable this when GPT-4o is supported in the API
    messages,
  });

  res.status(200).json({ reply: response.choices[0].message.content });
}
