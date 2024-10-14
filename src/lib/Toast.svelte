<script lang="ts">
	import { Toast } from 'flowbite-svelte';
	import { InformationCircle, ExclamationCircle, CheckCircle } from '@o7/icon/heroicons';
	import { fly } from 'svelte/transition';

	let { type, message }: { type: 'error' | 'success' | 'info'; message: string } = $props();
</script>

{#if type == 'success'}
	<Toast color="green" transition={fly} params={{ x: 200 }}>
		<svelte:fragment slot="icon">
			<CheckCircle
				class="w-6 h-6 text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200"
			/>
		</svelte:fragment>
		{message}
	</Toast>
{:else if type == 'info'}
	<Toast color="blue" transition={fly} params={{ x: 200 }}>
		<svelte:fragment slot="icon">
			<InformationCircle
				class="w-6 h-6 text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200"
			/>
		</svelte:fragment>
		{message}
	</Toast>
{:else}
	<Toast color="red" transition={fly} params={{ x: 200 }}>
		<svelte:fragment slot="icon">
			<ExclamationCircle
				class="w-6 h-6 text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200"
			/>
		</svelte:fragment>
		{message}
	</Toast>
{/if}
