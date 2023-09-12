<script>
	import {
		connected,
		disconnectWagmi,
		loading,
		web3Modal,
		defaultConfig,
		wagmiLoaded,
	} from '$lib/wagmi';
	import { onMount } from 'svelte';
	import { PUBLIC_WALLETCONNECT_ID, PUBLIC_ALCHEMY_ID } from '$env/static/public';

	onMount(async () => {
		const erckit = defaultConfig({
			appName: 'erc.kit',
			walletConnectProjectId: PUBLIC_WALLETCONNECT_ID,
			alchemyId: PUBLIC_ALCHEMY_ID,
		});

		await erckit.init();
	});
</script>

<nav class="h-32 py-8">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex flex-1 items-stretch justify-start">
				<div class="flex flex-shrink-0 items-center">
					<p class="text-gray-700">SIWE Demo</p>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				{#if wagmiLoaded}
					{#if $loading}
						<div>
							<span class="loader" />Waiting...
						</div>
					{:else if $connected}
						<button
							on:click={disconnectWagmi}
							type="button"
							class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
							>Disconnect</button
						>
					{:else}
						<button
							on:click={async () => {
								$loading = true;
								await $web3Modal.openModal();
								$loading = false;
							}}
							type="button"
							class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>{#if $loading}
								Connecting...
							{:else}
								Sign in with Ethereum
							{/if}</button
						>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</nav>
