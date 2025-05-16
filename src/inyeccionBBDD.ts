import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { memoryPersonaRepository } from "./Repositories/memory/memoryPersonaRepository";
import { memoryAutoRepository } from "./Repositories/memory/memoryAutoRepository";
import { PersonaRepository } from "./Repositories/personaRepository";
import { AutoRepository } from "./Repositories/AutoRepository";

dotenv.config();

export let personaRepo: PersonaRepository;
export let autoRepo: AutoRepository;

export const ConnectMemoryDB = () => {
    personaRepo = new memoryPersonaRepository;
    autoRepo = new memoryAutoRepository;
}

export const ConnectMongoDB = () => {
    const url = process.env.DATABASE!;
    const client = new MongoClient(url);
    const dbName = process.env.DATABASE_NAME;

    async function main() {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        //personaRepo = new mongoPersonaRepository();
        //autoRepo = new mongoAutoRepository();
        return 'done.';
    }
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
}