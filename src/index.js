const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { mailSender } = require("./config/email-config");
const app = express();
const amqplib = require("amqplib");
const { EmailService } = require("./services/index.js");

async function connectRabbitMq() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    channel.consume("noti-queue", async (data) => {
      const obj = JSON.parse(Buffer.from(data.content));
      await EmailService.sendMail(
        "airlinenoti@gmail.com",
        obj.recepientEmail,
        obj.subject,
        obj.text,
      );
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

// app.listen(ServerConfig.PORT, () => {
//     console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
// });

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  await connectRabbitMq();
  console.log("queue is up");
});
