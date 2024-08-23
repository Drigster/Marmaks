<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Breadcrumb class="m-2">
	<BreadcrumbItem href="/" home>Главная</BreadcrumbItem>
	{#if data.category != undefined}
		<BreadcrumbItem href="/category/{data.category.urlPath}">{data.category.name}</BreadcrumbItem>
	{:else}
		<BreadcrumbItem>Без категории</BreadcrumbItem>
	{/if}
	<BreadcrumbItem>{data.product.name}</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-2">
	<h2 class="text-center font-bold text-2x block xl:hidden">
		{data.product.name}
	</h2>
	<div class="m-6 mx-auto w-full xl:w-2/5 max-h-[80vh] flex flex-col">
		<div class="flex-1 relative p-1">
			<img
				id="productImg"
				class="mx-auto aspect-square object-contain transition-all"
				src={data.product.images[0].imagePath}
				alt={data.product.images[0].imageDescription}
			/>
			<div>
				<svg
					class="h-14 p-4 cursor-pointer left-0 top-1/2 -translate-y-1/2 absolute"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/></svg
				>
				<svg
					class="h-14 p-4 cursor-pointer right-0 top-1/2 -translate-y-1/2 absolute"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
					/></svg
				>
			</div>
		</div>
		<div class="flex justify-center items-center w-4/5 mx-auto p-1">
			<span class="px-2 cursor-pointer">
				<svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/></svg
				>
			</span>
			<div
				id="productImages"
				class="overflow-x-auto scrollbar-hide grid grid-rows-1 grid-flow-col gap-1"
				data-index="0"
			>
				{#each data.product.images as image}
					<div class="carousel-item cursor-pointer border border-black rounded-md h-16 w-16">
						<img
							class="aspect-square object-contain"
							src={image.imagePath}
							alt={image.imageDescription}
						/>
					</div>
				{/each}
			</div>
			<span class="px-2 cursor-pointer">
				<svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
					/></svg
				>
			</span>
		</div>
	</div>
	<div class="flex flex-col">
		<h3 class="text-center font-bold text-3xl my-5 hidden xl:block">
			{data.product.name}
		</h3>

		<ul class="mx-10">
			<p class="indent-8">{data.product.longDescription}</p>
		</ul>
	</div>
</div>
