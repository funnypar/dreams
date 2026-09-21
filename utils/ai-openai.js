import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Call OpenAI API for dream interpretation
export async function getDreamInterpretation(dreamText) {
    if (!process.env.OPENROUTER_API_KEY) {
        throw new Error('Server misconfigured: OPENROUTER_API_KEY is missing');
    }
    const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';
    console.log(`Using model: ${model}`);
    try {
        const message = await openai.chat.completions.create({
            model,
            max_tokens: 512,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.',
                },
                {
                    role: 'user',
                    content: `Dream: ${dreamText}`,
                },
            ],
        });
        return message.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error(`API error: ${error.message}`);
    }
}
