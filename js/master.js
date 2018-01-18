$(document).ready(function() {
  var menu = [];
  var id;
  var name;
  var title;
  var adjectives = [];
  var nouns = [];
  var prevID;

  var getMenu = function() {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      mimeType: "application/json",
      url: "wordlists/menu.json",
      dataType: "json",
      success: function(data) {
        menu = data;
        setDropdown();
      },
      error: function(result) {
        console.log("failed to get menu.json");
        menu = {
            id: 0,
            name: "default",
            title: "Common sample list (boring and short)"
          };
          setDropdown();
      }
    });
  };
  var clearList = function() {
    id = "";
    name = "";
    title = "";
    adjectives = [];
    nouns = [];
    $('#adjectives').text("");
    $('#nouns').text("");

  };
  var setDefaultShortList = function() {
    clearList();
    id = 0;
    name = "default";
    title = "Common sample list (boring and short)";
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
    if (prevID !== id) {
      changeList();
      prevID = id;
    }
  };
  var setExternalList = function(data) {
    clearList();
    id = data.id;
    name = data.name;
    title = data.title;
    adjectives = data.adjectives;
    nouns = data.nouns;
    if (prevID !== id) {
      changeList();
      prevID = id;
    }
  };
  var getExternalList = function(name) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      mimeType: "application/json",
      url: "wordlists/" + name + ".json",
      dataType: "json",
      success: function(data) {
        setExternalList(data);
      },
      error: function(result) {
        setDefaultShortList();
        console.log(result);
        console.log("Error: unable to access " + this.url);
      }
    });
  };


  var getRandomWord = function(wordType) {
    return wordType[Math.floor(Math.random() * wordType.length)];
  };
  var capitalizeFirstLetter = function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  var generateProjectName = $('#newProjectName').click(function(event) {
    $('#currentName').text(capitalizeFirstLetter(getRandomWord(adjectives).value) + " " + getRandomWord(nouns).value);
    rateProjectName();
  });

  var rateProjectName = function() {
    var previousProjectRating = $('#projectRating').rateit('value');
    $('#rate').attr('class', 'visible');

    $('#projectRating').rateit('reset');
    // console.log(previousProjectRating);
    // $('#rate').rateit('value', 0);
  };
  var setDropdown = function() {
    menu.forEach(function(list, index) {
      if (index === 0) {
        $('.dropdown-menu').prepend('<a class="dropdown-item" id="list-' + list.id + '">' + list.title + '</a>');
        $('#list-' + list.id).on('click', function() {
          setDefaultShortList();
        });
      } else {
        $('.dropdown-menu').prepend('<a class="dropdown-item" id="list-' + list.id + '" href="#">' + list.title + '</a>');
        $('#list-' + list.id).on('click', function() {
          getExternalList(list.fileName);
        });
      }
    });
  };
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
  var showListStatsAdj = function() {
    $('#numAdj').text(adjectives.length);
  };
  var showListStatsNoun = function() {
    $('#numNouns').text(nouns.length);
  };
  var showCurrentListName = function() {
    $('#currWordList').text(title);
    $('#list-' + prevID).removeClass('active');
    $('#list-' + id).addClass('active');

  };
  var changeList = function() {
    showCurrentListName();
    showListStatsAdj();
    showListStatsNoun();
    showWordList();
  };
  var onLoad = function() {
    getMenu();
    setDefaultShortList();
  };
  onLoad();

});
