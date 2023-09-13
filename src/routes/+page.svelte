<script lang="ts">
	import { connected, signerAddress } from '$lib/wagmi';
	import { database as db } from '$lib/firebase';
	import { ref, push, child, update, onValue } from 'firebase/database';
	import { user } from '$lib/user';
	import { onMount } from 'svelte';
	import { formatDistanceToNow } from 'date-fns';

	let message = '';
	let history: Array<{
		uid: string;
		message: string;
		timestamp: number;
	}> = [];

	async function handleSubmit() {
		const msgData = {
			uid: $signerAddress,
			message,
			timestamp: Date.now(),
			expiresAt: Date.now() + 1000 * 60 * 60,
		};
		// // Get a key for a new Message.
		const newMsgKey = push(child(ref(db), 'messages')).key;

		const updates: Record<string, any> = {};
		updates['/messages/' + $user?.uid + '/' + newMsgKey] = msgData;

		message = '';
		return update(ref(db), updates);
	}

	onMount(() => {
		const msgRef = ref(db, '/messages');
		const unsub = onValue(msgRef, (snapshot) => {
			const msgs = snapshot.val();
			if (msgs) {
				history = Object.values(msgs)
					.flatMap((addr: any) => Object.values(addr))
					.sort((a: any, b: any) => a.timestamp - b.timestamp) as any;
			}
		});

		return unsub;
	});
</script>

{#if $connected}
	<h2 class="truncate text-lg sm:text-2xl">
		You are connected with <br class="block sm:hidden" />{$signerAddress}
	</h2>
	<div
		class="my-8 flex grow flex-col justify-end gap-4 rounded-md sm:border sm:border-gray-300 sm:p-6"
	>
		{#each history as msg}
			<div class="flex flex-col">
				<div
					class={`${
						msg.uid === $signerAddress
							? 'items-end self-end bg-blue-500'
							: 'items-start self-start bg-gray-200'
					} flex w-fit max-w-[60%] flex-col overflow-hidden rounded-md px-3 py-2`}
				>
					{#if msg.uid !== $signerAddress}
						<h2
							class={`${
								msg.uid === $signerAddress ? 'text-blue-200' : 'text-gray-500'
							} max-w-full truncate text-sm`}
						>
							{msg.uid}
						</h2>
					{/if}
					<p
						class={`mt-px rounded-md ${
							msg.uid === $signerAddress ? 'text-blue-50' : 'text-gray-900'
						}`}
						title={formatDistanceToNow(Number(msg.timestamp), { addSuffix: true })}
					>
						{msg.message}
					</p>
				</div>
			</div>
		{/each}
	</div>
	<form
		class="mt-auto flex justify-between gap-2 py-4 sm:gap-12"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			type="text"
			bind:value={message}
			class="block w-full rounded-md border px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:border-0 sm:px-4 sm:text-sm sm:leading-6"
			placeholder="Send a message"
		/>
		<button
			type="submit"
			class="rounded-md border border-blue-500 bg-blue-50 px-3.5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-100"
			>Submit</button
		>
	</form>
{:else}
	<h1>Try out an Ethereum wallet and Sign-In with Ethereum.</h1>
	<p>
		If you don't have one yet, the easiest ways to get started are to use the <a
			href="https://rainbow.me/">Rainbow mobile app</a
		>
		or the <a href="https://metamask.io/">Metamask desktop browser extension</a>.
	</p>
	<p>
		After you have a wallet, you can connect to this site and start chatting. You will be identified
		only by the public wallet address you connect with.
	</p>
	<p>
		You can use the same Ethereum account on multiple browsers or on a laptop and phone. You could
		try creating multiple wallets and switching between them. Creating multiple wallets can be done
		in any of these applications though it is easiest on desktop with Metamask.
	</p>
	<p>
		This site is just a demo of Sign-in with Ethereum. The messages are not sent to the blockchain.
		The wallet and your Ethereum account are only used for authentication. No personal information
		is collected or stored in any way.
	</p>
{/if}

<style>
	h1 {
		@apply my-4 text-3xl font-semibold;
	}
</style>
