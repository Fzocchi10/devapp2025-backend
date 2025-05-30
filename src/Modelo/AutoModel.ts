import mongoose, { Schema } from "mongoose";
import { Auto } from "./Auto";


export interface AutoDocument extends Auto, Document {}

const AutoSchema = new Schema({
  id: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true },
  patente: { type: String, required: true },
  color: { type: String, required: true },
  numeroChasis: { type: String, required: true },
  motor: { type: String, required: true },
  duenioId: { type: String, required: true }
})

export const AutoModel = mongoose.model<AutoDocument>("Auto", AutoSchema);
