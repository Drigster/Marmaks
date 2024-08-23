<script lang="ts">
    import SideNav from '$lib/SideNav.svelte';

    let { children } = $props();
</script>

<div class="flex">
    <SideNav />
    <main class="w-full h-full">
        {@render children()}
    </main>
</div>