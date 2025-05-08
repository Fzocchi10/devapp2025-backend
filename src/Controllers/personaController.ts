import { Request, Response } from "express";
import { personaService } from "../inyeccion";
import { Persona } from "../Modelo/Persona";



// Obtener todas las personas
export const getPersonas = async (req: Request, res: Response) => {
  const personas = await personaService.getAll();
  const listaDePersonas = personas.map(({ id, nombre, apellido, dni }) => ({
    id, nombre, apellido, dni
  }));
    res.status(200).json(listaDePersonas);
};

// Obtener una persona por ID
export const getPersona = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const persona = await personaService.getById(id);
  res.status(200).json(persona);
};

export const getAutosDeLaPersona = async (req: Request, res: Response): Promise<void> => {
  const persona = (req as any).persona as Persona;

  const autos = persona.autos;

  res.status(200).json(autos);
};

// Crear una nueva persona
export const postPersona = async (req: Request, res: Response) => {
  const data = req.body;
  const persona = await personaService.create(data);
  res.status(200).json(persona);
};

// Actualizar una persona
export const putPersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const persona = await personaService.update(id, data);

  res.status(200).json({ mensaje: "Persona actualizada"});
};

// Eliminar una persona
export const deletePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  const persona = await personaService.getById(id);
  await personaService.delete(id);
  res.status(200).json({ mensaje: "Persona eliminada correctamente" });
};
