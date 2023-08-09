require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const token = process.env.BOT_TOKEN;
// Create a bot to fetch new updates
const bot = new Telegraf(token);

// Respond to a specific command. ctx = Context
bot.command("start", (ctx) => {
    ctx.reply("Hello! I am Faridul Islam Ovi.");
});

// Handle text messages
bot.on(message("text"), (ctx) => {
    ctx.reply("You said: " + ctx.message.text);
});

// Start the bot
bot.launch()
    .then(() => {
        console.log("Bot is running!");
    })
    .catch((err) => {
        console.error(err);
    });
