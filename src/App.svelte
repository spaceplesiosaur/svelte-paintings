<script>
	export let name;
	import { onMount } from "svelte"

	const apiKey = ""
	const url = `https://api.harvardartmuseums.org/color?apikey=${apiKey}`
	const pastels = []
	const paintings = []
	const sketches = []
	const bronze = []
	const misc = []

	onMount(async function() {
		const response = await fetch(url)
		const jsonResponse = await response.json()

	})
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
