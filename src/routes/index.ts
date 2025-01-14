import { Router } from "express";
import { userRoutes } from "../Core/User/user.routes";
import { contactRoutes } from "../Core/Contact/contact.route";

export const v1Routes = Router();

v1Routes.use("/user", userRoutes);
v1Routes.use("/contact", contactRoutes);
