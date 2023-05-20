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

const queue: string[] = [];
let cnt = 0;

const workit = async () => {
	const url = queue.shift();
	if (!url) return;

	for (let i = 0; i < 11; i++) {
		try {
			const existing = await prisma.article.findUnique({ where: { url } });
			if (existing) break;

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
			cnt++;
			console.log(cnt);
			break;
		} catch (error) {
			console.error(error);
		}
	}

	setTimeout(workit);
};

const main = async () => {
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

	console.log(queue.length);

	for (let i = 0; i < 32; i++) {
		workit();
	}
};

main();
