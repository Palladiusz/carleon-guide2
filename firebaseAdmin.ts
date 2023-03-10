// firebaseAdmin.ts

import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY
        ? process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,

      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: "https://carleon-guide.firebaseio.com",
  });
}

export { firebaseAdmin };
