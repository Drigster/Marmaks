<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import DividerTitle from './DividerTitle.svelte';
	import { Carousel, Thumbnails } from 'flowbite-svelte';
	
	let index = 0;
	let forward = true; // sync animation direction between Thumbnails and Carousel

	let { imgPaths }: { imgPaths: string[] } = $props();
	let images: HTMLImgAttributes[] = [];

	imgPaths.forEach(imagePath => {
		images.push({
			src: imagePath
		});
	});
</script>

<div>
	<DividerTitle title="Сертификаты" id="certificates" />
	<script>
	  </script>
	  
	  <div class="max-w-4xl space-y-4">
		<Carousel {images} {forward} let:Controls bind:index>
		  <Controls />
		</Carousel>
		<Thumbnails {images} {forward} bind:index />
	  </div>
</div>
