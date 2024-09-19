<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeftS } from '@o7/icon/remix';
	import { Button } from 'flowbite-svelte';
	import backgroundImg1 from '$lib/assets/backgroundImg1.png';
</script>

<svelte:head>
	<title>{$page.status} | Мармакс</title>
</svelte:head>
<div
	class="min-h-screen bg-center bg-no-repeat bg-cover bg-blue-overlay flex"
	style="background-image: url({backgroundImg1})"
>
	<Button class="absolute left-16 top-16 text-xl font-semibold" href="/"
		><ArrowLeftS size="32" />Вернутся на главную</Button
	>
	<div class="m-auto text-white">
		<h1 class="text-center text-5xl">{$page.status}</h1>
		<p class="text-center text-xl">{$page.error?.message}</p>
	</div>
</div>
