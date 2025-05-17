import { randomUUID } from "crypto";
import { Auto } from "../../Modelo/Auto";
import { Persona, PersonaResumen } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";
import { PersonaDocument } from "../../Modelo/PersonaModel";
import { Model } from "mongoose";


export class mongoPersonaRepository implements PersonaRepository {
    private modelPersona: Model<PersonaDocument>;

    constructor(modelPersona:Model<PersonaDocument>) {
        this.modelPersona = modelPersona;
    }

    async getListar(): Promise<PersonaResumen[]> {
        const resultado = await this.modelPersona.find().select('id nombre apellido dni').lean();
        return resultado;
    }

    async getAutosById(id: string): Promise<Auto[]> {
        const persona = await this.modelPersona.findOne({ id }).lean();
        return persona?.autos || [];
    }

    async addAuto(id: string, auto: Auto): Promise<void> {
        await this.modelPersona.updateOne(
            { id },
            { $push: { autos: auto } }
        );
    }

    async getAll(): Promise<Persona[]> {
        return this.modelPersona.find().lean();
    }

    getById(id: string): Promise<Persona | null> {
        return this.modelPersona.findOne({ id }).lean();
    }

    async create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
        const personaCompleta: Persona = {
        ...data,
        id: randomUUID(),
        autos: []
    };
        const user = new this.modelPersona(personaCompleta);
        return (await user.save()).toObject();
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
    }
}