import { Auto, AutoResumen } from "../Modelo/Auto";
import { AutoRepository } from "../Repositories/AutoRepository";
import { memoryAutoRepository } from "../Repositories/memory/memoryAutoRepository";
import { mongoAutoRepository } from "../Repositories/mongo/mongoAutoRepository";

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

  setAutos(autos:Auto[]): Promise<void>{
    return this.repository.setAutos(autos);
  }

}