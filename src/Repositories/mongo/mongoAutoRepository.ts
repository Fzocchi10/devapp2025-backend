import { Model } from "mongoose";
import { Auto, AutoResumen } from "../../Modelo/Auto";
import { AutoDocument } from "../../Modelo/AutoModel";
import { AutoRepository } from "../AutoRepository";
import { randomUUID, UUID } from "crypto";

export class mongoAutoRepository implements AutoRepository {
    private modelAuto: Model<AutoDocument>;

    constructor(modelAuto:Model<AutoDocument>){
        this.modelAuto = modelAuto;
    }

    async getListar(): Promise<AutoResumen[]> {
        const resultado = await this.modelAuto.find().select('id patente marca modelo anio').lean();
        return resultado;
    }

    getAll(): Promise<Auto[]> {
        return this.modelAuto.find()
    }

    async getById(id: string): Promise<Auto | null> {
        const auto = await this.modelAuto.findOne({ id }).lean();
        return auto;
    }

    async create(idDuenio: string, data: Omit<Auto, "id" | "duenioId">): Promise<Auto> {
        const autoId = randomUUID();

        const autoCompleto: Auto = {
            ...data,
            id: autoId,
            duenioId: idDuenio as UUID
        };

        await this.modelAuto.create(autoCompleto);
        return (autoCompleto);

    }

    async update(id: string, data: Partial<Auto>): Promise<Auto | null> {
        const autoActualizado = await this.modelAuto.findOneAndUpdate({id}, {$set: data}, { new: true });
        return autoActualizado;
    }

    async delete(id: string): Promise<void> {
        const duenioId = await this.modelAuto.findOne({id});
        await this.modelAuto.deleteOne({id});
    }

    async autosByIdDuenio(idDuenio: string): Promise<AutoResumen[]> {
        const autos = await this.modelAuto.find({ duenioId: idDuenio }).lean();
        return autos;
    }

    async deleteAutosByIdDuenio(idDuenio:string):Promise<void>{
        await this.modelAuto.deleteMany({ duenioId: idDuenio });
    }

}