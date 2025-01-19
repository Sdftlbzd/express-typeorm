import { Router } from "express";
import { ContactController } from "./contact.controller";

export const contactRoutes = Router();
const controller = ContactController();

contactRoutes.post("/create", controller.Create);
contactRoutes.get("/list", controller.ContactList);
contactRoutes.put("/update/:id", controller.ContactEdit);
contactRoutes.get("/get/:id", controller.GetById);
contactRoutes.delete("/delete/:id", controller.ContactDel);