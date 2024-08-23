<script>
	import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-svelte';
	import { Time, Phone, Mail, MapPin, Telegram2, Whatsapp } from '@o7/icon/remix';
</script>

<svelte:head>
	<title>Контакты | Мармакс</title>
</svelte:head>

<Breadcrumb class="m-2">
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
					<span class="my-auto">Пн-Пт 9:00-18:00</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Phone class="mx-auto" size="32" />
					<span class="my-auto">+7 (495) 120-09-12</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Phone class="mx-auto" size="32" />
					<span class="my-auto">+7 (903) 545-67-55</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Mail class="mx-auto" size="32" />
					<span class="my-auto">info@marmakc.com</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<MapPin class="mx-auto" size="32" />
					<span class="my-auto">Южнопортовая улица 7с7</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Telegram2 class="mx-auto" size="32" />
					<span class="my-auto">Телеграмм</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<Whatsapp class="mx-auto" size="32" />
					<span class="my-auto">Ватсап</span>
				</div>
			</div>
		</div>
		<div class="p-8 bg-white rounded-2xl shadow-xl">
			<div class="grid grid-cols-2 gap-4" style="grid-template-columns: min-content 1fr;">
				<span class="text-xl font-semibold col-span-2">Реквизиты</span>
				<div class="grid grid-cols-subgrid col-span-2">
					<MapPin class="mx-auto" size="32" />
					<span class="my-auto">Южнопортовая улица 7с7</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<span class="my-auto font-bold mx-auto">ИНН</span>
					<span class="my-auto">7722464540</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<span class="my-auto font-bold mx-auto">КПП</span>
					<span class="my-auto">772201001</span>
				</div>
				<div class="grid grid-cols-subgrid col-span-2">
					<span class="my-auto font-bold mx-auto">ОГРН</span>
					<span class="my-auto">1187746699447</span>
				</div>
				<div class="col-span-2">
					<Button class="bg-primary" href="/files/МАРМАКС_КартаПартнера_2019.pdf" download
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
