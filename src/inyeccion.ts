import { AutoService } from "./Services/autoService";
import { PersonaService } from "./Services/personaService";

export const personaService = new PersonaService("memory");
export const autosService = new AutoService("memory");