import { NextFunction, Request, Response } from "express";
import { User } from "../../DAL/models/user.model";
import { validate } from "class-validator";
import { CreateUserDTO } from "./user.dto";

const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, surname, age, email } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) return next(res.json("Bu emaile uygun user artiq movcuddur"));

        const dto = new CreateUserDTO();
        dto.name = name;
        dto.surname = surname;
        dto.email = email;
        dto.age = age;

    const errors = await validate(dto);

    if (errors.length > 0) {
      return next(errors);
    }

    const newUser = User.create({
      name,
      surname,
      age,
      email,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the user",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const UserController = () => ({
  Register,
});
