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
		if (active_index >= data.certificateList.length - 1) return;
		active_index++;
	}

	function prev() {
		if (active_index <= 0) return;
		active_index--;
	}

	function set(index: number) {
		if (index > data.certificateList.length - 1) return;
		if (index < 0) return;
		active_index = index;
	}
</script>

<svelte:head>
	<title>Сертификаты | Мармакс</title>
</svelte:head>
<div
	class="min-h-screen bg-center bg-no-repeat bg-cover bg-blue-overlay flex"
	style="background-image: url({backgroundImg1})"
>
	<Button class="absolute left-16 top-16 text-xl font-semibold z-50" href="/"
		><ArrowLeftS size="32" />Вернутся на главную</Button
	>
	<div class="mx-auto p-4 h-screen relative flex">
		<img
			class="h-auto w-full my-auto lg:h-full lg:w-auto"
			src="/files/{data.certificateList[active_index].imageFilename}"
			alt=""
			bind:this={image}
		/>
		<button class="scroll-button left-button" class:hidden={active_index < 1} onclick={prev}
			><ArrowLeftS size="32" /></button
		>
		<button
			class="scroll-button right-button"
			class:hidden={active_index >= data.certificateList.length - 1}
			onclick={next}><ArrowRightS size="32" /></button
		>
		<div class="absolute left-0 right-0 bottom-0 mx-auto flex place-content-center mb-6">
			{#each data.certificateList as _, i}
				<button
					class="w-4 h-4 m-1 border-2 bg-white border-white rounded-full text-white"
					class:!bg-gray-700={active_index == i}
					onclick={() => set(i)}
				>
				</button>
			{/each}
		</div>
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
		left: 0;
	}

	.right-button {
		right: 0;
	}
</style>
