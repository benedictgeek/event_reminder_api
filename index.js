require("dotenv").config({ path: ".env" });
const http = require("http");
const express = require("express");
const { publishToQueue } = require("./queue/publisher");
const { remindersConsumer } = require("./queue/subscriber");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/event", async (req, res, _) => {
  await publishToQueue({ test: "some_test" });
  res.send("Done");
});

http.createServer(app).listen(3040, () => {
  remindersConsumer();
});
