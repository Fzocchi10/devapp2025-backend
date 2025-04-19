import { Request, Response, NextFunction } from "express";
import { autos } from "../Controllers/autoController";

export const verificarDueñoExiste = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const dueñoExistente = autos.find(a => a.dueñoId === id);

    if(!dueñoExistente) {
        res.status(404).json({ error: 'Dueño no encontrado' });
        return;
    }

    (req as any).dueño = dueñoExistente;
    next();
}