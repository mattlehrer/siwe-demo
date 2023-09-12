<script>
	import Nav from '$lib/Nav.svelte';
	import '../app.postcss';
	import { signInWithCustomToken } from 'firebase/auth';
	import { signerAddress } from '$lib/wagmi';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/user';
	import Footer from '$lib/Footer.svelte';

	$: if ($signerAddress) {
		fetch('/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address: $signerAddress }),
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

<svelte:head>
	<title>Sign-in With Ethereum Real-time Chat</title>
</svelte:head>

<div class="full-height">
	<Nav />

	<div class="almost mx-auto flex max-w-7xl flex-col px-2 sm:px-6 lg:px-8">
		<slot />
	</div>

	<Footer />
</div>

<style>
	.full-height {
		min-height: 100dvh;
	}

	.almost {
		min-height: calc(100dvh - 16rem);
	}
</style>
