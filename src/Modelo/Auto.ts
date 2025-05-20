import { UUID } from "crypto";

export interface Auto {
    id: string,
    marca: string,
    modelo : string,
    anio: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    duenioId: string;
}

export type AutoResumen = {
    id: string,
    marca: string,
    modelo : string,
    anio: number,
    patente : string,
}