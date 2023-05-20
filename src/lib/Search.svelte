<script lang="ts">
	export let q: string | undefined = undefined;

	async function search() {
		const res = await fetch(q ? `/api/search?q=${q}` : '/api/search');
		return await res.json();
	}
</script>

{#await search()}
	<div>Loading...</div>
{:then articles}
	<div class="articles">
		{#each articles as article (article.id)}
			<div class="article">
				<!-- <div class="poster" style:background-image={`url('${article.image}')`} /> -->
				<div class="info">
					<div class="title"><a target="_blank" href={article.url}>{article.title}</a></div>
					<div class="description">{article.description}</div>
					<div class="meta">
						<img src={article.author_avatar} alt="" />
						<div class="author">{article.author_name}</div>
						<div class="date">{new Date(article.published_at).toLocaleDateString()}</div>
						<div class="keywords">
							{#each article.keywords as keyword (keyword)}
								<a class="keyword" href={'/search?q=' + keyword}>{keyword}</a>
							{/each}
						</div>
					</div>
					<div>
						<a
							class="more"
							href={article.url
								.replace('dev.to', location.host)
								.replace(/^https:/, location.protocol)}>more like this</a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/await}

<style>
	.articles {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.article {
		display: flex;
		gap: 0.5rem;
		border-bottom: 1px solid var(--lite-gray);
		padding-bottom: 1rem;
	}

	/* .article .poster {
		width: 240px;
		height: 120px;
		flex-shrink: 0;
		background-position: center;
		background-size: cover;
	} */

	.article .info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.article .info .title {
		font-size: 1rem;
		font-weight: 800;
	}

	.article .keywords {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.article .keywords .keyword {
		font-size: 0.75rem;
		opacity: 0.5;
		background-color: var(--lite-gray);
		padding: 0.25rem 0.5rem;
		color: black;
		border-radius: 1rem;
	}

	.article .meta {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.article .meta img {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	.article .info .more {
		font-size: 0.75rem;
	}
</style>
