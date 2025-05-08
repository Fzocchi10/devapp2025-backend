import { Request, Response, NextFunction } from "express";
import { personaService } from "../inyeccion";
import { UUID } from "crypto";

export const verificarPersonaExiste = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id as UUID;
    const persona = personaService.getById(id);

    if (!persona) {
      res.status(404).json({ error: 'Persona no encontrada' });
      return;
    }

    (req as any).persona = persona;
    next();
  };