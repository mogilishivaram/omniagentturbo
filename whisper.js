import { OpenAI } from 'openai';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Parsing failed' });

    const file = files.audio;
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file[0].filepath),
      model: 'whisper-1',
    });

    res.status(200).json({ text: transcription.text });
  });
}
