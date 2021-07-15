const { channel, remindersQueue } = require("./util");

module.exports.remindersConsumer = async () => {
  let credentials = await channel();
  const ch = credentials.channel;
  await ch.assertQueue(remindersQueue.queue);
  let handleMesage = (msg) => {
    console.log(JSON.parse(msg.content.toString()));
    ch.ack(msg);
  };
  await ch.consume(remindersQueue.queue, handleMesage);
};
