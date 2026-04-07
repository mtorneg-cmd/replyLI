export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { postText, context, tones } = req.body;

  if (!postText || !tones || !tones.length) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  const tonesDesc = {
    formal:      'Formal y profesional — lenguaje cuidado, estructurado, apto para relaciones laborales o académicas.',
    casual:      'Casual y cercano — tono conversacional, natural, como si hablara con un conocido.',
    empatico:    'Empático — reconoce los sentimientos o esfuerzo del autor, genera conexión humana.',
    estrategico: 'Estratégico — posiciona al respondedor como experto, añade valor o perspectiva diferenciadora, construye marca personal en LinkedIn.'
  };

  let prompt = `Eres un experto en comunicación estratégica en LinkedIn. Analiza el siguiente post y genera una respuesta por cada tono solicitado.\n\n`;
  prompt += `POST:\n"""\n${postText}\n"""\n\n`;
  if (context) prompt += `CONTEXTO DEL RESPONDEDOR:\n"""\n${context}\n"""\n\n`;
  prompt += `TONOS SOLICITADOS:\n`;
  tones.forEach(t => { prompt += `- ${t.toUpperCase()}: ${tonesDesc[t]}\n`; });
  prompt += `\nINSTRUCCIONES:\n`;
  prompt += `- Cada respuesta debe ser concisa (máximo 3-4 oraciones), natural y lista para publicar en LinkedIn.\n`;
  prompt += `- NO uses hashtags ni emojis excesivos.\n`;
  prompt += `- Responde SOLO en JSON válido, sin texto adicional, sin bloques de código markdown.\n`;
  prompt += `- Formato exacto: {"replies": [{"tone": "formal", "text": "..."}, ...]}\n`;
  prompt += `- El campo "tone" debe ser exactamente uno de: formal, casual, empatico, estrategico.\n`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'Error de API.' });
    }

    const raw = (data.content || []).map(b => b.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
}
