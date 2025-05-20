import { Auto } from "../../Modelo/Auto";
import admin from 'firebase-admin';
import { Persona, PersonaResumen } from "../../Modelo/Persona";
import { PersonaRepository } from "../personaRepository";

export class fbPersonaRepository implements PersonaRepository{
    private colleccion;

    constructor() {
        const db = admin.firestore();
        this.colleccion = db.collection('personas');
    }

    getAll(): Promise<Persona[]> {
        throw new Error("Method not implemented.");
    }

    async getListar(): Promise<PersonaResumen[]> {
        const listaDeDocumentos = await this.colleccion.get();

        const personas: PersonaResumen[] = listaDeDocumentos.docs.map(doc => {
            const data = doc.data();

            return {
            id: doc.id,
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni
            };
        });

        return personas;
    }

    async getById(id: string): Promise<Persona | null> {
        const persona = await this.colleccion.doc(id).get();

        if (!persona.exists) {
            return null;
        }

        const data = persona.data();

        return {
            id: data?.id,
            nombre: data?.nombre,
            apellido: data?.apellido,
            dni: data?.dni,
            fechaNacimiento: data?.fechaNacimiento,
            genero: data?.genero,
            donanteDeOrganos: data?.donanteDeOrganos,
            autos: data?.autos
        };
    }

    async create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
        const nuevaPersona = await this.colleccion.add(data);

        return {
            id: nuevaPersona.id,
            ...data,
            autos: []
        };
    }

    async update(id: string, data: Partial<Persona>): Promise<Persona | null> {
        const persona = await this.colleccion.doc(id);
        const datosPersona = await persona.get();

        await persona.update(data);

        const actualizarPersona = await persona.get();
        const actualizarDatos = actualizarPersona.data();

        return {
            id: actualizarPersona?.id,
            nombre: actualizarDatos?.nombre,
            apellido: actualizarDatos?.apellido,
            dni: actualizarDatos?.dni,
            fechaNacimiento: actualizarDatos?.fechaNacimiento,
            genero: actualizarDatos?.genero,
            donanteDeOrganos: actualizarDatos?.donanteDeOrganos,
            autos: actualizarDatos?.autos
        }
    }

    async delete(id: string): Promise<void> {
        const persona = await this.colleccion.doc(id);
        await persona.delete();
    }

    addAuto(id: string, auto: Auto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteAuto(id: string, idDuenio: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAutosById(id: string): Promise<Auto[]> {
        throw new Error("Method not implemented.");
    }
}