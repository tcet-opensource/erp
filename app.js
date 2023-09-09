import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { logger } from "#util";
import indexRouter from "#routes/index";
import usersRouter from "#routes/users";
import authRouter from "#routes/auth";
import accreditationRouter from "#routes/accreditation";
import infrastructureRouter from "#routes/infrastructure";
import timetableRouter from "#routes/timetable";
import courseworkRouter from "#routes/coursework";
import moduleRouter from "#routes/module";
import { identifyUser } from "#middleware/identifyUser";

const app = express();
const currDirName = dirname(fileURLToPath(import.meta.url));

morgan.token("remote-user", (req) => req.user);
app.use(identifyUser);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan(
  ":remote-addr - :remote-user \":method :url HTTP/:http-version\" :status \":referrer\" \":user-agent\"",
  { stream: logger.stream },
));

app.use(express.static(path.join(currDirName, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/accreditation", accreditationRouter);
app.use("/infrastructure", infrastructureRouter);
app.use("/timetable", timetableRouter);
app.use("/coursework", courseworkRouter);
app.use("/module", moduleRouter);

export default app;
