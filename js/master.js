$(document).ready(function() {
  var wordLists = ["Common sample list (boring and short)","Most common english words"]; // this should be set by api call using id's
  var listID;
  var listName;
  var adjectives = [];
  var nouns = [];
  var setDefaultShortList = function() {
    id = 0;
    listName = "Common sample list (boring and short)";
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
    mimeType: "application/json",
    url: "wordlists/common.json",
    dataType: "json",
    success: function(data) {
      adjectives = data.adjectives;
      nouns = data.nouns;
      listName = data.listName;
      onLoad();
    },
    error: function(result) {
      setDefaultShortList();
      onLoad();
      console.log("Error: unable access common.json");
    }
  });


  var showCurrentListName = function() {
    $('#currWordList').text(listName);
  };
  var getRandomWord = function(wordType) {
    return wordType[Math.floor(Math.random() * wordType.length)];
  };
  var capitalizeFirstLetter = function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  var showListStatsAdj = function() {
    $('#numAdj').text(adjectives.length);
  };
  var showListStatsNoun = function() {
    $('#numNouns').text(nouns.length);
  };
  var generateProjectName = $('#newProjectName').click(function(event) {
    $('#currentName').text(capitalizeFirstLetter(getRandomWord(adjectives).value) + " " + getRandomWord(nouns).value);
    rateProjectName();
  });
  var showWordList = function() {
    adjectives.forEach(function(adjective, index) {
      if (index === 0) {
        $('#adjectives').append(adjective.value);
      } else {
        $('#adjectives').append(", " + adjective.value);
      }
    });
    nouns.forEach(function(noun, index) {
      if (index === 0) {
        $('#nouns').append(noun.value);
      } else {
        $('#nouns').append(", " + noun.value);
      }
    });
  };
  var rateProjectName = function() {
    var previousProjectRating = $('#projectRating').rateit('value');
    $('#rate').attr('class', 'visible');

    $('#projectRating').rateit('reset');
    console.log(previousProjectRating);
    // $('#rate').rateit('value', 0);
  };
  var populateDropdown = function(){
    wordLists.forEach(function(listName){
      $('.dropdown-menu').prepend('<a class="dropdown-item" href="#">' + listName + '</a>');
    });
  };
  var changeList = function() {
    showCurrentListName();
    showListStatsAdj();
    showListStatsNoun();
    showWordList();
    populateDropdown();
  };
  var onLoad = function() {
    changeList();
  };
});
