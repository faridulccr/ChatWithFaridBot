const connectButton = document.getElementById("connectWallet");
window.ethereum.request({ method: "eth_requestAccounts" });
connectButton.addEventListener("click", () => {
    // window.ethereum.request({ method: "eth_requestAccounts" });
    if (typeof window.ethereum !== "undefined") {
        alert("MetaMask is installed!");
    } else {
        alert("MetaMask is not installed!");
    }
});
