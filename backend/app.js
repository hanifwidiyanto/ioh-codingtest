import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import itemRoute from "./routes/item.js";
import invoiceRoute from "./routes/invoice.js";

import { notFound, errorHandler } from "./middleware/error.js";

import db from "./config/database.js";

dotenv.config();

// (async () => {
//   await db.sync();
// })();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/users", authRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/items", itemRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

export default app;
