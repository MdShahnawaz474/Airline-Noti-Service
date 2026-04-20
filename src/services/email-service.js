const { ticketRepository } = require("../repositories");
const Mailer = require("../config");
const ticketRepo = new ticketRepository();
async function sendMail(mailFromto, mailTo, subject, text) {
  try {
    const response = await Mailer.Mailer.mailSender.sendMail({
      from: mailFromto,
      to: mailTo,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepo.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function getPendingEmails() {
  try {
    const response = await ticketRepo.getPendingTickets();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

module.exports = { sendMail, createTicket, getPendingEmails };
