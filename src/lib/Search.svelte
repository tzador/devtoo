<script lang="ts">
  export let q: string | undefined = undefined;

  async function search() {
    const res = await fetch(q ? `/api/search?q=${q}` : "/api/search");
    return await res.json();
  }
</script>

{#key q}
  {#await search()}
    <div class="loading" />
  {:then articles}
    <div class="articles">
      {#each articles as article (article.id)}
        {@const url = article.url
          .replace("dev.to", location.host)
          .replace(/^https:/, location.protocol)}

        <div class="article">
          <div class="info">
            <div class="title">
              <a target="_blank" href={article.url}>{article.title}</a>
              {#if url !== location.href}
                <a class="more" href={url}>more like this</a>
              {/if}
            </div>
            <div class="description">{article.description}</div>
            <div class="meta">
              <img src={article.author_avatar} alt="" />
              <a class="author" href={"https://dev.to/" + article.author_username} target="_blank">
                {article.author_name}
              </a>
              <div class="date">{new Date(article.published_at).toDateString()}</div>
              <div class="keywords">
                {#each article.keywords as keyword (keyword)}
                  <a class="keyword" href={"/search?q=" + keyword}>{keyword}</a>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/await}
{/key}

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

  .article .info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .article .info .title {
    font-size: 1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .article .info .more {
    color: white;
    background-color: dodgerblue;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
  }
  .article .info .more:hover {
    opacity: 0.8;
  }

  .article .date {
    font-size: 0.75rem;
    opacity: 0.5;
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

  .article .meta .author {
    color: black;
  }

  .loading {
    position: fixed;
    top: 0;
    left: -100%;
    right: 0;
    height: 3rem;
    z-index: 0;

    background: linear-gradient(90deg, dodgerblue 50%, transparent 50%),
      linear-gradient(90deg, dodgerblue 50%, transparent 50%),
      linear-gradient(0deg, dodgerblue 50%, transparent 50%),
      linear-gradient(0deg, dodgerblue 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 3rem, 15px 3rem, 3rem 15px, 3rem 15px;
    background-position: 0px 0px, 100% 100px, 0px 100px, 100% 0px;
    animation: loading-animation 4s infinite linear;
  }
  @keyframes loading-animation {
    0% {
      background-position: 0px 0px, 300px 116px, 0px 150px, 216px 0px;
    }
    100% {
      background-position: 300px 0px, 0px 116px, 0px 0px, 216px 150px;
    }
  }
</style>
