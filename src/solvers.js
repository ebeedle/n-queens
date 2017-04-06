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
      //FOR loop thru 0,1,2 colIndex
      for (var i=0; i<n; i++){
        console.log('went in 2nd loop')
        console.log('row, i', row, i)
        //grab oldBoard from prior iteration (row was 0)
        //oldBoard.togglePiece (row,i)
        oldBoard.togglePiece(row, i);
        //if there are any conflict
        if (oldBoard.hasAnyRooksConflicts()){
          console.log('position failed')
          //togglePiece back
          oldBoard.togglePiece(row,i);
        } 
        //else - recursively call   
        else {
          console.log(oldBoard);
          solutionMaker(row+1, oldBoard);
        }
      }
    }
  };


  // //WORKS FOR 3 / 6 solution
  // var solutionMaker = function (row, oldBoard){
  //   if (row === 0){
  //     for (var i=0; i<n; i++){
  //       var cleanBoard = new Board({n:n});
  //       cleanBoard.togglePiece(0,i);
  //       solutionMaker(row +1, cleanBoard);  
  //     }
  //   }
  //   //when x is n - solution count ++ 
  //   if (row === n) {
  //     solutionCount += 1;
  //   }

  //   if (row < n && row !== 0){
  //     //at row 0, for each col
  //     for (var i=0; i<n; i++){
  //       console.log('cleanBoard', cleanBoard.rows());
  //       console.log('row & i', row, i);
  //       //set toggle at x and col
  //       cleanBoard.togglePiece(row, i);
  //       //check if board hasAnyRooksConflicts
  //       if (cleanBoard.hasAnyRooksConflicts()){
  //         //if conflict - togglePiece back
  //         cleanBoard.togglePiece(row, i);
  //         console.log('CONFLICT', row, i);
  //       }
  //     }
  //     //recursively call - with row + 1
  //     solutionMaker(row+1);
  //   }
  // };
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
