const express = require("express");

const { connectMongodb } = require("./connection");

const { logReqRes } = require("./middleware");

const userRouter = require("./routes/user");

const app = express();
const port = 3000;

//Connection settings

connectMongodb("mongodb://127.0.0.1:27017/express");

//middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

// routes

app.use("/api/users", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
