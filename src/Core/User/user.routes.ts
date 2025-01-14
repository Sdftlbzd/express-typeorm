import { Router } from "express";
import { UserController } from "./user.controller";

export const userRoutes = Router();
const controller = UserController();

userRoutes.post("/register", controller.Register);
