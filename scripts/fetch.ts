import prisma from '../src/lib/prisma';
import parse from '../src/lib/parse';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import cheerio from 'cheerio';

dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.SECRET_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const existing = new Set<string>();

const queue: string[] = [];
let cnt = 0;

const fetch_existing = async () => {
	console.log('Fetching existing articles');
	const start = Date.now();

	let last_id = -1;

	for (;;) {
		const articles: { id: number; url: string }[] = await prisma.$queryRaw`
			SELECT id, url
			FROM article
			WHERE id > ${last_id}
			ORDER BY id ASC
			LIMIT 10000;`;
		if (articles.length === 0) break;
		for (const article of articles) {
			existing.add(article.url);
		}
		last_id = articles[articles.length - 1].id;
		console.log('Existing articles batch', articles.length);
	}

	const duration = Date.now() - start;
	console.log('Fetched', existing.size, 'exsiting in', duration, 'ms');
};

const workit = async () => {
	const url = queue.shift();
	if (!url) return;

	cnt++;
	for (let i = 0; i < 11; i++) {
		try {
			if (existing.has(url)) break;

			const article = await parse(url);

			const text =
				article.title + '. ' + article.description + '. ' + article.keywords.join('. ') + '.';
			const result = await openai.createEmbedding({
				model: 'text-embedding-ada-002',
				input: text
			});
			const embedding = result.data.data[0].embedding;

			await prisma.article.create({ data: article });
			await prisma.$executeRaw`
			UPDATE article
			SET embedding = ${embedding}::vector
			WHERE id = ${article.id}`;
			console.log('fetched', cnt);
			break;
		} catch (error) {
			console.error(error.message);
		}
	}

	setTimeout(workit);
};

const main = async () => {
	await fetch_existing();

	console.log("Fetching dev.to's sitemap");
	const { data } = await axios.get('https://dev.to/sitemap-index.xml');
	const $ = cheerio.load(data, { xmlMode: true });

	const sitemaps: string[] = [];
	$('loc').each((i, el) => {
		const url = $(el).text();
		if (url.indexOf('-posts-') > 0) {
			sitemaps.push(url);
		}
	});

	for (const url of sitemaps) {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data, { xmlMode: true });
		$('loc').each((i, el) => {
			const url = $(el).text();
			queue.push(url);
		});
	}

	console.log('Total articles on dev.to:', queue.length);

	for (let i = 0; i < 32; i++) {
		workit();
	}
};

main();
