const { ERA_CONTEXT } = require('../utils/eraContext');

const SYSTEM_PROMPT = `You are the friendly assistant for "Egypt Through the Ages," a website exploring Egypt's history across the Ancient, Greco-Roman, Coptic, Islamic, and Modern eras, plus a real events calendar.

Answer questions about Egyptian history, historical places, and eras using the reference data below. If asked something outside this reference data (or outside Egypt/history/the site), answer briefly and helpfully from general knowledge, but keep the focus on Egypt through the ages. Keep replies conversational and concise (a few sentences unless more detail is asked for).

Do not use any markdown syntax in your response. Keep it clean of symbols.

Reference data — historical eras and places featured on this site:
${ERA_CONTEXT}`;

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 12;

exports.sendMessage = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ success: false, message: 'A message is required.' });
        }
        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({ success: false, message: 'Message is too long.' });
        }

        const safeHistory = Array.isArray(history)
            ? history
                .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
                .slice(-MAX_HISTORY_MESSAGES)
                .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
            : [];

        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...safeHistory,
            { role: 'user', content: message.trim() }
        ];

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: process.env.OPENROUTER_MODEL,
                messages
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('OpenRouter error:', response.status, errText);
            return res.status(502).json({ success: false, message: 'The chatbot is unavailable right now. Please try again shortly.' });
        }

        const data = await response.json();
        const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;

        if (!reply) {
            return res.status(502).json({ success: false, message: 'The chatbot had trouble responding. Please try again.' });
        }

        res.json({ success: true, reply });
    } catch (err) {
        console.error('Chat error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};
