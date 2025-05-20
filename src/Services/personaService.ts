import { PersonaRepository } from "../Repositories/personaRepository";
import { Persona, PersonaResumen } from "../Modelo/Persona";
import { Auto } from "../Modelo/Auto";

export class PersonaService {

  private repository: PersonaRepository;

  constructor(tipo: PersonaRepository) {
    this.repository = tipo;
  }

  getAll(): Promise<Persona[]> {
    return this.repository.getAll();
  }

  getLista(): Promise<PersonaResumen[]>{
    return this.repository.getListar();
  }

  getById(id: string): Promise<Persona | null> {
    return this.repository.getById(id);
  }

  create(data: Omit<Persona, "id" | "autos">): Promise<Persona> {
    return this.repository.create(data);
  }

  update(id: string, data: Partial<Persona>): Promise<Persona | null> {
    return this.repository.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  addAuto(id:string, auto: Auto): Promise<void>{
    return this.repository.addAuto(id,auto);
  }

  autosById(id:string): Promise<Auto[]>{
    return this.repository.getAutosById(id);
  }

  deleteAuto(id:string, idDuenio:string):Promise<void>{
    return this.repository.deleteAuto(id,idDuenio);
  }
}
