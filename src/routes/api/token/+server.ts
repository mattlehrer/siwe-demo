import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

import admin from 'firebase-admin';
import { FIREBASE_SERVICE_KEY, FIREBASE_SERVICE_KEY_ID } from '$env/static/private';

const credential = {
	type: 'service_account',
	project_id: 'siwe-demo-mau',
	private_key_id: FIREBASE_SERVICE_KEY_ID,
	private_key: FIREBASE_SERVICE_KEY,
	client_email: 'firebase-adminsdk-lgp30@siwe-demo-mau.iam.gserviceaccount.com',
	client_id: '100445650129833255785',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lgp30%40siwe-demo-mau.iam.gserviceaccount.com',
	universe_domain: 'googleapis.com'
} as admin.ServiceAccount;

export const POST: RequestHandler = async ({ request }) => {
	admin.initializeApp({
		credential: admin.credential.cert(credential)
	});
	const { address } = await request.json();
	if (!address) return new Response('Missing address', { status: 400 });

	try {
		const customToken = await admin.auth().createCustomToken(address);
		console.log({ customToken });
		return json({ customToken });
	} catch (error) {
		console.log('Error creating custom token:', error);
		return new Response('Error creating custom token', { status: 500 });
	}
};
