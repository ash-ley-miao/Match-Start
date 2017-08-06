
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  $("#twoTiles").click(function () {
    MatchGame.renderCards(MatchGame.generateCardValues(2), $('#game'));
  });
  $("#fourTiles").click(function () {
    MatchGame.renderCards(MatchGame.generateCardValues(4), $('#game'));
    tiles = 4;
  });
  $("#sixTiles").click(function () {
    MatchGame.renderCards(MatchGame.generateCardValues(6), $('#game'));
  });
  $("#twelveTiles").click(function () {
    MatchGame.renderCards(MatchGame.generateCardValues(12), $('#game'));
  });
});

var MatchGame = {};
var sideLength;
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function(tiles) {
 sideLength = tiles;
 var orderedValues = [];
 for (var i=1; i <= (tiles*tiles)/2; i++)
 {
   orderedValues.push(i);
   orderedValues.push(i);
 }

 var unorderedValues = [];
 while (orderedValues.length > 0)
 {
   var randomIndex = Math.floor(Math.random()*orderedValues.length); /* Generate random integer between 0 and 17 */
   unorderedValues.push(orderedValues[randomIndex]);
   orderedValues.splice(randomIndex, 1);
 }
 return unorderedValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game, tiles) {
  $game.data('flippedCards', []);

  var colorsOnClick = ["hsl(24, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)",
    "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)",
    "hsl(70, 85%, 65%)", "hsl(120, 85%, 65%)", "hsl(240, 85%, 65%)", "hsl(335, 85%, 65%)"];

  $game.empty();

  for (var i = 0; i < cardValues.length; i++)
  {
    console.log(i);
    var newCard;

    console.log(sideLength);
    if (sideLength === 2) {
      newCard = $('<div class="card bigTile col-xs-6"></div>');
    }
    if (sideLength === 4) {
      newCard = $('<div class="card mediumTile col-xs-3"></div>');
    }
    if (sideLength === 6) {
      newCard = $('<div class="card smallTile col-xs-2"></div>');
    }
    if (sideLength === 12) {
      newCard = $('<div class="card smallestTile col-xs-1"></div>');
    }

    newCard.data("value", cardValues[i]);
    newCard.data("isFlipped", false);
    newCard.data("color", colorsOnClick[(cardValues[i]-1)%12]);
    $game.append(newCard);
  }


  if ($game.data('flippedCards') < 2)
  {
    $(".card").click(function() {
      MatchGame.flipCard($(this), $('#game'));
    });
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped'))
  {
    return;
  }
  $card.css('background-color', $card.data('color'));
  $card.data('isFlipped', true);
  $card.text($card.data("value"));

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2)
  {
    if (flippedCards[0].data("value") === flippedCards[1].data("value"))
    {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    }
    else
    {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function () {
        card1.css('background-color', 'rgb(32, 64, 86)');
        card1.text('');
        card1.data('isFlipped', false);

        card2.css('background-color', 'rgb(32, 64, 86)');
        card2.text('');
        card2.data('isFlipped', false);
      }, 300);
    }
    $game.data('flippedCards', []);
  }
};
