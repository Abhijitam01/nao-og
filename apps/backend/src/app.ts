import 'dotenv/config';

import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, tool, UIMessage } from 'ai';
import Fastify from 'fastify';
import { z } from 'zod';

import { db } from './db/db';

const app = Fastify({ logger: true });

/**
 * Tests the API connection
 */
app.get('/api', async (request, reply) => {
	return { hello: 'world' };
});

/**
 * Tests the database connection
 */
app.get('/api/db', async (request, reply) => {
	return await db.run('SELECT 42');
});

app.post('/api/chat', async (request, reply) => {
	const { messages } = request.body as { messages: UIMessage[] };

	const result = streamText({
		model: openai.chat('gpt-4o'),
		messages: await convertToModelMessages(messages),
		tools: {
			getWeather: tool({
				description: 'Get the current weather for a specified city. Use this when the user asks about weather.',
				inputSchema: z.object({
					city: z.string().describe('The city to get the weather for'),
				}),
			}),
		},
	});

	const response = result.toUIMessageStreamResponse();
	return response;
});

export default app;
