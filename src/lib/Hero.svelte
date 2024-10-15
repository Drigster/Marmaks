<script lang="ts">
	import HeroImage from '$lib/assets/hero_image.png';
	import { Button, Modal } from 'flowbite-svelte';
	import { filesProxy, superForm } from 'sveltekit-superforms';
	import spiner from '$lib/assets/spiner.svg';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import Dropzone from 'svelte-file-dropzone';

	const flash = getFlash(page);

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const {
		form: orderForm,
		enhance: orderEnhance,
		errors: orderErrors,
		delayed: orderDelayed,
		message: orderMessage
	} = superForm(data.orderForm, {
		onUpdated({ form }) {
			if (form.valid) {
				orderModal = false;
				$flash = { type: 'success', message: 'Заявка успешно отправлена!' };
			}
		},
		onError({ result }) {
			$flash = { type: 'error', message: result.error.message };
		},
		delayMs: 250,
		timeoutMs: 8000
	});

	const file = filesProxy(orderForm, 'files');

	function handleFilesSelect(e: { detail: { acceptedFiles: any } }) {
		$file = e.detail.acceptedFiles;
		console.log($file);
	}

	let orderModal = $state(false);
</script>

{#if $orderMessage}
	<div class="message">{$orderMessage}</div>
{/if}
<div class="breakout hero place-content-center px-8">
	<div>
		<h1 class="text-xl lg:text-3xl text-primary font-bold mb-6">
			Общество с ограниченной ответственностью “Мармакс”
		</h1>
		<p class="lg:text-xl lg:leading-8 mb-4">
			Мы специализируется на производстве и предоставлении профессиональных услуг по сборке,
			программированию и настройке электрощитового оборудования.
		</p>
		<button
			class="bg-primary text-white p-4 font-medium rounded-xl text-xl"
			onclick={() => (orderModal = true)}>Оформить заявку</button
		>
	</div>
	<img
		class="aspect-square rounded-[100%] bg-white object-contain"
		width="50"
		height="50"
		src={HeroImage}
		alt=""
	/>
</div>

<Modal
	bind:open={orderModal}
	class="divide-y-0 max-w-[54rem]"
	classHeader="pb-0 md:pb-0"
	title="Добавить продукт"
	autoclose={false}
	outsideclose
>
	<form
		class="flex flex-col gap-6"
		method="POST"
		action="/sendorder"
		enctype="multipart/form-data"
		use:orderEnhance
	>
		<div>
			<div class="inputBox">
				<input type="text" name="name" bind:value={$orderForm.name} required />
				<label for="name">Имя</label>
			</div>
			{#if $orderErrors.name}
				<span class="errorMessage">{$orderErrors.name}</span>
			{/if}
		</div>
		<div>
			<div class="inputBox">
				<input type="text" name="phone" bind:value={$orderForm.phone} required />
				<label for="phone">Телефон</label>
			</div>
			{#if $orderErrors.phone}
				<span class="errorMessage">{$orderErrors.phone}</span>
			{/if}
		</div>
		<div>
			<div class="inputBox">
				<input type="email" name="email" bind:value={$orderForm.email} required />
				<label for="email">Почта</label>
			</div>
			{#if $orderErrors.email}
				<span class="errorMessage">{$orderErrors.email}</span>
			{/if}
		</div>
		<div>
			<div class="inputBox">
				<textarea name="message" bind:value={$orderForm.message} required rows="6"></textarea>
				<label for="message">Сообщение</label>
			</div>
			{#if $orderErrors.message}
				<span class="errorMessage">{$orderErrors.message}</span>
			{/if}
		</div>
		<div>
			<Dropzone
				disableDefaultStyles
				containerClasses="flex flex-col justify-center items-center w-full rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-32 bg-background"
				name="files"
				on:drop={handleFilesSelect}
				multiple={true}
				accept=".png, .svg, .jpg"
			>
				<svg
					aria-hidden="true"
					class="mb-3 w-10 h-10 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
					></path></svg
				>
				{#if $file.length === 0}
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold">Нажмите чтобы выбрать</span> или перетащите
						<span class="font-semibold">файл</span>
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG или JPG</p>
				{:else}
					<p>
						{#each $file as fileItem, i}
							{#if i != 0},{/if}
							{fileItem.name}
						{/each}
					</p>
				{/if}
				{#if $orderErrors.files}
					<p class="text-red-700">
						{$orderErrors.files}
					</p>
				{/if}
			</Dropzone>
		</div>

		<Button type="submit" class="bg-primary p-3 rounded-[0.25rem]">
			<span class="relative">
				Создать
				<img
					class="h-full my-auto absolute left-full top-0 opacity-0"
					class:opacity-100={$orderDelayed}
					width="20"
					height="20"
					src={spiner}
					alt="Spiner icon"
				/>
			</span>
		</Button>
	</form>
</Modal>

<style>
	.hero {
		display: grid;
		grid-template-columns: 6fr 4fr;
		height: 100vh;
		height: 100svh;
		align-items: center;
		gap: 8rem;
	}

	.hero img {
		flex-shrink: 1;
		height: 100%;
		width: auto;
	}

	@media (max-width: 1024px) {
		.hero {
			display: flex;
			gap: 1rem;
			flex-direction: column;
			padding: 1rem;
			padding-top: 6rem;
		}
	}

	@media (max-width: 560px) {
		.hero img {
			height: auto;
			width: 100%;
		}
	}
</style>
