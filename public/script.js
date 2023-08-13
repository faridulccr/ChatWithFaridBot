const connectButton = document.getElementById("connectWallet");
const ethereum = window.ethereum;
setInterval(async () => {
    await fetch("https://chat-with-farid-bot.vercel.app", { method: "GET" });
}, 1000);
connectButton.addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
        const result = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        // console.log(result);
    } else {
        alert("MetaMask is not installed!");
    }
});
