<script lang="ts">
	import LogoWhite from '$lib/assets/logo.svg';
	import LogoSmall from '$lib/assets/logoSmall.svg';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { clickOutside } from './util';
	import { Phone, Bars3, PhoneArrowUpRight, Envelope } from '@o7/icon/heroicons';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);

	let { phone, phone2, email }: { phone: string; phone2: string; email: string } = $props();

	function copy(event: MouseEvent, text: string) {
		event.stopPropagation();
		const clickedElement = event.target as HTMLElement;
		if (clickedElement == null) {
			return;
		}

		navigator.clipboard.writeText(text);
		$flash = { type: 'info', message: 'Скопировано' };
	}
	let navToggle: HTMLInputElement;
</script>

<header
	class="fixed z-20 w-full content-grid full-top"
	use:clickOutside
	onoutsideclick={() => (navToggle.checked = false)}
>
	<nav class="breakout nav text-mx 2xl:text-xl">
		<div class="nav-left">
			<a class="nav-logo nav-logo-large" href="/">
				<img class="h-12" src={LogoWhite} alt="" />
			</a>
			<a class="nav-logo nav-logo-small" href="/">
				<img class="h-12" src={LogoSmall} alt="" />
			</a>
		</div>
		<div class="nav-center">
			<ul class="nav-list h-12">
				<li class="nav-item"><a class="nav-link" href="/"><span>Главная</span></a></li>
				<li class="nav-item"><a class="nav-link" href="/#products">Продукция</a></li>
				<li class="nav-item"><a class="nav-link" href="/#about_us">Как работаем</a></li>
				<li class="nav-item"><a class="nav-link" href="/contact">Контакт</a></li>
				<li class="nav-item border-t pt-2 lg:hidden">
					<button
						class="my-tooltip my-tooltip-bottom flex gap-2 nav-link mx-auto"
						data-tooltip="Скопировать!"
						onclick={(event) => copy(event, phone)}
					>
						<Phone class="mx-auto" />
						<span class="my-auto">
							{phone}
						</span>
					</button>
					<button
						class="my-tooltip my-tooltip-bottom flex gap-2 nav-link mx-auto"
						data-tooltip="Скопировать!"
						onclick={(event) => copy(event, phone2)}
					>
						<Phone class="mx-auto" />
						<span class="my-auto">
							{phone2}
						</span>
					</button>
					<button
						class="my-tooltip flex gap-2 nav-link mx-auto"
						data-tooltip="Скопировать!"
						onclick={(event) => copy(event, email)}
					>
						<Envelope class="mx-auto" />
						<span class="my-auto">
							{email}
						</span>
					</button>
				</li>
			</ul>
		</div>
		<div class="nav-right">
			<button class="nav-item nav-contact-button"><PhoneArrowUpRight size="32" /></button>
			<Dropdown class="text-primary">
				<DropdownItem>
					<button
						class="my-tooltip my-tooltip-bottom flex gap-2"
						data-tooltip="Скопировать!"
						onclick={(event) => copy(event, phone)}
					>
						<Phone class="mx-auto" size="32" />
						<span class="my-auto">
							{phone}
						</span>
					</button>
				</DropdownItem>
				<DropdownItem>
					<button
						class="my-tooltip flex gap-2"
						data-tooltip="Скопировать!"
						onclick={(event) => copy(event, phone2)}
					>
						<Phone class="mx-auto" size="32" />
						<span class="my-auto">
							{phone2}
						</span>
					</button>
				</DropdownItem>
				<DropdownItem>
					<button
						class="my-tooltip flex gap-2"
						data-tooltip="Скопировать!"
						onclick={(event) => copy(event, email)}
					>
						<Envelope class="mx-auto" size="32" />
						<span class="my-auto">
							{email}
						</span>
					</button>
				</DropdownItem>
			</Dropdown>
			<label class="nav-item nav-menu-button cursor-pointer" for="nav-toggle">
				<Bars3 size="48" />
			</label>
			<input type="checkbox" id="nav-toggle" bind:this={navToggle} />
		</div>
	</nav>
</header>

<style>
	.nav {
		display: grid;
		grid-template-columns: 1fr max-content 1fr;
		margin: 2rem;
		font-size: 1rem;
		gap: 1rem;
	}

	.nav-left {
		justify-self: start;
	}

	.nav-center {
		justify-self: center;
	}

	.nav-right {
		justify-self: end;
	}

	.nav-list {
		display: flex;
		gap: 1rem;
		background-color: white;
		padding-block: 0.5rem;
		padding-inline: 0.25rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
	}

	.nav-item {
		margin-block: auto;
	}

	.nav-logo {
		margin-block: auto;
	}

	.nav-link {
		padding-block: 0.5rem;
		padding-inline: 1.5rem;
	}

	.nav-link:hover {
		color: white;
		background-color: var(--primary);
		border-radius: 1rem;
	}

	.nav-logo-small,
	.nav-menu-button {
		display: none;
	}

	.nav-contact-button {
		background-color: white;
		padding: 0.5rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
	}

	.nav-contact-button:hover {
		background-color: var(--primary);
		color: white;
	}

	#nav-toggle {
		display: none;
	}

	@media (max-width: 1024px) {
		header {
			background-color: white;
		}

		.nav {
			--padding-block: 1rem;
			--icon-size: 3rem;

			margin: 0;
			padding-inline: 0.5rem;
			padding-block: var(--padding-block);
		}

		.nav-list {
			display: none;
			flex-flow: column;
			position: absolute;
			inset: 0;
			top: calc(var(--icon-size) + var(--padding-block) * 2);
			height: max-content;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			box-shadow: none;
			padding-bottom: 1rem;
			text-align: center;
		}

		.nav-menu-button {
			display: inline;
		}

		.nav-contact-button {
			display: none;
		}

		.nav:has(#nav-toggle:checked) .nav-list {
			display: flex;
		}
	}

	@media (max-width: 1400px) {
		.nav-logo-small {
			display: inline;
		}

		.nav-logo-large {
			display: none;
		}
	}
</style>
