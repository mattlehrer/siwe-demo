# Sign-in with Ethereum Demo

This is a quick demo of SIWE (Sign-in with Ethereum) for a series of seminars on blockchain technology at Malmo University.

The site uses sign-in with Ethereum for authentication, then the user's Ethereum address is used as a unique identifier for Firebase's [custom authentication](https://firebase.google.com/docs/auth/web/custom-auth) token (JWT) generation. Once signed into Ethereum, users can view and send messages to each other in one chat for everyone using the site. The messages are stored in a [Firebase Realtime Database](https://firebase.google.com/docs/database).