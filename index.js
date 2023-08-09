require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message.
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Respond to a specific command
    if (messageText === "/start") {
        bot.sendMessage(chatId, "Hello! I am Faridul Islam.");
    } else if (messageText === "Hi") {
        bot.sendMessage(chatId, "Hey!");
    } else {
        bot.sendMessage(chatId, "I don't understand that command.");
    }
});
