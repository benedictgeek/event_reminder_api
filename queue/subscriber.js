const { sendReminderMail } = require("../mailer");
const { channel, remindersQueue } = require("./util");

module.exports.remindersConsumer = async () => {
  let credentials = await channel();
  const ch = credentials.channel;
  await ch.assertQueue(remindersQueue.queue);
  let handleMesage = (msg) => {
    console.log(JSON.parse(msg.content.toString()));
    //send a mail to the client's email
    // sendReminderMail();
    ch.ack(msg);
  };
  await ch.consume(remindersQueue.queue, handleMesage);
};
