// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var rowSum = row.reduce(function(a, b) {
        return a + b;
      }, 0);

      if (rowSum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardLength = this.rows().length;
      for (var i = 0; i < boardLength; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var boardLength = this.rows().length;
      var counter = 0;

      for (var i=0; i< boardLength; i++){
        var row = this.get(i);
        counter = counter + row[colIndex];
      }

      if (counter >1){
        return true;
      }
      
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardLength = this.rows().length;

      for (var c=0; c< boardLength; c++){
        var counter = 0;

        for (var r=0; r< boardLength; r++){
          var row = this.get(r);
          counter = counter + row[c];
        }

        if (counter > 1){
          return true;
        }
      }
      
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var boardLength = this.rows().length;
      var count = 0;
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        var y = 0;
        var x = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      } else {
        var x = 0;
        var y =  majorDiagonalColumnIndexAtFirstRow;
      }

      for (var i = 0; i < boardLength-Math.abs(majorDiagonalColumnIndexAtFirstRow); i++) {
        var row = this.get(x);
        count = row[y] + count;
        x++;
        y++;
      }

      console.log(count);
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {      
      var boardLength = this.rows().length;

      for (var i = 0; i < boardLength; i++) {
        
        var value = this._getFirstRowColumnIndexForMajorDiagonalOn(0, i)
        if (this.hasMajorDiagonalConflictAt(value)){
          return true;
        }

        var value2 = this._getFirstRowColumnIndexForMajorDiagonalOn(i, 0)
        if (this.hasMajorDiagonalConflictAt(value2)){
          return true;
        }
      }
      return false; 
    },

      //use all points along column where column index = 0; (i.e (0,0), (0,1), (0,2), (0,3))
        // one for loop
      //use all points along row where row index = 0; (i.e. (1,0), (2,0), (3,0))
       // another for loop
      // pass all these values into _getFirstRowColumnIndexForMajorDiagonalOn

    // Minor Diagonals - go from top-right to bottom-left
    //  --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var boardLength = this.rows().length;
      var count = 0;

      if (minorDiagonalColumnIndexAtFirstRow < boardLength-1) {
        var x = 0
        var y = minorDiagonalColumnIndexAtFirstRow;
      } else {
        var x = minorDiagonalColumnIndexAtFirstRow-(boardLength-1);
        var y = boardLength-1;        
      }

      //diaSqs = n - Math.abs( parameter - (n-1) )
      var diagSqs = boardLength - Math.abs(minorDiagonalColumnIndexAtFirstRow-(boardLength-1));

      for (var i = 0; i < diagSqs; i++) {
        var row = this.get(x);
        console.log('row[y]',row[y])
        count = row[y] + count;
        x = x+1;
        y = y-1;
      }

      if (count > 1) {
        return true;
      } else {
        return false;
      }      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardLength = this.rows().length;

      for (var i = 0; i < boardLength; i++) {        
        var value = this._getFirstRowColumnIndexForMinorDiagonalOn(0, i);
        if (this.hasMinorDiagonalConflictAt(value)){
          return true;
        }

        var value2 = this._getFirstRowColumnIndexForMinorDiagonalOn(i, boardLength-1);
        if (this.hasMinorDiagonalConflictAt(value2)){
          return true;
        }
      }
      return false; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
