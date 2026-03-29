require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5000",
    "https://awesome-todos-nzoy.onrender.com"
  ],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'dist')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
startServer();