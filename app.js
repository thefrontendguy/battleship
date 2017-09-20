var shipData = [
    ["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"],
    ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"],
    ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],
    ["d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"],
    ["e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9"],
    ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"],
    ["g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"],
    ["h0", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9"],
    ["i0", "i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9"],
    ["j0", "j1", "j2", "j3", "j4", "j5", "j6", "j7", "j8", "j9"]
  ];
  
  var gameState = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
  ];
  
  var schips = {
    C: {
      name: "Carrier",
      hits: 5
    },
    B: {
      name: "Battleship",
      hits: 3
    },
    S: {
      name: "Submarine",
      hits: 3
    },
    D: {
      name: "Destroyer",
      hits: 4
    },
    P: {
      name: "Patrol Boat",
      hits: 2
    }
  };
  
  /* Carrier     - 5 hits
        Battleship  - 4 hits
        Destroyer   - 3 hits
        Submarine   - 3 hits
        Patrol Boat - 2 hits
  */
  
  // if we hit, we want to add 5 points. If we miss, we deduct one.
  
  function createGameBoard() {
    var gameBoard = document.getElementById("gameBoard");
    for (var i = 0; i < 10; i++) {
      var tableRow = document.createElement("tr");
      tableRow.setAttribute("row", i);
      for (var j = 0; j < 10; j++) {
        var tableData = document.createElement("td");
        tableData.setAttribute("col", j);
        tableData.setAttribute("onclick", "play(this)");
        tableData.innerHTML = shipData[i][j];
        tableRow.appendChild(tableData);
      }
      gameBoard.appendChild(tableRow);
    }
}
  
  function populateGameBoard(gameState) {
    var gameBoard = document.getElementById("gameBoard");
    for (var k = 0; k < gameState.length; k++) {
      var row = gameBoard.children[k];
      //console.log(row);
      for (var l = 0; l < gameState[k].length; l++) {
        var col = row.children[l];
        //console.log(col);
        col.innerHTML = gameState[k][l];
      }
    }
  }
  
  function play(cell) {
    var col = cell.getAttribute("col");
    var row = cell.parentElement.getAttribute("row");
    var score = Number(document.getElementById("score").innerHTML);
    var totalHits = Number(document.getElementById("hits").innerHTML);
    
    if (gameState[row][col] == null) {
      if (shipData[row][col] !== null) {
        //alert("Hit!");
        for (var key in schips) {
          if (key == shipData[row][col]) {
              schips[key].hits--;
            if (schips[key].hits === 0) {
              alert("You sunk my " + schips[key].name);
            }
          }
          gameState[row][col] = "X";
        }
        score += 5;
        totalHits -= 1;
      } else {
          //alert("You hit water!");
          gameState[row][col] = "O";
          score -= 1;
        }
    } else {
        //alert("You've already tried this one!");
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("hits").innerHTML = totalHits;
    populateGameBoard(gameState);
    hasGameEnded(totalHits);
}
  
function hasGameEnded(hits) {
    if (hits === 0) {
        alert("You won the game");
        var tds = document.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            tds[i].onclick = function() {
                alert("The game has finished!");
            };
        }
    }   
    if (hits < 6) {
        var blink = document.getElementById("hits");
        blink.classList.add("blink");
    }
}
  
window.onload = function() {
createGameBoard();
};

var startButton = document.getElementById("start_button");
startButton.onclick = function() {
// alert("I clicked the button");
populateGameBoard(gameState);
};