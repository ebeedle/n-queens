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
  var solutionCount = 0;
  var cleanBoard = new Board ({n:n});

  var solutionMaker = function(row) { 
    if (row === n){
      solutionCount++;
      return;
    }
    for (var i=0; i<n; i++){
        cleanBoard.togglePiece(row,i);

        if (!cleanBoard.hasAnyRooksConflicts()) {
          solutionMaker(row+1);
        }

        cleanBoard.togglePiece(row,i);
    }
  };
  solutionMaker(0)
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

  //   if (row === 0){
  //     for (var i=0; i<n; i++){
  //       var cleanBoard = new Board ({n:n});
  //       cleanBoard.togglePiece(0,i);
  //       solutionMaker(row+1, cleanBoard);
  //     }
  //   }
  //   if (row < n & row !== 0){
  //     for (var i=0; i<n; i++){

  //       var rowSum = oldBoard.get(row).reduce(function (a,b){return a+b});
  //       //if sum of row is greater than 0 
  //       // if(rowSum > 0){
  //       //   //creates array with n zeros to reset to
  //       //   var arr = [];
  //       //   for (var i = 0; i < n; i++) {
  //       //     arr.push(0);
  //       //   }
  //       //   //reset row, row + 1, row + 2....row n-1
  //       //   for(var r=row; r<n; r++){
  //       //     oldBoard.rows()[r] = [0,0,0]
  //       //     // console.log('row cleared', r)
  //       //     // console.log('arr adding in', arr)
  //       //     // oldBoard.set(r, [0,0,0]);                   
  //       //   }
  //       // }
  //       var arr = [];
  //       for (var j = 0; j < n; j++) {
  //         arr.push(0);
  //       }

  //       if (rowSum > 0) {
  //         // oldBoard.rows()[row] = [0,0,0]
  //         // oldBoard.rows()[row + 1] = [0,0,0]

  //         oldBoard.set(row, [0,0,0]); 
  //         oldBoard.set(row+1,[0,0,0]);          
  //         // oldBoard.set(row+2,arr);
  //       }

  //       var currentBoard = new Board(oldBoard.rows())
  //       currentBoard.togglePiece(row, i);

        
  //       if (currentBoard.hasAnyRooksConflicts()){
  //         currentBoard.togglePiece(row,i);

  //       console.log('row :', row, 'i :', i)
  //       console.log('CURRENTBOARD :', currentBoard.get(0), currentBoard.get(1), currentBoard.get(2))

  //       } else {
  //         console.log('solutionworks: row, i', row, i);
  //         solutionMaker(row+1, currentBoard);
  //       }
  //     }
  //   }
  // };  

  // solutionMaker(0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
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
