import { Request, Response, NextFunction } from "express";
import { personas } from "../Controllers/personaController";

export const verificarPersonaExiste = (req: Request, res: Response, next: NextFunction): void => {
    const id = Number(req.params.id);
    const persona = personas.find(p => p.id === id);

    if (!persona) {
      res.status(404).json({ error: 'Persona no encontrada' });
      return;
    }

    (req as any).persona = persona;
    next();
  };