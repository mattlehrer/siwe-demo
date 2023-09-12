<script lang="ts">
	import { connected, signerAddress } from '$lib/wagmi';
	import { database as db, auth } from '$lib/firebase';
	import { ref, push, child, update, onValue } from 'firebase/database';
	import { user } from '$lib/user';
	import { onMount } from 'svelte';

	let message = '';
	let history = [];

	async function handleSubmit() {
		console.log({ user: auth.currentUser });
		console.log({ message });
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
		onValue(child(ref(db), 'messages/' + $user?.uid), (snapshot) => {
			history = snapshot.val();
			console.log({ history });
		});
	});
</script>

{#if $connected}
	<h1>You are connected with {$signerAddress}</h1>
	<div class="py-8 border border-gray-300 my-8 px-4 rounded-md grow flex flex-col justify-end">
		<p>chats placeholder</p>
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
