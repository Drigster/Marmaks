<script lang="ts">
	import { ArrowLeftS } from '@o7/icon/remix';
	import { superForm } from 'sveltekit-superforms';
	import backgroundImg1 from '$lib/assets/backgroundImg1.png';
	import spiner from '$lib/assets/spiner.svg';
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';

	let { data }: { data: PageData } = $props();

	const { form, enhance, errors, delayed } = superForm(data.form);
</script>

<svelte:head>
	<title>Админ панель | Мармакс</title>
</svelte:head>

<div
	class="min-h-screen bg-center bg-no-repeat bg-cover bg-blue-overlay flex"
	style="background-image: url({backgroundImg1})"
>
	<Button class="absolute left-16 top-16 text-xl font-semibold" href="/"
		><ArrowLeftS size="32" />Вернутся на главную</Button
	>
	<div class="authForm m-auto min-w-96 bg-background rounded-2xl">
		<h2 class="text-center mx-auto uppercase text-3xl mb-8 text-accent font-bold">Вход</h2>
		<form method="POST" use:enhance>
			<div>
				<div class="inputBox">
					<input type="text" name="login" bind:value={$form.login} required />
					<label for="login">Логин</label>
				</div>
				{#if $errors.login}
					<span class="errorMessage">{$errors.login}</span>
				{/if}
			</div>

			<div>
				<div class="inputBox">
					<input type="password" name="password" bind:value={$form.password} required />
					<label for="password">Пароль</label>
				</div>
				{#if $errors.password}
					<span class="errorMessage">{$errors.password}</span>
				{/if}
			</div>

			<button type="submit">
				{#if $delayed}
					<span class="relative">
						Войти
						<img
							class="h-full mx-2 absolute left-full top-0"
							width="20"
							height="20"
							src={spiner}
							alt="Spiner icon"
						/>
					</span>
				{:else}
					Войти
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.authForm {
		padding: 2.5rem;
	}

	.authForm > form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.authForm button {
		background-color: var(--accent);
		color: white;
		font-size: 1.25rem;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}

	.authForm button:active {
		background-color: color-mix(in oklab, var(--accent) 80%, black 20%);
	}

	.inputBox {
		position: relative;
	}

	.inputBox > input {
		padding-inline: 0.75rem;
		padding-top: 1.4rem;
		padding-bottom: 0.35rem;
		margin-inline: auto;
		background-color: var(--background);
		border-radius: 0.5rem;
		width: 100%;

		border-width: 1px;
		border-color: rgba(48, 48, 48, 0.2);
	}
	.inputBox ~ .errorMessage {
		position: absolute;
		font-size: 0.9rem;
		padding-left: 0.25rem;
	}

	.inputBox > label {
		position: absolute;
		left: 0;
		padding-left: 0.75rem;
		margin-block: 0.87rem;
		color: var(--secondary);
		transition: 0.5s;
	}

	.inputBox input:valid ~ label,
	.inputBox input:focus ~ label {
		transform: translateY(-0.5rem);
		font-size: 0.8em;
		color: var(--primary);
	}
</style>
