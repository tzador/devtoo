<script lang="ts">
	import '../normalize.css';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<nav>
	<a class="brand" href="/" data-sveltekit-reload>DevToo</a>
	<form action="/search" method="GET">
		<input
			name="q"
			type="search"
			placeholder="Search dev.to"
			value={$page.url.searchParams.get('q') ?? ''}
		/>
	</form>
	<!-- svelte-ignore a11y-invalid-attribute -->
	<span>
		Bookmarklet:
		<a href="javascript:location.href=location.href.replace('://dev.to/', '://devtoo.to/')"
			>devtoo</a
		>
	</span>
	<div class="gap" />
	<a target="_blank" href="mailto:tzador@gmail.com">Feedback</a>
	<a target="_blank" href="https://github.com/tzador/devtoo">GigHub</a>
	<a target="_blank" href="https://dev.to">Dev.to</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		align-items: center;
		padding: 0 2rem;
		margin: 0 -1rem;
		gap: 1rem;
		height: 3rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		position: sticky;
		top: 0;
		background-color: rgba(255, 255, 255, 0.9);
		z-index: 1;
	}

	.brand {
		font-size: 1.5rem;
	}

	form {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-grow: 1;
	}

	form input {
		border: 1px solid var(--lite-gray);
		outline: none;
		height: 2rem;
		border-radius: 0.5rem;
		padding: 0 1rem;
	}

	form input:focus {
		border-color: dodgerblue;
	}

	form input[type='search'] {
		flex-grow: 1;
		max-width: 24rem;
	}

	.gap {
		flex-grow: 1;
	}

	main {
		padding: 1rem;
	}
</style>
