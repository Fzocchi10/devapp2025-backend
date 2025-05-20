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
            id: doc.id,
            marca: data.marca,
            modelo: data.modelo,
            patente: data.patente,
            anio: data.anio
            };
        });

        return autos;
    }

    async getById(id: string): Promise<Auto | null> {
        const auto = await this.colleccion.doc(id).get();

        if (!auto.exists) {
            return null;
        }

        const data = auto.data();

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
        const nuevoAuto = await this.colleccion.add(data);

        return {
            id: nuevoAuto.id,
            ...data,
            duenioId: idDuenio
        };
    }

    async update(id: string, data: Partial<Auto>): Promise<Auto | null> {
        const auto = await this.colleccion.doc(id);
        const datosAuto = await auto.get();

        await auto.update(data);

        const actualizarAuto = await auto.get();
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
        const auto = await this.colleccion.doc(id);
        await auto.delete();
    }
    setAutos(autos: Auto[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    autosByIdDuenio(idDuenio: string): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }
    deleteAutosByIdDuenio(idDuenio: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}