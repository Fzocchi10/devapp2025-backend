import mongoose, { Schema } from "mongoose";

const PersonaSchema = new Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, enum: ['Masculino', 'Femenino', 'No-Binario'], required: true },
  donanteDeOrganos: { type: Boolean, required: true }
});

export const PersonaModel = mongoose.model("Persona", PersonaSchema);
