<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { Carousel, Thumbnails } from 'flowbite-svelte';

	let index = $state(0);
	let forward = $state(true);

	let { imgPaths }: { imgPaths: string[] } = $props();
	let images: HTMLImgAttributes[] = [];

	imgPaths.forEach((imagePath) => {
		images.push({
			src: imagePath
		});
	});
</script>

<div>
	<div class="max-w-4xl space-y-4">
		<Carousel {images} {forward} let:Controls bind:index>
			<Controls />
		</Carousel>
		<Thumbnails {images} {forward} bind:index />
	</div>
</div>
