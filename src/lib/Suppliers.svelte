<script lang="ts">
	let width: number = 0;
	function scroll(node: HTMLDivElement) {
		width = node.scrollWidth;

		let len = node.children.length;
		for (let i = 0; i < len; i++) {
			node.appendChild(node.children[i].cloneNode(true));
		}

		let startedAt = 0;
		function update() {
			let elapsedTime = Date.now() - startedAt
			if(elapsedTime > 25) {
				startedAt = Date.now()
				if(isElementInViewport(node)) {
					if (node.scrollLeft >= width) {
						node.scrollTo({
							left: 0,
							behavior: 'instant'
						});
					}
					else {
						node.scrollTo(node.scrollLeft + 10, 0);
					}
				}
			}
			requestAnimationFrame(update);
		}

		requestAnimationFrame(update)
	}

	function isElementInViewport (element: HTMLElement) {
		var rect = element.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
		);
	}
</script>

<div>
	<h2 class="text-center text-5xl font-light">Оборудование которое мы используем</h2>
	<div
		class="flex overflow-x-hidden whitespace-nowrap h-24 my-8 border-x-4 border-[#1d3a6d]"
		use:scroll
	>
		{#each { length: 11 } as _, i}
			<img class="p-4" src="/img/suppliers/{i + 1}.png" alt="Лого поставщика" />
		{/each}
	</div>
</div>
