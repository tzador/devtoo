<script lang="ts">
  import { page } from "$app/stores";
  import Search from "$lib/Search.svelte";
</script>

<Search q={$page.url.searchParams.get("q") ?? undefined} />
