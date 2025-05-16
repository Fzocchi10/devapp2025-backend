import { randomUUID, UUID } from "crypto";
import { Auto, AutoResumen } from "../../Modelo/Auto";
import { AutoRepository } from "../AutoRepository";
import { personaService } from "../../server";
import { Persona } from "../../Modelo/Persona";

let autosEnMemoria: Auto[] = [];

export class memoryAutoRepository implements AutoRepository{
    
    async getListar(): Promise<AutoResumen[]> {
        const autos = await this.getAll();
        const listaDeAutos = autos.map(({ id, patente, marca,modelo,anio }) => ({
        id, patente, marca,modelo,anio
      }));
        return listaDeAutos;
    }

    async getAll(): Promise<Auto[]> {
        return autosEnMemoria;
    }
    async getById(id: string): Promise<Auto | null> {
        const auto = autosEnMemoria.find(auto => auto.id === id);
        return auto || null;
    }
    async create(idDuenio: UUID, data: Omit<Auto, "id" | "duenioId">): Promise<Auto> {
        const nuevoAuto: Auto = {
            ...data,
            id: randomUUID(),
            duenioId: idDuenio
        }
        personaService.addAuto(idDuenio, nuevoAuto);
        autosEnMemoria.push(nuevoAuto);
        return nuevoAuto;
    }
    async update(id: string, data: Partial<Auto>): Promise<Auto | null> {
        const index = autosEnMemoria.findIndex(a => a.id === id);
        const personas = await personaService.getAll();
        if (index === -1) return null;

        autosEnMemoria[index] = {
            ...autosEnMemoria[index],
            ...data
        };

        for (const persona of personas) {
            const autoIndex = persona.autos.findIndex(a => a.id === id);
            if (autoIndex !== -1) {
                persona.autos[autoIndex] = autosEnMemoria[index];
            }
        }

        return autosEnMemoria[index];

    }

    async delete(id: string): Promise<void> {
        const auto = await autosEnMemoria.find(a => a.id === id);
        if (!auto) {
            throw new Error('Auto no existe');
        }
        const persona = await personaService.getById(auto.duenioId) as Persona;
        autosEnMemoria = autosEnMemoria.filter(a => a.id !== id);
        persona.autos = persona.autos.filter(a => a.id !== id);
        await personaService.update(persona.id,persona)
    }

    async setAutos(autos: Auto[]): Promise<void> {
        autosEnMemoria = autos;
    }
}