$(document).ready(function() {
  var adjectives = [];
  var nouns = [];
  var setDefaultShortList = function() {
    adjectives = [{
      "value": "able"
    }, {
      "value": "bad"
    }, {
      "value": "best"
    }, {
      "value": "better"
    }];

    nouns = [{
      "value": "people"
    }, {
      "value": "history"
    }, {
      "value": "way"
    }, {
      "value": "art"
    }];
  };
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "wordlists/common.json",
    dataType: "json",
    success: function(data) {
      adjectives = data.adjectives;
      nouns = data.nouns;
      setListName(data.listName);
      onLoad();
    },
    error: function(result) {
      setDefaultShortList();
      onLoad();
      console.log("Error: unable access common.json");
    }
  });


  var setListName = function(listName) {
    $('#currWordList').text(listName);
  };
  var getRandomWord = function(wordType) {
    return wordType[Math.floor(Math.random() * wordType.length)];
  };
  var capitalizeFirstLetter = function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  var getListStatsAdj = function() {
    $('#numAdj').text(adjectives.length);
  };
  var getListStatsNoun = function() {
    $('#numNouns').text(nouns.length);
  };
  var generateProjectName = $('#newProjectName').click(function(event) {
    $('#currentName').text(capitalizeFirstLetter(getRandomWord(adjectives).value) + " " + getRandomWord(nouns).value);
  });
  var showWordList = function() {

  };

  var onLoad = function() {
    getListStatsAdj();
    getListStatsNoun();
    showWordList();
  };
});
