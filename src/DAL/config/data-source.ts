import { DataSource } from "typeorm";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "express_typeorm",
  entities: [Contact, User],
  subscribers: [],
  migrations: [],
  logging: false,
  synchronize: true,
});
