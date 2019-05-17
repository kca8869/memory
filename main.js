var cards=[];
var flipCount=0
var array=[];
var noClick=false;
var welcome=$(".welcome");
var gameoverScreen=$(".gameover-screen");
var boardSize=1;
gameoverScreen.css({"display":"none"});

function welcomeLoad() {
  $("<h1>Select Board Size</h1>").appendTo(welcome);
  $("<h1 class='link'>Small</h1>").click(function () {
    loadBoard(5)
  }).appendTo(welcome);
  $("<h1 class='link'>Medium</h1>").click(function () {
    loadBoard(10)
  }).appendTo(welcome);
  $("<h1 class='link'>Large</h1>").click(function () {
    loadBoard(20)
  }).appendTo(welcome);
  welcome.fadeIn();
}
function loadBoard(size) {
  boardSize=size;
  welcome.fadeOut();
  welcome.empty();
  randomize();
}
function flipCard(e) {
  if (!noClick) {
    e.preventDefault();
    $(this).css({"transform":"rotateY(180deg)"})
    $(this).css({"background-image":"url("+this.img+"),"+
                                    "linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))"});
    this.flipped=true;

    flipCount+=1;
    if (flipCount==2) {
      flipCount=0;
      checkMatch();
    noClick=true;
    window.setTimeout(function () {
    noClick=false;
      flipBack();
    },2000)
  }
  }


}

function checkMatch() {
  var checkArr=[]
  var cards=$(".container").children();
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].flipped) {
      checkArr.push(cards[i]);
      cards[i].flipped=false;
    }
  }
  console.log(checkArr[0].id,checkArr[1].id)
  if (checkArr[0].id==checkArr[1].id) {
    checkArr[0].matched=true;
    checkArr[1].matched=true;
  }

}

function flipBack() {
  var gameOver=true;
  var cards=$(".container").children();
  for (var j = 0; j < cards.length; j++) {
    if (!cards[j].matched) {
      gameOver=false;
      $(cards[j]).css({"transform":"rotateY(0deg)",
                    'background-image':"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1))"})
    }
  }
  if (gameOver) {
      $("<h1 class='link'>You Won! Click to play again!</h1>").click(function () {
      $(".container").empty();
      gameoverScreen.fadeOut();
      gameoverScreen.empty();
      welcomeLoad();
      }).appendTo(gameoverScreen);
      gameoverScreen.fadeIn();
  }
}


function makeGrid() {
  for (var i = 1; i <= boardSize; i++) {
    array.push($("<div id='"+i+"'class='card'></div>").prop({"img":"images/pic"+i+"-opt.jpg","matched":false}).css({'background-image':"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1))"}))
                                                                //.css({"background-image":"url(images/pic"+i+"-opt.jpg)"}));}
}
}

//randomize the grid
function randomize() {
  makeGrid();
  makeGrid();
  while (array.length>0) {
    var random=Math.floor(Math.random()*array.length);
    $(array[random]).click("e",flipCard).appendTo($(".container"));
    array.splice(random,1);
  }
}
welcomeLoad();
