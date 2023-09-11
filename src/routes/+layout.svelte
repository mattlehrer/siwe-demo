<script>
	import Nav from '$lib/Nav.svelte';
	import '../app.postcss';
	import { signInWithCustomToken } from 'firebase/auth';
	import { signerAddress } from '$lib/wagmi';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/user';

	$: if ($signerAddress) {
		const token = fetch('/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ address: $signerAddress })
		})
			.then((res) => res.json())
			.then((res) => res.customToken);
		console.log({ token });

		// signInWithCustomToken(auth, $signerAddress)
		// 	.then((userCredential) => {
		// 		// Signed in
		// 		$user = userCredential.user;
		// 		console.log('here', $user);
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 		$user = null;
		// 	});
	}
</script>

<Nav />

<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
	<slot />
</div>
