import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { io } from "../server";
import * as messageServices from "../services/message.services";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("Missing BOT_TOKEN");
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg: TelegramBot.Message) => {
  let message = {
    roomId: msg.chat.id.toString(),
    sender: `${msg.chat.first_name} ${msg.chat.last_name}`,
    text: msg.text || "",
    type: "outgoing",
    time: new Date(),
  };
  await messageServices.saveMessage(message);
  io.emit("receiveMessage", message);
  console.log(message);
});
export const sendMessage = (roomId: string, message: string) => {
  bot.sendMessage(roomId, message);
};
