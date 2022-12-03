const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//upload imges,files,pdf

// middleware
const multer = require("multer");
const upload = multer({
  dest: "imges",
});

// route
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});
