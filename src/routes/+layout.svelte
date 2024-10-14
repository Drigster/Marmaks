<script lang="ts">
	import '../app.css';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import Toast from '$lib/Toast.svelte';
	import { InformationCircle, ExclamationCircle } from '@o7/icon/heroicons';
	import { fly } from 'svelte/transition';
	import { mount } from 'svelte';

	const flash = getFlash(page);

	let { children } = $props();

	$effect(() => {
		if ($flash) {
			console.log('Flash');
			const parrent = document.getElementById('flash');
			if (parrent) {
				mount(Toast, {
					props: {
						type: $flash.type,
						message: $flash.message
					},
					target: parrent
				});
			}
		}

		$flash = undefined;
	});
</script>

<svelte:head>
	<meta
		name="keywords"
		content="Взрывозащитное оборудование,
	EXD оболочки,
	EXE коробки,
	Пожарные щиты в соответсвии с 043 регламентом,
	Щиты управление противо дымной вентиляцией,
	Щиты управления пенным пожаро тушением,
	ППУ,
	19 “ стойки,
	Система видеонаблюдения,
	Серверные и прочее,
	Шкафы Электрообогрева,
	Шкафы питания электрообогрева,
	Шкафы управления электрообогрева,
	Шкафы Автоматизации,
	Шкафы автоматизации систем вентиляции,
	Шкафы автоматизации систем котельных,
	Шкафы автоматизации систем насосами,
	Распределительные щиты,
	РУНН,
	ГРЩ,
	ЩР,
	ЩО,
	ЩАО,
	АВР,"
	/>
</svelte:head>

{@render children()}

<div id="flash" class="fixed right-0 bottom-0 flex flex-col m-4 gap-4"></div>
