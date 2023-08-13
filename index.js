require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

// bot related code
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { Web3 } = require("web3");

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
        "Connect to MetaMask go to https://chat-with-farid-bot.vercel.app"
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
