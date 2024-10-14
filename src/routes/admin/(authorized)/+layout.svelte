<script lang="ts">
	import SideNav from '$lib/SideNav.svelte';

	let { children } = $props();
</script>

<div class="flex">
	<SideNav />
	<main class="w-full h-full">
		<div class="p-10">
			{@render children()}
		</div>
	</main>
</div>
