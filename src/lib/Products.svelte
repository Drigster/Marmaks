<script lang="ts">
	import { ArrowLeftS, ArrowRightS } from '@o7/icon/remix';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let height: number = $state(-1);
	let width: number = $state(-1);
	let slider: HTMLDivElement;
	let old_index: number = $state(-1);
	let active_index: number = $state(0);
	let instant = $state(false);

	$effect(() => {
		if (slider == null) return;
		if (slider.children.length < 1) return;

		const elements = slider.children;
		if (elements.length < 2) {
			let element_clone1 = elements[elements.length - 1].cloneNode(true) as HTMLElement;
			element_clone1.classList.remove('active');
			slider.appendChild(element_clone1);
			console.log("add");
		}
		let element_clone2 = elements[elements.length - 1].cloneNode(true) as HTMLElement;
		element_clone2.classList.remove('active');
		slider.insertBefore(element_clone2, elements[0]);

		let element_clone3 = elements[elements.length - 2].cloneNode(true) as HTMLElement;
		element_clone3.classList.remove('active');
		slider.insertBefore(element_clone3, elements[0]);

		let element_clone4 = elements[elements.length - 3].cloneNode(true) as HTMLElement;
		element_clone4.classList.remove('active');
		slider.insertBefore(element_clone4, elements[0]);

		old_index = 3;
		active_index = 3;
		instant = true;
	});

	$effect(() => {
		if (width == -1 && height == -1) return;
		instant = true;
	});

	$effect(() => {
		if (slider == null) return;
		if (slider.children.length - 1 < active_index) {
			active_index = slider.children.length - 1;
		}
		if (active_index < 0) {
			active_index = 0;
		}

		if (old_index >= 0 && old_index < slider.children.length) {
			slider.children[old_index].classList.remove('active');
		}

		let active = slider.children[active_index] as HTMLElement;
		active.classList.add('active');
		slider.scrollTo({
			left:
				(active.clientWidth + 16) * active_index - (slider.clientWidth - active.clientWidth) / 2,
			behavior: instant ? 'instant' : 'smooth'
		});
		instant = false;
	});

	function next() {
		old_index = active_index;

		active_index++;

		if (active_index == slider.children.length - 1) {
			active_index = 2;
			slider.scrollTo({
				left:
					slider.children[active_index - 1].clientWidth +
					16 -
					(slider.clientWidth - slider.children[active_index - 1].clientWidth) / 2,
				behavior: 'instant'
			});
		}
	}

	function prev() {
		old_index = active_index;
		active_index--;

		if (active_index == 0) {
			slider.scrollTo({
				left:
					(slider.children[slider.children.length - 2].clientWidth + 16) *
						(slider.children.length - 2) -
					(slider.clientWidth - slider.children[slider.children.length - 2].clientWidth) / 2,
				behavior: 'instant'
			});
			active_index = slider.children.length - 3;
		}
	}
</script>

<div id="products" class="full-width slider relative">
	<div
		class="full-width slider-elements"
		bind:this={slider}
		bind:clientWidth={width}
		bind:clientHeight={height}
	>
		{#each data.productList as product, i}
			<div class="product" class:active={i === 0}>
				<img
					class="row-span-2 my-auto"
					src="/files/{product.imageFilename}"
					alt=""
					width="400"
					height="400"
				/>
				<h2 class="text-3xl font-light text-center pb-6">{product.name}</h2>
				<p class="text-xl">{product.description}</p>
			</div>
		{/each}
	</div>
	<div>
		<button class="scroll-button left-button" onclick={prev}><ArrowLeftS size="32" /></button>
		<button class="scroll-button right-button" onclick={next}><ArrowRightS size="32" /></button>
	</div>
</div>

<style>
	.slider {
		--active_width: 70vw;
	}

	.slider-elements {
		display: flex;
		gap: 1rem;

		overflow-x: auto;

		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.slider-elements::-webkit-scrollbar {
		display: none;
	}

	.product {
		display: grid;
		flex-shrink: 0;
		grid-template-columns: 4fr 5fr;
		grid-template-rows: [first-start] max-content [first-end] 1fr;
		column-gap: 6rem;
		background-color: white;
		padding: 6rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
		width: min(1440px, var(--active_width, 60vw));
		scale: 0.9;
	}

	@media (max-width: 1024px) {
		.product {
			grid-template-columns: 1fr;
			justify-items: center;
		}

		.product p {
			display: none;
		}

		.product h2 {
			width: 100%;
			height: 100%;
			grid-row: first-start;
		}
	}

	.product.active {
		scale: 1;
	}

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
		left: calc(((100vw - min(1440px, var(--active_width, 60vw))) / 2) - 34px);
	}

	.right-button {
		right: calc(((100vw - min(1440px, var(--active_width, 60vw))) / 2) - 34px);
	}
</style>
