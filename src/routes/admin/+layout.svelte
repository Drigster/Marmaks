<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Админка | Мармакс</title>
</svelte:head>

{@render children()}
