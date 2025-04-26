import { Request, Response } from "express";
import { Persona } from "../Modelo/Persona";
import { autos } from "./autoController";
import { randomUUID, UUID } from "crypto";

export let personas: Persona[] = [];

// Obtener todas las personas
export const getPersonas = (req: Request, res: Response) => {
    const listaDePersonas = personas.map(persona => ({
        id: persona.id,
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido
    }));
    res.status(200).json(listaDePersonas);
};

// Obtener una persona por ID
export const getPersona = (req: Request, res: Response) => {
    const persona = (req as any).persona;
    res.status(200).json(persona);
};

export const getAutosDeLaPersona = (req: Request, res: Response) => {
  const persona = (req as any).persona as Persona;

  const autos = persona.autos.map(auto => ({
    id: auto.id,
    patente: auto.patente,
    marca: auto.marca,
    modelo: auto.modelo,
    año: auto.año
}));

  res.status(200).json(autos);
};

// Crear una nueva persona
export const postPersona = (req: Request, res: Response) => {
  const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;

  const nuevaPersona = {
    id: randomUUID(),
    nombre,
    apellido,
    dni,
    fechaNacimiento: new Date(fechaNacimiento),
    genero,
    donanteDeOrganos,
    autos: []
  };

    personas.push(nuevaPersona);
    res.status(200).json({ id: nuevaPersona.id });
}

// Actualizar una persona
export const putPersona = (req: Request, res: Response) => {
    const id = req.params.id as UUID;
    const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;

    const personaIndex = personas.findIndex(p => p.id === id);

    if (personaIndex !== -1) {
      const personaAct = personas[personaIndex];
      personas[personaIndex] = {
        ...personaAct,
        nombre: nombre ?? personaAct.nombre,
        apellido: apellido ?? personaAct.apellido,
        dni: dni ?? personaAct.dni,
        fechaNacimiento: fechaNacimiento ?? personaAct.fechaNacimiento,
        genero: genero ?? personaAct.genero,
        donanteDeOrganos: donanteDeOrganos ?? personaAct.donanteDeOrganos,
      };
      res.status(201).json({ mensaje: 'Persona actualizada correctamente', persona: personas[personaIndex].id, fecha : typeof fechaNacimiento });
  }
};

// Eliminar una persona
export const deletePersona = (req: Request, res: Response) => {
    const persona = (req as any).persona as Persona;
    const personasFiltradas = personas.filter(p => p.id !== persona.id);
    const autosFiltrados = autos.filter(a => a.dueñoId !== persona.id);

    autos.length = 0;
    autos.push(...autosFiltrados);
    personas = personasFiltradas;
    res.status(200).json({ mensaje: 'Persona eliminada correctamente' });
};
