import { NextFunction, Response, Request } from "express";

export const catchErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            return await fn(req, res, next);
        } catch (err) {
            if (typeof err === 'string') {
                res.status(400).json({
                    msg: err
                });
            } else {
                next(err);
            }
        };
    };
};