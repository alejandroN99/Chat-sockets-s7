import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config({path:'../../../.env'});


export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("Access denied!");
        }
        
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Access denied!");
        }

        const secret = process.env.SECRET;
        if(secret){
            
            const payload = jwt.verify(token, secret, (err) => {
                if (err) {
                    return res.status(401).json({ message: "Access denied!" });
                }
    
                // El token es válido, puedes acceder a decoded para obtener información del token si es necesario
                next();
        }) 
        };
    } catch (error) {
        return res.status(401).json({ error });
    }
};