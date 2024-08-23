<script>
	import DividerTitle from './DividerTitle.svelte';
</script>

<div class="breakout slider">
	<div class="slider-elements">
		{#each { length: 3 } as _, i}
			<div class="product">
				<div>
					<img src="" alt="" width="400" height="400" />
				</div>
				<div>
					<h2 class="text-3xl font-light text-center pb-6">Взрывозвщищеное оборудование</h2>
					<p class="text-xl">
						Exd-оболочки (Explosion-proof enclosures) - это тип взрывозащитных шкафов, которые
						предназначены для использования в условиях, где возможно возникновение взрывоопасных
						газов, пыли или паров. Они обеспечивают защиту оборудования от внешних воздействий и
						предотвращают распространение огня в случае взрыва.
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.slider {
		--active_width: 70%;

		overflow-x: auto;
	}

	.slider-elements {
		display: flex;
		gap: 4rem;
		transform: translate(calc((100% - var(--active_width, 60%)) / 2));
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
		width: var(--active_width, 60%);
	}
</style>
