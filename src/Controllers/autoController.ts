import { Request, Response } from "express";
import { Auto } from "../Modelo/Auto";
import { UUID } from "crypto";
import { autosService, personaService } from "../inyeccion";
import { Persona } from "../Modelo/Persona";


// Obtener todos los autos
export const getAutos = async (req: Request, res: Response) => {
    const autos = await autosService.getAll();
    const listaDeAutos = autos.map(({ id, patente, marca,modelo,año }) => ({
        id, patente, marca,modelo,año
      }));
    res.status(200).json(listaDeAutos);
};

// Obtener un auto por ID
export const getAuto = async (req: Request, res: Response): Promise<void> => {
    const { id }  = req.params;
    const auto = await autosService.getById(id) as Auto;
    let dueñoId = auto.id as string
    const persona = await personaService.getById(dueñoId) as Persona;
    res.status(200).json({
        "modelo": auto.modelo,
        "patente": auto.patente,
        "año": auto.año,
        "color": auto.color,
        "motor": auto.motor,
        "numeroChasis": auto.numeroChasis,
        "dueño": persona?.apellido + " " + persona?.nombre
    });
};

// Crear un nuevo auto
export const postAuto = async (req: Request, res: Response) => {
    const data = req.body;
    const dueñoExistente = (req as any).dueño;
    const idDuenio = dueñoExistente.id as string;

    const nuevoAuto = await autosService.create(idDuenio,data);
    personaService.addAuto(idDuenio, nuevoAuto);
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

