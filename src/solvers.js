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
  var solution = [];
  for(let i=0; i < n; i++){
    let row = [];
    for(let j=0; j < n; j++){
      if(i === j){
        row.push(1);
      }
      else{
        row.push(0)
      }
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  if(n===0){
   solutionCount =0 
  } else {
    for(let i=2; i<=n; i++){
      solutionCount *= i
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  let makeNullMatrix = function(n) {
    // return _(_.range(n)).map(function() {
    //   return _(_.range(n)).map(function() {
    //     return null;
    //   });
    // });
    let output = [];
    for (let row = 0; row  < n; row++){
      output.push([])
      for (let col = 0;  col < n; col++){
        output[row].push(null);
      }
    }     
    return output;
  };

  let recurNQ = function (rowArray){
    console.log('input to recurNQ ---> ', rowArray);
    if (rowArray.length === 0) {
      return rowArray;
    }

    for (let queenCol = 0; queenCol < n; queenCol++) {

      if(rowArray[0][queenCol] === null){ // null is untouched 
        console.log('found null at ', queenCol)

        if (rowArray.length === 1) { //if in last row
          console.log('this is the lastrow')
          rowArray[0][queenCol] = 1;

          return([rowArray[0]]); // SOLUTION FOUND

        } else { //We're not in last row
          console.log('this is not last row')
          for (let i = 1; i < rowArray.length; i++){//cleaning rest of rows
            console.log('cleaning row', i);
            rowArray[i][queenCol] = 0;

            if (queenCol + i < n) { // down right 0
              rowArray[i][queenCol + i] = 0;
            }
            if (queenCol-i >= 0) { // down left 0
              rowArray[i][queenCol - i] = 0;
            }
          }
          
          //recurseTQ (THE REST)
          console.log('invoking recurNQ on:');
          console.log( rowArray.slice(1) );
          console.log('slice worked');
          let output = recurNQ(rowArray.slice(1))
          console.log('output from recurNQ ---> ', output)
          if (output) { //if output is a solution
            console.log('^^ was a solution')
            rowArray[0][queenCol] = 1;
            for (let i = queenCol + 1; i < n; i++) { //ZERO FILL TO THE RIGHT
              rowArray[0][i] = 0;
            }
            return rowArray[0].concat(output);
          } else {
            console.log('^^ was not a solution. moving on.')
          }
        }
      }//end if null is untouched
    } //endFor -- NO NULL NODES Found
    return false;    
  }
  
  console.log('Starting algorithm for N = ', n);
  let solution = makeNullMatrix(n);
  console.log('null matrix: ', solution);
  
  solution = recurNQ(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let makeNullMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return null;
      });
    });
  };
  var solutionCount = makeNullMatrix(n); //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return [];
};

//ADDED BY HACKERS -- CORRECT BRANCH
// window.makeNullMatrix = function(n) {
//   return _(_.range(n)).map(function() {
//     return _(_.range(n)).map(function() {
//       return null;
//     });
//   });
// };