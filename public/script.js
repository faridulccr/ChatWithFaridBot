const connectButton = document.getElementById("connectWallet");
const ethereum = window.ethereum;

// window.ethereum?.request({
//     method: "eth_requestAccounts",
// });
connectButton.addEventListener("click", () => {
    if (typeof window.ethereum !== "undefined") {
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((error) => {
                console.log(error);
            });
    } else {
        alert("MetaMask is not installed!");
    }
});
