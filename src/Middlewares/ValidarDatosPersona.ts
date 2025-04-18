import { Request, Response, NextFunction } from "express";
import { Genero } from "../Modelo/Persona";

export const validarDatosPersona = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;

  const datosValidos =
    typeof nombre === 'string' &&
    typeof apellido === 'string' &&
    typeof dni === 'string' && dni.trim().length > 0 &&
    !isNaN(new Date(fechaNacimiento).getTime()) && new Date(fechaNacimiento) <= new Date() &&
    Object.values(Genero).includes(genero) &&
    typeof donanteDeOrganos === 'boolean';

  if (!datosValidos) {
    res.status(400).json({ error: 'Faltan datos o hay datos incorrectos' });
    return;
  }

  next();
};

export const validarDatosPersonaExistentes = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, dni, fechaNacimiento, genero, donanteDeOrganos } = req.body;

  const datosValidos =
    (nombre ? (typeof nombre === 'string') : true) &&
    (apellido ? (typeof apellido === 'string') : true) &&
    (dni ? (typeof dni === 'string' && dni.trim().length > 0) : true) &&
    (fechaNacimiento ? (!isNaN(new Date(fechaNacimiento).getTime()) && new Date(fechaNacimiento) <= new Date()) : true) &&
    (genero ? Object.values(Genero).includes(genero) : true) &&
    (donanteDeOrganos !== undefined ? typeof donanteDeOrganos === 'boolean' : true);

    if (!datosValidos) {
      res.status(400).json({ error: 'Faltan datos o hay datos incorrectos' });
      return;
    }

    next();
}
