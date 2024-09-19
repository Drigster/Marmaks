<script lang="ts">
	import { ArrowLeftS, ArrowRightS } from '@o7/icon/remix';
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import backgroundImg1 from '$lib/assets/backgroundImg1.png';

	let { data }: { data: PageData } = $props();

	let image: HTMLImageElement;
	let active_index: number = $state(0);

	$effect(() => {
		if (image == null) return;
		image.src = `/files/${data.certificateList[active_index].imageFilename}`;
		image.alt = data.certificateList[active_index].name;
	});

	function next() {
		if(active_index >= data.certificateList.length - 1) return;
		active_index++;
	}

	function prev() {
		if(active_index <= 0) return;
		active_index--;
	}
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
	<div class="mx-auto p-4 h-screen relative">
		<img
			class="h-full w-auto"
			src="/files/{data.certificateList[active_index].imageFilename}"
			alt=""
			bind:this={image}
		/>
		<button class="scroll-button left-button" class:hidden={active_index < 1} onclick={prev}><ArrowLeftS size="32" /></button>
		<button class="scroll-button right-button" class:hidden={active_index >= data.certificateList.length - 1} onclick={next}><ArrowRightS size="32" /></button>
	</div>
</div>

<style>
	.scroll-button {
		position: absolute;
		z-index: 1;
		background-color: white;
		border: solid var(--primary) 2px;
		border-radius: 50%;
		padding: 1rem;
		cursor: pointer;
		top: 50%;
		transform: translateY(-50%);
	}

	.left-button {
		right: 100%;
	}

	.right-button {
		left: 100%;
	}
</style>
