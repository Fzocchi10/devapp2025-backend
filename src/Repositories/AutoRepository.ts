import { Auto, AutoResumen } from "../Modelo/Auto";

export interface AutoRepository {
  getAll(): Promise<Auto[]>;
  getListar(): Promise<AutoResumen[]>
  getById(id: string): Promise<Auto | null>;
  create(idDuenio: string, data: Omit<Auto, "id" | "duenioId">): Promise<Auto>;
  update(id: string, data: Partial<Auto>): Promise<Auto | null>;
  delete(id: string): Promise<void>;
  autosByIdDuenio(idDuenio: string): Promise<AutoResumen[]>;
  deleteAutosByIdDuenio(idDuenio: string): Promise<void>;
}