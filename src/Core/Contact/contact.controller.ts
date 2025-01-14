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

const ContactUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) return next(new Error("Id is required"));

  const { name, surname, email, inquiryType, companyName, message } = req.body;

  const data = await Contact.findOne({
    where: { id: +id },
  });
  if (!data) return next(new Error("Contact not found"));
  const updatedData = await Contact.update(2, {
    name,
    surname,
  });
  res.json({
    message: "Contact updated successfully",
    data: updatedData,
  });
};

export const ContactController = () => ({
  Create,
  ContactList,
  ContactUpdate,
});
