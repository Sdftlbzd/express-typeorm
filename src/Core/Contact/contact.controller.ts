import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { Contact } from "../../DAL/models/contact.model";

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, surname, email, inquiryType, companyName, message } =
      req.body;

    const contact = Contact.create({
      name,
      surname,
      email,
      inquiryType,
      companyName,
      message,
    });

    // Validasiyanı yoxlamaq
    const errors = await validate(contact);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    } else {
      const savedContact = await contact.save();
      res.status(201).json(savedContact);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ContactList = async (req: Request, res: Response, next: NextFunction) => {
  const list = await Contact.find({
    withDeleted: true,
  });
  res.json(list);
};

const ContactEdit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) return next(new Error("Id is required"));

  const { name, surname, email, inquiryType, companyName, message } = req.body;

  const contact = await Contact.findOne({ where: { id: +id } });
  if (!contact) return next(new Error("Contact not found"));

  const updatedData = await Contact.update(id, {
    name,
    surname,
    email,
    inquiryType,
    companyName,
    message,
  });
  res.json({
    message: "Contact updated successfully",
    data: updatedData,
  });
};

const ContactDel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) return next(new Error("Id is required"));

    const contact = await Contact.findOne({ where: { id: +id } });

    if (!contact) {
      res.status(404).json({ message: "Contact not found." });
    } else {
      await Contact.softRemove(contact);

      res.status(200).json({ message: "Contact deleted successfully." });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the contact." });
  }
};

export const ContactController = () => ({
  Create,
  ContactList,
  ContactEdit,
  ContactDel,
});
