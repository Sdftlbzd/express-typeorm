import { DataSource } from "typeorm";
import { join } from "path";
import { readdirSync } from "fs";

const entitiesDir = join(__dirname, "../models");

const entities = readdirSync(entitiesDir)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js")) // Faylları filtreləyirik
  .map((file) => {
    const entity = require(join(entitiesDir, file)); // Faylı yükləyirik
    return entity.default || entity; // Entity-i default olaraq qaytarırıq
  });

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "express_typeorm",
  entities: entities,
  subscribers: [],
  migrations: [],
  logging: false,
  synchronize: true,
});
