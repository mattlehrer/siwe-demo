<script lang="ts">
	import { connected, signerAddress } from '$lib/wagmi';
</script>

{#if $connected}
	<h1>You are connected with {$signerAddress}</h1>
	<div class="py-8 border border-gray-300 my-8 px-4 rounded-md grow flex flex-col justify-end">
		<p>chats placeholder</p>
	</div>
	<form class="mt-auto my-8 py-4 flex justify-between gap-12">
		<input
			type="text"
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
