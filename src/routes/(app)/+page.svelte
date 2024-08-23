<script>
	import AboutUsInfo from '$lib/AboutUsInfo.svelte';
	import Suppliers from '$lib/Suppliers.svelte';
	import Categories from '$lib/Products.svelte';
	import Hero from '$lib/Hero.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Главная | Мармакс</title>
</svelte:head>

<div class="full-width content-grid gap-y-20">
	<Hero {data} />
	<Categories />
	<AboutUsInfo />
	<Suppliers />
</div>
