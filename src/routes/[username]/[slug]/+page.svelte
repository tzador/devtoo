<script lang="ts">
	import { page } from '$app/stores';
	import Search from '$lib/Search.svelte';

	export let data;
</script>

{#key $page.url.toString()}
	<Search q={data.q} />
{/key}
