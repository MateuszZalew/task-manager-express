const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const app = express();

require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`Server is listening at http://localhost:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
