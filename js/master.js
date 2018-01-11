// Project names start with an adjective then a Noun traditionaly
// nouns, pronouns, verbs, adjectives, adverbs, conjunctions, prepositions, and interjections

const commonNouns = ["people", "history", "way", "art", "world",
  "information", "map", "two", "family", "government", "health", "system",
  "computer", "meat", "year", "thanks", "music", "person", "reading",
  "method", "data", "food", "understanding", "theory", "law", "bird",
  "literature"
];
const commonAdjectives = ["able", "bad", "best", "better", "big", "black",
  "certain", "clear", "different", "early", "easy", "economic", "false", "federal",
  "free", "full", "good", "great", "hard", "high", "human", "important",
  "international", "large", "late", "little", "local", "long", "low",
  "major", "military", "national", "new", "old", "only", "other", "political",
  "possible", "public", "real", "recent", "right", "small", "social",
  "special", "strong", "sure", "true", "white", "whole", "young"
];

var getRandomWord = function(wordType) {

  return wordType[Math.floor(Math.random() * wordType.length)];
}
var generateProjectName = function() {
  document.getElementById('currentName').innerHTML = getRandomWord(commonAdjectives) + " " + getRandomWord(commonNouns)
}
