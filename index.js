"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Import stylesheets
//require("./style.css");
(_a = document.getElementById("testButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    console.log("clicked");
    var inputElement = document.getElementById("userInputSearch");
    var myWord = inputElement.value.trim();
    if (myWord) {
        window.axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(myWord))
            .then(function (response) {
            response.data.forEach(function (e) {
                var word = e.word, meanings = e.meanings, phonetic = e.phonetic;
                var unconstWord = word;
                var headerOne = document.getElementById("h1testid");
                unconstWord = unconstWord[0].toUpperCase() + unconstWord.slice(1);
                if (headerOne) {
                    headerOne.textContent = "Define: " + unconstWord;
                }
                var listDefs = document.getElementById("multiple-defs");
                listDefs.textContent = '';
                meanings.forEach(function (meaning) {
                    var speechElement = document.getElementById("partOfSpeechID");
                    speechElement.textContent = meaning.partOfSpeech + "  •  " + phonetic;
                    meaning.definitions.forEach(function (definition) {
                        var definitionItem = document.createElement("p");
                        definitionItem.textContent = "• " + definition.definition;
                        listDefs.appendChild(definitionItem);
                        //listDefs.textContent = definition.definition;
                    });
                    var synonymList = document.getElementById("synonyms-list");
                    synonymList.textContent = '';
                    var hasSyns = false;
                    meanings.forEach(function (meaning) {
                        if (meaning.synonyms && meaning.synonyms.length > 0) {
                            meaning.synonyms.forEach(function (i) {
                                var synItem = document.createElement("li");
                                synItem.textContent = i;
                                synonymList.appendChild(synItem);
                                hasSyns = true;
                                //console.log(i);
                            });
                        }
                        // if (!hasSyns){
                        //     synonymList.textContent = "None.";
                        // }
                    });
                    console.log(meaning.synonyms);
                    var antonymList = document.getElementById("antonyms-list");
                    antonymList.textContent = '';
                    meanings.forEach(function (meaning) {
                        if (meaning.antonyms && meaning.antonyms.length > 0) {
                            meaning.antonyms.forEach(function (i) {
                                var antItem = document.createElement("li");
                                antItem.textContent = i;
                                antonymList.appendChild(antItem);
                                //console.log(i);
                            });
                        }
                    });
                });
            });
        });
    }
}); //end of event listener bracket
