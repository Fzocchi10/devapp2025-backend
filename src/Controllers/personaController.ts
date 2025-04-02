import { Request, Response } from "express";
import { Persona } from "../Modelo/Persona";

export let personas: Persona[] = [];
export let idPersona=1;

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
    const id = Number(req.params.id);
    const persona = personas.find(p => p.id === id);

    if (persona) {
      res.status(200).json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
};

// Crear una nueva persona
export const postPersona = (req: Request, res: Response) => {
    const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;

    if (!nombre || !apellido || !dni || !fechaNacimiento || !genero || typeof donanteDeOrganos === 'undefined') {
      res.status(400).json({ error: 'Faltan datos necesarios o incorrectos en la solicitud' });
    } else {
      const nuevaPersona = {
        id: idPersona++,
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        genero,
        donanteDeOrganos,
        autos: []
      };

      personas.push(nuevaPersona);
      res.status(200).json({ id: nuevaPersona.id });
    }
};

// Actualizar una persona
export const putPersona = (req: Request, res: Response) => {
    const id = Number(req.params.id);
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
      res.status(201).json({ mensaje: 'Persona actualizada correctamente', persona: personas[personaIndex] });
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
};

// Eliminar una persona
export const deletePersona = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const personasFiltradas = personas.filter(p => p.id !== id);

    if (personasFiltradas.length === personas.length) {
      res.status(404).json({ error: 'La persona que quiere eliminar no ha sido encontrada' });
    } else {
      personas = personasFiltradas;
      res.status(200).json({ mensaje: 'Persona eliminada correctamente' });
    }
};
