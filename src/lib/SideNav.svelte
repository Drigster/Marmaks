<script lang="ts">
	import LogoSmall from '$lib/assets/logoSmall.svg';
	import LogoWhite from '$lib/assets/logo.svg';
	import { ContractLeft, ExpandRight, LogoutBox, Settings4, Box3, Article } from '@o7/icon/remix';

	let sidenavClosed = $state(false);
</script>

<aside class="z-20 h-svh sticky">
	<sidenav class="sidenav text-xl">
		<input
			id="sidenav-toggle"
			class="sidenav-toggle"
			type="checkbox"
			bind:checked={sidenavClosed}
		/>
		<span class="sidenav-logo">
			<a class="sidenav-logo-large" href="/">
				<img class="max-w-none" height="32" width="172.3" src={LogoWhite} alt="" />
			</a>
			<a class="sidenav-logo-small" href="/">
				<img class="max-w-none" height="32" width="32" src={LogoSmall} alt="" />
			</a>
		</span>
		<ul class="sidenav-list">
			<!-- <li class="sidenav-item">
				<a class="sidenav-link" href="/admin/dashboard">
					<Dashboard size="32" />
					<span>Dashboard</span>
				</a>
			</li> -->
			<li class="sidenav-item">
				<a class="sidenav-link" href="/admin/products">
					<span class="sidenav-icon">
						<Box3 size="32" />
					</span>
					<span>Продукты</span>
				</a>
			</li>
			<li class="sidenav-item">
				<a class="sidenav-link" href="/admin/settings">
					<span class="sidenav-icon">
						<Settings4 size="32" />
					</span>
					<span>Настройки</span>
				</a>
			</li>
			<li class="sidenav-item">
				<a class="sidenav-link" href="/admin/certificates">
					<span class="sidenav-icon">
						<Article size="32" />
					</span>
					<span>Сертификаты</span>
				</a>
			</li>
			<li class="sidenav-item mt-4">
				<a class="sidenav-link" href="/admin/logout">
					<LogoutBox size="32" />
					<span>Выйти</span>
				</a>
			</li>
		</ul>
		<label class="sidenav-link mt-auto" for="sidenav-toggle">
			<span class="sidenav-icon" class:hidden={!sidenavClosed}>
				<ExpandRight size="32" />
			</span>
			<span class="sidenav-icon" class:hidden={sidenavClosed}>
				<ContractLeft size="32" />
			</span>
			<span>Скрыть</span>
		</label>
	</sidenav>
</aside>

<style>
	.sidenav {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 0.5rem;
		background-color: white;
		padding: 0.125rem;
	}

	.sidenav-link {
		display: grid;
		grid-template-columns: max-content 1fr;
		overflow: hidden;
		align-items: center;
		padding: 0.5rem;
		gap: 0.5rem;
		transition: all 250ms;
	}

	.sidenav-link > * {
		overflow: hidden;
	}

	.sidenav-link:hover,
	.sidenav-logo:hover {
		color: var(--accent);
		background-color: hsl(from var(--primary) h s l / 0.2);
		border-radius: 0.5rem;
	}

	.sidenav-logo {
		padding: 0.5rem;
	}

	.sidenav-toggle {
		display: none;
	}

	.sidenav-logo-small {
		display: none;
	}

	.sidenav:has(.sidenav-toggle:checked) .sidenav-logo-large {
		display: none;
	}

	.sidenav:has(.sidenav-toggle:checked) .sidenav-logo-small {
		display: inherit;
	}

	.sidenav:has(.sidenav-toggle:checked) .sidenav-link {
		grid-template-columns: max-content 0fr;
		gap: 0;
	}
</style>
