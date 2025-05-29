import { randomUUID} from "crypto";
import { AutoResumen } from "../../Modelo/Auto";
import { Persona, PersonaResumen } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";
import { PersonaDocument } from "../../Modelo/PersonaModel";
import { Model } from "mongoose";
import { autosService } from "../../server";


export class mongoPersonaRepository implements PersonaRepository {
    private modelPersona: Model<PersonaDocument>;

    constructor(modelPersona:Model<PersonaDocument>) {
        this.modelPersona = modelPersona;
    }

    async getListar(): Promise<PersonaResumen[]> {
        const resultado = await this.modelPersona.find().select('id nombre apellido dni').lean();
        return resultado;
    }

    async getAutosById(id: string): Promise<AutoResumen[]> {
        const autos = await autosService.autosByIdDuenio(id);
        return autos;
    }

    async getAll(): Promise<Persona[]> {
        return this.modelPersona.find().lean();
    }

    async getById(id: string): Promise<Persona | null> {
        return await this.modelPersona.findOne({ id }).lean();
    }

    async create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
        const personaCompleta: Persona = {
        ...data,
        id: randomUUID(),
        autos: []
        };
        const persona = new this.modelPersona(personaCompleta);
        return (await persona.save()).toObject();
    }

    async update(id: string, data: Partial<Persona>): Promise<Persona | null> {
        const resultado = await this.modelPersona.findOneAndUpdate(
            { id },
            { $set: data },
            { new: true }
        ).lean();

        return resultado;
    }

    async delete(id: string): Promise<void> {
        await this.modelPersona.deleteOne({ id });
        await autosService.deleteAutosByIdDuenio(id);
    }
}