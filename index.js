require("dotenv").config({ path: ".env" });

const moment = require("moment");
const express = require("express");
const { publishToQueue } = require("./queue/publisher");
const { remindersConsumer } = require("./queue/subscriber");
const app = express();

//NAME: REMIND ME OF

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/event", async (req, res, next) => {
  try {
    let body = req.body;

    //validate the request body
    if (!body.desc) {
      throw "What I'm I reminding you of?";
    }

    let validEmail = /\S+@\S+\.\S+/.test(body.email);

    if (!validEmail) {
      throw "Your email has to be valid!";
    }



    let validDate =
      moment(body.date).isValid() &&
      moment(body.date).isAfter(moment(), "second");
    if (!validDate) {
      throw "Date provided invalid or in the past!";
    }

    publishToQueue({ desc: body.desc, date: body.date, email: body.email });
    res.status(200).send({ status: true, data: "Reminder set successfully" });
  } catch (error) {
    next({ statusCode: 400, data: error });
  }
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ status: false, data: err.data });
});

app.listen(3040, () => {
  remindersConsumer();
});
