import { PersonaRepository } from "../Repositories/personaRepository";
import { Persona } from "../Modelo/Persona";
import { mongoPersonaRepository } from "../Repositories/mongo/mongoPersonaRepository";
import { memoryPersonaRepository } from "../Repositories/memory/memoryPersonaRepository";

export class PersonaService {
  private repository: PersonaRepository;

  constructor(tipo: "memory" | "mongo") {
    this.repository =
      tipo === "mongo" ? new mongoPersonaRepository() : new memoryPersonaRepository();
  }

  getAll(): Promise<Persona[]> {
    return this.repository.getAll();
  }

  getById(id: string): Promise<Persona | null> {
    return this.repository.getById(id);
  }

  create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
    return this.repository.create(data);
  }

  update(id: string, data: Partial<Persona>): Promise<Persona | null> {
    return this.repository.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
