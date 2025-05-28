import {autosService} from "../../server"
import { AutoResumen } from "../../Modelo/Auto";
import { Genero, Persona, PersonaResumen } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";
import { randomUUID } from "crypto";


const personasEnMemoria: Persona[] = [
  {
      id: "8933ce78-e5e0-42f1-bd6e-1cdff13a5950",
      nombre : "Franco",
      apellido : "Zocchi",
      dni : "40495238",
      fechaNacimiento: new Date("1997-09-16"),
      genero: Genero.Masculino,
      donanteDeOrganos: true,
      autos: []
  }
];

export class memoryPersonaRepository implements PersonaRepository {
  async getAutosById(id: string): Promise<AutoResumen[]> {
    const autos = await autosService.autosByIdDuenio(id);
    return autos;
  }

  async getListar(): Promise<PersonaResumen[]>{
    const listaDePersonas = personasEnMemoria.map(({ id, nombre, apellido, dni }) => ({
      id, nombre, apellido, dni
    }));
    return listaDePersonas;
  }

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
    await autosService.deleteAutosByIdDuenio(id);
    const index = personasEnMemoria.findIndex(p => p.id === id);

    if (index === -1) {
      throw new Error("Persona no encontrada");
    }
    const persona = personasEnMemoria[index];
    await this.getAutosById(persona.id);

    personasEnMemoria.splice(index, 1);

  }
}
