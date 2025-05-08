import { Request, Response, NextFunction } from "express";
import { personaService } from "../inyeccion";

export const verificarDueñoExiste = (req: Request, res: Response, next: NextFunction) => {
    const dueñoExistente = personaService.getById(req.body.id);

    if(!dueñoExistente) {
        res.status(404).json({ error: 'Dueño no encontrado' });
        return;
    }

    (req as any).dueño = dueñoExistente;
    next();
}