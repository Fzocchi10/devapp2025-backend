import { Auto, AutoResumen } from "../Modelo/Auto";
import { AutoRepository } from "../Repositories/AutoRepository";

export class AutoService {
  private repository: AutoRepository;

  constructor(tipo: AutoRepository) {
    this.repository = tipo;
  }

  getAll():Promise<Auto[]> {
    return this.repository.getAll();
  }

  getLista():Promise<AutoResumen[]> {
    return this.repository.getListar();
  }

  getById(id:string):Promise<Auto | null>{
    return this.repository.getById(id);
  }
  create(idDuenio: string, data:Omit<Auto, "id" | "duenioId">): Promise<Auto> {
    return this.repository.create(idDuenio,data);
  }
  update(id: string, data: Partial<Auto>): Promise<Auto | null>{
    return this.repository.update(id,data);
  }
  delete(id:string): Promise<void>{
    return this.repository.delete(id);
  }

  autosByIdDuenio(id: string): Promise<Auto[]>{
      return this.repository.autosByIdDuenio(id);
  }

  deleteAutosByIdDuenio(idDuenio:string):Promise<void>{
    return this.repository.deleteAutosByIdDuenio(idDuenio);
  }

  setAutos(autos:Auto[]): Promise<void>{
    return this.repository.setAutos(autos);
  }

}