require("dotenv").config({ path: ".env" });
const http = require("http");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/event", (req, res, _) => {});

http.createServer(app).listen(3040);
