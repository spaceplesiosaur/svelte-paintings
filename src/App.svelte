<script>
	export let name;
	import { onMount } from 'svelte';
	const apiKey = "29c0f9d0-5b77-11ea-87eb-f9c17db1ada1"
	const fetchUrl = `https://api.harvardartmuseums.org/object?person=35055&apikey=${apiKey}`
	let artwork = []
	const pastels = []
	const paintings = []
	const sketches = []
	const bronze = []
	const misc = []

	const getMoreArt = async (endpoint) => {
		if (endpoint) {
			let res = await fetch(endpoint);
			let jsonRes = await res.json();
			artwork.push(...jsonRes.records)
			getMoreArt(jsonRes.info.next)
			console.log("artlist", artwork)
			} else {
			console.log("All artwork added")
		}

	}

	onMount(async () => {
		console.log('Halloooo!!!')
		const res = await fetch(fetchUrl);
		const jsonRes = await res.json();
		artwork = jsonRes.records
		console.log("info", jsonRes.info.next)
		getMoreArt(jsonRes.info.next)
	});
</script>

<main>
	<h1>Welcome to the Degas Museum!</h1>
	<p>It's all ponies and ballerinas, he's like an eight year old girl.  It's fantastic.</p>
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
