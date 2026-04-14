import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();

app.use(express.json()); // We need this here so that it reads data that is already in JSON format and converts into a JavaScript Object
app.use("/", employeesRouter);

export default app;


