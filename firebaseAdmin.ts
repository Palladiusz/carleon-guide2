// firebaseAdmin.ts

import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.REACT_APP_PRIVATE_KEY
        ? JSON.parse(process.env.REACT_APP_PRIVATE_KEY)
        : undefined,
      clientEmail: process.env.REACT_APP_CLIENT_EMAIL,
      projectId: process.env.REACT_APP_PROJECT_ID,
    }),
    databaseURL: "https://carleon-guide.firebaseio.com",
  });
}

export { firebaseAdmin };
