import {Request, Response, NextFunction } from "express";

export const validarDatosAutos = (req: Request, res: Response, next: NextFunction) => {
    const { marca, modelo, anio, patente, color, numeroChasis, motor, duenioId } = req.body;

    const datosValidos =
    typeof marca == 'string' &&
        typeof modelo == 'string' &&
        typeof anio == 'number' &&
        typeof patente == 'string' &&
        typeof color == 'string' &&
        typeof numeroChasis == 'string' &&
        typeof motor == 'string' &&
        typeof duenioId == 'string'

    if (!datosValidos) {
        res.status(400).json({ error: 'Faltan datos necesarios o hay datos incorrectos en la solicitud' });
        return;
    }

    next();
}

export const validarDatosAutoExistentes = (req: Request,res: Response, next: NextFunction) => {
    const { marca, modelo, anio, patente, color, numeroChasis, motor, duenioId } = req.body;

    const datosValidos =
    (marca ? (typeof marca == 'string') : true) &&
    (modelo ? (typeof modelo == 'string') : true) &&
    (anio ? (typeof anio == 'number') : true) &&
    (patente ? (typeof patente == 'string') : true) &&
    (color ? (typeof color == 'string') : true) &&
    (numeroChasis ? (typeof numeroChasis == 'string') : true) &&
    (motor ? (typeof motor == 'string') : true) &&
    (duenioId ? (typeof duenioId == 'string') : true);

    if(!datosValidos){
        res.status(400).json({ error: 'Faltan datos o hay datos incorrectos'});
        return;
    }

    next();
}