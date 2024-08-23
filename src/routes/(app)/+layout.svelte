<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';

	let { children } = $props();
</script>

<Navbar phone="+74951200912" email="info@marmakc.com" />
<main class="content-grid">
	{@render children()}
</main>
<Footer />
