<script lang="ts">
	import HeroImage from '$lib/assets/hero_image.png';
	import { Button, Helper, Label, Modal } from 'flowbite-svelte';
	import { filesProxy, superForm } from 'sveltekit-superforms';
	import spiner from '$lib/assets/spiner.svg';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const {
		form: orderForm,
		enhance: orderEnhance,
		errors: orderErrors,
		delayed: orderDelayed
	} = superForm(data.orderForm, {
		clearOnSubmit: 'errors-and-message',
		onUpdated({ form }) {
			if (form.valid) {
				orderModal = false;
			}
		},
		delayMs: 250,
		timeoutMs: 8000
	});

	const files = filesProxy(orderForm, 'files');

	let orderModal = $state(false);
</script>

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
			{#if $orderErrors.name}
				<span class="errorMessage">{$orderErrors.name}</span>
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
			<Label class="pb-2">Upload file</Label>
			<input
				type="file"
				name="files"
				class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-600 dark:placeholder-gray-400 border-gray-300 dark:border-gray-500 text-sm rounded-lg border p-0 dark:text-gray-400 mb-2"
				multiple
				bind:files={$files}
			/>
			<Helper>SVG, PNG, JPG or GIF (MAX. 800x400px).</Helper>
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
</style>
