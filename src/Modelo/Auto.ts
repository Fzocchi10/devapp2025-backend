import { UUID } from "crypto";

export interface Auto {
    id: UUID,
    marca: string,
    modelo : string,
    año: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    dueñoId: UUID;
}