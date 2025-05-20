import { Request, Response } from "express";
import { Auto } from "../Modelo/Auto";
import { UUID } from "crypto";
import { autosService, personaService } from "../server";
import { Persona } from "../Modelo/Persona";


// Obtener todos los autos
export const getAutos = async (req: Request, res: Response) => {
    const listaDeAutos = await autosService.getLista();
    res.status(200).json(listaDeAutos);
};

// Obtener un auto por ID
export const getAuto = async (req: Request, res: Response): Promise<void> => {
    const { id }  = req.params;
    const auto = await autosService.getById(id) as Auto;
    const persona = await personaService.getById(auto.duenioId) as Persona;
    res.status(200).json({
        "marca":auto.marca,
        "modelo": auto.modelo,
        "patente": auto.patente,
        "anio": auto.anio,
        "color": auto.color,
        "motor": auto.motor,
        "numeroChasis": auto.numeroChasis,
        "duenio": persona?.apellido + " " + persona?.nombre
    });
};

// Crear un nuevo auto
export const postAuto = async (req: Request, res: Response) => {
    const data = req.body;
    const duenioExistente = (req as any).duenio as Persona;

    const nuevoAuto = await autosService.create(duenioExistente.id,data);
    res.status(200).json({ id: nuevoAuto });
};

// Actualizar un auto
export const putAuto = (req: Request, res: Response) => {
    const id = (req.params.id) as UUID;
    const data = req.body;

    autosService.update(id,data);
    res.status(200).json({ mensaje: 'Auto actualizado correctamente'});
};

// Eliminar un auto
export const deleteAuto = (req: Request, res: Response) => {
    const id = req.params.id as UUID;
    autosService.delete(id);
    res.status(200).json({ mensaje: 'Auto eliminado correctamente'});
};

