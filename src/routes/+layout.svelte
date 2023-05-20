<script lang="ts">
  import "../normalize.css";
  import "../app.css";
  import { page } from "$app/stores";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });
</script>

<nav>
  <a class="brand" href="/" data-sveltekit-reload
    ><span class="dev"
      ><span style="color: #e64980">D</span><span style="color: #7950f2">e</span><span
        style="color: #228be6">v</span
      ><span class="too"
        ><span style="color: #0ca678">T</span><span style="color: #82c91e">o</span><span
          style="color: #fd7e14">o</span
        ></span
      ></span
    ></a
  >
  <form action="/search" method="GET">
    <input
      name="q"
      type="search"
      placeholder="Search dev.to"
      value={$page.url.searchParams.get("q") ?? ""}
    />
  </form>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a style="color: #e64980" href="/extension">extension</a>
  <a style="color: #7950f2" href="/bookmarklet">bookmarklet</a>
  <a style="color: #228be6" target="_blank" href="mailto:tzador@gmail.com">feedback</a>
  <a style="color: #0ca678" target="_blank" href="https://github.com/tzador/devtoo">github</a>
  <a style="color: #82c91e" target="_blank" href="https://dev.to/">dev.to</a>
  <a style="color: #fd7e14" href="/about">about</a>
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    margin: 0 -1rem;
    height: 3rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1;
  }

  nav .dev {
    position: relative;
    font-weight: bold;
    top: 0.125rem;
  }

  nav .too {
    position: relative;
    font-weight: bold;
    top: -0.125rem;
  }

  nav a {
    height: 3rem;
    line-height: 3rem;
    padding: 0 0.5rem;
  }
  nav a:hover {
    background-color: whitesmoke;
  }

  .brand {
    font-size: 1.25rem;
  }

  form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-grow: 1;
    margin: 0 0.5rem;
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

  form input[type="search"] {
    flex-grow: 1;
    max-width: 24rem;
  }

  main {
    padding: 1rem;
  }
</style>
