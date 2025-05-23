import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { firebaseConfig } from 'secret';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
