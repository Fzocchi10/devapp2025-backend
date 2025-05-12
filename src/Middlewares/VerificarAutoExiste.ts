import { Request, Response, NextFunction } from "express";
import { autosService } from "../inyeccion";
import { UUID } from "crypto";

export const verificarAutoExiste = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id as UUID;
    const auto = await autosService.getById(id);

    if (!auto) {
      res.status(404).json({ error: 'Auto no encontrado' });
      return;
    }

    (req as any).auto = auto;
    next();
  };