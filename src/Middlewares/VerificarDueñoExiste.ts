import { Request, Response, NextFunction } from "express";
import { personas } from "../Controllers/personaController";

export const verificarDueñoExiste = (req: Request, res: Response, next: NextFunction) => {
    const dueñoExistente = personas.find(p => p.id === req.body.dueñoId);

    if(!dueñoExistente) {
        res.status(404).json({ error: 'Dueño no encontrado' });
        return;
    }

    (req as any).dueño = dueñoExistente;
    next();
}