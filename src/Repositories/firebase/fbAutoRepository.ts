import { randomUUID } from "crypto";
import { Auto, AutoResumen } from "../../Modelo/Auto";
import { AutoRepository } from "../AutoRepository";
import admin from 'firebase-admin';


export class fbAutoRepository implements AutoRepository{
    private colleccion;

    constructor() {
        const db = admin.firestore();
        this.colleccion = db.collection('autos');
    }

    getAll(): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }

    async getListar(): Promise<AutoResumen[]> {
        const listaDeDocumentos = await this.colleccion.get();

        const autos: AutoResumen[] = listaDeDocumentos.docs.map(doc => {
            const data = doc.data();

            return {
            _id: doc.id,
            id: data.id,
            marca: data.marca,
            modelo: data.modelo,
            patente: data.patente,
            anio: data.anio
            };
        });

        return autos;
    }

    async getById(id: string): Promise<Auto | null> {
        const auto = await this.colleccion.where('id', '==', id).get();

        const doc = auto.docs[0];
        const data = doc.data();

        return {
            id: data?.id,
            marca: data?.marca,
            modelo : data?.modelo,
            anio: data?.anio,
            patente : data?.patente,
            color: data?.color,
            numeroChasis: data?.numeroChasis,
            motor: data?.motor,
            duenioId: data?.duenioId
        };
    }


    async create(idDuenio: string, data: Omit<Auto, "id" | "duenioId">): Promise<Auto> {
        const nuevoAuto:Auto = {
            id: randomUUID(),
            ...data,
            duenioId: idDuenio
        };
        await this.colleccion.add(nuevoAuto);

        return nuevoAuto;
    }

    async update(id: string, data: Partial<Auto>): Promise<Auto | null> {
        const auto = await this.colleccion.where('id', '==', id).get();
        const autoRef =  auto.docs[0].ref;

        await autoRef.update(data);

        const actualizarAuto = await autoRef.get();
        const actualizarDatos = actualizarAuto.data();

        return {
            id: actualizarAuto?.id,
            marca: actualizarDatos?.marca,
            modelo : actualizarDatos?.modelo,
            anio: actualizarDatos?.anio,
            patente : actualizarDatos?.patente,
            color: actualizarDatos?.color,
            numeroChasis: actualizarDatos?.numeroChasis,
            motor: actualizarDatos?.motor,
            duenioId: actualizarDatos?.duenioId
        }
    }
    async delete(id: string): Promise<void> {
        const auto = await this.colleccion.where('id', '==', id).get();
        const autoRef = auto.docs[0].ref;
        await autoRef.delete();
    }

    async autosByIdDuenio(idDuenio: string): Promise<AutoResumen[]> {
       const listaDeAutos =  await this.colleccion.where('duenioId', '==', idDuenio).get();

       if(!listaDeAutos){
            throw new Error("No se encontraron autos");
       }

       const autosByIdDuenio = listaDeAutos.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                marca: data.marca,
                modelo: data.modelo,
                patente: data.patente,
                anio: data.anio
            };
       });
       return autosByIdDuenio;

    }
    deleteAutosByIdDuenio(idDuenio: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}