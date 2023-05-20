import { json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import type { RequestHandler } from './$types';
import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import prisma from '$lib/prisma';
import type { Article } from '@prisma/client';

const LIMIT = 512;

const configuration = new Configuration({
	apiKey: SECRET_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q') ?? undefined;

	if (q) {
		const result = await openai.createEmbedding({
			model: 'text-embedding-ada-002',
			input: q
		});
		const embedding = result.data.data[0].embedding;
		const vector = `[${embedding.join(',')}]`;
		const articles: Article[] = await prisma.$queryRaw`
        SELECT id, url, published_at, title, description, keywords, image, author_username, author_name, author_avatar
        FROM article
        ORDER BY embedding <=> ${vector}::vector
        LIMIT ${LIMIT};`;
		return json(articles);
	} else {
		const articles: Article[] = await prisma.$queryRaw`
        SELECT id, url, published_at, title, description, keywords, image, author_username, author_name, author_avatar
        FROM article
        ORDER BY RANDOM()
        LIMIT ${LIMIT};`;
		return json(articles);
	}
};
