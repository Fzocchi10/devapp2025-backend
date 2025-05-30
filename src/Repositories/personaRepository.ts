import { Persona, PersonaResumen } from "../Modelo/Persona";

export interface PersonaRepository {
  getAll(): Promise<Persona[]>;
  getListar():Promise<PersonaResumen[]>;
  getById(id: string): Promise<Persona | null>;
  create(data: Omit<Persona, "id" | "autos">): Promise<Persona>;
  update(id: string, data: Partial<Persona>): Promise<Persona | null>;
  delete(id: string): Promise<void>;
}
