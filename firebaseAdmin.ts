// firebaseAdmin.ts

import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from "./secret.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.REACT_APP_PRIVATE_KEY,
      clientEmail: process.env.REACT_APP_CLIENT_EMAIL,
      projectId: process.env.REACT_APP_PROJECT_ID,
    }),
    databaseURL: "https://carleon-guide.firebaseio.com",
  });
}

export { firebaseAdmin };
