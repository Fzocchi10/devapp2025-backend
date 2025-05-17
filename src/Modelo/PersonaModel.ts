import mongoose, { Schema } from "mongoose";
import { Persona } from "./Persona";

export interface PersonaDocument extends Persona, Document {}

const PersonaSchema = new Schema<PersonaDocument>({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, enum: ['Masculino', 'Femenino', 'No-Binario'], required: true },
  donanteDeOrganos: { type: Boolean, required: true },
  autos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Auto" }]
});



export const PersonaModel = mongoose.model<PersonaDocument>("Persona", PersonaSchema);
