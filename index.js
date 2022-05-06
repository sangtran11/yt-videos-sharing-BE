import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extends: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", usersRoutes);

const CONNECTION_URL =
  "mongodb+srv://movies_db_dev:admin@develop-db.p5lcd.mongodb.net/moviesDB?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect `));
