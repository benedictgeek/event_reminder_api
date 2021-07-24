const amqp = require("amqplib");
module.exports.channel = async () => {
  try {
    const conn = await amqp.connect("amqp://localhost");
    const channel = await conn.createChannel();
    return { conn, channel };
  } catch (error) {
    throw error;
  }
};

module.exports.exchangeCredentials = {
  ex: "reminders",
  exType: "x-delayed-message",
};

module.exports.remindersQueue = {
  queue: "event_reminders",
  key: "event_reminders_key",
};
