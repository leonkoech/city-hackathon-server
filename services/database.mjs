import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../env_var/firebaseConfig.mjs';

import dotenv from 'dotenv';
dotenv.config();

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
