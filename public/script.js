const connectButton = document.getElementById("connectWallet");
const ethereum = window.ethereum;

// Add name and URL to the Ethereum Provider
ethereum.name = "My Ethereum App"; // Set the name of your app
ethereum.url = "https://chat-with-farid-bot.vercel.app"; // Set the URL of your app
window.ethereum.request({
    method: "eth_requestAccounts",
});
connectButton.addEventListener("click", () => {
    // window.ethereum.request({ method: "eth_requestAccounts" });
    if (typeof window.ethereum !== "undefined") {
        alert("MetaMask is installed!");
    } else {
        alert("MetaMask is not installed!");
    }
});
