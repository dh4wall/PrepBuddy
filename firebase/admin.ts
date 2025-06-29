// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";

// // Initialize Firebase Admin SDK
// function initFirebaseAdmin() {
//   const apps = getApps();

//   if (!apps.length) {
//     initializeApp({
//       credential: cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         // Replace newlines in the private key
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       }),
//     });
//   }

//   const db = getFirestore();
//   // Enable ignoring undefined properties globally (optional)
//   db.settings({ ignoreUndefinedProperties: true });

//   return {
//     auth: getAuth(),
//     db,
//   };
// }

// export const { auth, db } = initFirebaseAdmin();




// firebase/admin.ts
import { initializeApp, getApps, getApp, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { cert } from "firebase-admin/app";

// Singleton module to avoid redeclaration and multiple initializations
const firebaseAdmin = (() => {
  let adminApp: App | null = null;
  let adminDb: Firestore | null = null;
  let adminAuth: Auth | null = null;

  function init() {
    // If already initialized, return existing instances
    if (adminApp && adminDb && adminAuth) {
      console.log("Reusing existing Firebase Admin app");
      return { auth: adminAuth, db: adminDb };
    }

    // Initialize Firebase app if not already done
    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
      console.log("Firebase Admin initialized");
    } else {
      adminApp = getApp();
      console.log("Using existing Firebase app");
    }

    // Initialize Firestore and Auth
    adminDb = getFirestore(adminApp);
    adminAuth = getAuth(adminApp);

    // Apply Firestore settings only once
    try {
      adminDb.settings({ ignoreUndefinedProperties: true });
      console.log("Firestore settings applied");
    } catch (error: any) {
      console.log("Firestore settings already applied or skipped:", error.message);
    }

    return { auth: adminAuth, db: adminDb };
  }

  return init();
})();

// Export singleton instances
export const { auth, db } = firebaseAdmin;