<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-svelte';
	import { Time, Phone, Mail, MapPin, Telegram2, Whatsapp } from '@o7/icon/remix';

	import type { PageData } from './$types';
	import type { Settings } from '$lib/database/db';
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
<div class="grid grid-cols-6 gap-4 mb-4">
	<div class="col-span-2 flex flex-col gap-4">
		<div class="p-8 bg-white rounded-2xl shadow-xl">
			<div class="grid grid-cols-2 gap-4" style="grid-template-columns: min-content 1fr;">
				<span class="text-center text-2xl font-semibold col-span-2">Офис</span>
				<div class="grid grid-cols-subgrid col-span-2">
					<Time class="mx-auto" size="32" />
					<span class="my-auto">{settingDict.working_hours}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Phone class="mx-auto" size="32" />
					<span class="my-auto">{settingDict.phone1}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Phone class="mx-auto" size="32" />
					<span class="my-auto">{settingDict.phone2}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Mail class="mx-auto" size="32" />
					<span class="my-auto">{settingDict.email}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<MapPin class="mx-auto" size="32" />
					<span class="my-auto">{settingDict.adress}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Telegram2 class="mx-auto" size="32" />
					<a class="my-auto" href={settingDict.telegram}>Телеграм</a>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Whatsapp class="mx-auto" size="32" />
					<a class="my-auto" href={settingDict.whatsapp}>Ватсап</a>
				</div>
			</div>
		</div>
		<div class="p-8 bg-white rounded-2xl shadow-xl">
			<div class="grid grid-cols-2 gap-4" style="grid-template-columns: min-content 1fr;">
				<span class="text-xl font-semibold col-span-2">Реквизиты</span>
				<div class="grid grid-cols-subgrid col-span-2">
					<MapPin class="mx-auto" size="32" />
					<span class="my-auto">{settingDict.adress}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<span class="my-auto font-bold mx-auto">ИНН</span>
					<span class="my-auto">{settingDict.inn}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<span class="my-auto font-bold mx-auto">КПП</span>
					<span class="my-auto">{settingDict.kpp}</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<span class="my-auto font-bold mx-auto">ОГРН</span>
					<span class="my-auto">{settingDict.ogrn}</span>
				</div>
				<div class="col-span-2">
					<Button class="bg-primary" href="/МАРМАКС_КартаПартнера_2019.pdf" download
						>Скачать файл с реквизитами</Button
					>
				</div>
			</div>
		</div>
	</div>
	<div class="col-span-4 shadow-xl rounded-2xl">
		<iframe
			title="Карта"
			src="https://yandex.ru/map-widget/v1/?ll=37.696482%2C55.713274&mode=routes&rtext=~55.713549%2C37.696400&rtt=auto&ruri=~&source=serp_navig&z=19.28"
			class="h-full w-full rounded-2xl"
			frameborder="1"
			allowfullscreen={true}
			style="position:relative;"
		></iframe>
	</div>
</div>
