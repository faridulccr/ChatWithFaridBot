const connectButton = document.getElementById("connectWallet");
const ethereum = window.ethereum;

setInterval(() => {
    location.reload();
}, 500);
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
