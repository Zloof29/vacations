import express, { Request, Response, NextFunction } from "express";

export const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.send("I'm in the root...");
    }
    catch (err: any) {
        next(err);
    }
});

