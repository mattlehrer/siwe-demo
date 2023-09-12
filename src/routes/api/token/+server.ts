import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { auth } from '$lib/firebase-admin';

export const POST: RequestHandler = async ({ request }) => {
	const { address } = await request.json();
	if (!address) return new Response('Missing address', { status: 400 });

	try {
		const customToken = await auth().createCustomToken(address);
		return json({ customToken });
	} catch (error) {
		console.log('Error creating custom token:', error);
		return new Response('Error creating custom token', { status: 500 });
	}
};
