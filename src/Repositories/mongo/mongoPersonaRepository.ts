import { Persona } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";

export class mongoPersonaRepository implements PersonaRepository {
    getAll(): Promise<Persona[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Persona | null> {
        throw new Error("Method not implemented.");
    }
    create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<Persona>): Promise<Persona | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}