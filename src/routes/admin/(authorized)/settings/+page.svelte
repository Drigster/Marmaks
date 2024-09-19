<script lang="ts">
	import { Label, Input, CloseButton } from 'flowbite-svelte';
	import { Search as Search } from '@o7/icon/remix';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import spiner from '$lib/assets/spiner.svg';
	import { Check, XMark, PencilSquare } from '@o7/icon/heroicons';

	let { data }: { data: PageData } = $props();

	const { enhance: editEnhance, delayed: editDelayed } = superForm(data.editForm, {
		clearOnSubmit: 'errors-and-message',
		onUpdated: () => {
			valueEditing = false;
			selectedValue = -1;
		},
		delayMs: 250,
		timeoutMs: 8000
	});

	let valueEditing = $state(false);
	let selectedValue = $state(-1);

	let searchTerm = $state('');
	let items = $derived(data.settingList);
	let filteredItems = $derived(
		items.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
	);
</script>

<div class="p-10">
	<div class="flex justify-between mb-2">
		<Label class="space-y-2 max-w-96 w-full">
			<Input type="email" placeholder="Поиск по названию" size="md" let:props>
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
	</div>
	<div class="table rounded-xl">
		<div class="row header text-xs font-semibold uppercase">
			<span class="cell">Название</span>
			<span class="cell">Значение</span>
		</div>
		{#each filteredItems as item, i}
			<div class="row">
				<span class="cell">{item.name}</span>
				<span class="cell">
					{#if valueEditing && selectedValue == i}
						<form class="inline-change-form" action="?/edit" method="POST" use:editEnhance>
							<input class="hidden" type="text" name="key" value={item.key} />
							<input type="text" name="value" value={item.value} />
							{#if $editDelayed}
								<button class="my-auto" type="submit" disabled>
									spiner
									<img
										class="h-full w-full"
										width="20"
										height="20"
										src={spiner}
										alt="Spiner icon"
									/>
								</button>
							{:else}
								<button class="my-auto" type="submit">
									<Check class="h-full w-full" size="20" />
								</button>
							{/if}
							<button
								class="my-auto"
								type="button"
								onclick={() => {
									valueEditing = false;
									selectedValue = -1;
								}}><XMark class="h-full w-full" size="20" /></button
							>
						</form>
					{:else}
						<span>
							{item.value}
						</span>
						<button
							class="my-auto"
							type="button"
							onclick={() => {
								selectedValue = i;
								valueEditing = true;
							}}
						>
							<PencilSquare size="20" />
						</button>
					{/if}
				</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.table {
		display: grid;
		grid-template-columns: 1fr 1fr;
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

	.header > .cell {
		padding-block: 0.75rem;
	}
</style>
