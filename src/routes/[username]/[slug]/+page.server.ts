import type { PageServerLoad } from './$types';
import parse from '$lib/parse';

export const load: PageServerLoad = async ({ params }) => {
	const url = `https://dev.to/${params.username}/${params.slug}`;
	const article = await parse(url);
	const text =
		article.title + '. ' + article.description + '. ' + article.keywords.join('. ') + '.';
	return { q: text };
};
