import { Auto } from "./Auto"
import { UUID } from "crypto"

export enum Genero {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    NoBinario = 'No-Binario'
}

export interface Persona {
    id: string,
    nombre : string,
    apellido : string,
    dni : string,
    fechaNacimiento: Date,
    genero: Genero
    donanteDeOrganos: boolean,
    autos: string[]
}

export type PersonaResumen = {
    id:string,
    nombre: string;
    apellido: string;
    dni: string;
}
