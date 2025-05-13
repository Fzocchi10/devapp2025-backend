import { AutoService } from "./Services/autoService";
import { PersonaService } from "./Services/personaService";

export const personaService = new PersonaService("mongo");
export const autosService = new AutoService("mongo");