import { Request, Response } from "express";
import { Auto } from "../Modelo/Auto";
import { personas } from "../Controllers/personaController";
import { Persona } from "../Modelo/Persona";

export let autos: Auto[] = [];
export let idAuto = 1;

// Obtener todos los autos
export const getAutos = (req: Request, res: Response) => {
    const listaDeAutos = autos.map(auto => ({
        id: auto.id,
        marca: auto.marca,
        modelo: auto.modelo,
        año: auto.año,
        patente: auto.patente,
    }));
    res.status(200).json(listaDeAutos);
};

// Obtener un auto por ID
export const getAuto = (req: Request, res: Response) => {
    const auto = (req as any).auto as Auto;
    const dueñoExistente = (req as any).persona as Persona;

    res.status(200).json(
    {
        "marca": auto.marca,
        "modelo": auto.modelo,
        "patente": auto.patente,
        "año": auto.año,
        "color": auto.color,
        "motor": auto.motor,
        "numeroChasis": auto.numeroChasis,
        "dueño": dueñoExistente.apellido + " " + dueñoExistente.nombre
    });
};

// Crear un nuevo auto
export const postAuto = (req: Request, res: Response) => {
    const { marca, modelo, año, patente, color, numeroChasis, motor, dueñoId } = req.body;
    const dueñoExistente = personas.find(p => p.id === dueñoId);

    if (!dueñoExistente) {
        res.status(404).json({ error: 'El dueño con el ID proporcionado no existe' });
    } else {
        const nuevoAuto = {
            id: idAuto++,
            marca,
            modelo,
            año,
            patente,
            color,
            numeroChasis,
            motor,
            dueñoId
        };

        autos.push(nuevoAuto);
        dueñoExistente.autos = dueñoExistente.autos || [];
        dueñoExistente.autos.push(nuevoAuto);

        res.status(200).json({ id: nuevoAuto.id });

    }
};

// Actualizar un auto
export const putAuto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { marca, modelo, año, patente, color, numeroChasis, motor } = req.body;
    const autoIndex = autos.findIndex(a => a.id === id);

    if (autoIndex !== -1){
        const autoAct = autos[autoIndex];
        autos[autoIndex] = {
            ...autoAct,
            marca: marca ?? autoAct.marca,
            modelo: modelo ?? autoAct.modelo,
            año: año ?? autoAct.año,
            patente: patente ?? autoAct.patente,
            color: color ?? autoAct.color,
            numeroChasis: numeroChasis ?? autoAct.numeroChasis,
            motor: motor ?? autoAct.motor,
        };
        res.status(200).json({ mensaje: 'Auto actualizado correctamente', auto: autos[autoIndex].id });
    } else {
        res.status(404).json({ error: 'Auto no encontrado' });
    }
};

// Eliminar un auto
export const deleteAuto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const autosFiltrados = autos.filter(a => a.id !== id);
    const persona = personas.find(p => p.autos.some(auto => auto.id === id));

    if (autosFiltrados.length === autos.length || !persona) {
        res.status(404).json({ error: 'El auto que quiere eliminar no ha sido encontrado' });
    } else {
        autos = autosFiltrados;
        persona.autos = persona.autos.filter(auto => auto.id !== id);
        res.status(200).json({ mensaje: 'Auto eliminado correctamente' });
    }
};

