import { OpenRouter } from '@openrouter/sdk';

const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

export async function getDreamInterpretation(dreamText) {
    if (!process.env.OPENROUTER_API_KEY) {
        throw new Error('Server misconfigured: OPENROUTER_API_KEY is missing');
    }

    const model = process.env.OPENROUTER_MODEL || 'minimax/minimax-m3';

    try {
        const response = await openrouter.chat.send({
            chatRequest: {
                model,
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
            },
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenRouter API error:', error);
        throw new Error(`API error: ${error.message}`);
    }
}
