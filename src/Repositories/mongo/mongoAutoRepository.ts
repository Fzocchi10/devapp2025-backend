import { Auto, AutoResumen } from "../../Modelo/Auto";
import { AutoRepository } from "../AutoRepository";

export class mongoAutoRepository implements AutoRepository {
    getListar(): Promise<AutoResumen[]> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Auto | null> {
        throw new Error("Method not implemented.");
    }
    create(idDuenio: string, data: Omit<Auto, "id">): Promise<Auto> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<Auto>): Promise<Auto | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setAutos(autos:Auto[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}