import { Auto } from "../../Modelo/Auto";
import { Persona, PersonaResumen } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";


export class mongoPersonaRepository implements PersonaRepository {
    getListar(): Promise<PersonaResumen[]> {
        throw new Error("Method not implemented.");
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