import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./db/connect.db.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(`<h1>Home route here.</h1>`);
});

dbConnect();

app.listen(port, () => {
  console.log("Example App running at port: ", port);
});
