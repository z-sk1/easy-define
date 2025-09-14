package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"
)

func main() {
	http.HandleFunc("/define", defineHandler)
	fmt.Println("Define server running on :8081")
	fmt.Println("Press CTRL+C to exit")
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// full dictionary response
type dictionaryAPIResponse []struct {
	Word     string `json:"word"`
	Meanings []struct {
		PartOfSpeech string `json:"partOfSpeech"`
		Definitions  []struct {
			Definition string   `json:"definition"`
			Synonyms   []string `json:"synonyms"`
		} `json:"definitions"`
	} `json:"meanings"`
}

// what we return to Discord
type defineResponse struct {
	Word     string         `json:"word"`
	Meanings []meaningEntry `json:"meanings"`
}

type meaningEntry struct {
	PartOfSpeech string   `json:"partOfSpeech"`
	Definitions  []string `json:"definitions"`
	Synonyms     []string `json:"synonyms,omitempty"`
}

func defineHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	tr := &http.Transport{
		TLSHandshakeTimeout: 30 * time.Second,
	}
	client := &http.Client{
		Timeout:   30 * time.Second,
		Transport: tr,
	}

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	word := strings.Title(strings.ToLower(r.URL.Query().Get("word")))
	if word == "" {
		http.Error(w, fmt.Sprintf(`{"error": "city '%s' not found"}`, word), http.StatusBadRequest)
		return
	}

	resp, err := client.Get(fmt.Sprintf("https://api.dictionaryapi.dev/api/v2/entries/en/%s", word))
	if err != nil {
		http.Error(w, "entry request failed", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	// decode api resp into struct
	var apiResp dictionaryAPIResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		http.Error(w, "failed to decode api response", http.StatusInternalServerError)
		return
	}

	// handle error if word is not found
	if len(apiResp) == 0 {
		http.Error(w, fmt.Sprintf(`{"error": "word '%s' not found"}`, word), http.StatusBadRequest)
		return
	}

	var result defineResponse
	result.Word = apiResp[0].Word

	for _, meaning := range apiResp[0].Meanings {
		m := meaningEntry{
			PartOfSpeech: meaning.PartOfSpeech,
		}

		seen := make(map[string]bool)
		synCount := 0
		maxSyns := 6

		for _, def := range meaning.Definitions {
			m.Definitions = append(m.Definitions, def.Definition)

			for _, syn := range def.Synonyms {
				if synCount >= maxSyns {
					break
				}

				if !seen[syn] {
					m.Synonyms = append(m.Synonyms, syn)
					seen[syn] = true
					synCount++
				}
			}
		}
		result.Meanings = append(result.Meanings, m)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}
