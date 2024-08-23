<script lang="ts">
	let { title, id }: { title: string, id: string | undefined } = $props();
</script>

<div {id} class="my-4 sm:text-sm md:text-3xl text-center scroll-mt-28">
	{title}
	<hr class="w-1/2 mx-auto h-1 bg-[#A2AEC3]" />
</div>
