let inputtxt = document.querySelector(".input-txt");
let wordElement = document.querySelector(".word");
let wordmean = document.querySelector(".word-mean");
let synonymele = document.querySelector(".synonym");
let antonymsele = document.querySelector(".antonyms");
function getval() {
  inputtxt.addEventListener("change", function () {
    const word = inputtxt.value;
    fetchdata(word);
  });
}

function fetchdata(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(apiUrl)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Error found");
      }

      return resp.json();
    })
    .then((result) => {
      wordElement.innerText = `word is: ${word}`;

      if (result.length > 0 && result[0].meanings) {
        console.log(result);
        let firstMeaning = result[0].meanings[0];
        let definition =
          firstMeaning.definitions && firstMeaning.definitions[0]
            ? firstMeaning.definitions[0].definition
            : "N/A";

        let synonyms =
          firstMeaning.synonyms && firstMeaning.synonyms.length > 1
            ? firstMeaning.synonyms[0]
            : "N/A";
        let antonyms =
          firstMeaning.antonyms && firstMeaning.antonyms.length > 1
            ? firstMeaning.antonyms[0]
            : "N/A";

        wordmean.innerText = `Meaning of word ${word} is: ${definition}`;
        synonymele.innerText = `Synonyms are: ${synonyms}`;
        antonymsele.innerText = `Antonyms are: ${antonyms}`;
      }
    })
    .catch((err) => {
      console.log(err);
      wordElement.innerText = `Word not found`;
      synonymele.innerText = `Synonyms are: ...`;
      antonymsele.innerText = `Antonyms are: ...`;
      wordmean.innerText = `Meaning of word is ...`;
    });
}

getval();
