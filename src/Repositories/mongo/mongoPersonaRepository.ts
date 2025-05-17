import { ConnectMongoDB } from "../../inyeccionBBDD";
import { Auto } from "../../Modelo/Auto";
import { Persona, PersonaResumen } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";
import { Collection, Db } from "mongodb";


export class mongoPersonaRepository implements PersonaRepository {
    private collectionPersona: Collection;
    private collectionAuto: Collection;

    constructor(db: Db) {
        this.collectionPersona = db.collection("personas");
        this.collectionAuto = db.collection("autos");
    }

    async getListar(): Promise<PersonaResumen[]> {
        const listaDePersonas = await this.collectionPersona.find().project({
            id: 1,
            nombre: 1,
            apellido: 1,
            dni: 1
        }).toArray(); // 👈 importante

        const personasResumen: PersonaResumen[] = listaDePersonas.map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            apellido: p.apellido,
            dni: p.dni
        }));

        return personasResumen;
    }
    
    getAutosById(id: string): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }
    addAuto(id: string, auto: Auto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Persona[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Persona | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
        throw new Error("Method not implemented.");
    }
    
    update(id: string, data: Partial<Persona>): Promise<Persona | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}