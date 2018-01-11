// Project names start with an adjective then a Noun traditionaly
// nouns, pronouns, verbs, adjectives, adverbs, conjunctions, prepositions, and interjections

const commonAdjectives = ["able", "bad", "best", "better", "big", "black",
  "certain", "clear", "different", "early", "easy", "economic", "false", "federal",
  "free", "full", "good", "great", "hard", "high", "human", "important",
  "international", "large", "late", "little", "local", "long", "low",
  "major", "military", "national", "new", "old", "only", "other", "political",
  "possible", "public", "real", "recent", "right", "small", "social",
  "special", "strong", "sure", "true", "white", "whole", "young"
];
const commonNouns = ["people", "history", "way", "art", "world",
  "information", "map", "two", "family", "government", "health", "system",
  "computer", "meat", "year", "thanks", "music", "person", "reading",
  "method", "data", "food", "understanding", "theory", "law", "bird",
  "literature"
];
var getRandomWord = function(wordType) {
  return wordType[Math.floor(Math.random() * wordType.length)];
};
var capitalizeFirstLetter = function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

var getListStatsAdj = function() {
  document.getElementById('numAdj').innerHTML = commonAdjectives.length;
};
var getListStatsNoun = function() {
  document.getElementById('numNouns').innerHTML = commonNouns.length;
};
var generateProjectName = function() {
  document.getElementById('currentName').innerHTML = capitalizeFirstLetter(getRandomWord(commonAdjectives)) + " " + getRandomWord(commonNouns);
};
var onLoad = function() {
  getListStatsAdj();
  getListStatsNoun();
}
onLoad();
