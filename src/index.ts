import express from "express";
import { v1Routes } from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./DAL/config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const app = express();

    app.use(express.json());

    app.use("/api/v1", v1Routes);
    app.use((err: any, req: any, res: any, next: any) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });
