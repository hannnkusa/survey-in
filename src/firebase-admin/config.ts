import { initializeApp, getApps, cert } from "firebase-admin/app";
import serviceAccountKey from "./serviceAccountKey.json";

const firebaseAdminConfig = {
  credential: cert({
    projectId: serviceAccountKey.project_id,
    clientEmail: serviceAccountKey.client_email,
    privateKey: serviceAccountKey.private_key,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
