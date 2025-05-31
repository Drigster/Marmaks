<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-svelte';
	import { Time, Phone, Mail, MapPin, Telegram2, Whatsapp, FileCopy } from '@o7/icon/remix';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	import type { PageData } from './$types';
	import type { Settings } from '$lib/database/db';
	import { copy } from '$lib/util';

	const flash = getFlash(page);
	let { data }: { data: PageData } = $props();
	let settingDict: Settings = data.settingDict;
</script>

<svelte:head>
	<title>Контакты | Мармакс</title>
</svelte:head>

<Breadcrumb class="m-2 text-primary">
	<BreadcrumbItem href="/" home>Главная</BreadcrumbItem>
	<BreadcrumbItem>Контакты</BreadcrumbItem>
</Breadcrumb>
<div class="contact-grid">
	<div class="p-8 bg-white rounded-2xl shadow-xl">
		<div class="grid grid-cols-2 gap-4" style="grid-template-columns: min-content 1fr;">
			<span class="text-center text-2xl font-semibold col-span-2">Офис</span>
			<!-- <div class="grid grid-cols-subgrid col-span-2">
				<Time class="mx-auto" size="32" />
				<span class="my-auto flex"
					>{settingDict.working_hours}<FileCopy class="pl-1" size="18" /></span
				>
			</div> -->
			<div class="grid grid-cols-subgrid col-span-2">
				<Time class="mx-auto" size="32" />
				<button
					class="my-auto flex"
					onclick={(event) => copy(event, settingDict.working_hours, flash)}
				>
					{settingDict.working_hours}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<Phone class="mx-auto" size="32" />
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.phone1, flash)}>
					{settingDict.phone1}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<Phone class="mx-auto" size="32" />
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.phone2, flash)}>
					{settingDict.phone2}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<Mail class="mx-auto" size="32" />
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.email, flash)}>
					{settingDict.email}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<MapPin class="mx-auto" size="32" />
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.adress, flash)}>
					{settingDict.adress}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2 font-bold hover:underline">
				<Telegram2 class="mx-auto" size="32" />
				<a class="my-auto" href={settingDict.telegram} target="_blank">Напишите нам в Telegram</a>
			</div>
			<div class="grid grid-cols-subgrid col-span-2 font-bold hover:underline">
				<Whatsapp class="mx-auto" size="32" />
				<a class="my-auto" href={settingDict.whatsapp} target="_blank">Напишите нам в WhatsApp</a>
			</div>
		</div>
	</div>
	<div class="p-8 bg-white rounded-2xl shadow-xl flex flex-col justify-between">
		<div class="grid grid-cols-2 gap-4" style="grid-template-columns: min-content 1fr;">
			<span class="text-center text-2xl font-semibold col-span-2">Реквизиты</span>
			<div class="grid grid-cols-subgrid col-span-2">
				<MapPin class="mx-auto" size="32" />
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.adress, flash)}>
					{settingDict.adress}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<span class="my-auto font-bold mx-auto">ИНН</span>
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.inn, flash)}>
					{settingDict.inn}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<span class="my-auto font-bold mx-auto">КПП</span>
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.kpp, flash)}>
					{settingDict.kpp}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
			<div class="grid grid-cols-subgrid col-span-2">
				<span class="my-auto font-bold mx-auto">ОГРН</span>
				<button class="my-auto flex" onclick={(event) => copy(event, settingDict.ogrn, flash)}>
					{settingDict.ogrn}<FileCopy class="pl-1" size="18" />
				</button>
			</div>
		</div>
		<div class="pt-4">
			<Button class="bg-primary" href="/МАРМАКС_КартаПартнера_2019.pdf" download>
				Скачать файл с реквизитами
			</Button>
		</div>
	</div>
	<div class="map-block col-span-4 shadow-xl rounded-2xl">
		<iframe
			title="Карта"
			src="https://yandex.ru/map-widget/v1/?ll=37.730473%2C55.748906&mode=whatshere&whatshere%5Bpoint%5D=37.729937%2C55.749103&whatshere%5Bzoom%5D=17&z=19.6"
			class="h-full w-full rounded-2xl"
			frameborder="1"
			allowfullscreen={true}
			style="position:relative;"
		></iframe>
	</div>
</div>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, max-content);
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.map-block {
		grid-column-start: 2;
		grid-row-start: 1;
		grid-column-end: 4;
		grid-row-end: 3;
	}

	@media (max-width: 1024px) {
		.contact-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, 1fr);
		}

		.map-block {
			grid-column-start: 1;
			grid-row-start: 2;
			grid-column-end: 3;
			grid-row-end: 4;
		}
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, max-content);
		}

		.map-block {
			grid-column: span 1;
			grid-row: span 1;
			width: 100%;
			aspect-ratio: 1/1;
		}
	}
</style>
