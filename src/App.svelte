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
				console.log("artwork", artwork)
				sortArt()
				console.log("photos", photos)
				console.log("paintings", paintings)
				console.log("sketches", sketches.map(sketch => sketch.image))
				console.log("bronze", bronze)
				console.log("misc", misc)
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
	<p>Edgar Degas is like an eight-year-old girl.  It's fantastic.</p>
	<nav>
		<button class="nav-button" id="photos" on:click="{chooseCurrentMedium(photos)}">Photographs</button>
		<button class="nav-button" id="sketches" on:click={chooseCurrentMedium(sketches)}>Drawings</button>
		<button class="nav-button" id="paintings" on:click={chooseCurrentMedium(paintings)}>Paintings</button>
		<button class="nav-button" id="bronze" on:click={chooseCurrentMedium(bronze)}>Sculptures</button>
		<button class="nav-button" id="misc" on:click={chooseCurrentMedium(misc)}>Other</button>
	</nav>
	<div class="art-container">
		<p class="instructions">Click a button to see Degas's artwork by medium</p>
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
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		background-color: pink;
	}

	.nav-button {
		margin: 1em;
		min-width: 200px;
		height: 75px;
		background-color: pink;
	}

	.art-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: lightblue;
	}
	.instructions {
		align-items: center;
	}
	.card-image {
		width: 200px;
	}
	.card-title {
		width: 200px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
