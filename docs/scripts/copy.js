function copyData() {
    const resultDiv = document.getElementById("result");
    const copyBtn = document.getElementById("copyBtn");
    let textToCopy = "";

    for (let node of resultDiv.childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BUTTON") {
            continue;
        }

        if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
            textToCopy += node.textContent + "\n";
        }
    }

    navigator.clipboard.writeText(textToCopy.trim())
        .then(() => {
            copyBtn.innerText = "Copied!";
            setTimeout(() => {copyBtn.innerText = "Copy"}, 3000);
        })
        .catch(err => {
            alert("Failed to copy! Error: ", err);
        });
}