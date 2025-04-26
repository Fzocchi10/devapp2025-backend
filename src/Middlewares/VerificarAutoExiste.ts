import { Request, Response, NextFunction } from "express";
import { autos } from "../Controllers/autoController";
import { UUID } from "crypto";

export const verificarAutoExiste = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id as UUID;
    const auto = autos.find(p => p.id === id);

    if (!auto) {
      res.status(404).json({ error: 'Auto no encontrado' });
      return;
    }

    (req as any).auto = auto;
    next();
  };