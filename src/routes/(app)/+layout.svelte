<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';

	let { children, data } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Navbar phone={data.phone} email={data.email} />
	<main class="content-grid">
		{@render children()}
	</main>
	<div class="flex-grow"></div>
	<Footer />
</div>
