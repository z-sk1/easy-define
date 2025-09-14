function updateDisplay(data) {
    const resultDiv = document.getElementById("result");

    let msg = `<p><strong>${data.word}</strong></p>`
        
    if (!data.meanings || data.meanings.length === 0) {
        msg += `<p>No definitions found for '${data.word}'.</p>`;
    } else {
        data.meanings.forEach(meaning => {
            msg += `<p><em>${meaning.partOfSpeech}</em></p><ul>`;
            meaning.definitions.slice(0, 3).forEach(def => {
                msg += `<li>${def}</li>`;
            });
            if (meaning.definitions.length > 3) {
                msg += `<li>...</li>`;
            }
            msg += `</ul>`;
            if (meaning.synonyms && meaning.synonyms.length > 0) {
                msg += `<p><strong>Synonyms:</strong> ${meaning.synonyms.join(", ")}</p>`;
            }
        });
    }

    msg += `<button id = "copyBtn" onclick = "copyData()">Copy</button>`;
    resultDiv.innerHTML = msg;
}