import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { Contact } from "../../DAL/models/contact.model";
import { CreateContactDTO, UpdateContactDTO } from "./contact.dto";
import moment from "moment";

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, surname, email, inquiryType, companyName, message } =
      req.body;

    const dto = new CreateContactDTO();
    dto.name = name;
    dto.surname = surname;
    dto.email = email;
    dto.companyName = companyName;
    dto.inquiryType = inquiryType;
    dto.message = message;

    const errors = await validate(dto);

    if (errors.length > 0) {
      return next(errors);
    }

    const contact = Contact.create({
      name,
      surname,
      email,
      inquiryType,
      companyName,
      message,
    });

    const savedContact = await contact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the contact",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const ContactList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await Contact.find({
      withDeleted: true,
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while displaying the contact list",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const ContactEdit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!id) return next(new Error("Id is required"));

    const { name, surname, email, inquiryType, companyName } = req.body;

    const contact = await Contact.findOne({ where: { id } });
    if (!contact) return next(new Error("Contact not found"));

    const dto = new UpdateContactDTO();
    dto.name = name;
    dto.surname = surname;
    dto.email = email;
    dto.companyName = companyName;
    dto.inquiryType = inquiryType;

    const errors = await validate(dto);

    if (errors.length > 0) return next(errors);

    const update =
      contact.name !== name ||
      contact.surname !== surname ||
      contact.email !== email ||
      contact.companyName !== companyName ||
      contact.inquiryType !== inquiryType;

    if (!update) {
      return next (res.json({
        message: "No changes detected, contact not updated.",
        data: contact, 
      }))
    }

    await Contact.update(id, {
      name,
      surname,
      email,
      inquiryType,
      companyName,
    });

    const updatedData = await Contact.findOne({
      where: { id },
      select: [
        "id",
        "name",
        "surname",
        "email",
        "companyName",
        "inquiryType",
        "created_at",
      ],
    });

    console.log(updatedData);

    res.json({
      message: "Contact updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while update the contact",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const ContactDel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!id) return next(new Error("Id is required"));

    const contact = await Contact.findOne({ where: { id } });

    if (!contact) return next(res.status(404).json("Contact not found."));

    await Contact.softRemove(contact);

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json("An error occurred while deleting the contact.");
  }
};

const GetById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (!id) return next(new Error("Id is required"));

  const data = await Contact.findOne({
    where: { id },
    select: [
      "id",
      "name",
      "surname",
      "email",
      "companyName",
      "inquiryType",
      "message",
      "created_at",
    ],
  });
  if (!data) return next(new Error("Contact not found"));

  res.json({
    ...data,
    created_at: moment(data.created_at).format("YYYY-MM-DD HH:mm:ss"),
  });
};

export const ContactController = () => ({
  Create,
  ContactList,
  ContactEdit,
  ContactDel,
  GetById
});
