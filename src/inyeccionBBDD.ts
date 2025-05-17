import dotenv from 'dotenv';
import { memoryPersonaRepository } from "./Repositories/memory/memoryPersonaRepository";
import { memoryAutoRepository } from "./Repositories/memory/memoryAutoRepository";
import { PersonaRepository } from "./Repositories/personaRepository";
import { AutoRepository } from "./Repositories/AutoRepository";
import mongoose from 'mongoose';
import { mongoPersonaRepository } from "./Repositories/mongo/mongoPersonaRepository";
import { PersonaModel } from "./Modelo/PersonaModel";

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

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}