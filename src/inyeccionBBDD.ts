import dotenv from 'dotenv';
import { memoryPersonaRepository } from "./Repositories/memory/memoryPersonaRepository";
import { memoryAutoRepository } from "./Repositories/memory/memoryAutoRepository";
import { PersonaRepository } from "./Repositories/personaRepository";
import { AutoRepository } from "./Repositories/AutoRepository";
import mongoose from 'mongoose';
import { mongoPersonaRepository } from "./Repositories/mongo/mongoPersonaRepository";
import { PersonaModel } from "./Modelo/PersonaModel";
import { mongoAutoRepository } from './Repositories/mongo/mongoAutoRepository';
import { AutoModel } from './Modelo/AutoModel';
import admin from 'firebase-admin';
import * as path from 'path';
import { fbPersonaRepository } from './Repositories/firebase/fbPersonaRepository';
import { fbAutoRepository } from './Repositories/firebase/fbAutoRepository';

dotenv.config();

const url = process.env.DATABASE ||  'mongodb://127.0.0.1:27017';
const dbName = process.env.DATABASE_NAME || 'devapp2025';


export let personaRepo: PersonaRepository;
export let autoRepo: AutoRepository;

export const ConnectMemoryDB = () => {
    personaRepo = new memoryPersonaRepository;
    autoRepo = new memoryAutoRepository;
}

export async function ConnectMongoDB() {
    try {
        await mongoose.connect(`${url}/${dbName}`);
        console.log('Se conecto a MongoDB con mongose')
        personaRepo = new mongoPersonaRepository(PersonaModel);
        autoRepo = new mongoAutoRepository(AutoModel);

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}


export function ConnectFirebase() {
  const serviceAccountPath = path.resolve(process.env.FIREBASE_CREDENTIALS_PATH!);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: 'devapp2025-56b90.firebaseapp.com',
  });

  personaRepo = new fbPersonaRepository();
  autoRepo = new fbAutoRepository();

  console.log("Firebase conectado correctamente");
}

