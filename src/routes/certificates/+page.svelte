<script lang="ts">
	import { ArrowLeftS } from '@o7/icon/remix';
	import backgroundImg1 from '$lib/assets/backgroundImg1.png';
	import { Button } from 'flowbite-svelte';
	import { Carousel, Thumbnails } from 'flowbite-svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let index = $state(0);
	let forward = true; // sync animation direction between Thumbnails and Carousel
	let images = data.certificateList;
</script>

<svelte:head>
	<title>Сертификаты | Мармакс</title>
</svelte:head>

<div
	class="min-h-screen bg-center bg-no-repeat bg-cover bg-blue-overlay flex"
	style="background-image: url({backgroundImg1})"
>
	<Button class="absolute left-16 top-16 text-xl font-semibold" href="/"
		><ArrowLeftS size="32" />Вернутся на главную</Button
	>
	<div class="max-w-4xl space-y-4">
		<Carousel {images} {forward} let:Indicators let:Controls bind:index>
			<Controls />
			<Indicators />
		</Carousel>
		<Thumbnails {images} {forward} bind:index />
	</div>
</div>

<style>
</style>
