$(document).ready(function() {
  var menu = [];
  var id;
  var name;
  var title;
  var adjectives = [];
  var nouns = [];
  var prevID;
  var menuURI = 'https://api.myjson.com/bins/hnc4p'

  var getMenu = function() {
    $.get(menuURI, function(data, textStatus, jqXHR) {
      menu = data;
      setDropdown();
      showCurrentListName();
    });
    // $.ajax({
    //   type: "POST",
    //   contentType: "application/json",
    //   mimeType: "application/json",
    //   url: "wordlists/menu.json",
    //   dataType: "json",
    //   success: function(data) {
    //     menu = data;
    //     setDropdown();
    //     showCurrentListName();
    //   },
    //   error: function(result) {
    //     console.log("failed to get menu.json");
    //     menu = [{
    //       id: 0,
    //       name: "default",
    //       title: "Common sample list (boring and short)"
    //     }];
    //     setDropdown();
    //     showCurrentListName();
    //   }
    // });
  };
  var clearList = function() {
    $('#adjectives').text("");
    $('#nouns').text("");
  };
  var setDefaultShortList = function() {
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
    if (prevID !== id || prevID === undefined) {
      clearList();
      changeList();
      prevID = id;
    }
  };
  var setExternalList = function(data) {
    id = data.id;
    name = data.name;
    title = data.title;
    adjectives = data.adjectives;
    nouns = data.nouns;
    if (prevID !== id || prevID === undefined) {
      clearList();
      changeList();
      prevID = id;
    }
  };
  var getExternalList = function(data) {
    $.get(data.uri, function(listData, textStatus, jqXHR) {
      setExternalList(listData);
    });
  };
  //   $.ajax({
  //     url: data.uri,
  //     type: "POST",
  //     contentType: "application/json; charset=utf-8",
  //     mimeType: "application/json",
  //     dataType: "json",
  //     success: function(data) {
  //       setExternalList(data);
  //     },
  //     error: function(result) {
  //       setDefaultShortList();
  //       console.log(result);
  //       console.log("Error: unable to access " + this.url);
  //     }
  //   });
  // };


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
          getExternalList(list);
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
    if (prevID === id) {
      console.log("dont do a thing!");
    } else {
      showCurrentListName();
      showListStatsAdj();
      showListStatsNoun();
      showWordList();
    }
  };
  var onLoad = function() {
    setDefaultShortList();
    getMenu();
  };
  onLoad();

});
