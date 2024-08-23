<script lang="ts">
	import SmallHeader from '$lib/SmallHeader.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SmallHeader title={data.currentCategory.name} />
<div class="hidden xl:flex text-center place-items-center text-md font-semibold my-8 divide-x-2">
	{#each data.categoryList as category, i}
		<a
			class="p-2"
			class:text-accent={category.id == data.currentCategory.id}
			href="/category/{category.urlPath}">{category.name}</a
		>
	{/each}
</div>
<div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
	{#each data.productList as product}
		<div class="text-white bg-[#1d3a6d] md:flex h-96 rounded-xl hidden">
			<img
				class="w-1/2 h-full rounded-l-xl object-cover"
				src={product.images[0]?.imagePath}
				alt={product.images[0]?.imageDescription}
			/>
			<div class="p-6 w-1/2 flex-col">
				<h2 class="text-2xl">{product.name}</h2>
				<p class="flex-grow h-60 overflow-y-auto overflow-x-hidden">{product.shortDescription}</p>
				<div class="card-actions flex flex-wrap justify-end p-2">
					<a href="/product/{product.id}" class="btn btn-primary bg-[#fff] text-[#1d3a6d]"
						>Подробнее</a
					>
				</div>
			</div>
		</div>
	{/each}
</div>
