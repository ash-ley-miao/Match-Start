$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
 var orderedValues = [];
 for (var i=1; i <= 8; i++)
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

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards', []);

  var colorsOnClick = ["hsl(24, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)",
    "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)"];

  $game.empty();

  for (var i = 0; i < cardValues.length; i++)
  {
    var newCard = $('<div class="card col-xs-3"></div>');
    newCard.data("value", cardValues[i]);
    newCard.data("isFlipped", false);
    newCard.data("color", colorsOnClick[cardValues[i]-1]);
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
