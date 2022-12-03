const express = require("express");
const path = require("path");
const app = express();

const publicDir = path.join(__dirname, "../public"); //to get the path

app.use(express.static(publicDir)); //to make files in showwing in (publicDir)

app.get("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
