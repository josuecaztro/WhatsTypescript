// Import stylesheets
//import './style.css';

export interface Root2 {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: License2
  sourceUrls: string[]
}

export interface Phonetic {
  text: string
  audio: string
  sourceUrl: string
  license: License
}

export interface License {
  name: string
  url: string
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: any[]
}

export interface Definition {
  definition: string
  synonyms: any[]
  antonyms: any[]
}

export interface License2 {
  name: string
  url: string
}




document.getElementById("testButton")?.addEventListener("click", () => {
  console.log("clicked");
  const toggleClass:any = document.getElementsByClassName("toggle-me");
  for (let i = 0; i < toggleClass.length; i++) {
    toggleClass[i].style.display = "block";
  }

  const inputElement = document.getElementById("userInputSearch") as HTMLInputElement;
  const myWord = inputElement.value.trim();

  if (myWord) {
      (window as any).axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${myWord}`)
          .then((response: { data: any[]; }) => {
              response.data.forEach((e: any) => {
                  const { word, meanings, phonetic } = e;

                  let unconstWord = word;
                  const headerOne = document.getElementById("h1testid") as HTMLElement;
                  unconstWord = unconstWord[0].toUpperCase() + unconstWord.slice(1);
                  if (headerOne) {
                      headerOne.textContent = "Define: " + unconstWord;
                  }

                  const listDefs = document.getElementById("multiple-defs") as HTMLElement;
                  listDefs.textContent = '';
                  meanings.forEach((meaning:any) => {

                      const speechElement = document.getElementById("partOfSpeechID") as HTMLElement;
                      speechElement.textContent = meaning.partOfSpeech + "  •  " + phonetic;


                      meaning.definitions.forEach((definition:any) => {
                          const definitionItem = document.createElement("p");
                          definitionItem.textContent = "• " + definition.definition;
                          listDefs.appendChild(definitionItem);
                          //listDefs.textContent = definition.definition;
                      });

                      const synonymList = document.getElementById("synonyms-list") as HTMLElement;
                      synonymList.textContent = '';
                      let hasSyns = false;
                      meanings.forEach((meaning:any) => {
                          if(meaning.synonyms && meaning.synonyms.length > 0){
                              meaning.synonyms.forEach((i:string) => {
                                  const synItem = document.createElement("li");
                                  synItem.textContent = i;
                                  synonymList.appendChild(synItem);
                                  hasSyns = true;
                                  //console.log(i);
                              })
                          } 
                          // if (!hasSyns){
                          //     synonymList.textContent = "None.";
                          // }
                      });

                      console.log(meaning.synonyms);
                      const antonymList = document.getElementById("antonyms-list") as HTMLElement;
                      antonymList.textContent = '';
                      meanings.forEach((meaning:any) => {
                          if(meaning.antonyms && meaning.antonyms.length > 0){
                              meaning.antonyms.forEach((i:string) => {
                                  const antItem = document.createElement("li");
                                  antItem.textContent = i;
                                  antonymList.appendChild(antItem);
                                  //console.log(i);
                              })
                          }
                      })
                      
                     
                          
                  });

                  
                  



              });
          });
  }
});//end of event listener bracket
