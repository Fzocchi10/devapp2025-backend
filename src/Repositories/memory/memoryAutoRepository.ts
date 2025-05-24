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
        personaService.addAuto(idDuenio, nuevoAuto.id);
        autosEnMemoria.push(nuevoAuto);
        return nuevoAuto;
    }
    async update(id: string, data: Partial<Auto>): Promise<Auto | null> {
        const index = autosEnMemoria.findIndex(a => a.id === id);
        if (index === -1) return null;

        autosEnMemoria[index] = {
            ...autosEnMemoria[index],
            ...data
        };
        return autosEnMemoria[index];
    }

    async delete(id: string): Promise<void> {
        const auto = await autosEnMemoria.find(a => a.id === id);
        if (!auto) {
            throw new Error('Auto no existe');
        }
        const persona = await personaService.getById(auto.duenioId) as Persona;
        autosEnMemoria = autosEnMemoria.filter(a => a.id !== id);
        persona.autos = persona.autos.filter(a => a !== id);
        await personaService.update(persona.id,persona)
    }

    async autosByIdDuenio(idDuenio: string): Promise<AutoResumen[]> {
        return autosEnMemoria
        .filter(a => a.duenioId === idDuenio)
        .map(a => ({
            id: a.id,
            marca: a.marca,
            modelo: a.modelo,
            anio: a.anio,
            patente: a.patente
        }));
    }
    async setAutos(autos: Auto[]): Promise<void> {
        autosEnMemoria = autos;
    }

    deleteAutosByIdDuenio(idDuenio: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}