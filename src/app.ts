import express, { Express } from "express";
import cors from "cors";
import indexRouter from "./routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", indexRouter);

export default app;
