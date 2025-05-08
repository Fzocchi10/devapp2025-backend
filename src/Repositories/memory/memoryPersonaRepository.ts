import { Persona } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";
import { randomUUID } from "crypto";

const personasEnMemoria: Persona[] = [];

export class memoryPersonaRepository implements PersonaRepository {
  
  async getAll(): Promise<Persona[]> {
    return personasEnMemoria;
  }

  async getById(id: string): Promise<Persona | null> {
    const persona = personasEnMemoria.find(p => p.id === id);
    return persona || null;
  }

  async create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
    const nuevaPersona: Persona = {
      ...data,
      id: randomUUID(),
      autos: []
    };
    personasEnMemoria.push(nuevaPersona);
    return nuevaPersona;
  }

  async update(id: string, data: Partial<Persona>): Promise<Persona | null> {
    const index = personasEnMemoria.findIndex(p => p.id === id);
    if (index === -1) return null;

    const personaActual = personasEnMemoria[index];
    const personaActualizada = { ...personaActual, ...data };
    personasEnMemoria[index] = personaActualizada;
    return personaActualizada;
  }

  async delete(id: string): Promise<void> {
    const index = personasEnMemoria.findIndex(p => p.id === id);
    if (index !== -1) {
      personasEnMemoria.splice(index, 1);
    }
  }
}
