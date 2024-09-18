<script lang="ts">
	import { ArrowLeftS, ArrowRightS } from '@o7/icon/remix';

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
		slider.insertBefore(elements[elements.length - 1].cloneNode(true), elements[0]);
		slider.insertBefore(elements[elements.length - 2].cloneNode(true), elements[0]);
		slider.insertBefore(elements[elements.length - 3].cloneNode(true), elements[0]);
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

		if (old_index == active_index) return;
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
		{#each { length: 5 } as _, i}
			<div class="product" class:active={i === 0}>
				<div>
					<img src="" alt="" width="400" height="400" />
				</div>
				<div>
					<h2 class="text-3xl font-light text-center pb-6">{i + 1}</h2>
					<p class="text-xl">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</p>
				</div>
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
		gap: 6rem;
		background-color: white;
		padding: 6rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
		width: min(1440px, var(--active_width, 60vw));
		scale: 0.9;
	}

	.product.active {
		scale: 1;
	}

	.scroll-button {
		position: absolute;
		z-index: 1;
		background-color: var(--background);
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
