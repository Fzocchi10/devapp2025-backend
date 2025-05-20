import { UUID } from "crypto";

export interface Auto {
    id: UUID,
    marca: string,
    modelo : string,
    anio: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    duenioId: UUID;
}

export type AutoResumen = {
    id: UUID,
    marca: string,
    modelo : string,
    anio: number,
    patente : string,
}