import { NextFunction, Request, Response } from "express";
import { User } from "../../DAL/models/user.model";

const Register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, surname, age, email } = req.body;

  await User.create({
    name,
    surname,
    age,
    email,
  })
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
};

export const UserController = () => ({
  Register,
});
