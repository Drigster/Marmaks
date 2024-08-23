<script lang="ts">
	import DividerTitle from './DividerTitle.svelte';

	let supplierImageParrent: HTMLElement;

	$effect(() => {
		if (supplierImageParrent == null) {
			return;
		}

		const flavoursScrollWidth = supplierImageParrent.scrollWidth;

		window.addEventListener('load', () => {
			self.setInterval(() => {
				let first = supplierImageParrent.children[0] as HTMLElement;
				if (first == null) {
					return;
				}

				if (!isElementInViewport(first)) {
					supplierImageParrent.appendChild(first);
					supplierImageParrent.scrollTo(supplierImageParrent.scrollLeft - first.offsetWidth, 0);
				}
				if (supplierImageParrent.scrollLeft !== flavoursScrollWidth) {
					supplierImageParrent.scrollTo(supplierImageParrent.scrollLeft + 1, 0);
				}
			}, 15);
		});
	});

	function isElementInViewport(el: HTMLElement) {
		var rect = el.getBoundingClientRect();
		return rect.right > 0;
	}
</script>

<div>
	<h2 class="text-center text-5xl font-light">Оборудование которое мы используем</h2>
	<div
		class="flex overflow-x-hidden whitespace-nowrap h-24 my-8 border-x-4 border-[#1d3a6d]"
		bind:this={supplierImageParrent}
	>
		{#each { length: 11 } as _, i}
			<img class="p-4" src="/img/suppliers/{i + 1}.png" alt="Лого поставщика" />
		{/each}
	</div>
</div>
