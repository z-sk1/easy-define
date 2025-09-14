document.getElementById("wordInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchDef();
    }
});

function fetchDef() {
    const word = document.getElementById("wordInput").value;

    if (!word) {
        alert("Please enter a word.");
        return;
    }

    fetch(`http://localhost:8081/define?word=${encodeURIComponent(word)}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errTxt => {
                    throw new Error(errTxt || "Network connection was not ok")
                });
            }
            return response.json();
        })
        .then(data => {
            updateDisplay(data);
        })
        .catch(err => {
            alert("Error: " + err.message);
            console.error(err.messgae);
        });
}