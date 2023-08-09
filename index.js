require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { Web3 } = require("web3");

const token = process.env.BOT_TOKEN;
// Create a bot to fetch new updates
const bot = new Telegraf(token);
const web3 = new Web3(process.env.ALCHEMY_API_KEY);
// create a contract instance
const contract = new web3.eth.Contract("ABI", "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe");
console.log(contract);

//A function that calls the lock function of the smart contract and returns the result
const lock = async (amount) => {
    try {
        // Convert the amount from ether to wei(smallest unit of ether)
        let wei = web3.utils.toWei(amount, "ether");
        // Call the lock function of the smart contract and get the result
        let result = await contract.methods.lock(wei).call();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

// A function that sends a transaction to the lock function of the smart contract and returns the receipt
const lockTx = async (amount) => {
    try {
        // Convert the amount from ether to wei(smallest unit of ether)
        let wei = web3.utils.toWei(amount, "ether");
        // bot address(need to fund it with some test ether)
        let from = "@ChatWithFaridBot";
        // Estimate the gas cost of the transaction
        let gas = await contract.methods.lock(wei).estimateGas({ from });

        // Sent the transaction to the lock function of the smart contract and get the receipt
        let receipt = await contract.methods.lock(wei).send({ from, gas });
        return receipt;
    } catch (error) {
        console.error(error);
        return error;
    }
};

// Respond to a specific command. ctx = Context
bot.command("start", (ctx) => {
    ctx.reply("Hello! I am Faridul Islam Ovi.");
});
bot.command("help", (ctx) => {
    let text =
        "Hello, I am a telegram bot that can lock various smart contracts for Ethereum.\n";
    text += "You can use these commands:\n";
    text +=
        "/lock <amount> - Locks <amount> ether in the smart contract and returns the result.\n";
    text +=
        "/locktx <amount> - Sends a transaction to lock <amount> ether in the smart contract and returns the receipt.\n";
    text += "/balance - Return your balance in the smart contract.\n";
    text +=
        "/unlock - Unlock your balance in the smart contract and returns the result.\n";
    text +=
        "/unlocktx - Sends a transaction to unlock your balance in the smart contract and returns the receipt.\n";
    ctx.reply(text);
});
bot.command("lock", async (ctx) => {
    // Get the amount from the user input
    let amount = ctx.message.text.split(" ")[1];
    // Check if hte amount is valid
    if (amount && web3.utils.isFinite(amount)) {
        let result = await lock(amount);
        ctx.reply(
            `You have locked ${amount} ether in the smart contract. The result is: ${result}`
        );
    } else {
        ctx.reply("Please enter a valid amount of ether.");
    }
});
bot.command("locktx", async (ctx) => {
    // Get the amount from the user input
    let amount = ctx.message.text.split(" ")[1];
    // Check if hte amount is valid
    if (amount && web3.utils.isFinite(amount)) {
        let receipt = await lockTx(amount);
        ctx.reply(
            `You have sent a transaction to lock ${amount} ether in the smart contract. The receipt is: ${JSON.stringify(
                receipt
            )}`
        );
    } else {
        ctx.reply("Please enter a valid amount of ether.");
    }
});
bot.command("balance", async (ctx) => {
    // to do get the balance
    let balance = "";
    ctx.reply(`Your balance is ${balance} ether.`);
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
