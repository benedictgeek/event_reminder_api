const ampq = require("amqplib");
const { credentials } = require("./util");

let publishToQueue = async (msq) => {
  const connection = await ampq.connect("");
  const channel = await connection.createChannel();
  const ex = await channel.assertExchange(credentials.ex, credentials.exType);
  const queue = await channel.assertQueue(credentials.queue);
  channel.bindQueue(credentials.queue, credentials.ex);

  channel.publish(ex, credentials.queue, Buffer.from(msq.toString()));
  channel.close();
  connection.close();
};
