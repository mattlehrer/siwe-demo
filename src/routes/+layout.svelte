<script>
	import Nav from '$lib/Nav.svelte';
	import '../app.postcss';
	import { signInWithCustomToken } from 'firebase/auth';
	import { signerAddress } from '$lib/wagmi';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/user';

	$: if ($signerAddress) {
		fetch('/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ address: $signerAddress })
		})
			.then((res) => res.json())
			.then((body) => {
				const { customToken } = body;
				signInWithCustomToken(auth, customToken)
					.then((userCredential) => {
						// Signed in
						$user = userCredential.user;
					})
					.catch((error) => {
						console.error(error);
						$user = null;
					});
			});
	}
</script>

<div class="full-height">
	<Nav />

	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 almost flex flex-col">
		<slot />
	</div>
</div>

<style>
	.full-height {
		min-height: 100vh;
	}

	.almost {
		min-height: calc(100vh - 8rem);
	}
</style>
