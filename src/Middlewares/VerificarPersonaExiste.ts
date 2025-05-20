import { Request, Response, NextFunction } from "express";
import { personaService } from "../server";
import { UUID } from "crypto";

export const verificarPersonaExiste = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id as UUID;
    const persona = await personaService.getById(id);

    if (!persona) {
      res.status(404).json({ error: 'Persona no encontrada' });
      return;
    }

    (req as any).persona = persona;
    next();
  };