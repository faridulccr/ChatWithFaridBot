const express = require("express");
const path = require("path");
const cors = require("cors");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { Web3 } = require("web3");

const app = express();
app.use(cors()); // for any cross-origin (universal)
// app.use(express.static());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// declare static folder
app.use(express.static(__dirname + "/public"));

const goerliRpcUrl = process.env.GOERLI_RPC_URL;

// Create a bot to fetch new updates
const bot = new Telegraf(process.env.BOT_TOKEN);
const web3 = new Web3(new Web3.providers.HttpProvider(goerliRpcUrl));

// a function that get the balance from metamask MM=metamask
const getBalance = async (MMaddress) => {
    const wei = await web3.eth.getBalance(MMaddress);
    const ether = web3.utils.fromWei(wei, "ether");
    return ether;
};

bot.command("balance", async (ctx) => {
    try {
        const address = ctx.message.text.split(" ")[1];
        const balance = await getBalance(address);
        ctx.reply(`Balance of ${address}: ${balance} ETH`);
    } catch (error) {
        ctx.reply("Error fetching balance. Please try again later.");
    }
});

bot.command("metamask", async (ctx) => {
    ctx.reply(
        "Connected to MetaMask go to https://chat-with-farid-bot.vercel.app"
    );
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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// not found route handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "page not fond",
    });
});

// server error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err,
    });
});

module.exports = app;
