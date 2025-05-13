import { Auto } from "../../Modelo/Auto";
import { Persona } from "../../Modelo/Persona";
import { PersonaModel } from "../../Modelo/PersonaModel";
import { PersonaRepository } from "../personaRepository";

export class mongoPersonaRepository implements PersonaRepository {
    getAutosById(id: string): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }
    addAuto(id: string, auto: Auto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Persona[]> {
        const personas = await PersonaModel.find();
        return personas;
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