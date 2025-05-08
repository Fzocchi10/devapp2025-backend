import { Request, Response } from "express";
import { Auto } from "../Modelo/Auto";
import { randomUUID, UUID } from "crypto";
import { autosService } from "../inyeccion";


// Obtener todos los autos
export const getAutos = (req: Request, res: Response) => {
    const listaDeAutos = autosService.getAll();
    res.status(200).json(listaDeAutos);
};

// Obtener un auto por ID
export const getAuto = (req: Request, res: Response) => {
    const auto = (req as any).auto as Auto;
    res.status(200).json(
    {
        "marca": auto.marca,
        "modelo": auto.modelo,
        "patente": auto.patente,
        "año": auto.año,
        "color": auto.color,
        "motor": auto.motor,
        "numeroChasis": auto.numeroChasis,
    });
};

// Crear un nuevo auto
export const postAuto = (req: Request, res: Response) => {
    const data = req.body;
    const dueñoExistente = (req as any).dueño;
    
    const nuevoAuto = autosService.create(dueñoExistente.id,data);
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
};

