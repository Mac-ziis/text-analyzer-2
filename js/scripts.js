// Utility Logic

function isEmpty(testString) {
  return (testString.trim().length === 0);
}

// Business Logic

function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function howOftenUsed(word,text) {
  if (isEmpty(word)) {
    return {};
  }
  const textArray = text.split(" ");
  const wordCount = {};
  textArray.forEach(function(word) {
    const lowercaseWord = word.toLowerCase();
    if (!Number(lowercaseWord)) {
      if (wordCount[lowercaseWord]) {
        wordCount[lowercaseWord]++;
      } else {
        wordCount[lowercaseWord] = 1;
      }
    }
  });
  
  const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
  return sortedWords.reduce((result, [word, count]) => {
    result[word] = count;
    return result;
  }, {});
}

// UI Logic

function boldPassage(word, text) {
  if (isEmpty(word) || isEmpty(text)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      const bold = document.createElement("strong");
      bold.append(element);
      p.append(bold);
    } else {
      p.append(element);
    }
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });
  return p;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  const wordUsage = howOftenUsed(word, passage);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;
  let boldedPassage = boldPassage(word, passage);
  let boldedPassageContainer = document.querySelector("div#bolded-passage");
  boldedPassageContainer.innerHTML = "";
  if (boldedPassage) {
    boldedPassageContainer.appendChild(boldedPassage);
  }

  let wordUsageContainer = document.querySelector("div#word-usage");
  wordUsageContainer.innerHTML = "";
  
  for (const [word, count] of Object.entries(wordUsage)) {
    const wordElement = document.createElement("p");
    wordElement.innerText = `${word}: ${count}`;
    wordUsageContainer.appendChild(wordElement);
  }
}

window.addEventListener("load", function() {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});
