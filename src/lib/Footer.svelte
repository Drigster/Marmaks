<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterBrand
	} from 'flowbite-svelte';
	import LogoWhite from '$lib/assets/logoWhite.svg';
</script>

<Footer footerType="socialmedia" class="bg-primary content-grid">
	<div class="md:flex md:justify-between">
		<div class="mb-6 md:mb-0">
			<FooterBrand href="/" src={LogoWhite} alt="Лого МАРМАКС" />
			<p class="text-white mt-2">Работаем с 2018 года.</p>
			<p class="text-white">Город Москва.</p>
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-white opacity-50">Страницы</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4 text-white" href="/">Главная</FooterLink>
					<FooterLink liClass="mb-4 text-white" href="/">Продукция</FooterLink>
					<FooterLink liClass="mb-4 text-white" href="/">Как работаем</FooterLink>
					<FooterLink liClass="mb-4 text-white" href="/contact">Контакты</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-white opacity-50">Важное</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4 text-white" href="/certificates">Сертификаты</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="mb-6 text-sm font-semibold uppercase text-white opacity-50">Legal</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4 text-white" href="/termsofuse"
						>Пользовательское Соглашение</FooterLink
					>
				</FooterLinkGroup>
			</div>
		</div>
	</div>
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="МАРМАКС" copyrightMessage="" />
	</div>
</Footer>
