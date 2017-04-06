/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var cleanBoard = new Board({n:n});

  //iterate thru board
  //FOR each row 
  for (var i=0; i<n; i++){
    for (var j=0; j<n; j++){
      //toggle at i & j
      cleanBoard.togglePiece(i,j);
      //if there are rooks conflict - togglePiece back
      if (cleanBoard.hasAnyRooksConflicts()){
        cleanBoard.togglePiece(i,j);
      }
    }
  }
  var solution = cleanBoard.rows(); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  //solutionMaker - take in 2 parameters - rows (starting from 0 - iterate to n), old board
  var solutionMaker = function (row, oldBoard) {
    //if row === n - increase solution count 
    if (row === n){
      solutionCount++;
    }

    //if row === 0
    if (row === 0){
      //FOR loop thru 0,1,2 colIndex
      for (var i=0; i<n; i++){
        //create new Board
        var cleanBoard = new Board ({n:n});
        //toggle piece i (0,1,2) - 3 boards will be created 
        cleanBoard.togglePiece(0,i);
        //recursively call each one - parameters (row+1, cleanBoard)
        solutionMaker(row+1, cleanBoard);
      }
    }

    //if row < n & row !== 0
    if (row < n & row !== 0){
      // var oldBoard2 = oldBoard;
      // var newBoard = new Board(oldBoard.rows())
      //FOR loop thru 0,1,2 colIndex
      for (var i=0; i<n; i++){
        //if current row and rows below are filled - if so reset
        // var rowSum = oldBoard.get(row).reduce(function (a,b){return a+b},0);

        // if (rowSum > 0){
        //   for (var i=row; i<n-1; i++){
        //     oldBoard.set(i,[0,0,0]);
        //     oldBoard.set(i+1,[0,0,0]);
        //   }
        // }

        if (row === 1) {
          oldBoard.set(row,[0,0,0]);
          oldBoard.set(row+1,[0,0,0]);          
        }

        //grab oldBoard from prior iteration (row was 0) - set to currentBoard
        var currentBoard = oldBoard;
        console.log("Oldboard : ", oldBoard.get(0), oldBoard.get(1), oldBoard.get(2));
        console.log('row,i', row, i);
        // console.log('ROW 0', currentBoard.get(0));
        // console.log('ROW 1', currentBoard.get(1));
        //currentBoard.togglePiece (row,i)
        currentBoard.togglePiece(row, i);
        console.log('has problem?', currentBoard.hasAnyRooksConflicts())
        // console.log('hits 2nd row, col:', row, i);
        //if there are any conflict
        if (currentBoard.hasAnyRooksConflicts()){
          // console.log('position failed')
          //togglePiece back
          currentBoard.togglePiece(row,i);
        } 

        //else - recursively call   
        else {
          console.log('POSITION WORKS', row, i)
          solutionMaker(row+1, currentBoard);
        }
      }
    }
  };

  solutionMaker(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
