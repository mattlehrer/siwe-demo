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
			console.log({ msgs });
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
	<h1 class="truncate">You are connected with {$signerAddress}</h1>
	<div
		class="sm:border sm:border-gray-300 my-8 sm:p-6 rounded-md grow flex flex-col justify-end gap-4"
	>
		{#each history as msg}
			<div class="flex flex-col">
				<div
					class={`${
						msg.uid === $signerAddress
							? 'self-end bg-blue-500 items-end'
							: 'self-start bg-gray-200 items-start'
					} rounded-md py-2 px-3 flex flex-col w-fit max-w-[60%] overflow-hidden`}
				>
					<h2
						class={`${
							msg.uid === $signerAddress ? 'text-blue-200 ' : 'text-gray-500'
						} text-sm max-w-full truncate`}
					>
						{msg.uid}
					</h2>
					<p
						class={`rounded-md mt-px ${
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
		class="mt-auto my-8 py-4 flex justify-between gap-12"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			type="text"
			bind:value={message}
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-4"
			placeholder="Send a message"
		/>
		<button
			type="submit"
			class="rounded-md bg-blue-50 px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
			>Submit</button
		>
	</form>
{:else}
	<h1>You are not connected</h1>
{/if}
