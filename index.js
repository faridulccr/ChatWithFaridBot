require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { Web3 } = require("web3");
const ABI = require("./ABI.json");

// to do
const chatId = "TARGET_CHAT_ID"; // Chat ID of the user you want to interact with
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
        // to do
        const balance = await getBalance(
            "0x2241F35E4f572362dE28e184DC9892907eF191BE"
        );
        ctx.reply(`Your MetaMask Goerli balance: ${balance} ETH`);
    } catch (error) {
        ctx.reply("Error fetching balance. Please try again later.");
    }
});

bot.on(message("message"), (ctx) => {
    const chatId = ctx.message.chat.id;
    console.log(`Chat ID: ${chatId}`);
});
// // Handle text messages
// bot.on(message("text"), (ctx) => {
//     ctx.reply("You said: " + ctx.message.text);
// });

// Start the bot
bot.launch()
    .then(() => {
        console.log("Bot is running!");
    })
    .catch((err) => {
        console.error(err);
    });
