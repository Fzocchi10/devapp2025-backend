import { randomUUID, UUID } from "crypto";
import { Auto } from "../../Modelo/Auto";
import { AutoRepository } from "../AutoRepository";
import { personaService } from "../../inyeccion";

let autosEnMemoria: Auto[] = [];

export class memoryAutoRepository implements AutoRepository{
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
        const auto = autosEnMemoria.find(a => a.id === id);
        autosEnMemoria = autosEnMemoria.filter(a => a.id !== id);

    }

}