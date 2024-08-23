<script lang="ts">
	import backgroundImg1 from '$lib/assets/backgroundImg1.png';

	let { title }: { title: string } = $props();
</script>

<div
	class="h-32 bg-blue-overlay text-white text-4xl text-center font-bold place-items-center full-width"
	style="background-image: url({backgroundImg1});"
>
	<span>{title}</span>
</div>
