import { Request, Response } from "express";
import { Auto } from "../Modelo/Auto";
import { personas } from "../Controllers/personaController";

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
        color: auto.color,
        motor: auto.motor,
        numeroChasis: auto.numeroChasis,
    }));
    res.status(200).json(listaDeAutos);
};

// Obtener un auto por ID
export const getAuto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const auto = autos.find(a => a.id === id);

    if (auto) {
        res.status(200).json(auto);
    } else {
        res.status(404).json({ error: 'Auto no encontrado' });
    }
};

// Crear un nuevo auto
export const postAuto = (req: Request, res: Response) => {
    const { marca, modelo, año, patente, color, numeroChasis, motor, dueñoId } = req.body;

    if (!marca || !modelo || !año || !patente || !color || !numeroChasis || !motor || !dueñoId) {
        res.status(400).json({ error: 'Faltan datos necesarios o incorrectos en la solicitud' });
        return;
    }
    const dueñoExistente = personas.find(p => p.id === dueñoId);

    if (!dueñoExistente) {
        res.status(404).json({ error: 'El dueño con el ID proporcionado no existe' });
        return;
    }

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
};

// Actualizar un auto
export const putAuto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { marca, modelo, año, patente, color, numeroChasis, motor } = req.body;

    const autoIndex = autos.findIndex(a => a.id === id);

    if (autoIndex !== -1) {
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
        res.status(200).json({ mensaje: 'Auto actualizado correctamente', auto: autos[autoIndex] });
    } else {
        res.status(404).json({ error: 'Auto no encontrado' });
    }
};

// Eliminar un auto
export const deleteAuto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const autosFiltrados = autos.filter(a => a.id !== id);
    const persona = personas.find(p => p.autos.some(auto => auto.id === id));

    if (persona) {
        persona.autos = persona.autos.filter(auto => auto.id !== id);
    }

    if (autosFiltrados.length === autos.length) {
        res.status(404).json({ error: 'El auto que quiere eliminar no ha sido encontrado' });
    } else {
        autos = autosFiltrados;
        res.status(200).json({ mensaje: 'Auto eliminado correctamente' });
    }
};
