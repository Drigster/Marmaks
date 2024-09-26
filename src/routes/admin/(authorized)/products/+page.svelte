<script lang="ts">
	import {
		Button,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Label,
		Input,
		CloseButton,
		Modal
	} from 'flowbite-svelte';
	import { More2, Search as Search } from '@o7/icon/remix';
	import type { PageData } from './$types';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import spiner from '$lib/assets/spiner.svg';
	import Dropzone from 'svelte-file-dropzone';
	import { ErrorWarning } from '@o7/icon/remix';

	let { data }: { data: PageData } = $props();

	const {
		form: createForm,
		enhance: createEnhance,
		errors: createErrors,
		delayed: createDelayed
	} = superForm(data.createForm, {
		clearOnSubmit: 'errors-and-message',
		onUpdated({ form }) {
			if (form.valid) {
				createModal = false;
			}
		},
		delayMs: 250,
		timeoutMs: 8000
	});

	const { enhance: deleteEnhance, delayed: deleteDelayed } = superForm(data.deleteForm, {
		clearOnSubmit: 'errors-and-message',
		onUpdated({ form }) {
			if (form.valid) {
				deleteModal = false;
			}
		},
		delayMs: 250,
		timeoutMs: 8000
	});

	const {
		form: editForm,
		enhance: editEnhance,
		errors: editErrors,
		delayed: editDelayed
	} = superForm(data.editForm, {
		clearOnSubmit: 'errors-and-message',
		onUpdated({ form }) {
			if (form.valid) {
				editModal = false;
			}
		},
		delayMs: 250,
		timeoutMs: 8000
	});

	$effect(() => {
		if (editModal) {
			const item = items.find((item) => item.id == selectedItem);
			if (item == undefined) {
				return;
			}
			$editForm.id = item.id;
			$editForm.name = item.name;
			$editForm.description = item.description;
		}
	});

	const file = fileProxy(createForm, 'image');

	function handleFilesSelect(e: { detail: { acceptedFiles: any } }) {
		const { acceptedFiles } = e.detail;
		$file = acceptedFiles[0];
	}

	let createModal = $state(false);
	let editModal = $state(false);
	let deleteModal = $state(false);
	let selectedItem = $state(-1);

	let searchTerm = $state('');
	let items = $derived(data.productList);
	let filteredItems = $derived(
		items.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
	);
</script>

<div class="p-10">
	<div class="flex justify-between mb-2">
		<Label class="space-y-2 max-w-96 w-full">
			<Input type="email" placeholder="Поиск по имени" size="md" let:props>
				<Search slot="left" />
				<CloseButton
					slot="right"
					class={searchTerm.length > 0 ? '' : 'hidden'}
					onclick={() => {
						searchTerm = '';
					}}
				/>
				<input type="text" {...props} bind:value={searchTerm} />
			</Input>
		</Label>
		<Button class="bg-primary" on:click={() => (createModal = true)}>Добавить</Button>
	</div>
	<div class="table rounded-xl">
		<div class="row header text-xs font-semibold uppercase">
			<span class="cell">ID</span>
			<span class="cell">Картинка</span>
			<span class="cell">Название</span>
			<span class="cell">Описание</span>
			<span class="cell">Действия</span>
		</div>
		{#each filteredItems as item}
			<div class="row">
				<span class="cell">{item.id}</span>
				<span class="cell image"
					><img
						class="object-contain h-[revert-layer] max-w-none"
						height="64"
						width="64"
						src="/files/{item.imageFilename}"
						alt={item.name}
					/></span
				>
				<span class="cell">{item.name}</span>
				<span class="cell overflow-hidden text-ellipsis">{item.description}</span>
				<span class="cell">
					<Button outline={false} class="!p-2 flex mx-auto"><More2 class="text-primary" /></Button>
					<Dropdown>
						<DropdownItem
							on:click={() => {
								editModal = true;
								selectedItem = item.id;
							}}>Изменить</DropdownItem
						>
						<DropdownDivider />
						<DropdownItem
							class="text-red-700"
							on:click={() => {
								deleteModal = true;
								selectedItem = item.id;
							}}>Удалить</DropdownItem
						>
					</Dropdown>
				</span>
			</div>
		{/each}
	</div>
</div>

<Modal
	bind:open={createModal}
	class="divide-y-0 max-w-[54rem]"
	classHeader="pb-0 md:pb-0"
	title="Добавить продукт"
	autoclose={false}
	outsideclose
>
	<form
		class="flex flex-col gap-6"
		method="POST"
		action="?/create"
		enctype="multipart/form-data"
		use:createEnhance
	>
		<div>
			<div class="inputBox">
				<input type="text" name="name" bind:value={$createForm.name} required />
				<label for="name">Название</label>
			</div>
			{#if $createErrors.name}
				<span class="errorMessage">{$createErrors.name}</span>
			{/if}
		</div>

		<div>
			<div class="inputBox">
				<textarea name="description" bind:value={$createForm.description} required rows="6"
				></textarea>
				<label for="description">Описание</label>
			</div>
			{#if $createErrors.description}
				<span class="errorMessage">{$createErrors.description}</span>
			{/if}
		</div>

		<Dropzone
			disableDefaultStyles
			containerClasses="flex flex-col justify-center items-center w-full rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-32 bg-background"
			name="image"
			on:drop={handleFilesSelect}
			multiple={false}
			accept=".png, .svg, .jpg, .gif"
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
					<span class="font-semibold">картинку</span>
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">
					SVG, PNG, JPG or GIF (MAX. 800x400px)
				</p>
			{:else}
				<p>
					{#each $file as fileItem, i}
						{fileItem.name}
						{#if i != 0},
						{/if}
					{/each}
				</p>
			{/if}
			{#if $createErrors.image}
				<p class="text-red-700">
					{$createErrors.image}
				</p>
			{/if}
		</Dropzone>

		<Button type="submit" class="bg-primary p-3 rounded-[0.25rem]">
			<span class="relative">
				Создать
				<img
					class="h-full my-auto absolute left-full top-0 opacity-0"
					class:opacity-100={$createDelayed}
					width="20"
					height="20"
					src={spiner}
					alt="Spiner icon"
				/>
			</span>
		</Button>
	</form>
</Modal>
<Modal
	bind:open={deleteModal}
	class="divide-y-0 max-w-[54rem]"
	classHeader="pb-0 md:pb-0"
	title="Удалить продукт"
	outsideclose
>
	<div class="text-center">
		<ErrorWarning class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Вы уверены что вы хотите удалить <span class="font-semibold"
				>{items.find((item) => item.id == selectedItem)?.name}</span
			>
		</h3>
		<form method="POST" action="?/delete" use:deleteEnhance>
			<Button
				type="submit"
				color="red"
				class="me-2 px-6"
				name="id"
				value={items.find((item) => item.id == selectedItem)?.id}
			>
				<span class="relative">
					Да, я уверен(а)!
					<img
						class="h-full my-auto absolute left-full top-0 opacity-0"
						class:opacity-100={$deleteDelayed}
						width="20"
						height="20"
						src={spiner}
						alt="Spiner icon"
					/>
				</span>
			</Button>
			<Button class="px-6" type="button" color="alternative">Нет, отменить!</Button>
		</form>
	</div>
</Modal>
<Modal
	bind:open={editModal}
	class="divide-y-0 max-w-[54rem]"
	classHeader="pb-0 md:pb-0"
	title="Изменить продукт"
	autoclose={false}
	outsideclose
>
	<form
		class="flex flex-col gap-6"
		method="POST"
		action="?/edit"
		enctype="multipart/form-data"
		use:editEnhance
	>
		<div>
			<div class="inputBox">
				<input type="text" name="name" bind:value={$editForm.name} required />
				<label for="name">Название</label>
			</div>
			{#if $editErrors.name}
				<span class="errorMessage">{$editForm.name}</span>
			{/if}
		</div>

		<div>
			<div class="inputBox">
				<textarea name="description" bind:value={$editForm.description} required rows="6"
				></textarea>
				<label for="description">Описание</label>
			</div>
			{#if $editErrors.description}
				<span class="errorMessage">{$editForm.description}</span>
			{/if}
		</div>

		<Dropzone
			disableDefaultStyles
			containerClasses="flex flex-col justify-center items-center w-full rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-32 bg-background"
			name="image"
			on:drop={handleFilesSelect}
			multiple={false}
			accept=".png, .svg, .jpg, .gif"
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
					<span class="font-semibold">новую картинку</span>
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">
					SVG, PNG, JPG or GIF (MAX. 800x400px)
				</p>
			{:else}
				<p>
					{#each $file as fileItem, i}
						{fileItem.name}
						{#if i != 0},
						{/if}
					{/each}
				</p>
			{/if}
			{#if $editErrors.image}
				<p class="text-red-700">
					{$editErrors.image}
				</p>
			{/if}
		</Dropzone>

		<Button
			type="submit"
			class="bg-primary p-3 rounded-[0.25rem]"
			name="id"
			value={items.find((item) => item.id == selectedItem)?.id}
			disabled={$file.length < 1}
		>
			<span class="relative">
				Сохранить
				<img
					class="h-full my-auto absolute left-full top-0 opacity-0"
					class:opacity-100={$editDelayed}
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
	.table {
		display: grid;
		grid-template-columns: repeat(3, max-content) 1fr max-content;
	}

	.table > .row {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: span 5;
		background-color: white;
		border-bottom-width: 1px;
	}

	.table > .row:hover {
		background-color: rgb(249, 250, 251);
	}

	.table > .header {
		background-color: rgb(249, 250, 251);
	}

	.row > .cell {
		padding-block: 1rem;
		padding-inline: 1.5rem;
		margin-block: auto;
	}

	.row > .image {
		padding: 0.25rem;
		margin: auto;
	}

	.header > .cell {
		padding-block: 0.75rem;
	}
</style>
