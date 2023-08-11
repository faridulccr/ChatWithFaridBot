window.ethereum.request({ method: "eth_requestAccounts" });

const connectButton = document.getElementById("connectWallet");
connectButton.addEventListener("click", () => {
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
    } else {
        console.log("MetaMask is not installed!");
    }
});
