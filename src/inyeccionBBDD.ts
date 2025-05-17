import { Db, MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { memoryPersonaRepository } from "./Repositories/memory/memoryPersonaRepository";
import { memoryAutoRepository } from "./Repositories/memory/memoryAutoRepository";
import { PersonaRepository } from "./Repositories/personaRepository";
import { AutoRepository } from "./Repositories/AutoRepository";
import { mongoPersonaRepository } from "./Repositories/mongo/mongoPersonaRepository";

dotenv.config();

const url = process.env.DATABASE ||  'mongodb://127.0.0.1:27017/';
const dbName = process.env.DATABASE_NAME || 'devapp2025';
const bd : MongoClient = new MongoClient(url);

let baseDatos :Db;

export let personaRepo: PersonaRepository;
export let autoRepo: AutoRepository;

export const ConnectMemoryDB = () => {
    personaRepo = new memoryPersonaRepository;
    autoRepo = new memoryAutoRepository;
}

export async function ConnectMongoDB() {
        try {
        await bd.connect();
        console.log('Se conectó a MongoDB');
        baseDatos = bd.db(dbName);
        personaRepo = new mongoPersonaRepository(baseDatos);
        return baseDatos;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}