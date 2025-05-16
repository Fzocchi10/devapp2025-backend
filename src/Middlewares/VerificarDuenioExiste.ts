import { Request, Response, NextFunction } from "express";
import { personaService } from "../server";
import { UUID } from "crypto";

export const verificarDuenioExiste = async (req: Request, res: Response, next: NextFunction) => {
    const duenioExistente = await personaService.getById(req.body.duenioId as UUID);

    if(!duenioExistente) {
        res.status(404).json({ error: 'Duenio no encontrado' });
        return;
    }

    (req as any).duenio = duenioExistente;
    next();
}