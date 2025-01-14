import { NextFunction, Request, Response } from "express";
import { Contact } from "../../DAL/models/contact.model";

const Create = async (req: Request, res: Response, next: NextFunction) => {

  const { name, surname, email, inquiryType, companyName, message } = req.body;

  await Contact.create({
    name,
    surname,
    email,
    inquiryType,
    companyName,
    message,
  })
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
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

    const { name, surname, email, inquiryType, companyName, message } =
      req.body;

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
}

export const ContactController = () => ({
  Create,
  ContactList,
  ContactUpdate
});
