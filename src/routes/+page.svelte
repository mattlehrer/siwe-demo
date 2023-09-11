<script lang="ts">
	import { connected, signerAddress } from '$lib/wagmi';
</script>

{#if $connected}
	<h1>You are connected with {$signerAddress}</h1>
{:else}
	<h1>You are not connected</h1>
{/if}
