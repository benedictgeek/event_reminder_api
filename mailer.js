require("dotenv").config({ path: ".env" });
const moment = require("moment");
const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SMTPKEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

let templateId = "1";

let sendReminderMail = ({}) => {
  try {
    let subject = ``;
    let userEmail = `olushola251@gmail.com`;
    //
    sendSmtpEmail.subject = subject;
    // sendSmtpEmail.htmlContent = readyHtml;
    sendSmtpEmail.templateId = templateId;
    sendSmtpEmail.sender = {
      name: "Olushola",
      email: "olushola251@gmail.com",
    };
    sendSmtpEmail.to = [{ email: userEmail }];
    sendSmtpEmail.replyTo = {
      email: "olushola251@gmail.com",
      name: "Olushola",
    };

    sendSmtpEmail.attributes = [
      {
        USERNAME: ``,
        MESSAGE: `testing1212message me`,
        DATE: moment().format(""),
      },
    ];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
      },
      function (error) {
        console.error(error);
      }
    );
  } catch (error) {
    console.log("error");
    //
  }
};

module.exports.sendReminderMail = sendReminderMail;

sendReminderMail();
