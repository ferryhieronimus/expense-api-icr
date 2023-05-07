import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";

export const zodErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json(err.issues);
  } else {
    next(err);
  }
};
