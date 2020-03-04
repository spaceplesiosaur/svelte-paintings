<script>
	export let name;
	import { onMount } from 'svelte';
	const apiKey = "29c0f9d0-5b77-11ea-87eb-f9c17db1ada1"
	const fetchUrl = `https://api.harvardartmuseums.org/object?person=35055&apikey=${apiKey}`
	const artwork = []
	const photos = []
	const paintings = []
	const sketches = []
	const bronze = []
	const misc = []
	let count = 0
	let currentMedium = misc

	const getArt = async (endpoint) => {
		if (endpoint) {
				let res = await fetch(endpoint);
				let jsonRes = await res.json();
				artwork.push(...jsonRes.records)
				getArt(jsonRes.info.next)
			} else {
				sortArt()
			}
	}

	const sortArt = () => {
		artwork.forEach(piece => {
			switch (piece.classification) {
	      case "Photographs":
	        photos.push({title: piece.title, image: piece.images, colors: piece.colors, date: piece.dateend});
					photos = photos
					break
	      case "Drawings":
	        sketches.push({title: piece.title, image: piece.images, colors: piece.colors, date: piece.dateend});
					sketches = sketches
					break
	      case "Paintings":
	        paintings.push({title: piece.title, image: piece.images, colors: piece.colors, date: piece.dateend});
					paintings = paintings
					break
	      case "Sculpture":
	        bronze.push({title: piece.title, image: piece.images, colors: piece.colors, date: piece.dateend});
					bronze = bronze
					break
	      default:
	        misc.push({title: piece.title, image: piece.images, colors: piece.colors, date: piece.dateend});
					misc = misc
    	}
		})
	}

	const chooseCurrentMedium = (medium) => {
		currentMedium = medium
		console.log("current", currentMedium)
	}

	const dealWithImages = (image) => {
		if (image === undefined) {
			return null
		} else {
			return image[0].baseimageurl
		}
	}

	onMount(async () => {
		getArt(fetchUrl)
	});

</script>

<main>
	<h1>Ponies and Ballerinas!</h1>
	<p class="subheader">Edgar Degas is like an eight-year-old girl.  It's fantastic.</p>
	<nav>
		<button class="nav-button" id="photos" on:click="{chooseCurrentMedium(photos)}">Photographs</button>
		<button class="nav-button" id="sketches" on:click={chooseCurrentMedium(sketches)}>Drawings</button>
		<button class="nav-button" id="paintings" on:click={chooseCurrentMedium(paintings)}>Paintings</button>
		<button class="nav-button" id="bronze" on:click={chooseCurrentMedium(bronze)}>Sculptures</button>
		<button class="nav-button" id="misc" on:click={chooseCurrentMedium(misc)}>Other</button>
	</nav>
	<h3 class="instructions">Click a button to see Degas's artwork by medium, then journey through the gallery...</h3>
	<div class="art-container">
		{#each currentMedium as item}
			<div class="art-card">
				<img class="card-image" src="{dealWithImages(item.image)}">
				<h2 class="card-title">{item.title}</h2>
				<p class="card-date">{item.date}</p>
			</div>
		{/each}
	</div>
</main>

<style>

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #FAF7F4;
		min-height: 800px;
	}

	h1 {
		color: #2b2d2f;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		background-color: #f6e1e6;
	}

	.subheader {
		font-size: 2em;
	}

	.nav-button {
		margin: 1em;
		min-width: 200px;
		height: 75px;
		background-color: #f6e1e6;
		color: #2b2d2f;
		font-size: 1.5em;
		border: 2px solid #8AB9D3
	}

	.art-container {
		display: flex;
		flex-flow: column wrap;
		background-color: #8AB9D3;
		justify-content: center;
		max-height: 1000px;
  	margin-left: -8px;
		overflow-y: scroll;
		overflow-x: inherit;
	}
	.art-card {
  	margin: 10px;
		border: 2px solid black;
		background-color: #FAF7F4;
	}
	.instructions {
		align-items: center;
	}
	.card-image {
		max-width: 250px;
		overflow: scroll;
		margin: 5px;
		border: 2px solid black;
	}
	.card-title {
		max-width: 250px;
		font-size: 1.5em;
		align-items: center;
		margin: 1px;
	}

	.card-date {
		max-height: 100px;
		font-size: 1em;
		align-items: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
