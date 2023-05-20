<script lang="ts">
  import Search from "$lib/Search.svelte";
</script>

<p>
  Unearth the treasures of the Dev.to knowledge base with DevToo recommendation and search engine.
  <br />
  Powered by
  <a href="https://platform.openai.com/docs/guides/embeddings/what-are-embeddings" target="_blank"
    >OpenAI Vector Embeddings</a
  >
  and PostgreSQL
  <a href="https://github.com/pgvector/pgvector" target="_blank">pgvector</a> extension.
</p>

<Search />

<style>
  p {
    padding: 0 1rem;
    padding-bottom: 1rem;
    text-align: center;
    font-size: 0.9rem;
    margin: 0 -1rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 0, 0.5);
    padding-top: 1rem;
  }
</style>
