const { channel, exchangeCredentials, remindersQueue } = require("./util");
const moment = require("moment");

module.exports.publishToQueue = async (msg) => {
  try {
    let credentials = await channel();
    const ch = credentials.channel;
    await ch.assertExchange(
      exchangeCredentials.ex,
      exchangeCredentials.exType,
      {
        arguments: {
          "x-delayed-type": "direct",
        },
      }
    );
    await ch.assertQueue(remindersQueue.queue);
    await ch.bindQueue(
      remindersQueue.queue,
      exchangeCredentials.ex,
      remindersQueue.key
    );
    ch.publish(
      exchangeCredentials.ex,
      remindersQueue.key,
      Buffer.from(JSON.stringify(msg)),
      {
        headers: {
          "x-delay": moment(msg.date).diff(moment()),
        },
      }
    );
    await ch.close();
    await credentials.conn.close();
  } catch (error) {
    console.warn(error);
  }
};
